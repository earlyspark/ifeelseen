"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const CONSENT_KEY = "cookie-consent";

export default function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as "accepted" | "declined" | null;
    setConsent(stored);
    setMounted(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
  };

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {consent === "accepted" && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {mounted && consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
          <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-[#1a1a1a] p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="text-sm text-white/60">
              This site uses analytics to understand how people find it.{" "}
              <span className="whitespace-nowrap text-white/80">No personal data is stored.</span>
            </p>
            <div className="mt-3 flex shrink-0 gap-3 sm:mt-0">
              <button
                onClick={decline}
                className="min-h-[44px] px-2 text-sm text-white/40 underline underline-offset-2 transition-colors hover:text-white/60"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="min-h-[44px] rounded border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-4 py-2 text-sm font-medium text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
