import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { v4 as uuidv4 } from "uuid";
import {
  findWordCards,
  findColorCards,
  findObjectCards,
} from "@/lib/cards";

const anthropic = new Anthropic();

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "ratelimit:generate",
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "You're drawing too fast. Take a breath and try again in a moment." },
        { status: 429 }
      );
    }
    const body = await req.json();
    const { words, colors, objects } = body as {
      words: string[];
      colors: string[];
      objects: string[];
    };

    if (
      !words?.length ||
      !colors?.length ||
      !objects?.length ||
      words.length !== 3 ||
      colors.length !== 3 ||
      objects.length !== 3
    ) {
      return NextResponse.json(
        { error: "Exactly 3 word, 3 color, and 3 object card IDs required." },
        { status: 400 }
      );
    }

    const wordData = findWordCards(words);
    const colorData = findColorCards(colors);
    const objectData = findObjectCards(objects);

    if (
      wordData.length !== 3 ||
      colorData.length !== 3 ||
      objectData.length !== 3
    ) {
      return NextResponse.json(
        { error: "One or more card IDs are invalid." },
        { status: 400 }
      );
    }

    // Build color descriptions for the prompt
    const colorDescriptions: Record<string, string> = {
      "Before Dawn": "deep navy blue — the sky before anything has started",
      "Ember": "burnt orange fading to ash — warmth that has been through fire",
      "Still Water": "soft grey-green — calm surface with unknown depth",
      "Worn Gold": "muted amber — something precious that has been handled",
      "First Light": "pale warm yellow — the very first sign that darkness ends",
      "Deep Water": "dark teal — what lies beneath when you stop swimming",
      "After Rain": "cool grey-blue — the quiet after something has passed",
      "Dry Ground": "cracked earth brown — waiting for what hasn't come yet",
      "Tender Green": "soft sage — new growth in a careful place",
      "Midnight": "near-black blue — the hour when only honest things survive",
      "Healed Scar": "dusty rose — proof that something closed over",
      "Dust and Bone": "warm off-white — what remains when everything else falls away",
      "Shelter": "soft warm grey — the feeling of being covered",
      "Held Breath": "pale lavender — the pause before you know",
      "Wilderness": "muted olive — beauty without a path",
      "Refining Fire": "deep burnt red — heat that is making something pure",
      "New Mercies": "soft coral — tenderness that arrives without earning it",
      "Hidden Spring": "cool aqua — life where you didn't expect to find it",
      "Broken Open": "deep violet — what is revealed when the shell cracks",
      "Carried": "warm sand — the feeling of being held up by something steady",
    };

    const wordList = wordData.map((w) => w.word).join(", ");
    const colorList = colorData
      .map((c) => `${c.name} (${colorDescriptions[c.name] || c.hex})`)
      .join("; ");
    const objectList = objectData.map((o) => o.object).join(", ");

    const prompt = `Someone drew 9 cards from three piles — words, colors, and objects. Here is what they drew:

Words: ${wordList}
Colors: ${colorList}
Objects: ${objectList}

Write a personal reflection for this person in three sections. Respond ONLY with valid JSON in this exact format, no other text:

{
  "interpretation": "...",
  "insight": "...",
  "encouragingNote": "..."
}

Guidelines for each section:

INTERPRETATION (3-5 sentences): Weave the specific picks — the words, color names and their descriptions, and objects — into a picture of where this person is right now. Be specific to these actual cards. Don't list them; let them flow into a narrative about what this person might be carrying.

INSIGHT (2-3 sentences): Name one true thing about this person in this moment. Not flattery, not advice. Name what's underneath. Write it like someone who sees them clearly.

ENCOURAGING NOTE (3-5 sentences): Speak warmth and truth. Ground it in wisdom — you may draw from scripture or stoic thought without naming the source directly. The standard: would this mean something to someone in genuine pain? No empty affirmations. Write like someone who loves them and needs nothing from them.

Tone: Seen. Witnessed. Warm but not saccharine. True but not harsh.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    // Extract text from the response
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from AI." },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let parsed: {
      interpretation: string;
      insight: string;
      encouragingNote: string;
    };

    try {
      parsed = JSON.parse(textBlock.text);
    } catch {
      // Try extracting JSON from markdown code block
      const jsonMatch = textBlock.text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1].trim());
      } else {
        return NextResponse.json(
          { error: "Failed to parse AI response." },
          { status: 500 }
        );
      }
    }

    // Save to Redis
    const id = uuidv4();
    const result = {
      wordIds: words,
      colorIds: colors,
      objectIds: objects,
      words: wordData.map((w) => w.word),
      colors: colorData.map((c) => ({ name: c.name, hex: c.hex })),
      objects: objectData.map((o) => o.object),
      interpretation: parsed.interpretation,
      insight: parsed.insight,
      encouragingNote: parsed.encouragingNote,
      createdAt: new Date().toISOString(),
    };

    await redis.set(`card-result:${id}`, JSON.stringify(result));

    return NextResponse.json({
      id,
      interpretation: parsed.interpretation,
      insight: parsed.insight,
      encouragingNote: parsed.encouragingNote,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Generate error:", message, error);
    return NextResponse.json(
      { error: "Something went wrong generating your reflection.", detail: message },
      { status: 500 }
    );
  }
}
