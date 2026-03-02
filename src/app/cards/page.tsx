"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardPile from "@/components/CardPile";
import {
  wordCards,
  colorCards,
  objectCards,
  WordCard,
  ColorCard,
  ObjectCard,
} from "@/lib/cards";

export default function DrawPage() {
  const router = useRouter();
  const [selectedWords, setSelectedWords] = useState<WordCard[]>([]);
  const [selectedColors, setSelectedColors] = useState<ColorCard[]>([]);
  const [selectedObjects, setSelectedObjects] = useState<ObjectCard[]>([]);

  const allPicked =
    selectedWords.length === 2 &&
    selectedColors.length === 2 &&
    selectedObjects.length === 2;

  const handleReveal = () => {
    const params = new URLSearchParams({
      words: selectedWords.map((w) => w.id).join(","),
      colors: selectedColors.map((c) => c.id).join(","),
      objects: selectedObjects.map((o) => o.id).join(","),
    });
    router.push(`/cards/reveal?${params.toString()}`);
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#0e0e0e] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1
            className="text-3xl tracking-wide text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Pick without thinking.
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Pick 2 from each pile. Don&apos;t overthink it.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          <CardPile<WordCard>
            label="Words"

            cards={wordCards}
            maxPicks={2}
            onSelectionChange={setSelectedWords}
          />

          <CardPile<ColorCard>
            label="Colors"

            cards={colorCards}
            maxPicks={2}
            onSelectionChange={setSelectedColors}
          />

          <CardPile<ObjectCard>
            label="Objects"

            cards={objectCards}
            maxPicks={2}
            onSelectionChange={setSelectedObjects}
          />
        </div>

        <div aria-live="polite" className="sr-only">
          {allPicked ? "All cards selected. Tap Reveal to see your reading." : ""}
        </div>

        <AnimatePresence>
          {allPicked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-0 right-0 flex justify-center px-4"
            >
              <button
                onClick={handleReveal}
                className="cursor-pointer rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-10 py-3 text-lg font-medium text-[#c9a84c] backdrop-blur-sm transition-colors hover:bg-[#c9a84c]/30"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Reveal
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-20 pb-24 text-center">
        <Link
          href="/"
          className="text-xs text-white/50 transition-colors hover:text-white/70"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          I Feel Seen
        </Link>
      </footer>
    </main>
  );
}
