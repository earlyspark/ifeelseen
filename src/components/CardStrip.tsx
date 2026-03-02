"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  findWordCards,
  findColorCards,
  findObjectCards,
  WordCard,
  ColorCard,
  ObjectCard,
} from "@/lib/cards";

type CardEntry =
  | { type: "word"; card: WordCard }
  | { type: "color"; card: ColorCard }
  | { type: "object"; card: ObjectCard };

interface CardStripProps {
  wordIds: string[];
  colorIds: string[];
  objectIds: string[];
}

export default function CardStrip({ wordIds, colorIds, objectIds }: CardStripProps) {
  const words = findWordCards(wordIds);
  const colors = findColorCards(colorIds);
  const objects = findObjectCards(objectIds);

  const shouldReduceMotion = useReducedMotion();
  const [zoomedCard, setZoomedCard] = useState<CardEntry | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((entry: CardEntry) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setZoomedCard(entry);
  }, []);

  const closeModal = useCallback(() => {
    setZoomedCard(null);
    // Restore focus after state update
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, []);

  // Move focus into modal on open & listen for Escape
  useEffect(() => {
    if (!zoomedCard) return;
    const el = modalRef.current;
    if (el) el.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [zoomedCard, closeModal]);

  const allCards: CardEntry[] = [
    ...words.map((c) => ({ type: "word" as const, card: c })),
    ...colors.map((c) => ({ type: "color" as const, card: c })),
    ...objects.map((c) => ({ type: "object" as const, card: c })),
  ];

  const thumbLabel = (text: string, dark?: boolean) => (
    <div className="absolute inset-x-0 bottom-0 pb-1 text-center">
      <span
        className={`text-[11px] leading-none tracking-wide sm:text-xs ${dark ? "text-black/60" : "text-white/80"}`}
        style={{ fontFamily: "var(--font-cormorant)", textShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.9)" }}
      >
        {text}
      </span>
    </div>
  );

  const renderWordThumb = (card: WordCard) => (
    <div className="relative h-full w-full">
      <img src={card.image} alt={card.word} className="h-full w-full object-cover" draggable={false} />
      {thumbLabel(card.word)}
    </div>
  );

  const renderColorThumb = (card: ColorCard) => {
    const r = parseInt(card.hex.slice(1, 3), 16);
    const g = parseInt(card.hex.slice(3, 5), 16);
    const b = parseInt(card.hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: card.hex }}>
        {thumbLabel(card.name, brightness > 140)}
      </div>
    );
  };

  const renderObjectThumb = (card: ObjectCard) => (
    <div className="relative h-full w-full">
      <img src={card.image} alt={card.object} className="h-full w-full object-cover" draggable={false} />
      {thumbLabel(card.object)}
    </div>
  );

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

  const renderModalCard = (entry: CardEntry) => {
    if (entry.type === "word") return renderWordFront(entry.card);
    if (entry.type === "color") return renderColorFront(entry.card);
    return renderObjectFront(entry.card);
  };

  return (
    <>
      {/* "your cards" divider */}
      <div className="mb-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>
          your cards
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* 6-card strip — 3×2 grid on mobile, single row on desktop */}
      <div className="mx-auto mb-10 grid max-w-[320px] grid-cols-3 justify-items-center gap-3 sm:flex sm:max-w-none sm:justify-center">
        {allCards.map((entry) => {
          const cardName =
            entry.type === "word" ? entry.card.word :
            entry.type === "color" ? entry.card.name :
            entry.card.object;
          return (
            <motion.div
              key={entry.card.id}
              role="button"
              tabIndex={0}
              aria-label={`View ${cardName} card`}
              className="aspect-[5/7] w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 sm:h-[140px] sm:w-[100px] sm:aspect-auto"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.3, zIndex: 10 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={() => openModal(entry)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openModal(entry);
                }
              }}
            >
              {entry.type === "word" && renderWordThumb(entry.card)}
              {entry.type === "color" && renderColorThumb(entry.card)}
              {entry.type === "object" && renderObjectThumb(entry.card)}
            </motion.div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm tracking-[0.2em] text-white/50" style={{ fontFamily: "var(--font-cormorant)" }}>
          your reflection
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomedCard && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${zoomedCard.type === "word" ? zoomedCard.card.word : zoomedCard.type === "color" ? zoomedCard.card.name : zoomedCard.card.object} card`}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative overflow-hidden rounded-xl border border-white/10"
              style={{ width: "min(280px, 75vw)", aspectRatio: "5/7", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderModalCard(zoomedCard)}
              <button onClick={closeModal} className="sr-only">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
