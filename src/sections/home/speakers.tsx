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

  const handleCardLeave = () => {
    setOverlay((o) => ({ ...o, visible: false }));
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".speaker-card")
      );

      gsap.set(section, {
        backgroundColor: theme.palette.background.default,
        willChange: "background-color",
      });
      gsap.set(cards, { opacity: 0, y: 24, willChange: "transform,opacity" });

      // Title: strong fade-in from below on enter (reversible)
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 32, willChange: "transform,opacity" },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 70%",
              // play when entering from below; reverse only when leaving back upward
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Section bg + cards reveal (row-by-row)
      const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
      tl.to(
        section,
        {
          backgroundColor: theme.palette.brand.napulETHRed.main,
          duration: 1.0,
          ease: "power2.out",
        },
        0
      ).to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: { grid: "auto", amount: 0.8, from: "start" },
        },
        0.12
      );

      let isOn = false;
      let tween: gsap.core.Tween | null = null;

      const goOn = () => {
        if (isOn) return;
        isOn = true;
        tween?.kill();
        tween = tl.tweenTo(tl.duration(), { ease: "power2.out" });
      };
      const goOff = () => {
        if (!isOn) return;
        isOn = false;
        tween?.kill();
        tween = tl.tweenTo(0, { ease: "power2.in" });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "top 80%",
        onEnter: goOn,
        onLeaveBack: goOff,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom 99%",
        end: "bottom 99%",
        onEnterBack: goOn,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "bottom 6%",
        end: "bottom 6%",
        onEnter: goOff,
        invalidateOnRefresh: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 22%",
        end: "top 22%",
        onLeaveBack: goOff,
        invalidateOnRefresh: true,
      });

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const within = rect.top <= vh * 0.82 && rect.bottom >= vh * 0.04;
      if (within) {
        isOn = true;
        tl.progress(1);
      } else {
        isOn = false;
        tl.progress(0);
      }
    }, sectionRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      minHeight="100vh"
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
          ref={titleRef}
          variant="h1"
          color={theme.palette.primary.main}
          fontWeight={600}
          mb={6}
          sx={{ opacity: 0 }}
        >
          Speakers
        </Typography>

        <Box ref={containerRef} sx={{ position: "relative" }}>
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
