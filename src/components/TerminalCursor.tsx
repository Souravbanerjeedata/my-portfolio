import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

/**
 * Soft dual-layer cursor inspired by modern SaaS / document-editor UIs.
 * Outer ring lags; inner dot tracks more tightly.
 * White in dark mode, black in light mode.
 */
export function TerminalCursor() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpring = { damping: 22, stiffness: 140, mass: 0.55 };
  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);

  const dotSpring = { damping: 30, stiffness: 420, mass: 0.25 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      const interactive = !!el?.closest(
        "a, button, [role='button'], input, textarea, select, label, .cursor-pointer"
      );
      setHovering(interactive);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!enabled) return;
    const prev = document.body.style.cursor;
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent =
      'a, button, [role="button"], input, textarea, select, label, .cursor-pointer { cursor: none !important; }';
    document.head.appendChild(style);
    return () => {
      document.body.style.cursor = prev;
      style.remove();
    };
  }, [enabled]);

  if (!enabled) return null;

  const color = dark ? "255, 255, 255" : "15, 15, 15";
  const ringBorder = `rgba(${color}, ${hovering ? 0.55 : 0.35})`;
  const ringBg = `rgba(${color}, ${hovering ? 0.08 : 0.04})`;
  const dotBg = `rgba(${color}, ${hovering ? 0.95 : 0.85})`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            marginLeft: hovering ? -22 : -14,
            marginTop: hovering ? -22 : -14,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            borderColor: ringBorder,
            backgroundColor: ringBg,
            boxShadow: dark
              ? "0 0 0 1px rgba(255,255,255,0.06)"
              : "0 0 0 1px rgba(0,0,0,0.04)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000]"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: hovering ? 6 : 5,
            height: hovering ? 6 : 5,
            marginLeft: hovering ? -3 : -2.5,
            marginTop: hovering ? -3 : -2.5,
          }}
          style={{
            backgroundColor: dotBg,
            boxShadow: dark
              ? "0 0 12px rgba(255,255,255,0.25)"
              : "0 0 10px rgba(0,0,0,0.15)",
          }}
        />
      </motion.div>
    </>
  );
}
