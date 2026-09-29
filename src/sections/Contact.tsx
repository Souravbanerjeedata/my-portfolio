import { useState } from "react";
import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    let didCopy = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(site.email);
        didCopy = true;
      } catch {
        // Fall back for browsers that expose the API but block clipboard writes.
      }
    }
    if (!didCopy) {
      const input = document.createElement("textarea");
      input.value = site.email;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.append(input);
      input.select();
      try {
        didCopy = document.execCommand("copy");
      } catch {
        didCopy = false;
      } finally {
        input.remove();
      }
    }
    if (!didCopy) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
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
          className="relative grid gap-6 overflow-hidden rounded-[1.5rem] border border-[var(--accent-border)] bg-[var(--accent)] p-5 text-[var(--bg)] shadow-[var(--glow)] sm:gap-8 sm:rounded-[1.75rem] sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12"
        >
          <div className="relative">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] opacity-65">Have a good problem?</p>
            <h3 className="mt-3 max-w-xl font-serif text-[2.5rem] font-bold leading-[0.98] tracking-[-0.06em] sm:mt-4 sm:text-6xl">Let&apos;s make it<br className="hidden sm:block" /> work beautifully.</h3>
            <p className="mt-5 max-w-lg text-[14px] leading-relaxed opacity-75 sm:text-[15px]">
              Open to internships and junior full-stack / React Native roles. If you have something interesting, say hello.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-2.5 lg:max-w-[350px] lg:justify-end">
            <motion.a
              whileHover={{ y: -2 }}
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              title={`Email ${site.email}`}
              className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-full bg-[var(--bg)] px-4 py-2.5 text-[12px] font-semibold text-[var(--fg)] shadow-lg transition-transform hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-[13px]"
            >
              <Mail size={14} />
              <span className="min-w-0 break-all">{site.email}</span>
              <ArrowUpRight size={14} />
            </motion.a>

            <button
              type="button"
              onClick={copyEmail}
              aria-live="polite"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--bg)]/20 bg-[var(--bg)]/5 px-4 py-3 text-[13px] font-medium text-[var(--bg)] transition-colors hover:bg-[var(--bg)]/10"
            >
              {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy email"}
            </button>

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
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bg)]/20 bg-[var(--bg)]/5 px-4 py-3 text-[13px] font-medium text-[var(--bg)] transition-colors hover:bg-[var(--bg)]/10"
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
