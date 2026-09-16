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

function TechMarquee() {
  const { theme } = useTheme();
  const mode = theme === "light" ? "light" : "dark";
  const skills = [...site.skills, ...site.skills];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black/25 backdrop-blur-sm">
      <div className="tech-marquee flex w-max gap-3 py-3">
        {skills.map((skill, i) => {
          const { icon, className } = getSkillIcon(skill, mode);
          return (
            <span
              key={`${skill}-${i}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[12px] text-white/85"
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
  const coverSrc = theme === "light" ? COVER.light : COVER.dark;

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-black/35" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between pt-14">
        <Shell className="flex flex-1 flex-col px-4 pt-10 sm:px-8 sm:pt-16">
          {/* Two-column: copy LEFT · profile RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16"
          >
            {/* LEFT — text */}
            <div className="w-full max-w-xl text-center md:text-left">
              <h1 className="text-display text-[2rem] font-bold tracking-tight text-white drop-shadow-lg sm:text-[2.75rem] lg:text-[3.15rem]">
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
                <span className="inline-flex items-center gap-1.5 text-[13px] text-white/70">
                  <MapPin size={14} className="text-white/50" />
                  {site.location}
                </span>
                <a
                  href={site.socials.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] font-medium text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/20"
                >
                  <FileText size={13} />
                  Resume
                </a>
              </div>

              <p className="mt-8 text-[14.5px] leading-relaxed text-white/75 sm:text-[15.5px]">
                {site.tagline}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {site.tldr.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-white/65"
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

            {/* RIGHT — large profile photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              onClick={handleNextImage}
              className="group relative grid size-[160px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-[1.75rem] border-2 border-white/30 bg-[var(--chip)] shadow-[0_0_60px_rgba(167,139,250,0.35)] select-none ring-2 ring-[var(--accent)]/45 sm:size-[200px] md:size-[220px] lg:size-[260px]"
              title="Click to change profile image"
            >
              <img
                src={site.profileImages[imgIndex]}
                alt={site.name}
                loading="eager"
                decoding="async"
                className="pointer-events-none h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2.5 top-2.5 z-20 cursor-pointer rounded-full border border-white/20 bg-black/55 p-1.5 text-white/80 backdrop-blur-sm transition-all hover:scale-110 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Switch profile image"
              >
                <RotateCw size={13} strokeWidth={2} />
              </button>
            </motion.div>
          </motion.div>
        </Shell>

        <div className="mt-auto w-full pb-6 pt-10 sm:pb-8 sm:pt-14">
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
