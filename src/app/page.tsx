import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e0e] px-6 py-16 text-center">
      {/* Wordmark */}
      <div className="relative flex flex-col items-center">
        <img
          src="/card-back.jpg"
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-auto -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.15] sm:h-[500px]"
          style={{
            maskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 50% 50% at center, black 20%, transparent 70%)",
          }}
          draggable={false}
        />
        <h1
          className="relative z-10 text-5xl font-light tracking-wide text-white sm:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          I Feel Seen
        </h1>
        <p className="relative z-10 mt-4 text-sm text-white/60">
          Choose what you need today.
        </p>
      </div>

      {/* Experience cards */}
      <div className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">

        {/* Card Draw */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-7 py-6 text-left">
          {/* Mini card fan preview */}
          <div className="mb-6 flex justify-center" style={{ height: "100px" }}>
            <div className="relative" style={{ width: "180px" }}>
              {/* Left card — word "Known" */}
              <div
                className="absolute overflow-hidden rounded border border-white/10"
                style={{
                  width: "60px",
                  height: "84px",
                  left: "10px",
                  top: "10px",
                  transform: "rotate(-8deg)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                <Image src="/card-word-known.svg" alt="Known" fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 pb-1 text-center">
                  <span className="text-[8px] leading-none tracking-wide text-white/80" style={{ fontFamily: "var(--font-cormorant)", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
                    Known
                  </span>
                </div>
              </div>

              {/* Center card — color "Deep Water" */}
              <div
                className="absolute overflow-hidden rounded border border-white/10"
                style={{
                  width: "60px",
                  height: "84px",
                  left: "60px",
                  top: "0px",
                  backgroundColor: "#1A5C5A",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
                  zIndex: 10,
                }}
              >
                <div className="absolute inset-x-0 bottom-0 pb-1 text-center">
                  <span className="text-[8px] leading-none tracking-wide text-white/80" style={{ fontFamily: "var(--font-cormorant)" }}>
                    Deep Water
                  </span>
                </div>
              </div>

              {/* Right card — object "Lantern" */}
              <div
                className="absolute overflow-hidden rounded border border-white/10"
                style={{
                  width: "60px",
                  height: "84px",
                  left: "110px",
                  top: "10px",
                  transform: "rotate(8deg)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                <Image src="/card-lantern.png" alt="Lantern" fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 pb-1 text-center">
                  <span className="text-[8px] leading-none tracking-wide text-white/80" style={{ fontFamily: "var(--font-cormorant)", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}>
                    Lantern
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h2
            className="text-xl font-light tracking-wide text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            I Feel Seen
          </h2>
          <p
            className="mt-3 flex-1 text-base leading-relaxed text-white/50"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Draw six cards — two words, two colors, two objects — and receive a reflection about where you are right now.
          </p>
          <Link
            href="/cards"
            className="mt-6 inline-block rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-6 py-3 text-center text-base tracking-wide text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Begin
          </Link>
        </div>

        {/* Career Quiz */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-7 py-6 text-left">
          {/* Archetype card fan preview */}
          <div className="mb-6 flex justify-center" style={{ height: "100px" }}>
            <div className="relative" style={{ width: "180px" }}>
              {[
                { slug: "creator",   label: "Creator",   left: 10,  top: 10, rotate: -8, z: 1 },
                { slug: "guide",     label: "Guide",     left: 60,  top: 0,  rotate: 0,  z: 10 },
                { slug: "visionary", label: "Visionary", left: 110, top: 10, rotate: 8,  z: 1 },
              ].map(({ slug, label, left, top, rotate, z }) => (
                <div
                  key={slug}
                  className="absolute overflow-hidden rounded border border-white/10"
                  style={{
                    width: "60px",
                    height: "84px",
                    left,
                    top,
                    zIndex: z,
                    transform: `rotate(${rotate}deg)`,
                    boxShadow: rotate === 0 ? "0 4px 12px rgba(0,0,0,0.6)" : "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  <Image src={`/card-career-${slug}.png`} alt={label} fill className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 pb-1 text-center">
                    <span className="text-[8px] leading-none tracking-wide" style={{ fontFamily: "var(--font-cormorant)", color: "#2a2520", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2
            className="text-xl font-light tracking-wide text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            What Career Should You Pursue?
          </h2>
          <p
            className="mt-3 flex-1 text-base leading-relaxed text-white/50"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Answer 14 questions and discover the archetype of work you&apos;re actually built for — whatever stage you&apos;re at.
          </p>
          <Link
            href="/quiz/career"
            className="mt-6 inline-block rounded-full border border-[#c47c5a]/30 bg-[#c47c5a]/20 px-6 py-3 text-center text-base tracking-wide text-[#c47c5a] transition-colors hover:bg-[#c47c5a]/30"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Take the Quiz
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16">
        <a
          href="https://blog.earlyspark.com/p/i-built-an-ai-based-pick-a-card-app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/50 transition-colors hover:text-white/70"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          How this was built
        </a>
      </footer>
    </main>
  );
}
