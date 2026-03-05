import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const imageData = readFileSync(
    join(process.cwd(), "public", "og-cards", "card-back-careerquiz-color.jpg")
  );
  const cardBackUrl = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  const fontData = readFileSync(
    join(process.cwd(), "assets", "CormorantGaramond-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f0e8",
          fontFamily: "Cormorant Garamond",
          position: "relative",
        }}
      >
        {/* Card back image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cardBackUrl}
          alt=""
          style={{
            width: "130px",
            height: "195px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.10)",
            marginRight: "80px",
            flexShrink: 0,
          }}
        />

        {/* Title text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "520px",
          }}
        >
          <span
            style={{
              fontSize: "52px",
              color: "#2a2520",
              lineHeight: "1.2",
              letterSpacing: "0.01em",
              marginBottom: "24px",
            }}
          >
            What Career Should You Pursue?
          </span>
          <span
            style={{
              fontSize: "22px",
              color: "#8a8078",
              letterSpacing: "0.04em",
            }}
          >
            Discover your career archetype
          </span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
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
