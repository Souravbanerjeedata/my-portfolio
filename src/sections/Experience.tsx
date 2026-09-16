import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience" className="scroll-mt-28">
      <SectionHeader title="Timeline" />
      <Shell className="px-5 sm:px-6">
        <div className="relative ml-2 border-l border-[var(--line)] pl-6 sm:ml-3 sm:pl-8">
          {site.experience.map((job, i) => (
            <motion.div
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`relative py-6 ${i > 0 ? "" : "pt-2"}`}
            >
              {/* Timeline node */}
              <span className="absolute -left-[1.9rem] top-8 flex size-3.5 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] sm:-left-[2.4rem]">
                <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              </span>

              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)]/60 p-5 transition-colors hover:border-[var(--accent-border)] hover:bg-[var(--card)]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[15.5px] font-semibold text-[var(--fg)]">
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
                  <span className="font-mono text-[11px] text-[var(--soft)]">
                    {job.period}
                  </span>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">
                  {job.blurb}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Shell>
    </div>
  );
}
