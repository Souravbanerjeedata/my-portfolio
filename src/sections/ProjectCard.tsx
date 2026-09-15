import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--chip)]">
        {p.image && !imgError ? (
          <img
            src={p.image}
            alt={`${p.title} preview`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--chip)] to-[var(--bg)] px-6">
            <span className="text-display text-2xl text-[var(--muted)]">{p.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent opacity-80" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.links.live ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          ) : p.status ? (
            <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-200 backdrop-blur-md">
              {p.status}
            </span>
          ) : null}
          {p.featured && (
            <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)] backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[17px] font-semibold tracking-tight text-[var(--fg)]">
            {p.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-[var(--soft)]">
            {p.year}
          </span>
        </div>

        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">
          {p.blurb}
        </p>

        {p.story && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowDetails((s) => !s)}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
            >
              {showDetails ? "Hide engineering details" : "Show engineering details"}
              {showDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 space-y-1.5 rounded-xl border border-[var(--line)] bg-[var(--chip)]/70 p-3.5 text-[12.5px] leading-relaxed text-[var(--muted)]">
                    {p.story.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
          <div className="flex flex-wrap gap-1.5">
            {p.stack.slice(0, 5).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {p.stack.length > 5 && (
              <span className="chip">+{p.stack.length - 5}</span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]">
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} live site`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                <Globe className="size-4" />
              </a>
            )}
            {p.links.source && (
              <a
                href={p.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} repository`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                <GitHubIcon className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
