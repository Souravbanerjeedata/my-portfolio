import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { MapPin, Search, RotateCw, Eye } from "lucide-react";
import { useVisitor } from "@/context/VisitorContext";
import { useTheme } from "@/components/theme-provider";

const HEADLINE_TITLES = ["Full Stack Developer", "App Developer"];

const COVER = {
  dark: "/images/cover-dark.jpg",
  light: "/images/cover-light.jpg",
} as const;

export function Hero({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { count, isLoading } = useVisitor();
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

  // Preload both covers so theme toggle is instant
  useEffect(() => {
    [COVER.dark, COVER.light].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <Shell className="overflow-hidden">
        <div className="relative isolate">
          {/* Cover background — theme-aware */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              key={coverSrc}
              src={coverSrc}
              alt=""
              aria-hidden
              className="h-full w-full object-cover object-center"
            />
            {/* Readability overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-[var(--bg)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
          </div>

          {/* Identity content over cover */}
          <div className="relative z-10 px-6 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-36">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-end sm:text-left"
            >
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:text-left">
                <div
                  onClick={handleNextImage}
                  className="group relative grid size-[96px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-2xl border-2 border-white/30 bg-[var(--chip)] shadow-xl select-none ring-2 ring-[var(--accent)]/40 sm:size-[104px]"
                  title="Click to change profile image"
                >
                  <img
                    src={site.profileImages[imgIndex]}
                    alt={site.name}
                    loading="eager"
                    decoding="async"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-1.5 top-1.5 z-20 cursor-pointer rounded-full border border-white/20 bg-black/50 p-1 text-white/80 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Switch profile image"
                  >
                    <RotateCw size={11} strokeWidth={2} />
                  </button>
                </div>

                <div className="pb-1">
                  <h1 className="text-display text-[2rem] text-white drop-shadow-md sm:text-[2.65rem]">
                    {site.name}
                  </h1>
                  <div className="mt-1.5 h-[22px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={headlineIndex}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -14, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="font-medium text-[15px] text-[var(--accent)]"
                      >
                        {HEADLINE_TITLES[headlineIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-[12.5px] text-white/75 sm:justify-start">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} className="text-white/60" />
                      {site.location}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Eye size={12} className="text-white/60" />
                      {isLoading ? "…" : `${count?.toLocaleString() ?? "—"} views`}
                    </span>
                  </div>
                </div>
              </div>

              {onOpenPalette && (
                <button
                  type="button"
                  onClick={onOpenPalette}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-2 text-[12px] text-white/80 backdrop-blur-md transition-all hover:border-white/40 hover:text-white"
                >
                  <Search size={13} />
                  <span className="font-mono text-[11px]">⌘K</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </Shell>
    </>
  );
}
