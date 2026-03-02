"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Card from "./Card";

interface CardCarouselProps<T> {
  cards: T[];
  selectedIds: Set<string>;
  isFull: boolean;
  onToggle: (card: T) => void;
  pileLabel: string;
}

export default function CardCarousel<T extends { id: string }>({
  cards,
  selectedIds,
  isFull,
  onToggle,
  pileLabel,
}: CardCarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress(el.scrollLeft / maxScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => el.removeEventListener("scroll", updateProgress);
  }, [updateProgress]);

  const scrollToPosition = useCallback((clientX: number) => {
    const track = trackRef.current;
    const scrollEl = scrollRef.current;
    if (!track || !scrollEl) return;

    const rect = track.getBoundingClientRect();
    const thumbWidth = Math.max(rect.width * 0.15, 40);
    const usableWidth = rect.width - thumbWidth;
    const relativeX = clientX - rect.left - thumbWidth / 2;
    const progress = Math.max(0, Math.min(1, relativeX / usableWidth));
    const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
    scrollEl.scrollLeft = progress * maxScroll;
  }, []);

  const handleTrackPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      scrollToPosition(e.clientX);
    },
    [scrollToPosition]
  );

  const handleTrackPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      scrollToPosition(e.clientX);
    },
    [isDragging, scrollToPosition]
  );

  const handleTrackPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Thumb sizing and position
  const thumbWidthPercent = 15;
  const thumbLeft = scrollProgress * (100 - thumbWidthPercent);

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Cards */}
      <div
        ref={scrollRef}
        id="card-carousel-scroll"
        aria-label={`${pileLabel} cards`}
        className="hide-scrollbar flex w-full gap-3 overflow-x-auto px-8 pb-3 pt-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {cards.map((card, i) => (
          <div key={card.id} className="shrink-0">
            <Card
              selected={selectedIds.has(card.id)}
              onSelect={() => onToggle(card)}
              disabled={isFull}
              label={`${pileLabel} card ${i + 1} of ${cards.length}`}
            />
          </div>
        ))}
      </div>

      {/* Custom scroll track — always visible, draggable */}
      <div
        ref={trackRef}
        role="scrollbar"
        aria-controls="card-carousel-scroll"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll cards"
        className="mx-8 h-8 cursor-pointer touch-none rounded-full"
        onPointerDown={handleTrackPointerDown}
        onPointerMove={handleTrackPointerMove}
        onPointerUp={handleTrackPointerUp}
        onPointerCancel={handleTrackPointerUp}
      >
        <div className="relative top-3 h-[4px] rounded-full bg-white/5">
          <div
            className={`absolute top-[-6px] h-[16px] rounded-full transition-colors ${
              isDragging ? "bg-[#c9a84c]/50" : "bg-[#c9a84c]/30"
            }`}
            style={{
              width: `${thumbWidthPercent}%`,
              left: `${thumbLeft}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
