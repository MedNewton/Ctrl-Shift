// components/home/hero/GradientWave.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';

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

const GradientWave = ({ color = '#942629' }: GradientWaveProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setCanvasSize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();

    let time = 0;
    let speedPhase = Math.random() * Math.PI * 2;
    let speedFrequency = 0.3 + Math.random() * 0.4;

    const hexToRgb = (hex: string): RGB => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 148, g: 38, b: 41 };
    };

    const baseColor = hexToRgb(color);

    const animate = (): void => {
      if (!canvas || !ctx) return;

      const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
      const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

      // Clear with dark background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Variable speed calculation
      const speedModulation = 0.5 + Math.sin(speedPhase) * 0.4;
      const currentSpeed = 0.6 * speedModulation;

      // Wave parameters
      const centerY = height * 0.5;
      const waveThickness = height * 0.7;
      const waveAmplitude = height * 0.14;
      const waveFrequency = 0.0018;
      const waveSpeed = currentSpeed;

      // Calculate wave points with 3D motion
      const topWavePoints: WavePoint[] = [];
      const bottomWavePoints: WavePoint[] = [];
      const centerWavePoints: WavePoint[] = [];
      const xPositions = Array.from({ length: Math.floor(width / 1.5) + 100 }, (_, i) => i * 1.5 - 50);
      
      for (const x of xPositions) {
        const offsetY = 
          Math.sin(x * waveFrequency + time * waveSpeed) * waveAmplitude +
          Math.sin(x * waveFrequency * 0.6 - time * waveSpeed * 0.7) * (waveAmplitude * 0.4) +
          Math.cos(x * waveFrequency * 0.3 + time * waveSpeed * 0.5) * (waveAmplitude * 0.25);
        
        const depthZ = 
          Math.sin(x * waveFrequency * 0.5 + time * waveSpeed * 0.8) * 0.5 +
          Math.cos(x * waveFrequency * 0.8 - time * waveSpeed * 0.6) * 0.3;
        
        const depthScale = 1 + depthZ * 0.3;
        const depthBrightness = 0.7 + depthZ * 0.3;
        
        const topY = centerY - (waveThickness / 2) * depthScale + offsetY;
        const bottomY = centerY + (waveThickness / 2) * depthScale + offsetY;
        const midY = centerY + offsetY;
        
        topWavePoints.push({ x, y: topY, z: depthBrightness });
        bottomWavePoints.push({ x, y: bottomY, z: depthBrightness });
        centerWavePoints.push({ x, y: midY, z: depthBrightness });
      }

      // Draw main wave body
      ctx.save();
      ctx.beginPath();
      
      if (topWavePoints.length > 0) {
        ctx.moveTo(topWavePoints[0].x, topWavePoints[0].y);
        
        for (let i = 1; i < topWavePoints.length - 1; i++) {
          const xc = (topWavePoints[i].x + topWavePoints[i + 1].x) / 2;
          const yc = (topWavePoints[i].y + topWavePoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(topWavePoints[i].x, topWavePoints[i].y, xc, yc);
        }
      }
      
      const reversedBottomPoints = [...bottomWavePoints].reverse();
      for (let i = 0; i < reversedBottomPoints.length - 1; i++) {
        const xc = (reversedBottomPoints[i].x + reversedBottomPoints[i + 1].x) / 2;
        const yc = (reversedBottomPoints[i].y + reversedBottomPoints[i + 1].y) / 2;
        ctx.quadraticCurveTo(reversedBottomPoints[i].x, reversedBottomPoints[i].y, xc, yc);
      }
      
      ctx.closePath();

      // 3D gradient
      const waveGradient = ctx.createLinearGradient(0, centerY - waveThickness / 2, 0, centerY + waveThickness / 2);
      waveGradient.addColorStop(0, `rgba(${baseColor.r * 0.2}, ${baseColor.g * 0.2}, ${baseColor.b * 0.2}, 0.98)`);
      waveGradient.addColorStop(0.15, `rgba(${baseColor.r * 0.4}, ${baseColor.g * 0.4}, ${baseColor.b * 0.4}, 1)`);
      waveGradient.addColorStop(0.35, `rgba(${baseColor.r * 0.6}, ${baseColor.g * 0.6}, ${baseColor.b * 0.6}, 1)`);
      waveGradient.addColorStop(0.5, `rgba(${baseColor.r * 0.8}, ${baseColor.g * 0.8}, ${baseColor.b * 0.8}, 1)`);
      waveGradient.addColorStop(0.65, `rgba(${baseColor.r * 0.6}, ${baseColor.g * 0.6}, ${baseColor.b * 0.6}, 1)`);
      waveGradient.addColorStop(0.85, `rgba(${baseColor.r * 0.4}, ${baseColor.g * 0.4}, ${baseColor.b * 0.4}, 1)`);
      waveGradient.addColorStop(1, `rgba(${baseColor.r * 0.2}, ${baseColor.g * 0.2}, ${baseColor.b * 0.2}, 0.98)`);
      
      ctx.fillStyle = waveGradient;
      ctx.fill();
      ctx.restore();

      // 3D highlights
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      const highlightSpan = waveThickness * 0.65;
      
      for (let i = 0; i < centerWavePoints.length; i += 2) {
        const point = centerWavePoints[i];
        if (!point) continue;
        
        const distanceFromCenter = Math.abs(point.y - centerY);
        const intensity = Math.pow(1 - (distanceFromCenter / waveAmplitude), 2) * point.z;
        
        if (intensity > 0.15) {
          const glowGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, highlightSpan / 2
          );
          
          const brightR = Math.min(baseColor.r * (1.5 + point.z * 0.3), 255);
          const brightG = Math.min(baseColor.g * (1.3 + point.z * 0.2), 255);
          const brightB = Math.min(baseColor.b * (1.2 + point.z * 0.1), 255);
          
          glowGradient.addColorStop(0, `rgba(${brightR}, ${brightG}, ${brightB}, ${intensity * 0.2})`);
          glowGradient.addColorStop(0.6, `rgba(${brightR * 0.8}, ${brightG * 0.8}, ${brightB * 0.8}, ${intensity * 0.09})`);
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

      // Atmospheric glow
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const ambientGradient = ctx.createRadialGradient(
        width * 0.5, centerY, 0,
        width * 0.5, centerY, Math.max(width, height) * 0.6
      );
      ambientGradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.08)`);
      ambientGradient.addColorStop(0.5, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.03)`);
      ambientGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      if (!prefersReduced) {
        time += 0.02;
        speedPhase += speedFrequency * 0.01;
        
        if (Math.random() < 0.003) {
          speedFrequency = 0.3 + Math.random() * 0.4;
        }
      }

      // Set ready after first frame
      if (!isReady) {
        setIsReady(true);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = (): void => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color, prefersReduced, isReady]);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Wave Canvas */}
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

      {/* Fractal Glass Overlay - only shows when wave is ready */}
      {isReady && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            width: { xs: "144%", sm: "100%", md: "100%" },
            height: { xs: "100%", sm: "100%", md: "100%" },
            right: { xs: "0", md: "0" },
            top: { xs: "0", md: "0" },
            opacity: { xs: 0.75, md: 1 },
            borderRadius: "0px",
            transform: "rotate(0deg)",
            overflow: "hidden",
            zIndex: 5,
            pointerEvents: "none",
            mixBlendMode: "color-dodge",
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0.27) 60px)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "inset 0 0 0px #000",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "0px",
              filter: "blur(2px)",
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0) 60px)",
            },
          }}
        />
      )}
    </Box>
  );
};

export default GradientWave;