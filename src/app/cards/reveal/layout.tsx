import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card Draw | I Feel Seen",
  description: "A reflection is on its way.",
  openGraph: {
    title: "Card Draw | I Feel Seen",
    description: "A reflection is on its way.",
    images: [{ url: "https://ifeelseen.ai/card-back-og.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Card Draw | I Feel Seen",
    description: "A reflection is on its way.",
    images: ["https://ifeelseen.ai/card-back-og.jpg"],
  },
};

export default function RevealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
