import { useState } from "react";
import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ArrowUpRight, Check, Copy } from "lucide-react";

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div id="contact" className="scroll-mt-28">
      <SectionHeader title="Contact" />
      <Shell className="px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="py-8 sm:py-12"
        >
          <p className="max-w-lg text-[15.5px] leading-relaxed text-[var(--muted)]">
            Open to internships and junior full-stack / React Native roles. If you
            have something interesting, say hello.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -2 }}
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyEmail}
              title={`Email ${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] py-2.5 pl-5 pr-3 text-[13px] font-semibold text-[var(--bg)] shadow-lg shadow-black/20 transition-opacity hover:opacity-90"
            >
              <span className="truncate">{site.email}</span>

              <span className="inline-flex items-center gap-0.5">
                <button
                  type="button"
                  aria-label={copied ? "Email copied" : "Copy email"}
                  title={copied ? "Copied!" : "Copy email"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copyEmail();
                  }}
                  className="grid size-7 place-items-center rounded-full transition-colors hover:bg-black/10 dark:hover:bg-white/15"
                >
                  {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
                </button>
                <span className="grid size-7 place-items-center">
                  <ArrowUpRight size={14} />
                </span>
              </span>
            </motion.a>

            {[
              { label: "LinkedIn", href: site.socials.linkedin },
              { label: "X", href: site.socials.twitter },
              { label: "GitHub", href: site.socials.github },
              ...(site.socials.resume
                ? [{ label: "Resume", href: site.socials.resume }]
                : []),
            ].map((l) => (
              <motion.a
                key={l.label}
                whileHover={{ y: -2 }}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)]/50 px-4 py-2.5 text-[13px] font-medium text-[var(--fg)] backdrop-blur-sm transition-colors hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
              >
                {l.label}
                {l.label === "Resume" && <ArrowUpRight size={14} />}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Shell>
    </div>
  );
}
