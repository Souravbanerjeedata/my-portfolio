import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { MapPin, RotateCw, FileText } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";
import { getSkillIcon } from "@/lib/skill-icons";

const HEADLINE_TITLES = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Python Developer",
];

const COVER = {
  dark: "/images/cover-dark.jpg",
  light: "/images/cover-light.jpg",
} as const;

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

export function Hero() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { theme } = useTheme();
  const light = theme === "light";
  const coverSrc = light ? COVER.light : COVER.dark;

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

  useEffect(() => {
    [COVER.dark, COVER.light].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Text / chip colors: crisp white on dark, deep ink on light (no grey wash)
  const titleCls = light
    ? "text-[var(--fg)]"
    : "text-white drop-shadow-lg";
  const mutedCls = light ? "text-[var(--muted)]" : "text-white/70";
  const softCls = light ? "text-[var(--soft)]" : "text-white/50";
  const bodyCls = light ? "text-[var(--muted)]" : "text-white/75";
  const chipCls = light
    ? "border-black/15 bg-white/80 text-[var(--fg)] hover:border-[var(--accent-border)] hover:bg-white"
    : "border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20";

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.img
          key={coverSrc}
          src={coverSrc}
          alt=""
          aria-hidden
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover object-center"
        />
        {/* Theme-aware overlays — no heavy black wash in light mode */}
        {light ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-[var(--bg)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[var(--bg)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/35" />
          </>
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between pt-14">
        <Shell className="flex flex-1 flex-col px-4 pt-10 sm:px-8 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16"
          >
            {/* LEFT — text */}
            <div className="w-full max-w-xl text-center md:text-left">
              <h1
                className={`text-display text-[2rem] font-bold tracking-tight sm:text-[2.75rem] lg:text-[3.15rem] ${titleCls}`}
              >
                {site.name}
              </h1>
              <div className="mt-2 h-[24px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={headlineIndex}
                    initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -18, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.35 }}
                    className="text-[15px] font-semibold text-[var(--accent)] sm:text-[16px]"
                  >
                    {HEADLINE_TITLES[headlineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <span className={`inline-flex items-center gap-1.5 text-[13px] ${mutedCls}`}>
                  <MapPin size={14} className={softCls} />
                  {site.location}
                </span>
                <a
                  href={site.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] font-medium backdrop-blur-md transition-all ${chipCls}`}
                >
                  <FileText size={13} />
                  Resume
                </a>
              </div>

              <p className={`mt-8 text-[14.5px] leading-relaxed sm:text-[15.5px] ${bodyCls}`}>
                {site.tagline}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {site.tldr.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-[13px] ${bodyCls}`}
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {site.status.available && (
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1.5 font-mono text-[11px] text-[var(--accent)]">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  {site.status.availableText}
                </p>
              )}
            </div>

            {/* RIGHT — large profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextImage}
              className={`group relative grid size-[160px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[1.75rem] border-2 bg-[var(--chip)] select-none ring-2 ring-[var(--accent)]/45 sm:size-[200px] md:size-[220px] lg:size-[260px] ${
                light
                  ? "border-[var(--accent)]/40 shadow-[0_0_50px_rgba(109,40,217,0.2)]"
                  : "border-white/30 shadow-[0_0_60px_rgba(167,139,250,0.35)]"
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
                className={`absolute right-2.5 top-2.5 z-20 cursor-pointer rounded-full border p-1.5 backdrop-blur-sm transition-all hover:scale-110 sm:opacity-0 sm:group-hover:opacity-100 ${
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

        <div className="mt-auto w-full pb-6 pt-10 sm:pb-8 sm:pt-14">
          <TechMarquee light={light} />
        </div>
      </div>
    </section>
  );
}
