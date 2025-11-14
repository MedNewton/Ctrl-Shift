// components/Sections/Speakers.tsx
"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExampleSpeaker from "@/assets/images/speakers/exampleSpeaker.png";
import SpeakerCard, {
  type SpeakerCardHoverPayload,
} from "@/components/home/speakers/speakerCard";

gsap.registerPlugin(ScrollTrigger);

type OverlayState = {
  visible: boolean;
  x: number;
  y: number;
  w: number;
  name: string;
  title: string;
};

const OVERLAY_HEIGHT = 76;
const PAD = 8;

const Speakers = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [overlay, setOverlay] = useState<OverlayState>({
    visible: false,
    x: 0,
    y: 0,
    w: 0,
    name: "",
    title: "",
  });

  const handleCardHover = ({ el, name, title }: SpeakerCardHoverPayload) => {
    if (!containerRef.current) return;
    const crect = containerRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const x = r.left - crect.left + PAD;
    const w = r.width - PAD * 2;
    const y = r.bottom - crect.top - OVERLAY_HEIGHT - PAD;
    setOverlay({ visible: true, x, y, w, name, title });
  };

  const handleCardLeave = () => setOverlay((o) => ({ ...o, visible: false }));

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const title = titleRef.current!;
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".speaker-card")
      );

      // Initial states
      gsap.set(title, { opacity: 0, y: 32, willChange: "transform,opacity" });
      gsap.set(cards, { opacity: 0, y: 24, willChange: "transform,opacity" });

      // One scrubbed timeline: title first, then ALL cards together
      const tl = gsap
        .timeline({ paused: true })
        .to(
          title,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", immediateRender: false },
          0
        )
        .to(
          cards,
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", immediateRender: false },
          0.1
        );

      // Smooth reversible scroll window
      ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        end: "top 62%",
        scrub: 0.5,
        animation: tl,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onRefresh: () => tl.progress(0),
      });

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(section);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      setTimeout(() => ScrollTrigger.refresh(), 200);

      return () => {
        ro.disconnect();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      width="100%"
      sx={{
        position: "relative",
        px: 8,
        py: 4,
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h1"
          color={theme.palette.primary.main}
          fontWeight={600}
          mb={6}
        >
          Speakers
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Floating info panel that slides across cards on hover */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              zIndex: 3,
              height: OVERLAY_HEIGHT,
              width: overlay.w,
              transform: `translate(${overlay.x}px, ${overlay.y}px)`,
              transition:
                "transform 260ms cubic-bezier(.2,.7,.2,1), width 260ms cubic-bezier(.2,.7,.2,1), opacity 160ms ease",
              opacity: overlay.visible ? 1 : 0,
              pointerEvents: "none",
              borderRadius: 4,
              backgroundColor: theme.palette.brand.napulETHRed.main,
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                {overlay.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {overlay.title}
              </Typography>
            </Stack>
          </Box>

          <Grid ref={gridRef} container spacing={2} sx={{ mt: 2 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Grid key={i} size={{ xs: 12, md: 2 }}>
                <SpeakerCard
                  name={`Speaker ${i + 1}`}
                  title={`Role • Company`}
                  image={ExampleSpeaker}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default Speakers;
