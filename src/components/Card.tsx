"use client";

import { motion, useReducedMotion } from "framer-motion";

interface CardProps {
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
  label?: string;
}

export default function Card({ selected, onSelect, disabled, label }: CardProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.button
      onClick={onSelect}
      disabled={disabled && !selected}
      aria-label={label}
      aria-pressed={selected}
      whileTap={!disabled || selected ? { scale: shouldReduceMotion ? 1 : 0.95 } : undefined}
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
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {selected && (
        <motion.div
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          aria-hidden="true"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a84c] text-xs font-bold text-[#0e0e0e]"
        >
          ✓
        </motion.div>
      )}
    </motion.button>
  );
}
