import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { RotateCw, FileText, ArrowDownRight, Mail } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";
import { getSkillIcon } from "@/lib/skill-icons";

const HEADLINE_TITLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Python Developer",
];

function TechMarquee({ light }: { light: boolean }) {
  const mode = light ? "light" : "dark";
  const skills = [...site.skills, ...site.skills];

  return (
    <div
      className={`relative w-full overflow-hidden border-y backdrop-blur-sm ${
        light
          ? "border-black/10 bg-white/70"
          : "border-white/10 bg-black/25"
      }`}
    >
      <div className="tech-marquee flex w-max gap-3 py-3">
        {skills.map((skill, i) => {
          const { icon, className } = getSkillIcon(skill, mode);
          return (
            <span
              key={`${skill}-${i}`}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[12px] ${
                light
                  ? "border-black/10 bg-white/90 text-[var(--muted)]"
                  : "border-white/15 bg-white/5 text-white/85"
              }`}
            >
              <Icon
                icon={icon}
                width={16}
                height={16}
                className={`size-4 shrink-0 ${className || ""}`}
              />
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function HeroBackdrop({ light }: { light: boolean }) {
  return (
    <div aria-hidden="true" className={`hero-backdrop absolute inset-0 overflow-hidden ${light ? "hero-backdrop-light" : ""}`}>
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />
      <div className="hero-orbit hero-orbit-three" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-crosshair hero-crosshair-one" />
      <div className="hero-crosshair hero-crosshair-two" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]/90" />
    </div>
  );
}

export function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { theme } = useTheme();
  const light = theme === "light";

  const handleNextImage = () => {
    const nextIndex = (imgIndex + 1) % site.profileImages.length;
    setImgIndex(nextIndex);
    window.dispatchEvent(
      new CustomEvent("profileImageChanged", { detail: nextIndex })
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_TITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Text / chip colors: crisp white on dark, deep ink on light (no grey wash)
  const titleCls = light
    ? "text-[var(--fg)]"
    : "text-white drop-shadow-lg";
  const mutedCls = light ? "text-[var(--muted)]" : "text-white/70";
  const bodyCls = light ? "text-[var(--muted)]" : "text-white/75";
  const chipCls = light
    ? "border-black/15 bg-white/80 text-[var(--fg)] hover:border-[var(--accent-border)] hover:bg-white"
    : "border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <HeroBackdrop light={light} />

      <div className="relative z-10 flex flex-1 flex-col justify-between pt-[4.25rem] sm:pt-16">
        <Shell className="flex flex-1 flex-col justify-center px-4 pt-3 sm:px-8 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-1 flex-col justify-center gap-5 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16"
          >
            <div className="order-2 w-full max-w-xl text-left md:order-1">
              <p className={`mb-2 max-w-[calc(100%-6rem)] font-mono text-[8px] font-semibold uppercase tracking-[0.15em] sm:text-[9px] sm:tracking-[0.2em] md:mb-3 md:max-w-none md:text-[10px] md:tracking-[0.24em] ${mutedCls}`}>
                Independent developer <span className="mx-1.5 text-[var(--accent)]">/</span> {site.location}
              </p>
              <h1
                className={`text-display max-w-[calc(100%-5.5rem)] text-[1.8rem] font-bold tracking-tight sm:text-[2.1rem] md:max-w-none md:text-[3.25rem] lg:text-[4.25rem] ${titleCls}`}
              >
                {site.name}
              </h1>
              <div className="mt-1 h-[20px] overflow-hidden md:mt-2 md:h-[24px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={headlineIndex}
                    initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                    className="text-[13px] font-semibold text-[var(--accent)] md:text-[16px]"
                  >
                    {HEADLINE_TITLES[headlineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-2.5 md:mt-4 md:gap-3">
                <a
                  href={site.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md transition-all md:px-3.5 md:py-1.5 md:text-[12px] ${chipCls}`}
                >
                  <FileText size={13} />
                  Resume
                </a>
              </div>

              <p className={`mt-3 max-w-lg text-[13px] leading-relaxed md:mt-8 md:text-[15.5px] ${bodyCls}`}>
                {site.tagline}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 md:mt-6 md:gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-3.5 py-2 text-[11px] font-semibold text-[var(--bg)] transition-transform hover:-translate-y-0.5 md:px-4 md:py-2.5 md:text-[12px]"
                >
                  Explore projects <ArrowDownRight size={15} />
                </a>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold backdrop-blur-md transition-all md:px-4 md:py-2.5 md:text-[12px] ${chipCls}`}
                >
                  Get in touch <Mail size={14} />
                </a>
              </div>

              <div className={`mt-7 hidden grid-cols-3 divide-x border-t pt-4 text-left md:grid ${light ? "divide-black/10 border-black/10" : "divide-white/15 border-white/15"}`}>
                {[
                  ["3.5+", "years building"],
                  ["Web +", "mobile apps"],
                  ["MERN", "core stack"],
                ].map(([value, label]) => (
                  <div key={label} className="px-2 first:pl-0 md:px-4">
                    <p className="font-mono text-base font-semibold text-[var(--accent)] sm:text-lg">{value}</p>
                    <p className={`mt-1 text-[10px] sm:text-[11px] ${mutedCls}`}>{label}</p>
                  </div>
                ))}
              </div>

              {site.status.available && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[9px] text-[var(--accent)] md:mt-6 md:px-3 md:py-1.5 md:text-[11px]">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  {site.status.availableText}
                </p>
              )}
            </div>

            {/* Compact portrait lockup on mobile; full portrait at desktop widths. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextImage}
              className={`absolute right-0 top-0 z-10 group grid size-[82px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[1.25rem] border-2 bg-[var(--chip)] select-none ring-2 ring-[var(--accent)]/35 md:relative md:order-2 md:size-[220px] md:rounded-[1.75rem] md:ring-[var(--accent)]/45 lg:size-[260px] ${
                light
                  ? "border-[var(--accent)]/40 shadow-[0_0_50px_color-mix(in_srgb,var(--accent)_28%,transparent)]"
                  : "border-white/30 shadow-[0_0_60px_color-mix(in_srgb,var(--accent)_32%,transparent)]"
              }`}
              title="Click to change profile image"
            >
              <img
                src={site.profileImages[imgIndex]}
                alt={site.name}
                loading="eager"
                decoding="async"
                className="pointer-events-none h-full w-full object-cover"
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  light ? "from-black/15" : "from-black/35"
                }`}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className={`profile-switch absolute right-2.5 top-2.5 z-20 cursor-pointer rounded-full border p-1.5 backdrop-blur-sm transition-all hover:scale-110 ${
                  light
                    ? "border-black/15 bg-white/80 text-[var(--fg)]"
                    : "border-white/20 bg-black/55 text-white/80 hover:text-white"
                }`}
                aria-label="Switch profile image"
              >
                <RotateCw size={13} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        </Shell>

        <Shell className="mt-auto w-full px-4 pb-3 pt-3 sm:px-8 sm:pb-6 sm:pt-6 md:pb-8 md:pt-8">
          <div className={`overflow-hidden rounded-2xl border shadow-[var(--glow)] backdrop-blur-md ${light ? "border-[var(--accent-border)] bg-white/60" : "border-white/15 bg-[#090c0b]/55"}`}>
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-3 py-1.5 sm:px-5 sm:py-2.5">
              <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">Toolkit / always evolving</span>
              <span className="ml-auto font-mono text-[9px] text-[var(--soft)]">01 — 08</span>
            </div>
            <TechMarquee light={light} />
          </div>
        </Shell>
      </div>
    </section>
  );
}
