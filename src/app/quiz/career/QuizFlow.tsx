"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  questions,
  colorCards,
  accumulateScores,
  determineArchetype,
  type AxisScores,
} from "@/lib/quiz-career";

// --- Warm palette ---
const BG = "#f5f0e8";
const TEXT_PRIMARY = "#2a2520";
const TEXT_SECONDARY = "#5c544a";
const TEXT_MUTED = "#8a8078";
const ACCENT = "#c47c5a";
const CARD_BG = "#ffffff";
const CARD_BORDER = "#e8e0d4";
const PROGRESS_BG = "#e0d8cc";

type Step =
  | { type: "question"; index: number }
  | { type: "colorPick" }
  | { type: "colorReveal"; colorId: string }
  | { type: "calculating" };

const cormorant = { fontFamily: "var(--font-cormorant)" };

export default function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ type: "question", index: 0 });
  // Track selected answer index per question (null = unanswered)
  const [selections, setSelections] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Auto-advance from color reveal
  useEffect(() => {
    if (step.type === "colorReveal") {
      const timer = setTimeout(() => {
        setStep({ type: "calculating" });
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Calculate and redirect when in calculating state
  useEffect(() => {
    if (step.type !== "calculating") return;

    async function resolveArchetype() {
      // Build answer pairs for the API
      const answers = questions
        .map((q, i) => ({
          question: q.question,
          answer: selections[i] !== null ? q.answers[selections[i]!].text : null,
        }))
        .filter((a): a is { question: string; answer: string } => a.answer !== null);

      const colorCard = colorCards.find((c) => c.id === selectedColor);

      try {
        const res = await fetch("/api/quiz/career/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers, colorCard: colorCard?.name ?? null }),
        });
        if (res.ok) {
          const { archetype } = await res.json();
          router.push(`/quiz/career/result/${archetype}`);
          return;
        }
      } catch {
        // Fall through to local scoring
      }

      // Fallback: local score-based determination
      const allScores: AxisScores[] = [];
      const tiebreakers: string[] = [];
      for (let i = 0; i < questions.length; i++) {
        const sel = selections[i];
        if (sel !== null) {
          const answer = questions[i].answers[sel];
          allScores.push(answer.scores);
          if (answer.tiebreaker) tiebreakers.push(answer.tiebreaker);
        }
      }
      if (colorCard) {
        allScores.push(colorCard.scores);
        if (colorCard.tiebreaker) tiebreakers.push(colorCard.tiebreaker);
      }
      const scores = accumulateScores(allScores);
      const archetype = determineArchetype(scores, tiebreakers);
      router.push(`/quiz/career/result/${archetype.slug}`);
    }

    resolveArchetype();
  }, [step, selections, selectedColor, router]);

  const handleSelectAnswer = useCallback(
    (answerIndex: number) => {
      if (step.type !== "question") return;
      const qIndex = step.index;

      setSelections((prev) => {
        const next = [...prev];
        next[qIndex] = answerIndex;
        return next;
      });

      setDirection(1);
      if (qIndex < questions.length - 1) {
        setStep({ type: "question", index: qIndex + 1 });
      } else {
        setStep({ type: "colorPick" });
      }
    },
    [step]
  );

  const handleNext = useCallback(() => {
    if (step.type !== "question") return;
    setDirection(1);
    if (step.index < questions.length - 1) {
      setStep({ type: "question", index: step.index + 1 });
    } else {
      setStep({ type: "colorPick" });
    }
  }, [step]);

  const handleColorSelect = useCallback((colorId: string) => {
    setSelectedColor(colorId);
    setStep({ type: "colorReveal", colorId });
  }, []);

  const handleBack = useCallback(() => {
    setDirection(-1);
    if (step.type === "colorPick") {
      setStep({ type: "question", index: questions.length - 1 });
    } else if (step.type === "question" && step.index > 0) {
      setStep({ type: "question", index: step.index - 1 });
    }
  }, [step]);

  // Current question number (1-based) for progress bar
  const totalSteps = questions.length + 1; // questions + color card

  const questionNumber =
    step.type === "question"
      ? step.index + 1
      : step.type === "colorPick" || step.type === "colorReveal"
        ? totalSteps
        : null;

  const showBackButton =
    (step.type === "question" && step.index > 0) ||
    step.type === "colorPick";

  // Show next button when revisiting an already-answered question
  const showNextButton =
    step.type === "question" && selections[step.index] !== null;

  // Animation variants
  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <main
      className="min-h-screen px-4 py-12 sm:px-6"
      style={{ backgroundColor: BG }}
    >
      <div className="mx-auto max-w-lg">
        {/* Instruction header */}
        <div className="mb-12 text-center">
          <h1
            className="text-3xl tracking-wide sm:text-4xl"
            style={{ ...cormorant, color: TEXT_PRIMARY }}
          >
            Choose the answer that resonates with you.
          </h1>
          <p className="mt-2 text-sm" style={{ color: TEXT_MUTED }}>
            Don&apos;t overthink it.
          </p>
        </div>

        {/* Progress bar */}
        {questionNumber && (
          <div className="mb-8">
            <p
              className="mb-2 text-center text-sm tracking-widest uppercase"
              style={{ color: ACCENT }}
            >
              Question {questionNumber} of {totalSteps}
            </p>
            <div
              className="h-1 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: PROGRESS_BG }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: ACCENT }}
                initial={false}
                animate={{ width: `${(questionNumber / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Navigation row — always rendered to hold layout space */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center gap-1.5 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 ${showBackButton ? "cursor-pointer" : "invisible"}`}
            style={{ color: ACCENT }}
            tabIndex={showBackButton ? 0 : -1}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8L10 4" />
            </svg>
            Back
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center gap-1.5 text-sm tracking-widest uppercase transition-opacity hover:opacity-70 ${showNextButton ? "cursor-pointer" : "invisible"}`}
            style={{ color: ACCENT }}
            tabIndex={showNextButton ? 0 : -1}
          >
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4L10 8L6 12" />
            </svg>
          </button>
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait" custom={direction}>
          {step.type === "question" && (
            <motion.div
              key={`q-${step.index}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <QuestionScreen
                question={questions[step.index]}
                selectedIndex={selections[step.index]}
                onSelect={handleSelectAnswer}
              />
            </motion.div>
          )}

          {step.type === "colorPick" && (
            <motion.div
              key="colorPick"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ColorPickScreen onSelect={handleColorSelect} />
            </motion.div>
          )}

          {step.type === "colorReveal" && (
            <motion.div
              key="colorReveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center pt-8 text-center"
            >
              <ColorReveal colorId={step.colorId} />
            </motion.div>
          )}

          {step.type === "calculating" && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center pt-20 text-center"
            >
              <p
                className="text-xl font-light tracking-wide"
                style={{ ...cormorant, color: TEXT_SECONDARY }}
              >
                Finding your archetype...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-20 pb-24 text-center">
        <Link
          href="/"
          className="text-xs transition-opacity hover:opacity-70"
          style={{ ...cormorant, color: TEXT_MUTED }}
        >
          I Feel Seen
        </Link>
      </footer>
    </main>
  );
}

// --- Sub-components ---

function QuestionScreen({
  question,
  selectedIndex,
  onSelect,
}: {
  question: (typeof questions)[number];
  selectedIndex: number | null;
  onSelect: (answerIndex: number) => void;
}) {
  return (
    <div>
      <h2
        className="text-xl font-light leading-relaxed tracking-wide sm:text-2xl"
        style={{ ...cormorant, color: TEXT_PRIMARY }}
      >
        {question.question}
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {question.answers.map((answer, i) => {
          const isSelected = selectedIndex === i;
          return (
            <button
              key={answer.label}
              onClick={() => onSelect(i)}
              className="cursor-pointer rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                backgroundColor: isSelected ? `${ACCENT}20` : CARD_BG,
                borderColor: isSelected ? `${ACCENT}50` : CARD_BORDER,
                color: isSelected ? TEXT_PRIMARY : TEXT_PRIMARY,
                boxShadow: isSelected ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {answer.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ColorPickScreen({
  onSelect,
}: {
  onSelect: (colorId: string) => void;
}) {
  const [flippedCount, setFlippedCount] = useState(0);

  // Flip cards one by one: short initial pause, then stagger each card
  useEffect(() => {
    if (flippedCount >= colorCards.length) return;
    const delay = flippedCount === 0 ? 400 : 190;
    const timer = setTimeout(() => {
      setFlippedCount((c) => c + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [flippedCount]);

  return (
    <div>
      <h2
        className="text-xl font-light leading-relaxed tracking-wide sm:text-2xl"
        style={{ ...cormorant, color: TEXT_PRIMARY }}
      >
        This last one&apos;s for your gut.
      </h2>
      <p className="mt-2 text-base" style={{ ...cormorant, color: TEXT_SECONDARY }}>
        Which color are you drawn to in this moment?
      </p>
      <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
        {colorCards.map((card, i) => {
          const isFlipped = i < flippedCount;
          return (
            <div
              key={card.id}
              style={{ perspective: "600px" }}
              onClick={isFlipped ? () => onSelect(card.id) : undefined}
              className={isFlipped ? "cursor-pointer" : ""}
              role={isFlipped ? "button" : undefined}
              aria-label={isFlipped ? card.name : undefined}
              tabIndex={isFlipped ? 0 : -1}
              onKeyDown={
                isFlipped
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ")
                        onSelect(card.id);
                    }
                  : undefined
              }
            >
              <motion.div
                className="relative w-full rounded-xl"
                style={{
                  aspectRatio: "2/3",
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.65,
                  type: "spring",
                  stiffness: 110,
                  damping: 18,
                }}
                whileHover={isFlipped ? { scale: 1.05 } : undefined}
                whileTap={isFlipped ? { scale: 0.95 } : undefined}
              >
                {/* Back face */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-xl border border-black/20"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src="/card-back-careerquiz-color.png"
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                {/* Front face — solid color */}
                <div
                  className="absolute inset-0 rounded-xl border border-black/20"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundColor: card.hex,
                  }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColorReveal({ colorId }: { colorId: string }) {
  const card = colorCards.find((c) => c.id === colorId);
  if (!card) return null;

  return (
    <>
      <motion.div
        className="overflow-hidden rounded-2xl"
        style={{
          width: "100px",
          height: "150px",
          backgroundColor: card.hex,
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      <motion.p
        className="mt-6 text-2xl font-light tracking-wide"
        style={{ ...cormorant, color: TEXT_PRIMARY }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {card.name}
      </motion.p>
    </>
  );
}
