import { Metadata } from "next";
import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import CardStrip from "@/components/CardStrip";
import ResultActions from "./ResultActions";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

interface CardResult {
  wordIds?: string[];
  colorIds?: string[];
  objectIds?: string[];
  words: string[];
  colors: { name: string; hex: string }[];
  objects: string[];
  interpretation: string;
  insight: string;
  encouragingNote: string;
  createdAt: string;
}

async function getResult(id: string): Promise<CardResult | null> {
  const raw = await redis.get<string>(`card-result:${id}`);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = await getResult(id);
  if (!result) return { title: "I Feel Seen" };

  const title = result.words.join(" · ");
  const description =
    result.encouragingNote.length > 160
      ? result.encouragingNote.slice(0, 157) + "..."
      : result.encouragingNote;

  const ogImageUrl = `https://ifeelseen.ai/api/og?id=${id}`;

  return {
    title: `${title} — I Feel Seen`,
    description,
    openGraph: {
      title: `${title} — I Feel Seen`,
      description,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} — I Feel Seen`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — I Feel Seen`,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getResult(id);
  if (!result) notFound();

  const hasCardIds = result.wordIds && result.colorIds && result.objectIds;

  return (
    <main id="main-content" className="min-h-screen bg-[#0e0e0e] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Card strip — same as reveal page */}
        {hasCardIds ? (
          <CardStrip
            wordIds={result.wordIds!}
            colorIds={result.colorIds!}
            objectIds={result.objectIds!}
          />
        ) : (
          /* Fallback for older results without card IDs */
          <div className="mb-10 text-center">
            <h1
              className="text-3xl tracking-wide text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {result.words.join(" · ")}
            </h1>
            <div className="mt-4 flex justify-center gap-2">
              {result.colors.map((color) => (
                <div
                  key={color.name}
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="sr-only">{color.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-white/60">
              {result.objects.join(" · ")}
            </p>
            <div className="mb-10 mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span
                className="text-sm tracking-[0.2em] text-white/50"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                your reflection
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </div>
        )}

        {/* Interpretation */}
        <section className="mb-12">
          <h2
            className="mb-4 text-lg tracking-wide text-[#c9a84c]/60"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            What your cards see
          </h2>
          <p
            className="text-xl leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {result.interpretation}
          </p>
        </section>

        {/* Insight */}
        <section className="mb-12">
          <h2
            className="mb-4 text-lg tracking-wide text-[#c9a84c]/60"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            What&apos;s underneath
          </h2>
          <p
            className="text-xl leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {result.insight}
          </p>
        </section>

        {/* Encouraging note */}
        <section className="mb-14">
          <h2
            className="mb-4 text-lg tracking-wide text-[#c9a84c]/60"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            A word for you
          </h2>
          <p
            className="text-xl leading-relaxed text-white sm:text-2xl sm:leading-relaxed"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {result.encouragingNote}
          </p>
        </section>

        {/* Actions */}
        <ResultActions id={id} />
      </div>
    </main>
  );
}
