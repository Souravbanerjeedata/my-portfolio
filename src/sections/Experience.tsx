import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader title="Timeline" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              i > 0 ? "border-t border-[var(--line)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15.5px] font-semibold text-[var(--fg)] flex items-center gap-2">
                {job.role} <span className="text-[var(--soft)]">·</span>{" "}
                <span className="text-[var(--muted)]">{job.company}</span>
                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} className="text-[var(--soft)]" />
                  </a>
                )}
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{job.blurb}</p>
          </motion.div>
        ))}
      </Shell>
    </div>
  );
}
