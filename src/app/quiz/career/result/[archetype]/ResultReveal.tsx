"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ArchetypeProfile } from "@/lib/quiz-career";

const TEXT_PRIMARY = "#2a2520";
const TEXT_SECONDARY = "#5c544a";
const ACCENT = "#a55e3e";

const cormorant = { fontFamily: "var(--font-cormorant)" };

export default function ResultReveal({
  profile,
}: {
  profile: ArchetypeProfile;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rm = shouldReduceMotion;

  return (
    <div className="text-center">
      {/* Archetype card */}
      <motion.div
        className="mx-auto mb-8 overflow-hidden rounded-xl"
        style={{
          width: "140px",
          height: "200px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
        initial={{ opacity: 0, scale: rm ? 1 : 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: rm ? 0 : 0.6 }}
      >
        <img
          src={`/card-career-${profile.slug}.png`}
          alt={profile.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          draggable={false}
        />
      </motion.div>

      {/* Archetype name */}
      <motion.h1
        className="text-4xl font-light tracking-wide sm:text-5xl"
        style={{ ...cormorant, color: TEXT_PRIMARY }}
        initial={{ opacity: 0, y: rm ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: rm ? 0 : 0.6, delay: rm ? 0 : 0.3 }}
      >
        {profile.name}
      </motion.h1>

      {/* Essence line */}
      <motion.p
        className="mt-4 text-xl font-light tracking-wide sm:text-2xl"
        style={{ ...cormorant, color: ACCENT }}
        initial={{ opacity: 0, y: rm ? 0 : 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: rm ? 0 : 0.6, delay: rm ? 0 : 0.5 }}
      >
        {profile.essenceLine}
      </motion.p>

      {/* Divider */}
      <motion.div
        className="mx-auto my-8 h-px w-16"
        style={{ backgroundColor: "#e0d8cc" }}
        initial={{ opacity: 0, scaleX: rm ? 1 : 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: rm ? 0 : 0.5, delay: rm ? 0 : 0.7 }}
      />

      {/* Description */}
      <motion.p
        className="text-left text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
        style={{ ...cormorant, color: TEXT_SECONDARY }}
        initial={{ opacity: 0, y: rm ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: rm ? 0 : 0.6, delay: rm ? 0 : 0.9 }}
      >
        {profile.description}
      </motion.p>

      {/* What this says */}
      <motion.div
        className="mt-8 text-left"
        initial={{ opacity: 0, y: rm ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: rm ? 0 : 0.6, delay: rm ? 0 : 1.2 }}
      >
        <h2
          className="mb-3 text-sm tracking-widest uppercase"
          style={{ color: ACCENT }}
        >
          What this says about you
        </h2>
        <p
          className="text-lg leading-relaxed"
          style={{ ...cormorant, color: TEXT_SECONDARY }}
        >
          {profile.whatThisSays}
        </p>
      </motion.div>
    </div>
  );
}
