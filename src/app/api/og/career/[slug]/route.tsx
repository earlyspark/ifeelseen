import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { findArchetype } from "@/lib/quiz-career";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const profile = findArchetype(slug);

  if (!profile) {
    return new Response("Not found", { status: 404 });
  }

  const imageData = readFileSync(
    join(process.cwd(), "public", `card-career-${slug}.png`)
  );
  const cardUrl = `data:image/png;base64,${imageData.toString("base64")}`;

  const fontData = await fetch(
    "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3umX5slCNuHLi8bLeY9MK7whWMhyjypVO7abI26QOD_v86KnTOitk9IfqxUQ.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5f0e8",
          fontFamily: "Cormorant Garamond",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Left: archetype details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingRight: "60px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#c47c5a",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            Career Archetype
          </span>
          <span
            style={{
              fontSize: "72px",
              color: "#2a2520",
              lineHeight: "1.0",
              letterSpacing: "0.01em",
              marginBottom: "24px",
            }}
          >
            {profile.name}
          </span>
          <span
            style={{
              fontSize: "28px",
              color: "#5c544a",
              lineHeight: "1.4",
              fontStyle: "italic",
            }}
          >
            {profile.essenceLine}
          </span>
        </div>

        {/* Right: archetype card image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cardUrl}
          alt=""
          style={{
            width: "130px",
            height: "195px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.10)",
            flexShrink: 0,
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "80px",
            display: "flex",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#c47c5a",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ifeelseen.ai/quiz/career
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
