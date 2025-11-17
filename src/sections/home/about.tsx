"use client";

import { Stack, Typography, Box, Button } from "@mui/material";
import theme from "@/theme/theme";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import CallMadeIcon from "@mui/icons-material/CallMade";
import aboutAsset1 from "@/assets/images/about/aboutAsset1.svg?url";
import aboutAsset2 from "@/assets/images/about/aboutAsset2.svg?url";
import aboutAsset3 from "@/assets/images/about/aboutAsset3.svg?url";
import NapulethLogo from "@/assets/images/about/napulethLogo.webp";
import CtrlShiftLogo from "@/assets/images/logo/Asset 302.svg?url";

gsap.registerPlugin(ScrollTrigger);

// NEW COPY (with line breaks preserved)
const COPY = `Ctrl/Shift 2026 is the moment our identity expands.

What started as a spark in Web3 now unfolds into a wider constellation— AI, Quantum Computing, blockchain, and the technologies that bend the horizon.

This year, thinkers and builders gather not just to speak, but to experiment, to collide, to imagine.

Institutions, researchers, creators, and protocols meet under one roof to trace new patterns, uncover hidden connections,and turn emerging ideas into living, breathing experiences.

A shift in scale.
A shift in ambition.
A shift in what’s possible.

Welcome to the new chapter.`;

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const linesWrapRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const linePercents = useMemo(() => [0, 100 / 3, (2 * 100) / 3, 100], []);
  const words = useMemo(
    () =>
      COPY.replace(/\uFEFF/g, "") // just in case there were hidden chars from copy-paste
        .split(" ")
        .map((w, i) => ({ w, k: `w-${i}` })),
    []
  );

  // 1) SECTION-LEVEL ANIMATIONS (lines, left/right fades, parallax)
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ====== DESKTOP / LARGE (>= 900px) ======
      mm.add("(min-width: 900px)", () => {
        // Vertical lines grow
        gsap.fromTo(
          lineRefs.current,
          { height: 0 },
          {
            height: "100%",
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 85%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );

        // Right column fading cards
        const rightBoxes = Array.from(
          sectionRef.current!.querySelectorAll<HTMLElement>("[data-rightfade]")
        );

        rightBoxes.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 40%",
                end: "top -15%",
                scrub: true,
                immediateRender: false,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Left side fade in / out (titles & copy as a block)
        const leftFades = stickyRef.current
          ? Array.from(
              stickyRef.current.querySelectorAll<HTMLElement>("[data-fade]")
            )
          : [];

        if (leftFades.length) {
          // fade in as section comes into view
          gsap.fromTo(
            leftFades,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current!,
                start: "top 75%",
                end: "top 15%",
                scrub: true,
                immediateRender: false,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // fade out left + grid lines as last card scrolls past
        const lastRight = rightBoxes[rightBoxes.length - 1];
        if (lastRight) {
          if (leftFades.length) {
            gsap.fromTo(
              leftFades,
              { opacity: 1 },
              {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: lastRight,
                  start: "top 30%",
                  end: "top 10%",
                  scrub: true,
                  immediateRender: false,
                  invalidateOnRefresh: true,
                },
              }
            );
          }

          if (linesWrapRef.current) {
            gsap.fromTo(
              linesWrapRef.current,
              { opacity: 1 },
              {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: lastRight,
                  start: "top 30%",
                  end: "top 10%",
                  scrub: true,
                  immediateRender: false,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        }

        // Slight parallax on the image boxes
        const imageBoxes = Array.from(
          sectionRef.current!.querySelectorAll<HTMLElement>(
            '[data-rightfade] > div:first-child'
          )
        );

        imageBoxes.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 0 },
            {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // ====== MOBILE / SMALL (< 900px) ======
      mm.add("(max-width: 899px)", () => {
        const rightBoxes = Array.from(
          sectionRef.current!.querySelectorAll<HTMLElement>("[data-rightfade]")
        );

        rightBoxes.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // 2) TEXT WORD-BY-WORD ANIMATION – ISOLATED & ROBUST
  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const el = textRef.current!;
      const wordEls = Array.from(
        el.querySelectorAll<HTMLElement>("[data-word]")
      );
      if (!wordEls.length) return;

      const mm = gsap.matchMedia();

      // Desktop word animation
      mm.add("(min-width: 900px)", () => {
        gsap.set(wordEls, { opacity: 0.2 });

        gsap.to(wordEls, {
          opacity: 1,
          stagger: { each: 0.06, from: 0 },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile word animation (if you ever show this block on mobile)
      mm.add("(max-width: 899px)", () => {
        gsap.set(wordEls, { opacity: 0.2 });

        gsap.to(wordEls, {
          opacity: 1,
          stagger: { each: 0.04, from: 0 },
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, textRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      minHeight="100dvh"
      position="relative"
      sx={{
        zIndex: 0,
        px: 0,
        py: 4,
        isolation: "isolate",
        display: { xs: "none", md: "flex" }, // desktop version only
      }}
    >
      {/* GRID LINES BACKGROUND */}
      <Box
        ref={linesWrapRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          px: 8,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "96%",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "flex" },
          }}
        >
          {linePercents.map((pct, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${pct}%`,
                transform: "translateX(-1px)",
              }}
            >
              <Box sx={{ position: "sticky", top: 0, height: "100%" }}>
                <Box
                  ref={(el) => {
                    if (el) lineRefs.current[i] = el as HTMLDivElement;
                  }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1.5px",
                    height: 0,
                    backgroundColor: i == 1 ? "transparent": "rgba(255, 255, 255, 0.15)",
                    willChange: "height",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* LEFT / STICKY COLUMN */}
      <Stack
        ref={stickyRef}
        width="100%"
        height="fit-content"
        gap={2}
        sx={{
          position: { xs: "relative", md: "sticky !important" },
          top: 0,
          left: 0,
          zIndex: 1,
          pt: 4,
          px: { xs: 4, md: 8 },
        }}
      >
        <Stack
          gap={0.5}
          data-fade
          sx={{
            opacity: 0, // start hidden, GSAP fades it in
            willChange: "opacity",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight={600}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            From&nbsp;
            <span style={{ color: theme.palette.brand.napulETHLightBlue1.main }}>
              NapulETH&nbsp;
            </span>
            <Image src={NapulethLogo} alt="NapulETH logo" width={20} height={20} />
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            fontWeight={600}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            To&nbsp;
            <span style={{ color: theme.palette.brand.napulETHYellow2.main }}>
              ctrl/shift&nbsp;
            </span>
            <Image src={CtrlShiftLogo} alt="ctrl/shift logo" width={20} height={20} />
          </Typography>
        </Stack>

        {/* MAIN COPY WITH WORD-BY-WORD ANIMATION */}
        <Typography
          ref={textRef}
          variant="subtitle1"
          fontWeight={500}
          lineHeight={1.6}
          sx={{
            width: { xs: "100%", md: "50%" },
            color: theme.palette.text.primary,
            wordBreak: "normal",
            whiteSpace: "pre-wrap", // keep paragraph breaks from COPY
          }}
          data-fade
        >
          {words.map(({ w, k }, idx) => (
            <Box
              key={k}
              component="span"
              data-word
              sx={{ willChange: "opacity" }}
            >
              {w}
              {idx < words.length - 1 ? " " : ""}
            </Box>
          ))}
        </Typography>
      </Stack>

      {/* RIGHT COLUMN CARDS */}
      <Stack
        ref={rightColRef}
        width="100%"
        alignItems={{ xs: "center", md: "end" }}
        gap={0}
        pt={{ xs: 8, md: 20 }}
      >

        {/* Card 2 */}
        <Stack
          data-rightfade
          width={{ xs: "100%", md: "40%" }}
          gap={3}
          pl={{ xs: 4, md: 16 }}
          pr={{ xs: 4, md: 0 }}
          mb={{ xs: 16, md: 24 }}
          sx={{ willChange: "opacity" }}
        >
          <Box
            width={{ xs: "40%", md: "30%" }}
            sx={{ aspectRatio: 1, position: "relative", overflow: "hidden" }}
          >
            <Image src={aboutAsset2} alt="Sponsorship illustration" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Become A{" "}
                <span style={{ color: theme.palette.brand.napulETHRed.main }}>
                  Sponsor
                </span>
              </Typography>
              <Typography
                variant="body1"
                lineHeight={1.6}
                sx={{ opacity: 0.6, width: { xs: "100%", md: "65%" } }}
              >
                Become a sponsor and get the opportunity to showcase your brand to a
                global audience.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              aria-label="Apply as event sponsor"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "https://docsend.com/v/sbjcj/ctrlshift2026";
              }}
              sx={{
                px: 4,
                py: 1,
                width: "fit-content",
                textTransform: "none",
                borderRadius: 60,
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #942629",
                  boxShadow:
                    "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
                  borderColor: "transparent",
                },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography component="span" variant="subtitle1" fontWeight={600}>
                  Apply as a Sponsor
                </Typography>
                <CallMadeIcon sx={{ fontSize: 16, mt: 0.1 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>

        {/* Card 3 */}
        <Stack
          data-rightfade
          width={{ xs: "100%", md: "40%" }}
          gap={3}
          pl={{ xs: 4, md: 16 }}
          pr={{ xs: 4, md: 0 }}
          mb={{ xs: 16, md: 24 }}
          sx={{ willChange: "opacity" }}
        >
          <Box
            width={{ xs: "40%", md: "30%" }}
            sx={{ aspectRatio: 1, position: "relative", overflow: "hidden" }}
          >
            <Image src={aboutAsset3} alt="Speaker illustration" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Become A{" "}
                <span style={{ color: theme.palette.brand.napulETHRed.main }}>
                  Speaker
                </span>
              </Typography>
              <Typography
                variant="body1"
                lineHeight={1.6}
                sx={{ opacity: 0.6, width: { xs: "100%", md: "65%" } }}
              >
                Become a speaker and share your expertise with a global audience.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              aria-label="Apply as event speaker"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "https://docsend.com/view/zaw8ij7k9avkcg6z";
              }}
              sx={{
                px: 4,
                py: 1,
                width: "fit-content",
                textTransform: "none",
                borderRadius: 60,
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #942629",
                  boxShadow:
                    "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
                  borderColor: "transparent",
                },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography component="span" variant="subtitle1" fontWeight={600}>
                  Apply as a Speaker
                </Typography>
                <CallMadeIcon sx={{ fontSize: 16, mt: 0.1 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>

        <Stack
          data-rightfade
          width={{ xs: "100%", md: "40%" }}
          gap={3}
          pl={{ xs: 4, md: 16 }}
          pr={{ xs: 4, md: 0 }}
          mb={{ xs: 16, md: 24 }}
          sx={{ willChange: "opacity" }}
        >
          <Box
            width={{ xs: "40%", md: "30%" }}
            sx={{ aspectRatio: 1, position: "relative", overflow: "hidden" }}
          >
            <Image src={aboutAsset1} alt="Event agenda illustration" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Explore Our{" "}
                <span style={{ color: theme.palette.brand.napulETHRed.main }}>
                  Agenda
                </span>
              </Typography>
              <Typography
                variant="body1"
                lineHeight={1.6}
                sx={{ opacity: 0.6, width: { xs: "100%", md: "65%" } }}
              >
                Explore the event agenda and find the best talks, panels, workshops &
                more.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              aria-label="View event agenda"
              sx={{
                px: 4,
                py: 1,
                width: "fit-content",
                textTransform: "none",
                borderRadius: 60,
                "&:hover": {
                  background:
                    "linear-gradient(180deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%), #942629",
                  boxShadow:
                    "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
                  borderColor: "transparent",
                },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography component="span" variant="subtitle1" fontWeight={600}>
                  Coming soon...
                </Typography>
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default About;
