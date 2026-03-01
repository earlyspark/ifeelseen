import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findArchetype, archetypes } from "@/lib/quiz-career";
import ResultActions from "./ResultActions";
import ResultReveal from "./ResultReveal";

// Warm palette
const BG = "#f5f0e8";
const TEXT_PRIMARY = "#2a2520";
const TEXT_SECONDARY = "#5c544a";
const TEXT_MUTED = "#8a8078";
const ACCENT = "#c47c5a";

interface PageProps {
  params: Promise<{ archetype: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { archetype: slug } = await params;
  const profile = findArchetype(slug);

  if (!profile) {
    return { title: "Not Found | I Feel Seen" };
  }

  const description = `${profile.essenceLine}. ${profile.description.split(". ")[0]}.`;

  return {
    title: `${profile.name} \u2014 What Career Should You Pursue? | I Feel Seen`,
    description,
    openGraph: {
      title: `${profile.name}: ${profile.essenceLine}`,
      description,
      type: "website",
      url: `https://ifeelseen.ai/quiz/career/result/${slug}`,
      images: [{ url: `https://ifeelseen.ai/card-career-${slug}.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.name}: ${profile.essenceLine}`,
      description,
      images: [`https://ifeelseen.ai/card-career-${slug}.png`],
    },
  };
}

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.slug }));
}

export default async function ArchetypeResultPage({ params }: PageProps) {
  const { archetype: slug } = await params;
  const profile = findArchetype(slug);

  if (!profile) {
    notFound();
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center px-5 py-12 sm:px-6"
      style={{ backgroundColor: BG }}
    >
      <div className="w-full max-w-2xl">
        {/* Animated result reveal (client component) */}
        <ResultReveal profile={profile} />

        {/* Careers */}
        <div className="mt-10">
          <h3
            className="mb-4 text-sm tracking-widest uppercase"
            style={{ color: ACCENT }}
          >
            Careers that embody this
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.careers.map((career) => (
              <span
                key={career}
                className="rounded-full border px-3 py-1.5 text-sm"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  borderColor: "#e0d8cc",
                  color: TEXT_SECONDARY,
                  backgroundColor: "#faf7f2",
                }}
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* How to bring more */}
        <div className="mt-10">
          <h3
            className="mb-4 text-sm tracking-widest uppercase"
            style={{ color: ACCENT }}
          >
            How to bring more of this into your life
          </h3>
          <p
            className="text-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: TEXT_SECONDARY,
            }}
          >
            {profile.howToBring}
          </p>
        </div>

        {/* Divider */}
        <div
          className="my-12 h-px w-full"
          style={{ backgroundColor: "#e0d8cc" }}
        />

        {/* Actions */}
        <ResultActions slug={profile.slug} />
      </div>
    </main>
  );
}
