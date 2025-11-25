'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

const BEIGE_BG = '#f6e8d2'; // light beige, background
const MAIN_RED = '#942629';

interface RGB {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: string): RGB => {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? {
        r: parseInt(res[1], 16),
        g: parseInt(res[2], 16),
        b: parseInt(res[3], 16),
      }
    : { r: 148, g: 38, b: 41 }; // fallback to #942629
};

const MeshGradientExactish = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const red = hexToRgb(MAIN_RED);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      // Full viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;

      width = vw;
      height = vh;
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let frameCount = 0;
    let markedReady = false;

    const fps = 30;
    const frameInterval = 1000 / fps;
    let lastFrameTime = performance.now();

    const renderFrame = () => {
      if (!width || !height) return;

      const w = width;
      const h = height;

      // === Background (beige + very soft light at top) =====================
      ctx.fillStyle = BEIGE_BG;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      const topGlow = ctx.createRadialGradient(
        w * 0.55,
        h * 0.02,
        0,
        w * 0.55,
        h * 0.02,
        Math.max(w, h) * 0.9,
      );
      topGlow.addColorStop(0, 'rgba(255, 244, 228, 0.95)');
      topGlow.addColorStop(0.5, 'rgba(246, 232, 210, 0.55)');
      topGlow.addColorStop(1, 'rgba(246, 232, 210, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // === Red wave ========================================================
      const centerY = h * 0.63;      // baseline of the band
      const thickness = h * 0.9;     // band thickness
      const amp = h * 0.16;          // wave amplitude
      const tilt = h * 0.18;         // how much it rises to the right

      // vertical gradient inside the band
      const gradTop = centerY - thickness / 2;
      const gradBottom = centerY + thickness / 2;
      const bandGradient = ctx.createLinearGradient(0, gradTop, 0, gradBottom);

      const darkerR = Math.round(red.r * 0.65);
      const darkerG = Math.round(red.g * 0.65);
      const darkerB = Math.round(red.b * 0.65);

      const midR = red.r;
      const midG = red.g;
      const midB = red.b;

      const lightR = Math.round(red.r + (255 - red.r) * 0.16);
      const lightG = Math.round(red.g + (255 - red.g) * 0.12);
      const lightB = Math.round(red.b + (255 - red.b) * 0.08);

      bandGradient.addColorStop(
        0,
        `rgba(${darkerR}, ${darkerG}, ${darkerB}, 0.96)`,
      );
      bandGradient.addColorStop(
        0.28,
        `rgba(${midR}, ${midG}, ${midB}, 0.98)`,
      );
      bandGradient.addColorStop(
        0.6,
        `rgba(${lightR}, ${lightG}, ${lightB}, 0.98)`,
      );
      bandGradient.addColorStop(
        1,
        `rgba(${midR}, ${midG}, ${midB}, 0.96)`,
      );

      ctx.save();
      ctx.filter = 'blur(40px)';

      const samples = 90;
      const leftExtra = -w * 0.25;
      const rightExtra = w * 1.15;
      const step = (rightExtra - leftExtra) / (samples - 1);

      const topPoints: { x: number; y: number }[] = [];
      const bottomPoints: { x: number; y: number }[] = [];

      for (let i = 0; i < samples; i++) {
        const x = leftExtra + step * i;
        const tNorm = i / (samples - 1); // 0..1

        // curve shape: low on left, rises slightly to the right
        const tiltOffset = (tNorm - 0.3) * tilt;

        // S-shape + subtle breathing motion
        const wavePhase = tNorm * Math.PI * 1.1 + time * 0.5;
        const yOffset =
          Math.sin(wavePhase) * amp +
          Math.sin(wavePhase * 0.55 - time * 0.3) * amp * 0.35;

        const midY = centerY + tiltOffset + yOffset;

        const topY = midY - thickness / 2;
        const bottomY = midY + thickness / 2;

        topPoints.push({ x, y: topY });
        bottomPoints.push({ x, y: bottomY });
      }

      ctx.beginPath();
      // top edge
      ctx.moveTo(topPoints[0].x, topPoints[0].y);
      for (let i = 1; i < topPoints.length - 1; i++) {
        const p = topPoints[i];
        const next = topPoints[i + 1];
        const xc = (p.x + next.x) / 2;
        const yc = (p.y + next.y) / 2;
        ctx.quadraticCurveTo(p.x, p.y, xc, yc);
      }

      // bottom edge (reverse)
      const reversedBottom = [...bottomPoints].reverse();
      for (let i = 0; i < reversedBottom.length - 1; i++) {
        const p = reversedBottom[i];
        const next = reversedBottom[i + 1];
        const xc = (p.x + next.x) / 2;
        const yc = (p.y + next.y) / 2;
        ctx.quadraticCurveTo(p.x, p.y, xc, yc);
      }

      ctx.closePath();
      ctx.fillStyle = bandGradient;
      ctx.fill();
      ctx.restore();

      frameCount += 1;
      if (!markedReady && frameCount >= 1) {
        markedReady = true;
        setIsReady(true);
      }

      if (!prefersReducedMotion) {
        time += 0.02; // slow, gentle motion
      }
    };

    const loop = () => {
      const now = performance.now();
      const delta = now - lastFrameTime;

      if (prefersReducedMotion) {
        if (!markedReady) renderFrame();
        animationFrameRef.current = null;
        return;
      }

      if (delta >= frameInterval) {
        lastFrameTime = now;
        renderFrame();
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    if (!prefersReducedMotion) {
      animationFrameRef.current = requestAnimationFrame(loop);
    } else {
      renderFrame();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 0,
        backgroundColor: BEIGE_BG,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </Box>
  );
};

export default MeshGradientExactish;
