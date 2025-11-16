'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion, useInView } from 'framer-motion';

interface GradientWaveProps {
  color?: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface WavePoint {
  x: number;
  y: number;
  z: number;
}

const hexToRgb = (hex: string): RGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 148, g: 38, b: 41 }; // fallback to #942629
};

const GradientWave = ({ color = '#942629' }: GradientWaveProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(containerRef as RefObject<Element>, {
    amount: 0.3,
  });

  const [isReady, setIsReady] = useState(false);
  const [showGlass, setShowGlass] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;
    const ctx = context;

    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const isMobileWidth = window.innerWidth <= 768;

    let width = 0;
    let height = 0;
    let xPositions: number[] = [];

    const resizeAndRecalculate = (): void => {
      const rect = canvas.getBoundingClientRect();

      // Reset transform before scaling to avoid compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      width = rect.width;
      height = rect.height;

      const step = isMobileWidth ? 2.2 : 1.5;
      const extra = 100;
      const count = Math.floor(width / step) + extra;

      xPositions = Array.from({ length: count }, (_, i) => i * step - extra / 2);
    };

    resizeAndRecalculate();

    let time = 0;
    let speedPhase = Math.random() * Math.PI * 2;
    let speedFrequency = 0.3 + Math.random() * 0.4;
    let tiltPhase = Math.random() * Math.PI * 2;
    let frameCount = 0;
    let hasMarkedReady = false;

    let surgePosition = Math.random();
    let surgeIntensity = 0;
    let targetSurgeIntensity = 0;
    let surgeCooldown = 0;

    const baseColor = hexToRgb(color);

    const fps = isMobileWidth ? 20 : 30;
    const frameIntervalMs = 1000 / fps;
    let lastFrameTime = performance.now();

    let isCancelled = false;

    const renderFrame = (): void => {
      if (!canvas || width === 0 || height === 0) return;

      const ctxWidth = width;
      const ctxHeight = height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, ctxWidth, ctxHeight);

      const speedModulation = 0.5 + Math.sin(speedPhase) * 0.35;
      const minSpeed = 0.5;
      const maxSpeed = 1.2;
      const currentSpeed = minSpeed + speedModulation * (maxSpeed - minSpeed);

      const tiltAmount = Math.sin(tiltPhase) * 0.08;
      const tiltOffset = tiltAmount * ctxHeight;

      if (surgeCooldown <= 0) {
        if (Math.random() < 0.005) {
          targetSurgeIntensity = 0.4 + Math.random() * 0.6;
          surgePosition = 0.2 + Math.random() * 0.2;
          surgeCooldown = 10 + Math.random() * 10;
        }
      } else {
        surgeCooldown -= 1;
      }

      surgeIntensity += (targetSurgeIntensity - surgeIntensity) * 0.02;

      if (surgeCooldown <= 100) {
        targetSurgeIntensity *= 0.98;
      }

      const centerY = ctxHeight * 0.5;
      const waveThickness = ctxHeight * 0.55;
      const waveAmplitude = ctxHeight * 0.14;
      const waveFrequency = 0.0018;
      const waveSpeed = currentSpeed;

      const topWavePoints: WavePoint[] = [];
      const bottomWavePoints: WavePoint[] = [];
      const centerWavePoints: WavePoint[] = [];

      for (const x of xPositions) {
        const xProgress = (x + 50) / (ctxWidth + 100);

        const diagonalShift = (xProgress - 0.5) * tiltOffset * 2;

        const distanceFromSurge = Math.abs(xProgress - surgePosition);
        const surgeWidth = 0.15;
        const surgeFactor = Math.exp(-Math.pow(distanceFromSurge / surgeWidth, 2));
        const currentSurge = surgeIntensity * surgeFactor;

        const surgedThickness = waveThickness * (1 + currentSurge * 0.8);

        const offsetY =
          Math.sin(x * waveFrequency + time * waveSpeed) * waveAmplitude +
          Math.sin(x * waveFrequency * 0.6 - time * waveSpeed * 0.7) * (waveAmplitude * 0.4) +
          Math.cos(x * waveFrequency * 0.3 + time * waveSpeed * 0.5) * (waveAmplitude * 0.25);

        const depthZ =
          Math.sin(x * waveFrequency * 0.5 + time * waveSpeed * 0.8) * 0.5 +
          Math.cos(x * waveFrequency * 0.8 - time * waveSpeed * 0.6) * 0.3;

        const depthScale = 1 + depthZ * 0.3;
        const depthBrightness = 0.7 + depthZ * 0.3 + currentSurge * 0.2;

        const adjustedCenterY = centerY + diagonalShift;

        const topY = adjustedCenterY - (surgedThickness / 2) * depthScale + offsetY;
        const bottomY = adjustedCenterY + (surgedThickness / 2) * depthScale + offsetY;
        const midY = adjustedCenterY + offsetY;

        topWavePoints.push({ x, y: topY, z: depthBrightness });
        bottomWavePoints.push({ x, y: bottomY, z: depthBrightness });
        centerWavePoints.push({ x, y: midY, z: depthBrightness });
      }

      // Main wave shape
      ctx.save();
      ctx.beginPath();

      if (topWavePoints.length > 0) {
        ctx.moveTo(topWavePoints[0].x, topWavePoints[0].y);

        for (let i = 1; i < topWavePoints.length - 1; i++) {
          const current = topWavePoints[i];
          const next = topWavePoints[i + 1];
          const xc = (current.x + next.x) / 2;
          const yc = (current.y + next.y) / 2;
          ctx.quadraticCurveTo(current.x, current.y, xc, yc);
        }
      }

      const reversedBottomPoints = [...bottomWavePoints].reverse();
      for (let i = 0; i < reversedBottomPoints.length - 1; i++) {
        const current = reversedBottomPoints[i];
        const next = reversedBottomPoints[i + 1];
        const xc = (current.x + next.x) / 2;
        const yc = (current.y + next.y) / 2;
        ctx.quadraticCurveTo(current.x, current.y, xc, yc);
      }

      ctx.closePath();

      const waveGradient = ctx.createLinearGradient(
        0,
        centerY - waveThickness / 2,
        0,
        centerY + waveThickness / 2,
      );
      waveGradient.addColorStop(
        0,
        `rgba(${baseColor.r * 0.15}, ${baseColor.g * 0.15}, ${baseColor.b * 0.15}, 1)`,
      );
      waveGradient.addColorStop(
        0.08,
        `rgba(${baseColor.r * 0.25}, ${baseColor.g * 0.25}, ${baseColor.b * 0.25}, 1)`,
      );
      waveGradient.addColorStop(
        0.2,
        `rgba(${baseColor.r * 0.45}, ${baseColor.g * 0.45}, ${baseColor.b * 0.45}, 1)`,
      );
      waveGradient.addColorStop(
        0.35,
        `rgba(${baseColor.r * 0.65}, ${baseColor.g * 0.65}, ${baseColor.b * 0.65}, 1)`,
      );
      waveGradient.addColorStop(
        0.5,
        `rgba(${baseColor.r * 0.85}, ${baseColor.g * 0.85}, ${baseColor.b * 0.85}, 1)`,
      );
      waveGradient.addColorStop(
        0.65,
        `rgba(${baseColor.r * 0.65}, ${baseColor.g * 0.65}, ${baseColor.b * 0.65}, 1)`,
      );
      waveGradient.addColorStop(
        0.8,
        `rgba(${baseColor.r * 0.45}, ${baseColor.g * 0.45}, ${baseColor.b * 0.45}, 1)`,
      );
      waveGradient.addColorStop(
        0.92,
        `rgba(${baseColor.r * 0.25}, ${baseColor.g * 0.25}, ${baseColor.b * 0.25}, 1)`,
      );
      waveGradient.addColorStop(
        1,
        `rgba(${baseColor.r * 0.15}, ${baseColor.g * 0.15}, ${baseColor.b * 0.15}, 1)`,
      );

      ctx.fillStyle = waveGradient;
      ctx.fill();
      ctx.restore();

      // Edge lights - top
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < topWavePoints.length; i += 3) {
        const point = topWavePoints[i];
        if (!point) continue;

        const edgeLightGradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          40,
        );

        edgeLightGradient.addColorStop(
          0,
          `rgba(${Math.min(baseColor.r * 1.3, 255)}, ${Math.min(
            baseColor.g * 1.2,
            255,
          )}, ${Math.min(baseColor.b * 1.1, 255)}, 0.15)`,
        );
        edgeLightGradient.addColorStop(
          0.7,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.05)`,
        );
        edgeLightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = edgeLightGradient;
        ctx.fillRect(point.x - 40, point.y - 40, 80, 80);
      }
      ctx.restore();

      // Edge lights - bottom
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < bottomWavePoints.length; i += 3) {
        const point = bottomWavePoints[i];
        if (!point) continue;

        const edgeLightGradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          40,
        );

        edgeLightGradient.addColorStop(
          0,
          `rgba(${Math.min(baseColor.r * 1.3, 255)}, ${Math.min(
            baseColor.g * 1.2,
            255,
          )}, ${Math.min(baseColor.b * 1.1, 255)}, 0.15)`,
        );
        edgeLightGradient.addColorStop(
          0.7,
          `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.05)`,
        );
        edgeLightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = edgeLightGradient;
        ctx.fillRect(point.x - 40, point.y - 40, 80, 80);
      }
      ctx.restore();

      // Center glow
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const highlightSpan = waveThickness * 0.65;

      for (let i = 0; i < centerWavePoints.length; i += 2) {
        const point = centerWavePoints[i];
        if (!point) continue;

        const distanceFromCenter = Math.abs(point.y - centerY);
        const intensity =
          Math.pow(1 - distanceFromCenter / waveAmplitude, 2) * point.z;

        if (intensity > 0.15) {
          const glowGradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            highlightSpan / 2,
          );

          const brightR = Math.min(
            baseColor.r * (1.5 + point.z * 0.3),
            255,
          );
          const brightG = Math.min(
            baseColor.g * (1.3 + point.z * 0.2),
            255,
          );
          const brightB = Math.min(
            baseColor.b * (1.2 + point.z * 0.1),
            255,
          );

          glowGradient.addColorStop(
            0,
            `rgba(${brightR}, ${brightG}, ${brightB}, ${intensity * 0.2})`,
          );
          glowGradient.addColorStop(
            0.6,
            `rgba(${brightR * 0.8}, ${brightG * 0.8}, ${brightB * 0.8}, ${
              intensity * 0.09
            })`,
          );
          glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = glowGradient;

          const depthScale = 0.8 + point.z * 0.4;
          ctx.save();
          ctx.translate(point.x, point.y);
          ctx.scale(depthScale * 1.3, (highlightSpan / 50) * depthScale);
          ctx.beginPath();
          ctx.arc(0, 0, 50, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.restore();

      // Ambient glow
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const ambientGradient = ctx.createRadialGradient(
        ctxWidth * 0.5,
        centerY,
        0,
        ctxWidth * 0.5,
        centerY,
        Math.max(ctxWidth, ctxHeight) * 0.6,
      );
      ambientGradient.addColorStop(
        0,
        `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.08)`,
      );
      ambientGradient.addColorStop(
        0.5,
        `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.03)`,
      );
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, ctxWidth, ctxHeight);
      ctx.restore();

      frameCount += 1;

      if (!hasMarkedReady && frameCount >= 1) {
        hasMarkedReady = true;
        setIsReady(true);
        setTimeout(() => setShowGlass(true), 25);
      }

      if (!prefersReducedMotion) {
        time += 0.025;
        speedPhase += speedFrequency * 0.012;
        tiltPhase += 0.005;

        if (Math.random() < 0.003) {
          speedFrequency = 0.3 + Math.random() * 0.4;
        }
      }
    };

    const animate = (): void => {
      if (isCancelled) return;

      const now = performance.now();
      const delta = now - lastFrameTime;

      // if user prefers reduced motion OR hero not in view -> just draw once
      if (prefersReducedMotion || !isInView) {
        if (!hasMarkedReady) {
          renderFrame();
        }
        return;
      }

      if (delta >= frameIntervalMs) {
        lastFrameTime = now;
        renderFrame();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion || !isInView) {
      // Draw a single static frame
      renderFrame();
    } else {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    const handleResize = (): void => {
      resizeAndRecalculate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isCancelled = true;
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color, prefersReducedMotion, isInView]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      {showGlass && (
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            width: { xs: '144%', sm: '100%', md: '100%' },
            height: { xs: '100%', sm: '100%', md: '100%' },
            right: 0,
            top: 0,
            opacity: { xs: 0.75, md: 1 },
            borderRadius: '0px',
            transform: 'rotate(0deg)',
            overflow: 'hidden',
            zIndex: 5,
            pointerEvents: 'none',
            mixBlendMode: 'color-dodge',
            background:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0.27) 60px)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: 'inset 0 0 0px #000',
            animation: 'fadeIn 0.2s ease',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: { xs: 0.75, md: 1 } },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              borderRadius: '0px',
              filter: 'blur(2px)',
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0) 60px)',
            },
          }}
        />
      )}
    </Box>
  );
};

export default GradientWave;
