"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlipCard from "@/components/FlipCard";
import CardStrip from "@/components/CardStrip";
import {
  findWordCards,
  findColorCards,
  findObjectCards,
  WordCard,
  ColorCard,
  ObjectCard,
} from "@/lib/cards";

interface ReflectionResult {
  id: string;
  interpretation: string;
  insight: string;
  encouragingNote: string;
}

function RevealContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const wordIds = searchParams.get("words")?.split(",") ?? [];
  const colorIds = searchParams.get("colors")?.split(",") ?? [];
  const objectIds = searchParams.get("objects")?.split(",") ?? [];

  const words = findWordCards(wordIds);
  const colors = findColorCards(colorIds);
  const objects = findObjectCards(objectIds);

  const [revealedCount, setRevealedCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReflectionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const allRevealed = revealedCount >= 6;
  const isCompact = result !== null;

  // Auto-flip cards sequentially
  useEffect(() => {
    if (revealedCount >= 6) return;
    const timer = setTimeout(
      () => setRevealedCount((c) => c + 1),
      revealedCount === 0 ? 800 : 600
    );
    return () => clearTimeout(timer);
  }, [revealedCount]);

  // Scroll to top and update URL when result arrives
  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", `/cards/result/${result.id}`);
    }
  }, [result]);

  // Redirect if missing cards — if URL was already replaced to a result page, do a hard redirect
  if (words.length !== 2 || colors.length !== 2 || objects.length !== 2) {
    const resultMatch = window.location.pathname.match(/^\/cards\/result\/(.+)$/);
    if (resultMatch) {
      window.location.reload();
      return null;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0e0e0e] px-6 text-center">
        <div>
          <p className="text-white/60">Something went wrong with your picks.</p>
          <button
            onClick={() => router.push("/cards")}
            className="mt-4 text-sm text-[#c9a84c] underline underline-offset-2"
          >
            Start over
          </button>
        </div>
      </main>
    );
  }

  const handleReflect = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/cards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: wordIds, colors: colorIds, objects: objectIds }),
      });

      if (!res.ok) throw new Error("Failed to generate reflection.");

      const data = await res.json();
      setResult(data);
      setIsGenerating(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!result) return;
    const url = `${window.location.origin}/cards/result/${result.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Full-size card faces (reveal phase) ---

  const renderWordFront = (card: WordCard) => (
    <div className="relative flex h-full w-full items-end justify-center">
      <img src={card.image} alt={card.word} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <p className="relative z-10 pb-4 text-center text-xl tracking-wide text-white sm:text-2xl" style={{ fontFamily: "var(--font-cormorant)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
        {card.word}
      </p>
    </div>
  );

  const renderColorFront = (card: ColorCard) => {
    const r = parseInt(card.hex.slice(1, 3), 16);
    const g = parseInt(card.hex.slice(3, 5), 16);
    const b = parseInt(card.hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 140 ? "text-black/70" : "text-white/80";
    return (
      <div className="flex h-full w-full items-end justify-center pb-6" style={{ backgroundColor: card.hex }}>
        <p className={`text-center text-xl tracking-wide sm:text-2xl ${textColor}`} style={{ fontFamily: "var(--font-cormorant)" }}>
          {card.name}
        </p>
      </div>
    );
  };

  const renderObjectFront = (card: ObjectCard) => (
    <div className="relative flex h-full w-full items-end justify-center">
      <img src={card.image} alt={card.object} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <p className="relative z-10 pb-4 text-center text-xl tracking-wide text-white sm:text-2xl" style={{ fontFamily: "var(--font-cormorant)", textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
        {card.object}
      </p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0e0e0e] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {!isCompact ? (
            /* --- Full card rows (reveal phase) --- */
            <motion.div key="full" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
              <div className="mb-12 text-center">
                <h1 className="text-3xl tracking-wide text-white sm:text-4xl" style={{ fontFamily: "var(--font-cormorant)" }}>Your cards</h1>
                <p className="mt-2 text-sm text-white/40">Watch what chose you.</p>
              </div>

              <div className="mb-12">
                <h2 className="mb-4 text-center text-lg tracking-wide text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>Words</h2>
                <div className="flex justify-center gap-4">
                  {words.map((card, i) => <FlipCard key={card.id} flipped={revealedCount > i} delay={0} front={renderWordFront(card)} />)}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="mb-4 text-center text-lg tracking-wide text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>Colors</h2>
                <div className="flex justify-center gap-4">
                  {colors.map((card, i) => <FlipCard key={card.id} flipped={revealedCount > i + 2} delay={0} front={renderColorFront(card)} />)}
                </div>
              </div>

              <div className="mb-12">
                <h2 className="mb-4 text-center text-lg tracking-wide text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>Objects</h2>
                <div className="flex justify-center gap-4">
                  {objects.map((card, i) => <FlipCard key={card.id} flipped={revealedCount > i + 4} delay={0} front={renderObjectFront(card)} />)}
                </div>
              </div>

              <AnimatePresence>
                {allRevealed && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-3">
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                      onClick={handleReflect}
                      disabled={isGenerating}
                      className="rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-10 py-3 text-lg font-medium text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30 disabled:opacity-50"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {isGenerating ? "Reflecting..." : "See your reflection"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* --- Compact strip + reflection --- */
            <motion.div key="compact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <CardStrip wordIds={wordIds} colorIds={colorIds} objectIds={objectIds} />

              <motion.section className="mb-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
                <h2 className="mb-4 text-lg tracking-wide text-[#c9a84c]/60" style={{ fontFamily: "var(--font-cormorant)" }}>What your cards see</h2>
                <p className="text-xl leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>{result.interpretation}</p>
              </motion.section>

              <motion.section className="mb-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}>
                <h2 className="mb-4 text-lg tracking-wide text-[#c9a84c]/60" style={{ fontFamily: "var(--font-cormorant)" }}>What&apos;s underneath</h2>
                <p className="text-xl leading-relaxed text-white/80 sm:text-2xl sm:leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>{result.insight}</p>
              </motion.section>

              <motion.section className="mb-14" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
                <h2 className="mb-4 text-lg tracking-wide text-[#c9a84c]/60" style={{ fontFamily: "var(--font-cormorant)" }}>A word for you</h2>
                <p className="text-xl leading-relaxed text-white sm:text-2xl sm:leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>{result.encouragingNote}</p>
              </motion.section>

              <motion.div className="flex flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                <button
                  onClick={handleCopyLink}
                  className="rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-8 py-2.5 text-base text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {copied ? "Link copied" : "Copy link"}
                </button>
                <button onClick={() => router.push("/cards")} className="text-sm text-white/30 underline underline-offset-2 hover:text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Draw again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function RevealPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#0e0e0e]"><p className="text-white/40">Loading...</p></main>}>
      <RevealContent />
    </Suspense>
  );
}
