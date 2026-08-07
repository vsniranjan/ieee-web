import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Bands 2-5 (field work, what IEEE is, why join, close) are next.
          Placeholder scroll room so the hero's parallax is testable. */}
      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <p className="text-sm text-ink-muted">Next: the field work band.</p>
      </section>
    </main>
  );
}
