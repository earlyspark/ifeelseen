"use client";

import { useState } from "react";
import Link from "next/link";

const ACCENT = "#c47c5a";
const TEXT_SECONDARY = "#5c544a";
const TEXT_MUTED = "#8a8078";

export default function ResultActions({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/quiz/career/result/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleCopyLink}
        className="cursor-pointer rounded-full border px-8 py-2.5 text-base transition-colors hover:opacity-80"
        style={{
          fontFamily: "var(--font-cormorant)",
          borderColor: `${ACCENT}50`,
          backgroundColor: `${ACCENT}20`,
          color: TEXT_SECONDARY,
        }}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      <Link
        href="/quiz/career"
        className="text-sm underline underline-offset-2 transition-opacity hover:opacity-70"
        style={{ fontFamily: "var(--font-cormorant)", color: TEXT_MUTED }}
      >
        Retake quiz
      </Link>
    </div>
  );
}
