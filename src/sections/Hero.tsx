import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { MapPin, Search, RotateCw, Eye } from "lucide-react";
import { useVisitor } from "@/context/VisitorContext";

const HEADLINE_TITLES = ["Full Stack Developer", "App Developer"];

export function Hero({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const { count, isLoading } = useVisitor();

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

  return (
    <>
      {/* Identity */}
      <Shell className="px-6 pb-7 pt-8 sm:px-8 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:items-center sm:text-left"
        >
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <div
              onClick={handleNextImage}
              className="group relative grid size-[88px] shrink-0 cursor-pointer place-items-center overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--chip)] shadow-lg select-none ring-2 ring-[var(--accent)]/20"
              title="Click to change profile image"
            >
              <img
                src={site.profileImages[imgIndex]}
                alt={site.name}
                loading="eager"
                decoding="async"
                className="pointer-events-none h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-1.5 top-1.5 z-20 cursor-pointer rounded-full border border-[var(--line)] bg-[var(--card)]/90 p-1 text-[var(--muted)] shadow-sm transition-all hover:scale-110 hover:text-[var(--fg)] sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Switch profile image"
              >
                <RotateCw size={11} strokeWidth={2} />
              </button>
            </div>

            <div>
              <h1 className="text-display text-[2rem] text-[var(--fg)] sm:text-[2.65rem]">
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
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-[12.5px] text-[var(--muted)] sm:justify-start">
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} className="text-[var(--soft)]" />
                  {site.location}
                </span>
                <span className="text-[var(--line)]">·</span>
                <span className="inline-flex items-center gap-1">
                  <Eye size={12} className="text-[var(--soft)]" />
                  {isLoading ? "…" : `${count?.toLocaleString() ?? "—"} views`}
                </span>
              </div>
            </div>
          </div>

          {onOpenPalette && (
            <button
              type="button"
              onClick={onOpenPalette}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--chip)] px-3.5 py-2 text-[12px] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--fg)]"
            >
              <Search size={13} />
              <span className="font-mono text-[11px]">⌘K</span>
            </button>
          )}
        </motion.div>
      </Shell>
    </>
  );
}
