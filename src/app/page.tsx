import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e0e] px-6 py-16 text-center">
      {/* Hero section with card-back background */}
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
        <p className="relative z-10 mt-4 text-sm text-white/40">
          This is where you are right now.
        </p>
        <Link
          href="/cards"
          className="relative z-10 mt-10 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-8 py-3 text-base tracking-wide text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Begin
        </Link>
      </div>

      {/* Info box */}
      <div className="relative mt-10 w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] px-7 py-6 text-left sm:max-w-lg">
        {/* Card preview fan */}
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

        <p
          className="text-base leading-relaxed text-white/50 sm:text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Draw nine cards — three words, three colors, three objects — without thinking. Then watch what you chose.
        </p>
        <div className="my-4 h-px bg-white/8" />
        <p
          className="text-base leading-relaxed text-white/50 sm:text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          What comes back isn&apos;t a prediction or an affirmation. It&apos;s a reflection about where you are right now.
        </p>
        <div className="my-4 h-px bg-white/8" />
        <p
          className="text-base leading-relaxed text-white/40 sm:text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          For the 2am search. The quiet grief. The present moment that you don&apos;t have words for yet.
        </p>
      </div>
    </main>
  );
}
