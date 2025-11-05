"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedHeroGraphicProps = {
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
  stagger?: number;
  duration?: number;
};

export default function AnimatedHeroGraphic({
  className,
  style,
  baseDelay = 0.0,
  stagger = 0.18,
  duration = 0.8,
}: AnimatedHeroGraphicProps) {
  const isReduced = useReducedMotion();
  const svgW = 985;
  const svgH = 438;
  const PILLAR_TOP_Y = 50;
  const PILLAR_BOTTOM_Y = 303;
  const PILLAR_LEN = PILLAR_BOTTOM_Y - PILLAR_TOP_Y; // 253

  const uid = React.useId();

  const tFor = (i: number) => ({
    delay: baseDelay + (isReduced ? 0 : i * stagger),
    duration: isReduced ? 0.25 : duration,
    ease: "easeOut" as const,
  });

  const PillarReveal = ({ idx }: { idx: number }) => (
    <clipPath id={`pillar-reveal-${uid}-${idx}`}>
      <motion.rect
        initial={
          isReduced
            ? { y: PILLAR_TOP_Y, height: PILLAR_LEN }
            : { y: PILLAR_BOTTOM_Y, height: 0 }
        }
        animate={{ y: PILLAR_TOP_Y, height: PILLAR_LEN }}
        transition={tFor(idx)}
        x={0}
        width={200}
        fill="#fff"
      />
    </clipPath>
  );

  const maskId = (name: string, idx: number) => `${name}-${uid}-${idx}`;

  const pillars = [
    { tx: 0,   ty: 220, stroke: "#D9F7FF", sphereRot: -42,  rectA: "#39D1F9", rectB: "#A7E9FD" },
    { tx: 152, ty: 210, stroke: "#FFF7A5", sphereRot: -6,   rectA: "#FFB000", rectB: "#FFD400" },
    { tx: 304, ty: 190, stroke: "#83EEE8", sphereRot: 2,    rectA: "#00827B", rectB: "#39BEB7" },
    { tx: 456, ty: 170, stroke: "#96E9FF", sphereRot: -65,  rectA: "#008AFF", rectB: "#00AEFF" },
    { tx: 608, ty: 120, stroke: "#FFC693", sphereRot: 0,    rectA: "#F24900", rectB: "#FF8947" },
    { tx: 760, ty: 60,  stroke: "#E2E0FF", sphereRot: 0,    rectA: "#9896FF", rectB: "#BDBBFF" },
  ] as const;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      fill="none"
      className={className}
      style={style}
    >
      <clipPath id={`hero-animation-mask-${uid}`}>
        <rect width={1185} height={1438} x={-100} y={-1000} fill="#fff" />
      </clipPath>

      {pillars.map((_, i) => (
        <PillarReveal key={i} idx={i} />
      ))}

      <g clipPath={`url(#hero-animation-mask-${uid})`} transform="scale(1.08)">
        {pillars.map((p, i) => (
          <g key={i} transform={`translate(${p.tx} ${p.ty})`} style={{ transformOrigin: "75px 227.25px" }}>
            <g transform="scale(1.5)">
              <g clipPath={`url(#pillar-reveal-${uid}-${i})`}>
                <path d="M50 50L50 303" stroke={p.stroke} strokeWidth="100" strokeLinecap="round" />
              </g>

              <motion.g
                initial={isReduced ? { y: 0 } : { y: PILLAR_LEN }}
                animate={{ y: 0 }}
                transition={tFor(i)}
              >
                <mask id={maskId(`p${i}-mask0`, i)} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
                  <circle cx="50" cy="50" r="50" fill="#fff" />
                </mask>
                <g mask={`url(#${maskId(`p${i}-mask0`, i)})`}>
                  <g style={{ transform: `rotate(${p.sphereRot}deg)`, transformOrigin: "50px 50px" }}>
                    <rect width="100" height="100" fill={p.rectA} />
                    <rect width="50" height="100" fill={p.rectB} />
                    <mask id={maskId(`p${i}-mask1`, i)} maskUnits="userSpaceOnUse" x="25" y="25" width="50" height="50">
                      <circle cx="50" cy="50" r="25" fill="#fff" />
                    </mask>
                    <g mask={`url(#${maskId(`p${i}-mask1`, i)})`}>
                      <rect x="25" y="25" width="50" height="50" fill={p.rectA} />
                      <rect x="50" y="25" width="25" height="50" fill={p.rectB} />
                    </g>
                  </g>
                </g>
              </motion.g>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
