import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> boot portfolio.runtime", delay: 0 },
  { text: "> resolve modules …………………… ok", delay: 280 },
  { text: "> hydrate react tree ……………… ok", delay: 520 },
  { text: "> load assets ……………………………… ok", delay: 760 },
  { text: "> ready.", delay: 980 },
];

export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(onDone, 420);
      }
    };
    raf = requestAnimationFrame(tick);

    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06060a]"
          aria-live="polite"
          aria-busy="true"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(167,139,250,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.35) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at center, black 20%, transparent 70%)",
            }}
          />

          <div className="relative w-full max-w-md px-6">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c12] shadow-[0_0_60px_rgba(167,139,250,0.12)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[11px] text-white/40">
                  sourav — zsh
                </span>
              </div>

              <div className="min-h-[132px] space-y-1.5 px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={line.text}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={
                      i === visibleLines - 1 && progress < 100
                        ? "text-[#a78bfa]"
                        : "text-white/65"
                    }
                  >
                    {line.text}
                    {i === visibleLines - 1 && progress < 100 && (
                      <span className="ml-0.5 inline-block h-[1em] w-[0.55ch] animate-pulse bg-[#a78bfa] align-middle" />
                    )}
                  </motion.p>
                ))}
              </div>

              <div className="border-t border-white/10 px-4 py-3">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-white/45">
                  <span>loading</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#a78bfa] transition-[width] duration-75"
                    style={{
                      boxShadow: "0 0 12px rgba(167,139,250,0.55)",
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] tracking-wide text-white/30">
              initializing workspace
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
