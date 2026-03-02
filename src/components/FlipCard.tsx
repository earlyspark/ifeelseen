"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FlipCardProps {
  flipped: boolean;
  front: React.ReactNode;
  delay?: number;
}

export default function FlipCard({ flipped, front, delay = 0 }: FlipCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Crossfade instead of 3D flip
    return (
      <div className="relative h-[200px] w-[140px] sm:h-[252px] sm:w-[180px]">
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-[#0e0e0e]"
          animate={{ opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.2, delay }}
        >
          <img
            src="/card-back.jpg"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-xl border border-[#c9a84c]/30 bg-[#111]"
          animate={{ opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.2, delay }}
        >
          {front}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="h-[200px] w-[140px] sm:h-[252px] sm:w-[180px]"
      style={{ perspective: "800px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          delay,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Back face (card-back.jpg) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-white/15 bg-[#0e0e0e]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src="/card-back.jpg"
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Front face (revealed content) */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl border border-[#c9a84c]/30 bg-[#111]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {front}
        </div>
      </motion.div>
    </div>
  );
}
