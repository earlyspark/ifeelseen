"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import CardCarousel from "./CardCarousel";
import { shuffle } from "@/lib/shuffle";

interface CardPileProps<T> {
  label: string;
  cards: T[];
  maxPicks: number;
  onSelectionChange: (selected: T[]) => void;
}

export default function CardPile<T extends { id: string }>({
  label,
  cards,
  maxPicks,
  onSelectionChange,
}: CardPileProps<T>) {
  const shuffled = useMemo(() => shuffle(cards), [cards]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isFull = selectedIds.size >= maxPicks;
  const totalCards = shuffled.length;

  // Sync selection changes to parent outside of render
  useEffect(() => {
    const selected = shuffled.filter((c) => selectedIds.has(c.id));
    onSelectionChange(selected);
  }, [selectedIds, shuffled, onSelectionChange]);

  const toggleCard = (card: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else if (next.size < maxPicks) {
        next.add(card.id);
      }
      return next;
    });
  };

  // Fan geometry
  const maxSpread = 50;
  const halfSpread = maxSpread / 2;
  const cardSpacing = 22;
  const fanWidth = totalCards * cardSpacing + 160;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h2
          className="text-2xl tracking-wide text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {label}
        </h2>
      </div>

      {/* Mobile: carousel (hidden on sm+) */}
      <div className="w-full sm:hidden">
        <CardCarousel
          cards={shuffled}
          selectedIds={selectedIds}
          isFull={isFull}
          onToggle={toggleCard}
          pileLabel={label}
        />
      </div>

      {/* Desktop: fan layout (hidden below sm) */}
      <div
        className="relative mx-auto hidden overflow-visible sm:block"
        style={{
          height: "320px",
          width: "100%",
          maxWidth: `${fanWidth}px`,
        }}
      >
        <div
          className="absolute left-1/2"
          style={{
            width: `${fanWidth}px`,
            height: "320px",
            transform: "translateX(-50%)",
          }}
        >
          {shuffled.map((card, i) => {
            const t = totalCards > 1 ? i / (totalCards - 1) : 0.5;
            const rotation = t * maxSpread - halfSpread;
            const normalizedPos = (t - 0.5) * 2;
            const arcY = normalizedPos * normalizedPos * 20;
            const isSelected = selectedIds.has(card.id);

            return (
              <motion.div
                key={card.id}
                className="absolute"
                style={{
                  left: `${i * cardSpacing}px`,
                  top: "50px",
                  zIndex: isSelected ? 50 : i,
                  transformOrigin: "bottom center",
                }}
                initial={false}
                animate={{
                  rotate: isSelected ? 0 : rotation,
                  y: isSelected ? -20 : arcY,
                  scale: isSelected ? 1.08 : 1,
                }}
                whileHover={
                  !isSelected && !(isFull && !isSelected)
                    ? { y: arcY - 25, scale: 1.04, rotate: rotation * 0.3 }
                    : undefined
                }
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card
                  selected={isSelected}
                  onSelect={() => toggleCard(card)}
                  disabled={isFull}
                  label={`${label} card ${i + 1} of ${totalCards}`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Always reserve space for counter to prevent layout shift */}
      <p
        className={`text-sm text-[#c9a84c]/70 transition-opacity duration-200 ${
          selectedIds.size > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        {selectedIds.size} of {maxPicks} chosen
      </p>
    </div>
  );
}
