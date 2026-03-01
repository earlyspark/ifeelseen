"use client";

import { motion } from "framer-motion";

interface CardProps {
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
}

export default function Card({ selected, onSelect, disabled }: CardProps) {
  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled && !selected}
      whileTap={!disabled || selected ? { scale: 0.95 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        relative h-[200px] w-[140px] rounded-xl
        sm:h-[224px] sm:w-[160px]
        ${disabled && !selected ? "cursor-not-allowed brightness-[0.3]" : "cursor-pointer"}
        ${selected
          ? "ring-2 ring-[#c9a84c] shadow-[0_0_24px_rgba(201,168,76,0.35)]"
          : "shadow-md"
        }
      `}
    >
      <div className="h-full w-full overflow-hidden rounded-xl border border-white/15 bg-[#0e0e0e]">
        <img
          src="/card-back.jpg"
          alt="Card"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a84c] text-xs font-bold text-[#0e0e0e]"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}
