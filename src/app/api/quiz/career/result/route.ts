import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { archetypes } from "@/lib/quiz-career";

const anthropic = new Anthropic();

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
  prefix: "ratelimit:quiz-career",
});

const COLOR_PSYCHOLOGY: Record<string, string> = {
  Red:    "drive, ambition, urgency, action",
  Blue:   "depth, calm, loyalty, need for harmony",
  Green:  "persistence, stability, self-assertion",
  Yellow: "optimism, spontaneity, forward-thinking",
  Violet: "intuition, sensitivity, idealism",
  Brown:  "grounded, sensory, practical",
  Gray:   "detachment, neutrality, reserve",
  Black:  "control, intensity, transformation",
};

const VALID_SLUGS = new Set(archetypes.map((a) => a.slug));

const ARCHETYPE_SUMMARY = archetypes
  .map(
    (a) =>
      `${a.slug} — "${a.essenceLine}" (${a.axes.makingRelating}/${a.axes.thinkingFeeling}/${a.axes.structuredFluid}/${a.axes.individualCommunity})`
  )
  .join("\n");

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { answers, colorCard } = body as {
      answers: { question: string; answer: string }[];
      colorCard: string | null;
    };

    if (!answers?.length) {
      return NextResponse.json({ error: "No answers provided." }, { status: 400 });
    }

    const answerLines = answers
      .map((a) => `Q: ${a.question}\nA: ${a.answer}`)
      .join("\n\n");

    const colorLine = colorCard
      ? `\nColor picked: ${colorCard}${COLOR_PSYCHOLOGY[colorCard] ? ` — ${COLOR_PSYCHOLOGY[colorCard]}` : ""}`
      : "";

    const userMessage = `Here are someone's answers to a career archetype quiz. Choose the single best-matching archetype for this person based on their answers as a whole.

ANSWERS:
${answerLines}
${colorLine}

ARCHETYPES:
${ARCHETYPE_SUMMARY}

Respond with ONLY the archetype slug — one word, lowercase, no punctuation.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 20,
      system:
        "You are a career archetype assessor. Based on someone's quiz answers, you select their best-matching career archetype from a predefined list. Respond ONLY with the archetype slug — one word, lowercase, no punctuation. Valid slugs: creator, healer, guide, investigator, builder, connector, advocate, performer, steward, visionary",
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    const raw = textBlock?.type === "text" ? textBlock.text.trim().toLowerCase() : "";

    if (!VALID_SLUGS.has(raw)) {
      return NextResponse.json(
        { error: "Unexpected archetype response." },
        { status: 500 }
      );
    }

    return NextResponse.json({ archetype: raw });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Quiz career result error:", message, error);
    return NextResponse.json(
      { error: "Something went wrong determining your archetype.", detail: message },
      { status: 500 }
    );
  }
}
