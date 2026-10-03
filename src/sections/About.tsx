import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";

export function About() {
  return (
    <div id="about" className="scroll-mt-28">
      <SectionHeader title="About" />
      <Shell className="space-y-5 px-5 py-8 sm:px-8">
        {site.about.map((para, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex gap-3 text-[15px] leading-relaxed text-[var(--muted)]"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
            <p>{para}</p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_0_40px_rgba(167,139,250,0.06)]"
        >
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--accent)]">
            Developer Snapshot
          </p>
          <ul className="grid grid-cols-1 gap-2.5 text-[13px] text-[var(--muted)] sm:grid-cols-2">
            {site.tldr.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Shell>
    </div>
  );
}
