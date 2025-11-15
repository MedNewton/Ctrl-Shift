"use client";

import { useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";

import sponsor1 from "@/assets/images/sponsors/1.webp";
import sponsor2 from "@/assets/images/sponsors/2.webp";
import sponsor5 from "@/assets/images/sponsors/5.webp";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Partners = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      const cardWrappers = Array.from(
        sectionElement.querySelectorAll<HTMLDivElement>(".sponsor-card-wrapper")
      );

      if (!titleElement || cardWrappers.length === 0) return;

      // Initial states (same style as Speakers)
      gsap.set(titleElement, { opacity: 0, y: 30 });
      gsap.set(cardWrappers, {
        opacity: 0,
        y: 40,
        scale: 0.95,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });

      // Animate title
      tl.to(titleElement, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate cards with stagger
      tl.to(
        cardWrappers,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 0.4,
            from: "start",
          },
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    // Refresh ScrollTrigger on resize (same as Speakers)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(sectionElement);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      sx={{
        position: "relative",
        px: { xs: 4, md: 8 },
        py: { xs: 6, md: 8 },
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        isolation: "isolate",
        "& .sponsor-card-wrapper": {
          cursor: "pointer",
          filter: "brightness(0) invert(1)",
          transition: "filter 0.2s ease-in-out",
          "&:hover": {
            filter: "brightness(1) invert(0)"
          }
        }
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          ref={titleRef}
          variant="h1"
          color={theme.palette.primary.main}
          fontWeight={600}
          mb={{ xs: 4, md: 6 }}
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
          }}
        >
          Partners
        </Typography>

        {/* Row 1 */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={{ xs: 2, md: 1 }}
          sx={{ mt: 2 }}
        >
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor1} alt="Sponsor 1" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor2} alt="Sponsor 2" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor5} alt="Sponsor 5" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor1} alt="Sponsor 1" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor2} alt="Sponsor 2" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor5} alt="Sponsor 5" width={150} height={150} />
          </Box>
        </Stack>

        {/* Row 2 */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={{ xs: 2, md: 1 }}
          sx={{ mt: 2 }}
        >
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor1} alt="Sponsor 1" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor2} alt="Sponsor 2" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor5} alt="Sponsor 5" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor1} alt="Sponsor 1" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor2} alt="Sponsor 2" width={150} height={150} />
          </Box>
          <Box className="sponsor-card-wrapper">
            <Image src={sponsor5} alt="Sponsor 5" width={150} height={150} />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Partners;
