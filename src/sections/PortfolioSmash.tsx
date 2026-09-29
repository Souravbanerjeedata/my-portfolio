import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, RotateCcw, X } from "lucide-react";

type Pixel = { x: number; y: number; color: string; alive: boolean };
type Shot = { x: number; y: number; vx: number; vy: number; life: number };
type Debris = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
}

function drawPortfolio(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min((width * 0.68) / 760, (height * 0.82) / 430);
  const pageWidth = 760 * scale;
  const pageHeight = 430 * scale;
  const x = width - pageWidth - 20 * scale;
  const y = Math.max(20 * scale, (height - pageHeight) * 0.36);
  const s = scale;

  ctx.save();
  ctx.shadowColor = "rgba(167, 139, 250, 0.22)";
  ctx.shadowBlur = 26 * s;
  roundedRect(ctx, x, y, pageWidth, pageHeight, 12 * s);
  ctx.fillStyle = "#09090f";
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255,255,255,.18)";
  ctx.lineWidth = Math.max(1, s);
  ctx.stroke();

  const pad = 26 * s;
  const top = y + 36 * s;
  ctx.fillStyle = "#0d0d15";
  ctx.fillRect(x + 1, y + 1, pageWidth - 2, 35 * s);
  ctx.fillStyle = "#f4f4f7";
  ctx.font = `700 ${13 * s}px Arial, sans-serif`;
  ctx.fillText("Sourav.", x + pad, y + 23 * s);
  ctx.font = `${8 * s}px Arial, sans-serif`;
  ctx.fillStyle = "#9b9ba8";
  ctx.textAlign = "right";
  ctx.fillText("HOME     ABOUT     PROJECTS     TIMELINE     CONTACT", x + pageWidth - pad, y + 22 * s);
  ctx.textAlign = "left";

  const portraitX = x + pad;
  const portraitY = top + 30 * s;
  const portraitSize = 112 * s;
  const portrait = ctx.createLinearGradient(portraitX, portraitY, portraitX, portraitY + portraitSize);
  portrait.addColorStop(0, "#f0eef4");
  portrait.addColorStop(1, "#bfc0ca");
  roundedRect(ctx, portraitX, portraitY, portraitSize, portraitSize, 13 * s);
  ctx.fillStyle = portrait;
  ctx.fill();
  ctx.save();
  roundedRect(ctx, portraitX, portraitY, portraitSize, portraitSize, 13 * s);
  ctx.clip();
  ctx.fillStyle = "#28252a";
  ctx.beginPath();
  ctx.ellipse(portraitX + 57 * s, portraitY + 52 * s, 22 * s, 27 * s, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#151418";
  ctx.beginPath();
  ctx.moveTo(portraitX + 25 * s, portraitY + 116 * s);
  ctx.quadraticCurveTo(portraitX + 24 * s, portraitY + 72 * s, portraitX + 56 * s, portraitY + 72 * s);
  ctx.quadraticCurveTo(portraitX + 92 * s, portraitY + 76 * s, portraitX + 94 * s, portraitY + 116 * s);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "#a78bfa";
  ctx.lineWidth = 2 * s;
  roundedRect(ctx, portraitX, portraitY, portraitSize, portraitSize, 13 * s);
  ctx.stroke();

  const textX = portraitX + portraitSize + 24 * s;
  ctx.fillStyle = "#a78bfa";
  ctx.font = `600 ${9 * s}px Arial, sans-serif`;
  ctx.fillText("FULL STACK DEVELOPER · KOLKATA, INDIA", textX, portraitY + 17 * s);
  ctx.fillStyle = "#f4f4f7";
  ctx.font = `700 ${25 * s}px Arial, sans-serif`;
  ctx.fillText("Sourav Banerjee", textX, portraitY + 52 * s);
  ctx.fillStyle = "#aaaab5";
  ctx.font = `${11 * s}px Arial, sans-serif`;
  ctx.fillText("Building practical web and mobile applications.", textX, portraitY + 77 * s);
  ctx.fillText("MERN / PERN stack · React Native · TypeScript", textX, portraitY + 96 * s);

  const sectionY = y + 208 * s;
  ctx.fillStyle = "#f4f4f7";
  ctx.font = `700 ${14 * s}px Arial, sans-serif`;
  ctx.fillText("Selected projects", x + pad, sectionY);
  ctx.fillStyle = "#a78bfa";
  ctx.fillRect(x + pad, sectionY + 9 * s, 38 * s, 2 * s);

  const cardY = sectionY + 23 * s;
  const gap = 11 * s;
  const cardWidth = (pageWidth - pad * 2 - gap * 2) / 3;
  const cardHeight = 118 * s;
  const cards = [
    ["To-Do App", "REAL-TIME TASKS", "#14231f", "#47d6a0"],
    ["Movie Surfing", "DISCOVER WHAT'S NEXT", "#1d1830", "#a78bfa"],
    ["Apple Invites", "GESTURE ANIMATIONS", "#17212e", "#68c8f2"],
  ];
  cards.forEach(([title, subtitle, bg, accent], index) => {
    const cardX = x + pad + (cardWidth + gap) * index;
    roundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 7 * s);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.12)";
    ctx.lineWidth = s;
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.fillRect(cardX + 12 * s, cardY + 14 * s, 21 * s, 3 * s);
    ctx.fillStyle = "#f4f4f7";
    ctx.font = `700 ${11 * s}px Arial, sans-serif`;
    ctx.fillText(title, cardX + 12 * s, cardY + 43 * s);
    ctx.fillStyle = "#a6a6b2";
    ctx.font = `${7 * s}px Arial, sans-serif`;
    ctx.fillText(subtitle, cardX + 12 * s, cardY + 60 * s);
    ctx.fillStyle = "rgba(255,255,255,.13)";
    ctx.fillRect(cardX + 12 * s, cardY + 79 * s, cardWidth * 0.66, 3 * s);
    ctx.fillRect(cardX + 12 * s, cardY + 88 * s, cardWidth * 0.45, 3 * s);
  });
  ctx.restore();
}

export function PortfolioSmash() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shotCount, setShotCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef({ left: false, right: false, jump: false });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let floorY = 0;
    let lastTime = 0;
    let fireTimer = 0;
    let shotTotal = 0;
    let destroyedTotal = 0;
    let totalPixels = 0;
    let active = true;
    let pointerDown = false;
    let pixels: Pixel[] = [];
    let shots: Shot[] = [];
    let debris: Debris[] = [];
    let raf = 0;
    let dpr = 1;
    const keys = new Set<string>();
    const stars = Array.from({ length: 65 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.3 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));
    const pointer = { x: 0, y: 0 };
    const player = { x: 0, y: 0, vx: 0, vy: 0, onGround: true };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      floorY = height - 31;
      player.x = Math.max(34, width * 0.12);
      player.y = floorY;
      player.vx = 0;
      player.vy = 0;
      player.onGround = true;
      pointer.x = width * 0.72;
      pointer.y = height * 0.4;

      const page = document.createElement("canvas");
      page.width = Math.ceil(width);
      page.height = Math.ceil(height);
      const pageCtx = page.getContext("2d");
      if (!pageCtx) return;
      drawPortfolio(pageCtx, width, height);
      const image = pageCtx.getImageData(0, 0, page.width, page.height);
      pixels = [];
      const cell = Math.max(6, Math.round(width / 105));
      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const sx = Math.min(page.width - 1, Math.round(x + cell / 2));
          const sy = Math.min(page.height - 1, Math.round(y + cell / 2));
          const offset = (sy * page.width + sx) * 4;
          const alpha = image.data[offset + 3];
          if (alpha < 20) continue;
          const a = alpha / 255;
          const r = Math.round(image.data[offset] * a + 5 * (1 - a));
          const g = Math.round(image.data[offset + 1] * a + 6 * (1 - a));
          const b = Math.round(image.data[offset + 2] * a + 10 * (1 - a));
          pixels.push({ x, y, alive: true, color: `rgb(${r},${g},${b})` });
        }
      }
      totalPixels = pixels.length;
      destroyedTotal = 0;
      shots = [];
      debris = [];
      setProgress(0);
    };

    const shoot = () => {
      const startX = player.x + 7;
      const startY = player.y - 39;
      const dx = pointer.x - startX;
      const dy = pointer.y - startY;
      const distance = Math.hypot(dx, dy) || 1;
      shots.push({ x: startX, y: startY, vx: (dx / distance) * 850, vy: (dy / distance) * 850, life: 1.5 });
      shotTotal += 1;
      setShotCount(shotTotal);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointerDown = true;
      canvas.setPointerCapture?.(event.pointerId);
      onPointerMove(event);
      shoot();
      fireTimer = 0.14;
    };
    const onPointerUp = () => {
      pointerDown = false;
    };
    const onContextMenu = (event: MouseEvent) => event.preventDefault();
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keys.add(key);
      if ((key === " " || key === "w" || key === "arrowup") && player.onGround) {
        player.vy = -430;
        player.onGround = false;
      }
    };
    const onKeyUp = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const drawPlayer = (time: number) => {
      const shoulderX = player.x + 2;
      const shoulderY = player.y - 38;
      const angle = Math.atan2(pointer.y - shoulderY, pointer.x - shoulderX);
      const running = Math.abs(player.vx) > 18 && player.onGround;
      const leg = running ? Math.sin(time * 0.018) * 8 : 0;
      ctx.save();
      ctx.lineCap = "round";
      ctx.strokeStyle = "#f0eef5";
      ctx.lineWidth = 3.3;
      ctx.beginPath();
      ctx.arc(player.x, player.y - 55, 7.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(player.x, player.y - 47);
      ctx.lineTo(player.x + 1, player.y - 25);
      ctx.moveTo(player.x + 1, player.y - 25);
      ctx.lineTo(player.x - 8 + leg, player.y - 3);
      ctx.moveTo(player.x + 1, player.y - 25);
      ctx.lineTo(player.x + 9 - leg, player.y - 3);
      ctx.moveTo(player.x, player.y - 39);
      ctx.lineTo(shoulderX + Math.cos(angle) * 16, shoulderY + Math.sin(angle) * 16);
      ctx.stroke();
      ctx.strokeStyle = "#a78bfa";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(shoulderX + Math.cos(angle) * 9, shoulderY + Math.sin(angle) * 9);
      ctx.lineTo(shoulderX + Math.cos(angle) * 26, shoulderY + Math.sin(angle) * 26);
      ctx.stroke();
      ctx.fillStyle = "#67e8f9";
      ctx.beginPath();
      ctx.arc(shoulderX + Math.cos(angle) * 28, shoulderY + Math.sin(angle) * 28, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = (time: number) => {
      if (!active) return;
      const delta = Math.min(0.032, (time - (lastTime || time)) / 1000);
      lastTime = time;
      const left = keys.has("a") || keys.has("arrowleft") || inputRef.current.left;
      const right = keys.has("d") || keys.has("arrowright") || inputRef.current.right;
      const jump = keys.has(" ") || keys.has("w") || keys.has("arrowup") || inputRef.current.jump;
      if (jump && player.onGround) {
        player.vy = -430;
        player.onGround = false;
        inputRef.current.jump = false;
      }
      player.vx += ((right ? 235 : 0) - (left ? 235 : 0) - player.vx) * Math.min(1, delta * 12);
      player.x += player.vx * delta;
      player.x = Math.max(18, Math.min(width - 18, player.x));
      player.vy += 1150 * delta;
      player.y += player.vy * delta;
      if (player.y >= floorY) {
        player.y = floorY;
        player.vy = 0;
        player.onGround = true;
      }

      fireTimer -= delta;
      if (pointerDown && fireTimer <= 0) {
        shoot();
        fireTimer = 0.14;
      }

      ctx.clearRect(0, 0, width, height);
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#10101b");
      sky.addColorStop(1, "#050508");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);
      stars.forEach((star) => {
        ctx.globalAlpha = 0.3 + (Math.sin(time * 0.001 + star.phase) + 1) * 0.18;
        ctx.fillStyle = "#ddd5ff";
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      pixels.forEach((pixel) => {
        if (!pixel.alive) return;
        ctx.fillStyle = pixel.color;
        ctx.fillRect(pixel.x, pixel.y, Math.max(2, Math.ceil(width / 100) - 1), Math.max(2, Math.ceil(width / 100) - 1));
      });

      shots = shots.filter((shot) => {
        const previousX = shot.x;
        const previousY = shot.y;
        shot.x += shot.vx * delta;
        shot.y += shot.vy * delta;
        shot.life -= delta;
        let hit = false;
        for (let i = pixels.length - 1; i >= 0; i -= 1) {
          const pixel = pixels[i];
          if (!pixel.alive) continue;
          const size = Math.max(2, Math.ceil(width / 100) - 1);
          const px = pixel.x + size / 2;
          const py = pixel.y + size / 2;
          const segmentX = shot.x - previousX;
          const segmentY = shot.y - previousY;
          const segmentLength = segmentX * segmentX + segmentY * segmentY;
          const projected = segmentLength
            ? Math.max(0, Math.min(1, ((px - previousX) * segmentX + (py - previousY) * segmentY) / segmentLength))
            : 0;
          const closestX = previousX + segmentX * projected;
          const closestY = previousY + segmentY * projected;
          if (Math.hypot(px - closestX, py - closestY) < size * 0.7) {
            hit = true;
            const radius = Math.max(18, width * 0.038);
            for (let j = pixels.length - 1; j >= 0; j -= 1) {
              const target = pixels[j];
              if (!target.alive) continue;
              const tx = target.x + size / 2;
              const ty = target.y + size / 2;
              if (Math.hypot(tx - closestX, ty - closestY) > radius) continue;
              target.alive = false;
              destroyedTotal += 1;
              if (Math.random() < 0.18) {
                debris.push({
                  x: tx,
                  y: ty,
                  vx: (Math.random() - 0.5) * 190,
                  vy: -Math.random() * 180 - 25,
                  size: size * (0.5 + Math.random()),
                  color: target.color,
                  life: 0.65 + Math.random() * 0.5,
                });
              }
            }
            setProgress(totalPixels ? Math.min(100, Math.floor((destroyedTotal / totalPixels) * 100)) : 0);
            break;
          }
        }
        ctx.fillStyle = "#a78bfa";
        ctx.shadowColor = "#a78bfa";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(shot.x, shot.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return !hit && shot.life > 0 && shot.x >= 0 && shot.x <= width && shot.y >= 0 && shot.y <= height;
      });

      debris = debris.filter((bit) => {
        bit.x += bit.vx * delta;
        bit.y += bit.vy * delta;
        bit.vy += 360 * delta;
        bit.life -= delta;
        ctx.globalAlpha = Math.max(0, bit.life);
        ctx.fillStyle = bit.color;
        ctx.fillRect(bit.x, bit.y, bit.size, bit.size);
        ctx.globalAlpha = 1;
        return bit.life > 0;
      });

      ctx.strokeStyle = "rgba(255,255,255,.13)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, floorY + 2);
      ctx.lineTo(width, floorY + 2);
      ctx.stroke();
      ctx.fillStyle = "#11111a";
      ctx.fillRect(0, floorY + 3, width, height - floorY);
      for (let x = -18; x < width + 20; x += 36) {
        ctx.fillStyle = "rgba(255,255,255,.045)";
        ctx.fillRect(x, floorY + 8, 18, 2);
      }
      drawPlayer(time);

      const aimX = pointer.x;
      const aimY = pointer.y;
      ctx.strokeStyle = "rgba(103,232,249,.75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(aimX, aimY, 8, 0, Math.PI * 2);
      ctx.moveTo(aimX - 12, aimY);
      ctx.lineTo(aimX - 5, aimY);
      ctx.moveTo(aimX + 5, aimY);
      ctx.lineTo(aimX + 12, aimY);
      ctx.moveTo(aimX, aimY - 12);
      ctx.lineTo(aimX, aimY - 5);
      ctx.moveTo(aimX, aimY + 5);
      ctx.lineTo(aimX, aimY + 12);
      ctx.stroke();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      inputRef.current = { left: false, right: false, jump: false };
    };
  }, [open]);

  const reset = () => {
    setOpen(false);
    setProgress(0);
    setShotCount(0);
    requestAnimationFrame(() => setOpen(true));
  };

  const hold = (direction: "left" | "right", value: boolean) => {
    inputRef.current[direction] = value;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setProgress(0);
          setShotCount(0);
          setOpen(true);
        }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-2 font-mono text-[11px] font-semibold tracking-wide text-[var(--accent)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] focus-visible:outline-offset-4"
      >
        <Crosshair size={14} aria-hidden="true" />
        SMASH THIS PORTFOLIO
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/85 p-3 backdrop-blur-md sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setOpen(false);
                }}
              >
                <motion.section
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="portfolio-smash-title"
                  className="my-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/15 bg-[#09090e] text-white shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex gap-1.5" aria-hidden="true">
                        <i className="size-2.5 rounded-full bg-[#ff5f57]" />
                        <i className="size-2.5 rounded-full bg-[#febc2e]" />
                        <i className="size-2.5 rounded-full bg-[#28c840]" />
                      </span>
                      <span className="truncate font-mono text-[10px] tracking-wider text-white/50 sm:text-xs">
                        SOURAV.DEV / PIXEL BREACH
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="ml-3 grid size-9 shrink-0 place-items-center rounded-lg text-white/65 transition hover:bg-white/10 hover:text-white focus-visible:outline-offset-2"
                      aria-label="Close game"
                    >
                      <X size={18} />
                    </button>
                  </header>

                  <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-6">
                    <div>
                      <h2 id="portfolio-smash-title" className="text-base font-bold tracking-tight sm:text-lg">
                        Destroy this website
                      </h2>
                      <p className="mt-0.5 text-[11px] text-white/45">
                        {progress === 100 ? "Site destroyed. Hit reset for another round." : "Move, jump, aim, and blast the portfolio into pixels."}
                      </p>
                    </div>
                    <div className="flex min-w-48 flex-1 items-center gap-3 sm:max-w-sm">
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex justify-between font-mono text-[9px] text-white/55">
                          <span>DESTROYED</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.18 }}
                          />
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-[9px] text-white/45">{shotCount} SHOTS</span>
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-2 font-mono text-[9px] text-white/70 transition hover:border-white/25 hover:text-white focus-visible:outline-offset-2"
                      >
                        <RotateCcw size={11} /> Reset
                      </button>
                    </div>
                  </div>

                  <div className="relative bg-[#050508]">
                    <canvas
                      ref={canvasRef}
                      aria-label="Shooter game: move with A and D, jump with Space, aim and hold click to shoot the destructible portfolio"
                      className="block h-[min(58vh,560px)] min-h-[290px] w-full touch-none cursor-none sm:h-[min(65vh,640px)]"
                    />
                    <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/10 bg-black/55 px-2.5 py-2 font-mono text-[9px] leading-5 text-white/60 backdrop-blur sm:left-5 sm:top-5 sm:text-[10px]">
                      <span className="text-white">A / D</span> MOVE<br />
                      <span className="text-white">SPACE</span> JUMP<br />
                      <span className="text-white">AIM + HOLD CLICK</span> FIRE
                    </div>
                    <div className="absolute inset-x-3 bottom-3 flex items-end justify-between sm:hidden">
                      <div className="flex gap-2">
                        {(["left", "right"] as const).map((direction) => (
                          <button
                            key={direction}
                            type="button"
                            onPointerDown={() => hold(direction, true)}
                            onPointerUp={() => hold(direction, false)}
                            onPointerLeave={() => hold(direction, false)}
                            onPointerCancel={() => hold(direction, false)}
                            className="grid size-11 place-items-center rounded-lg border border-white/15 bg-black/65 font-mono text-sm text-white/80 backdrop-blur"
                            aria-label={`Move ${direction}`}
                          >
                            {direction === "left" ? "←" : "→"}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onPointerDown={() => { inputRef.current.jump = true; }}
                        className="h-11 rounded-lg border border-white/15 bg-black/65 px-3 font-mono text-[10px] text-white/80 backdrop-blur"
                      >
                        JUMP
                      </button>
                    </div>
                  </div>

                  <footer className="flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[9px] text-white/40 sm:px-6">
                    <span>THE PORTFOLIO ITSELF IS SAFE</span>
                    <span>PIXEL BREACH SIMULATOR</span>
                  </footer>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
