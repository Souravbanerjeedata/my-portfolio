import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

export function About() {
  return (
    <div id="about" className="scroll-mt-28">
      <SectionHeader title="About" />
      <Shell className="grid gap-5 px-5 py-8 sm:px-8 lg:grid-cols-[1.3fr_.7fr] lg:gap-10 lg:py-10">
        <div className="space-y-5">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-xl font-medium leading-relaxed tracking-tight text-[var(--fg)] sm:text-2xl"
          >
            {site.about[0]}
          </motion.p>
          <div className="grid gap-4 border-t border-[var(--line)] pt-5 sm:grid-cols-2">
            {site.about.slice(1).map((para, i) => (
              <motion.p
                key={para}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-[14px] leading-relaxed text-[var(--muted)]"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-[var(--accent-border)] bg-[var(--card)] p-5 shadow-[var(--glow)] sm:p-6"
        >
          <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 size-48 rounded-full border border-[var(--accent-border)] opacity-50" />
          <p className="relative font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            A little about me
          </p>
          <p className="relative mt-4 font-serif text-5xl font-bold tracking-[-0.07em] text-[var(--fg)]">3.5<span className="text-[var(--accent)]">+</span></p>
          <p className="relative mt-1 text-sm text-[var(--muted)]">years learning by building</p>
          <ul className="relative mt-6 space-y-3 border-t border-[var(--line)] pt-5 text-[13px] text-[var(--muted)]">
            {site.tldr.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </Shell>
    </div>
  );
}
