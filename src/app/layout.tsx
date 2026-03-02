import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "I Feel Seen",
  description: "Choose an experience. Discover something true about where you are right now.",
  keywords: [
    "I feel seen",
    "feeling lost and unknown",
    "feeling unseen",
    "card reading without divination",
    "encouraging words for hard times",
    "meaningful reflection",
    "stoic encouragement",
    "wisdom for hard seasons",
    "feeling understood",
    "card draw reflection",
  ],
  openGraph: {
    title: "I Feel Seen",
    description: "Choose an experience. Discover something true about where you are right now.",
    type: "website",
    url: "https://ifeelseen.ai",
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
    description: "Choose an experience. Discover something true about where you are right now.",
    images: ["https://ifeelseen.ai/card-back-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${cormorant.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
