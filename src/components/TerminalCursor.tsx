import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

/**
 * Fast accent cursor: tight-tracking solid dot.
 * Expands into a soft ring only when hovering interactive elements.
 * No laggy outer-ring follower.
 */
export function TerminalCursor() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Near 1:1 tracking — feels instant
  const spring = { damping: 32, stiffness: 700, mass: 0.15 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

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

  // Accent in both themes for a "cool" look
  const core = dark ? "rgb(167, 139, 250)" : "rgb(109, 40, 217)";
  const ring = dark ? "rgba(167, 139, 250, 0.35)" : "rgba(109, 40, 217, 0.3)";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      {/* Hover ring — only when interactive */}
      <motion.div
        className="absolute rounded-full border-2"
        animate={{
          width: hovering ? 36 : 0,
          height: hovering ? 36 : 0,
          marginLeft: hovering ? -18 : 0,
          marginTop: hovering ? -18 : 0,
          opacity: hovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        style={{ borderColor: ring }}
      />
      {/* Core dot — always */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          width: hovering ? 8 : 6,
          height: hovering ? 8 : 6,
          marginLeft: hovering ? -4 : -3,
          marginTop: hovering ? -4 : -3,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          backgroundColor: core,
          boxShadow: dark
            ? "0 0 14px rgba(167, 139, 250, 0.55)"
            : "0 0 12px rgba(109, 40, 217, 0.4)",
        }}
      />
    </motion.div>
  );
}
