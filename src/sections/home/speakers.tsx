"use client";

import { Box, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExampleSpeaker from "@/assets/images/speakers/exammple1.webp";
import SpeakerCard, {
  type SpeakerCardHoverPayload,
} from "@/components/home/speakers/speakerCard";

gsap.registerPlugin(ScrollTrigger);

const Speakers = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      const cardInners = Array.from(
        sectionElement.querySelectorAll<HTMLDivElement>(".speaker-card-inner")
      );

      if (!titleElement || cardInners.length === 0) {
        return;
      }

      // Make sure scaling is anchored on the left
      gsap.set(cardInners, {
        transformOrigin: "left center",
      });

      // Timeline that plays with easing (not scrubbed)
      const tl = gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
        })
        .fromTo(
          titleElement,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1 }
        )
        .fromTo(
          cardInners,
          {
            opacity: 0,
            scaleX: 0,
          },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.4,
            // small delay so it feels more “visible”
            delay: 0.6,
          },
          // start slightly overlapping with the end of the title animation
          "-=0.1"
        );

      ScrollTrigger.create({
        trigger: sectionElement,
        // Start the animation earlier as you scroll in
        start: "top 80%", // adjust up/down to taste
        end: "top 30%",
        animation: tl,
        // replay the animation every time you enter the section
        toggleActions: "restart none restart none",
        invalidateOnRefresh: true,
      });
    }, sectionRef);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(sectionElement);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    const timeoutId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Helper factory so types stay correct
  const makeHoverHandler =
    (index: number) =>
    (_payload: SpeakerCardHoverPayload): void => {
      setHoveredIndex(index);
    };

  const handleLeave = (): void => {
    setHoveredIndex(null);
  };

  const speakers = Array.from({ length: 7 });

  return (
    <Stack
      ref={sectionRef}
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
          ref={titleRef}
          variant="h1"
          color={theme.palette.primary.main}
          fontWeight={600}
          mb={6}
        >
          Speakers
        </Typography>

        {/* Flex row instead of Grid, so we can smoothly resize columns */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          flexWrap="wrap"
          gap={1}
          sx={{ mt: 2 }}
        >
          {speakers.map((_, index) => {
            // Flex ratios:
            // - no hover: all 1
            // - hover: hovered = 2, others = 0.75
            const flexValue =
              hoveredIndex === null
                ? 1
                : hoveredIndex === index
                ? 2
                : 0.75;

            return (
              <Box
                key={index}
                sx={{
                  flex: flexValue,
                  minWidth: 0,
                  transition:
                    "flex 260ms cubic-bezier(.2,.7,.2,1)",
                  // height is defined by the card's aspectRatio, so stays intact
                }}
              >
                <SpeakerCard
                  name={`Speaker ${index + 1}`}
                  title="Role • Company"
                  image={ExampleSpeaker}
                  onHover={makeHoverHandler(index)}
                  onLeave={handleLeave}
                />
              </Box>
            );
          })}
        </Stack>
        
      </Box>
    </Stack>
  );
};

export default Speakers;
