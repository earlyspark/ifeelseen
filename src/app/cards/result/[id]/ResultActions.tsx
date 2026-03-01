"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResultActions({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/cards/result/${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without clipboard API
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
        className="rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-8 py-2.5 text-base text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
      <Link
        href="/cards"
        className="text-sm text-white/30 underline underline-offset-2 hover:text-white/50"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Draw again
      </Link>
    </div>
  );
}
