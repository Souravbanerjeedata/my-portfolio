import React from "react";
import { motion } from "framer-motion";

export function Shell({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-5xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({
  title,
  aside,
  id,
}: {
  title: string;
  aside?: React.ReactNode;
  id?: string;
}) {
  const sectionIndex: Record<string, string> = {
    About: "01 / THE BACKGROUND",
    "Selected work": "02 / PROJECTS",
    Projects: "02 / PROJECTS",
    Timeline: "03 / EXPERIENCE",
    "Tech Stack": "04 / TOOLKIT",
    "GitHub Activity": "05 / CONSISTENCY",
    Contact: "06 / NEXT CHAPTER",
  };
  return (
    <div id={id} className="relative w-full scroll-mt-28">
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-wrap items-end justify-between gap-5 px-5 pb-5 pt-5 sm:px-8 sm:pb-7 sm:pt-8"
        >
          <div>
            <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] sm:text-[10px]">
              {sectionIndex[title] || "PORTFOLIO / SOURAV BANERJEE"}
            </p>
            <h2 className="section-title text-[var(--fg)]">{title}</h2>
          </div>
          {aside}
        </motion.div>
        <div className="mx-5 h-px bg-gradient-to-r from-[var(--accent)]/70 via-[var(--accent)]/25 to-transparent sm:mx-8" />
      </Shell>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative mx-auto my-3 max-w-5xl px-5 sm:my-4 sm:px-8" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-6 -translate-y-1/2 bg-[var(--accent)]/15 blur-2xl" />
    </div>
  );
}

export function GapBand({
  h = "h-4",
  className = "",
}: {
  h?: string;
  className?: string;
}) {
  return <div className={`relative w-full ${h} ${className}`} />;
}

/** Wrapper for standalone routes so headings clear the fixed nav */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[70vh] pb-16 pt-24 sm:pt-28">{children}</div>;
}
