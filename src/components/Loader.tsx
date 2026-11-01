  import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Keep the intro visible long enough to read, even when reduced motion is on.
    const duration = 3400;
    const start = performance.now();
    let frame = 0;
    let exitTimer = 0;
    let doneTimer = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Let the completed state land before revealing the page beneath it.
        exitTimer = window.setTimeout(() => {
          setExiting(true);
          doneTimer = window.setTimeout(onDone, 650);
        }, 800);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone, reduceMotion]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="portfolio-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[#0b1113] px-6 py-7 text-[#e8efeb] sm:px-10 sm:py-9"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 48% 44% at 50% 48%, rgba(86,150,135,.13), transparent 75%), radial-gradient(ellipse 35% 35% at 82% 18%, rgba(135,122,190,.09), transparent 75%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[.16]" style={{ backgroundImage: "linear-gradient(rgba(207,230,224,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(207,230,224,.045) 1px,transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse at center,black,transparent 78%)" }} />

          <header className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full border border-[#a6dfcb]/25 bg-[#a6dfcb]/[.06] font-serif text-sm italic text-[#bcebd8]">S</span>
              <span className="font-mono text-[10px] uppercase tracking-[.2em] text-[#b5c4bf] sm:text-[11px]">Sourav Banerjee</span>
            </div>
            <span className="font-mono text-[10px] tracking-[.16em] text-[#84928e]">PORTFOLIO <span className="text-[#a6dfcb]">/ 2026</span></span>
          </header>

          <main className="relative z-10 flex flex-1 flex-col items-center justify-center py-12">
            <div className="relative grid size-48 place-items-center sm:size-56" aria-hidden="true">
              <motion.div
                className="absolute inset-[7%] rounded-full border border-[#a6dfcb]/15"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute left-[12%] top-[17%] size-2 rounded-full bg-[#bcebd8] shadow-[0_0_18px_rgba(166,223,203,.9)]" />
              </motion.div>
              <motion.div
                className="absolute inset-[20%] rounded-full border border-dashed border-[#b8b6ed]/25"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute -right-1 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#b8b6ed] shadow-[0_0_14px_rgba(184,182,237,.85)]" />
              </motion.div>
              <motion.div
                className="absolute inset-[31%] rounded-full border border-[#a6dfcb]/10 bg-[#12201e]/70 shadow-[0_0_60px_rgba(100,180,155,.12),inset_0_0_30px_rgba(100,180,155,.08)]"
                animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="relative z-10 font-serif text-5xl italic tracking-[-.1em] text-[#e4f1eb] sm:text-6xl"
                initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                SB<span className="text-[#a6dfcb]">.</span>
              </motion.span>
            </div>

            <motion.p
              className="mt-7 font-mono text-[10px] uppercase tracking-[.28em] text-[#a6b7b1] sm:text-[11px]"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Building thoughtful things
            </motion.p>
          </main>

          <footer className="relative z-10 mx-auto flex w-full max-w-4xl items-end justify-between gap-5">
            <div className="w-full max-w-[240px] sm:max-w-xs">
              <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[.16em] text-[#84928e]">
                <span>Entering the portfolio</span>
                <span className="tabular-nums text-[#bcebd8]">{String(progress).padStart(2, "0")}%</span>
              </div>
              <div className="h-px overflow-hidden bg-white/10">
                <motion.div
                  className="h-full origin-left bg-[#a6dfcb] shadow-[0_0_12px_rgba(166,223,203,.65)]"
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.12, ease: "linear" }}
                />
              </div>
            </div>
            <span className="font-mono text-[9px] tracking-[.12em] text-[#667570]">DESIGN <span className="text-[#a6dfcb]/60">×</span> CODE</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
