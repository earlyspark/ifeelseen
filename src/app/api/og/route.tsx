import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface CardResult {
  words: string[];
  colors: { name: string; hex: string }[];
  objects: string[];
  encouragingNote: string;
}

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const raw = await redis.get<string>(`card-result:${id}`);
  if (!raw) {
    return new Response("Result not found", { status: 404 });
  }

  const result: CardResult =
    typeof raw === "string" ? JSON.parse(raw) : raw;

  // Load Cormorant Garamond font
  const fontData = await fetch(
    new URL("https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjYrEtFmSu5.woff2")
  ).then((res) => res.arrayBuffer());

  const encouragingExcerpt =
    result.encouragingNote.length > 120
      ? result.encouragingNote.slice(0, 117) + "..."
      : result.encouragingNote;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e0e0e",
          fontFamily: "Cormorant Garamond",
          padding: "60px 80px",
        }}
      >
        {/* Words */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginBottom: "36px",
          }}
        >
          {result.words.map((word) => (
            <span
              key={word}
              style={{
                fontSize: "42px",
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.04em",
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Color swatches */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "12px",
          }}
        >
          {result.colors.map((color) => (
            <div
              key={color.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: color.hex,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.05em",
                }}
              >
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Objects */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {result.objects.map((obj) => (
            <span
              key={obj}
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.06em",
              }}
            >
              {obj}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "rgba(201,168,76,0.3)",
            marginBottom: "32px",
          }}
        />

        {/* Encouraging note excerpt */}
        <p
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            lineHeight: "1.6",
            maxWidth: "800px",
            margin: 0,
          }}
        >
          {encouragingExcerpt}
        </p>

        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "rgba(201,168,76,0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            I Feel Seen
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
