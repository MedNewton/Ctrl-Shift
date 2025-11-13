"use client";

import { Stack, Typography, Box, Button } from "@mui/material";
import theme from "@/theme/theme";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import CallMadeIcon from "@mui/icons-material/CallMade";
import aboutAsset1 from "@/assets/images/about/aboutAsset1.svg?url";
import aboutAsset2 from "@/assets/images/about/aboutAsset2.svg?url";
import aboutAsset3 from "@/assets/images/about/aboutAsset3.svg?url";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const linesWrapRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  const linePercents = useMemo(() => [0, 100 / 3, (2 * 100) / 3, 100], []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRefs.current,
        { height: 0 },
        {
          height: "100vh",
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

      const leftFades = stickyRef.current
        ? Array.from(stickyRef.current.querySelectorAll<HTMLElement>("[data-fade]"))
        : [];
      if (leftFades.length) {
        gsap.fromTo(
          leftFades,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
              immediateRender: false,
              invalidateOnRefresh: true,
            },
          }
        );
      }

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      minHeight="100dvh"
      position="relative"
      sx={{ zIndex: 0, px: 8, py: 4, }}
    >
      <Box
        ref={linesWrapRef}
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",

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
              <Box
                sx={{ position: "sticky", top: 0, height: "100vh" }}
              >
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
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    willChange: "height",
                  }}
                />
              </Box>
            </Box>

          ))}
        </Box>
      </Box>

      <Stack
        ref={stickyRef}
        width="100%"
        height="fit-content"
        gap={2}
        sx={{
          position: "sticky !important",
          top: 0,
          left: 0,
          zIndex: 1,
          pt: 4,
        }}
      >
        <Typography
          data-fade
          variant="h6"
          fontWeight={600}
          color={theme.palette.brand.napulETHRed.main}
          sx={{ opacity: 0, willChange: "opacity" }}
        >
          Ctrl/Shift 2026
        </Typography>
        <Typography
          data-fade
          variant="h5"
          fontWeight={500}
          lineHeight={1.6}
          sx={{ opacity: 0, width: "50%", willChange: "opacity" }}
        >
          Ctrl/Shift 2026 offers a curated mix of talks, experiments, and showcases, spanning quantum
          computing, AI, blockchain, and Web3. Institutions, companies, and protocols converge to
          explore real-world use cases and emerging trends through panels, workshops, and live demos.
        </Typography>
      </Stack>

      {/* Right column blocks (each fades out near top) */}
      <Stack ref={rightColRef} width="100%" alignItems="end" gap={30} pt={40}>
        <Stack data-rightfade width="40%" gap={3} pl={16} sx={{ willChange: "opacity" }}>
          <Box width="30%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
            <Image src={aboutAsset1} alt="aboutAsset1" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Explore Our <span style={{ color: theme.palette.brand.napulETHRed.main }}>Agenda</span>
              </Typography>
              <Typography variant="body1" lineHeight={1.6} sx={{ opacity: 0.6, width: "65%" }}>
                Explore the event agenda and find the best talks, panels, workshops & more.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              sx={{ px: 4, py: 1, width: "fit-content", textTransform: "none", borderRadius: 2 }}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                  See Our Agenda
                </Typography>
                <CallMadeIcon sx={{ fontSize: 16, marginTop: 0.1 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>

        <Stack data-rightfade width="40%" gap={3} pl={16} sx={{ willChange: "opacity" }}>
          <Box width="30%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
            <Image src={aboutAsset2} alt="aboutAsset1" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Become A <span style={{ color: theme.palette.brand.napulETHRed.main }}>Sponsor</span>
              </Typography>
              <Typography variant="body1" lineHeight={1.6} sx={{ opacity: 0.6, width: "65%" }}>
                Become a sponsor and get the opportunity to showcase your brand to a global audience.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              sx={{ px: 4, py: 1, width: "fit-content", textTransform: "none", borderRadius: 2 }}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                  See Our Agenda
                </Typography>
                <CallMadeIcon sx={{ fontSize: 16, marginTop: 0.1 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>

        <Stack data-rightfade width="40%" gap={3} pl={16} sx={{ willChange: "opacity" }}>
          <Box width="30%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
            <Image src={aboutAsset3} alt="aboutAsset1" fill />
          </Box>
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={600}>
                Become A <span style={{ color: theme.palette.brand.napulETHRed.main }}>Speaker</span>
              </Typography>
              <Typography variant="body1" lineHeight={1.6} sx={{ opacity: 0.6, width: "65%" }}>
                Become a speaker and share your expertise with a global audience.
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              sx={{ px: 4, py: 1, width: "fit-content", textTransform: "none", borderRadius: 2 }}
            >
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                  See Our Agenda
                </Typography>
                <CallMadeIcon sx={{ fontSize: 16, marginTop: 0.1 }} />
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default About;
