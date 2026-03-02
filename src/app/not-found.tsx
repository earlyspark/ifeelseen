import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0e0e0e] px-6 text-center">
      <p
        className="text-sm tracking-[0.2em] text-white/50"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        this page isn&apos;t here
      </p>
      <h1
        className="mt-4 text-4xl font-light tracking-wide text-white sm:text-5xl"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Something got lost.
      </h1>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
        The reflection you&apos;re looking for may have expired, or the link may be broken.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/20 px-8 py-3 text-base tracking-wide text-[#c9a84c] transition-colors hover:bg-[#c9a84c]/30"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Begin again
      </Link>
    </main>
  );
}
