// components/Sections/ParallaxBoxes.tsx
"use client";

import { useEffect, useRef } from "react";
import { Box, Stack } from "@mui/material";
import theme from "@/theme/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOX_COUNT = 5;
// how far the row travels across the viewport (in % of its own size)
const TRAVEL = { x: 34, y: 24 };

export default function ParallaxBoxes() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const stage = stageRef.current!;
      const row = stage.querySelector<HTMLElement>("[data-row]");
      if (!row) return;

      // perf
      gsap.set(row, { willChange: "transform" });

      // start bottom-right
      gsap.set(row, { xPercent: TRAVEL.x, yPercent: TRAVEL.y });

      // sweep to top-left (scrubbed; reverses on scroll up)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=160%",
          pin: stage,            // pin only the stage viewport
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(row, { xPercent: -TRAVEL.x, yPercent: -TRAVEL.y, ease: "none" }, 0);

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(section);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        ro.disconnect();
        tl.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      ref={sectionRef}
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "200vh", // provides scroll distance for the pin
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* pinned viewport */}
      <Stack
        ref={stageRef}
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          justifyContent: "center",
          px: { xs: 2, md: 8 },
        }}
      >
        {/* single moving row */}
        <Box
          data-row
          sx={{
            display: "flex",
            gap: { xs: 8, md: 12 },
            transform: "translateZ(0)",
          }}
        >
          {Array.from({ length: BOX_COUNT }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 120, md: 180 },
                height: { xs: 160, md: 220 },
                borderRadius: { xs: 2, md: 3 },
                backgroundColor: theme.palette.brand.napulETHRed.main,
                boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
              }}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
