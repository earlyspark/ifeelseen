import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Draw | I Feel Seen",
  description:
    "Draw six cards without thinking — two words, two colors, two objects — and receive a personal reflection written for your exact combination. Share it or come back to it later.",
  keywords: [
    "self reflection activity",
    "what am I feeling right now",
    "personal insight quiz",
    "interactive self discovery",
    "AI personal reflection",
    "AI tarot reading",
    "feeling stuck and need perspective",
    "creative self reflection tool",
    "card draw personality",
  ],
  openGraph: {
    title: "Card Draw | I Feel Seen",
    description:
      "Draw six cards and receive a personal reflection on where you are right now.",
    type: "website",
    url: "https://ifeelseen.ai/cards",
    images: [{ url: "https://ifeelseen.ai/card-back-og.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Draw | I Feel Seen",
    description:
      "Draw six cards and receive a personal reflection on where you are right now.",
    images: ["https://ifeelseen.ai/card-back-og.jpg"],
  },
};

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
