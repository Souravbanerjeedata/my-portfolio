import { useEffect, useRef } from "react";

const WAVE_DURATION = 1900;

/** A cascading code wave that seamlessly becomes continuous Matrix rain. */
export function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const glyphs = "ｱｶｻﾀﾅﾊﾏﾔﾗﾜ012345789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let offsets: number[] = [];
    let frame = 0;
    let lastFrame = 0;
    let rainInitialized = reducedMotion;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () => -Math.random() * 45);
      offsets = Array.from({ length: columns }, () => Math.random() * 180);
    };

    const drawStatic = () => {
      context.fillStyle = "#020b05";
      context.fillRect(0, 0, width, height);
      context.font = `500 ${fontSize}px monospace`;
      drops.forEach((_, column) => {
        if (column % 3 === 0) {
          context.fillStyle = "rgba(55, 255, 112, 0.5)";
          context.fillText(glyphs[column % glyphs.length], column * fontSize, (column % 30) * fontSize);
        }
      });
    };

    const draw = (time: number) => {
      if (time - lastFrame < 30) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      context.fillStyle = "rgba(0, 8, 3, 0.16)";
      context.fillRect(0, 0, width, height);
      context.font = `500 ${fontSize}px monospace`;

      const elapsed = time - startedAt;
      if (elapsed < WAVE_DURATION) {
        drops.forEach((_, column) => {
          const x = column * fontSize;
          const head = (elapsed - (x / Math.max(width, 1)) * 560 - offsets[column]) * 0.9;
          if (head < 0 || head > height + fontSize * 18) return;
          for (let trail = 17; trail >= 0; trail -= 1) {
            const y = head - trail * fontSize;
            if (y < 0 || y > height) continue;
            context.fillStyle = trail === 0 ? "#effff1" : `rgba(57, 255, 120, ${Math.max(0.12, 0.88 - trail * 0.045)})`;
            context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x, y);
          }
        });
      } else {
        if (!rainInitialized) {
          drops = drops.map(() => Math.random() * Math.max(height / fontSize, 1));
          rainInitialized = true;
        }
        drops.forEach((drop, column) => {
          const x = column * fontSize;
          const y = drop * fontSize;
          context.fillStyle = Math.random() > 0.975 ? "#eaffef" : "rgba(55, 255, 112, 0.82)";
          context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x, y);
          if (y > height && Math.random() > 0.975) drops[column] = 0;
          else drops[column] += 0.35 + Math.random() * 0.65;
        });
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    if (reducedMotion) drawStatic();
    else frame = window.requestAnimationFrame(draw);
    const handleResize = () => {
      resize();
      if (reducedMotion) drawStatic();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="matrix-rain-canvas pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
