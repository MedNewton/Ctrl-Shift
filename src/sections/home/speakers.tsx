// components/Sections/Speakers.tsx
"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExampleSpeaker from "@/assets/images/speakers/exampleSpeaker.png";

gsap.registerPlugin(ScrollTrigger);

const Speakers = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const gridRef = useRef<HTMLDivElement | null>(null);
    const washRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const section = sectionRef.current!;
            const wash = washRef.current!;
            const cards = Array.from(
                section.querySelectorAll<HTMLElement>(".speaker-card")
            );

            const ENTER_FROM_TOP = 0.82;
            const EXIT_TO_NEXT = 0.04;

            // initial states
            gsap.set(wash, { opacity: 0, willChange: "opacity" });
            gsap.set(cards, { opacity: 0, y: 24, willChange: "transform,opacity" });

            // one master timeline (duration-based fade, row-by-row cards)
            const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
            tl.to(wash, { opacity: 1, duration: 1.2, ease: "power2.out" }, 0)
                .to(
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

            // ENTER from top (down) — a touch later so it feels intentional
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                end: "top 80%",
                onEnter: goOn,
                onLeaveBack: goOff,
                invalidateOnRefresh: true,
            });

            // RE-ENTER from bottom (up) — very early, so red comes back in time
            ScrollTrigger.create({
                trigger: section,
                start: `bottom 99%`,
                end: `bottom 99%`,
                onEnterBack: goOn,
                invalidateOnRefresh: true,
            });

            // EXIT to next section (down) — reverse very late
            ScrollTrigger.create({
                trigger: section,
                start: `bottom 6%`,
                end: `bottom 6%`,
                onEnter: goOff,
                invalidateOnRefresh: true,
            });

            // EXIT to previous section (up) — reverse a bit earlier
            ScrollTrigger.create({
                trigger: section,
                start: `top 22%`,
                end: `top 22%`,
                onLeaveBack: goOff,
                invalidateOnRefresh: true,
            });

            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            const within =
                rect.top <= vh * ENTER_FROM_TOP && rect.bottom >= vh * EXIT_TO_NEXT;
            if (within) {
                isOn = true;
                tl.progress(1);
            } else {
                isOn = false;
                tl.progress(0);
            }
        }, sectionRef);

        // re-measure after layout/images
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
            <Box
                ref={washRef}
                aria-hidden
                sx={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 0,
                    opacity: 0,
                    pointerEvents: "none",
                    background: `
            radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%),
            ${theme.palette.brand.napulETHRed.main}
          `,
                }}
            />

            <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="h1" color={theme.palette.primary.main} fontWeight={600} mb={6}>
                    Speakers
                </Typography>

                <Grid ref={gridRef} container spacing={2} sx={{ mt: 2 }}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Grid key={i} size={{ xs: 12, md: 2 }}>
                            <Box
                                className="speaker-card"
                                sx={{
                                    width: "100%",
                                    aspectRatio: 1 / 1.2,
                                    position: "relative",
                                    overflow: "hidden",
                                    backgroundColor: theme.palette.brand.napulETHYellow1.main,
                                    borderRadius: 4,
                                    "& .speaker-image": {
                                        transform: "scale(1.06)",
                                        transition: "transform 0.3s ease-in-out",
                                        willChange: "transform",
                                    },
                                    "&:hover .speaker-image": {
                                        transform: "scale(1)",
                                    },
                                }}
                            >
                                <Image
                                    src={ExampleSpeaker}
                                    alt="Example Speaker"
                                    className="speaker-image"
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Stack>
    );
};

export default Speakers;
