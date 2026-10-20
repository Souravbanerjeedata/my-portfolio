import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { RotateCw, FileText, ArrowDownRight, Mail } from "lucide-react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/components/theme-provider";
import { getSkillIcon } from "@/lib/skill-icons";

const HEADLINE_TITLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
];

function TechMarquee() {
  const skills = site.coreSkills;

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/25 backdrop-blur-sm">
      <div className="tech-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {skills.map((skill, i) => {
              const { icon, className } = getSkillIcon(skill, "dark");
              return (
                <span key={`${skill}-${i}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[12px] text-white/85">
                  <Icon icon={icon} width={16} height={16} className={`size-4 shrink-0 ${className || ""}`} />
                  {skill}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
export function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { mode } = useTheme();
  const matrix = mode === "matrix";

  const handleNextImage = () => {
    const nextIndex = (imgIndex + 1) % site.profileImages.length;
    setImgIndex(nextIndex);
    window.dispatchEvent(
      new CustomEvent("profileImageChanged", { detail: nextIndex }),
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_TITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Keep hero copy readable over either the neon video or Matrix canvas.
  const titleCls = "text-white drop-shadow-lg";
  const mutedCls = "text-white/70";
  const bodyCls = "text-white/75";
  const chipCls = "border-white/25 bg-black/25 text-white hover:border-[var(--accent-border)] hover:bg-black/40";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <div className="hero-backdrop absolute inset-0" aria-hidden="true">
        {!matrix && <video className="hero-video" src="/hero-flow.mp4" autoPlay muted loop playsInline preload="metadata" />}
        {!matrix && <div className="hero-color-wash absolute inset-0" />}
      </div>
      <div className="relative z-10 flex flex-1 flex-col justify-between pt-[4.25rem] sm:pt-16">
        <Shell className="flex flex-1 flex-col justify-center px-4 pt-3 sm:px-8 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-1 flex-col justify-center gap-5 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16"
          >
            <div className="order-2 w-full max-w-xl text-center md:order-1 md:text-left">
              <h1
                className={`text-display whitespace-nowrap text-[clamp(1.05rem,5.1vw,2rem)] font-bold leading-[0.94] tracking-[-0.065em] sm:text-[2.5rem] md:text-left md:text-[3rem] lg:text-[4rem] ${titleCls}`}
              >
                {site.name}
              </h1>
              <div className="mt-2 h-[20px] overflow-hidden md:mt-3 md:h-[28px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={headlineIndex}
                    initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                    className="text-[13px] font-semibold tracking-wide text-[var(--muted)] md:text-[17px]"
                  >
                    {HEADLINE_TITLES[headlineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p
                className={`mx-auto mt-3 max-w-lg text-[13px] leading-relaxed md:mx-0 md:mt-5 md:text-[15px] ${bodyCls}`}
              >
                {site.tagline}
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 md:mt-6 md:justify-start md:gap-3">
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
                <a
                  href={site.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-semibold text-white/75 backdrop-blur-md transition-all hover:text-white md:px-4 md:py-2.5 md:text-[12px]"
                >
                  <FileText size={14} /> Resume
                </a>
              </div>

              <div
                className="mt-7 hidden grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-4 text-left md:grid"
              >
                {[
                  ["3.5+", "years building"],
                  ["Web +", "mobile apps"],
                  ["MERN", "core stack"],
                ].map(([value, label]) => (
                  <div key={label} className="px-2 first:pl-0 md:px-4">
                    <p className="font-mono text-base font-semibold text-[var(--accent)] sm:text-lg">
                      {value}
                    </p>
                    <p
                      className={`mt-1 text-[10px] sm:text-[11px] ${mutedCls}`}
                    >
                      {label}
                    </p>
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
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextImage}
              className={`group relative order-1 mx-auto mb-1 grid size-[min(240px,calc(100vw-3.5rem))] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[1.5rem] border-2 bg-[var(--chip)] select-none ring-2 ring-[var(--accent)]/35 md:order-2 md:mb-0 md:mr-6 md:size-[220px] md:rounded-[1.75rem] md:ring-[var(--accent)]/45 lg:mr-10 lg:size-[260px] ${
                "border-white/30 shadow-[0_0_60px_color-mix(in_srgb,var(--accent)_32%,transparent)]"
              }`}
              title="Click to change profile image"
            >
              <img
                src={matrix ? site.matrixProfileImages[imgIndex] : site.profileImages[imgIndex]}
                alt={site.name}
                loading="eager"
                decoding="async"
                className={`pointer-events-none h-full w-full object-cover ${matrix && imgIndex === 1 ? "matrix-photo-filter" : ""}`}
              />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  "from-black/35"
                }`}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className={`profile-switch absolute right-2.5 top-2.5 z-20 cursor-pointer rounded-full border p-1.5 backdrop-blur-sm transition-all hover:scale-110 ${
                  "border-white/20 bg-black/55 text-white/80 hover:text-white"
                }`}
                aria-label="Switch profile image"
              >
                <RotateCw size={13} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        </Shell>

        <Shell className="mt-auto w-full px-4 pb-2 pt-0 sm:px-8 sm:pb-6 sm:pt-3 md:pb-8 md:pt-8">
          <div
            className="overflow-hidden rounded-[1.15rem] border border-white/15 bg-black/35 shadow-[var(--glow)] backdrop-blur-md sm:rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-3 py-1.5 sm:px-5 sm:py-2.5">
              <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-[10px]">
                Core stack
              </span>
              <span className="ml-auto font-mono text-[9px] text-[var(--soft)]">
                01 — 06
              </span>
            </div>
            <TechMarquee />
          </div>
        </Shell>
      </div>
    </section>
  );
}











