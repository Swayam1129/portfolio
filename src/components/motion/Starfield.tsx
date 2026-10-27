"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; pz: number; hue: number };

/**
 * A canvas starfield, a nod to the Galaga engine. Stars drift toward you,
 * lean with the cursor, stretch into streaks when you scroll fast, and
 * jump to hyperspace when `warp` is true. Static stars for reduced motion.
 */
export function Starfield({ warp = false, density = 1, className = "" }: { warp?: boolean; density?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpRef = useRef(warp);
  useEffect(() => {
    warpRef.current = warp;
  }, [warp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Accent-coloured stars follow the site's --accent-rgb, so a re-theme changes them too.
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "79, 227, 178";

    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let stars: Star[] = [];
    let speed = 0.6, target = 0.6;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let lastY = window.scrollY;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(420, (w * h) / 4200) * density);
      stars = Array.from({ length: count }, () => spawn(true));
    };
    const spawn = (anyDepth: boolean): Star => {
      const z = anyDepth ? Math.random() * w : w;
      return { x: (Math.random() - 0.5) * w * 2, y: (Math.random() - 0.5) * h * 2, z, pz: z, hue: Math.random() < 0.12 ? 1 : 0 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const cx = w / 2 + mouse.x * 40;
      const cy = h / 2 + mouse.y * 30;

      // Scroll velocity feeds the warp; it eases back to a gentle drift.
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      // Inside the pinned hero, launch progress (--p) drives the warp directly.
      const launch = canvas.closest<HTMLElement>(".launch");
      const lp = launch ? parseFloat(launch.style.getPropertyValue("--p")) || 0 : 0;
      target = warpRef.current ? 38 : 0.6 + Math.min(dy * 0.35, 18) + lp * lp * 34;
      speed += (target - speed) * (warpRef.current ? 0.04 : 0.08);

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 1) Object.assign(s, spawn(false));
        const k = w / 2 / s.z;
        const pk = w / 2 / s.pz;
        const x = s.x * k + cx, y = s.y * k + cy;
        const px = s.x * pk + cx, py = s.y * pk + cy;
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) { Object.assign(s, spawn(false)); continue; }
        const depth = 1 - s.z / w;
        const size = Math.max(0.4, depth * 2.2);
        const alpha = Math.min(1, depth * 1.4);
        ctx.strokeStyle = s.hue ? `rgba(${accent},${alpha})` : `rgba(236,234,228,${alpha})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x + 0.1, y + 0.1);
        ctx.stroke();
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const k = w / 2 / s.z;
        const x = s.x * k + w / 2, y = s.y * k + h / 2;
        const depth = 1 - s.z / w;
        ctx.fillStyle = s.hue ? `rgba(${accent},0.8)` : `rgba(236,234,228,${Math.min(1, depth * 1.4)})`;
        ctx.fillRect(x, y, Math.max(1, depth * 2), Math.max(1, depth * 2));
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
    });
    io.observe(canvas);
    if (reduce) drawStatic(); else raf = requestAnimationFrame(draw);
    const onResize = () => { resize(); if (reduce) drawStatic(); };
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`starfield ${className}`} aria-hidden="true" />;
}
