import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Feel Seen",
  description: "A reflection is on its way.",
  openGraph: {
    title: "I Feel Seen",
    description: "A reflection is on its way.",
    images: [
      {
        url: "https://ifeelseen.ai/card-back-og.jpg",
        width: 630,
        height: 630,
        alt: "I Feel Seen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Feel Seen",
    description: "A reflection is on its way.",
    images: ["https://ifeelseen.ai/card-back-og.jpg"],
  },
};

export default function RevealLayout({ children }: { children: React.ReactNode }) {
  return children;
}
