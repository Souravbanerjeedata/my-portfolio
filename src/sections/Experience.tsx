import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience" className="scroll-mt-28">
      <SectionHeader title="Timeline" />
      <Shell className="px-5 py-5 sm:px-8 sm:py-8">
        <div className="relative ml-2 border-l border-[var(--line)] sm:ml-3">
          {site.experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative pb-10 pl-8 sm:pl-12 ${i > 0 ? "pt-2" : "pt-0"}`}
            >
              {/* Timeline node */}
              <span className="absolute -left-[5px] top-2 flex size-[11px] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_12px_var(--accent-soft)]">
                <span className="size-1 rounded-full bg-[var(--accent)]" />
              </span>

              <div className="grid gap-2 md:grid-cols-[150px_1fr] md:gap-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">{job.period}</p>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">
                    {job.role}
                    <span className="text-[var(--soft)]"> · </span>
                    <span className="font-medium text-[var(--muted)]">{job.company}</span>
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex align-middle text-[var(--soft)] transition-colors hover:text-[var(--accent)]"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-[var(--muted)]">
                    {job.blurb}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Shell>
    </div>
  );
}
