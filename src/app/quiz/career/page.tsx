import type { Metadata } from "next";
import QuizFlow from "./QuizFlow";

export const metadata: Metadata = {
  title: "What Career Should You Pursue? | I Feel Seen",
  description:
    "Still figuring out what you want to be? You\u2019re not alone. Take this quiz to discover your true career archetype and find practical ways to bring more of it into your life \u2014 whatever stage you\u2019re at.",
  keywords: [
    "what career should I pursue",
    "career quiz for adults",
    "what am I meant to do",
    "career change quiz",
    "find your calling quiz",
    "what career fits my personality",
    "career archetype quiz",
    "it's not too late career change",
    "career quiz for mid life",
    "what should I do with my life quiz",
  ],
  openGraph: {
    title: "What Career Should You Pursue? | I Feel Seen",
    description:
      "Answer 14 questions and discover the archetype of work you\u2019re actually built for \u2014 whatever stage you\u2019re at.",
    type: "website",
    url: "https://ifeelseen.ai/quiz/career",
    images: [{ url: "https://ifeelseen.ai/api/og/career" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Career Should You Pursue? | I Feel Seen",
    description:
      "Answer 14 questions and discover the archetype of work you\u2019re actually built for \u2014 whatever stage you\u2019re at.",
    images: ["https://ifeelseen.ai/api/og/career"],
  },
};

export default function CareerQuizPage() {
  return <QuizFlow />;
}
