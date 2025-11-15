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
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      const cardWrappers = Array.from(
        sectionElement.querySelectorAll<HTMLDivElement>(".speaker-card-wrapper")
      );

      if (!titleElement || cardWrappers.length === 0) {
        return;
      }

      // Set initial states
      gsap.set(titleElement, { opacity: 0, y: 30 });
      gsap.set(cardWrappers, { 
        opacity: 0, 
        y: 40,
        scale: 0.95,
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 75%",
          end: "bottom 25%", // Changed from "top 25%" to "bottom 25%"
          toggleActions: "play reverse play reverse", // Changed to reverse both ways
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

    // Refresh ScrollTrigger on resize
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(sectionElement);

    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, []);

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
        px: { xs: 4, md: 8 },
        py: { xs: 6, md: 8 },
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        isolation: "isolate",
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
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
          }}
        >
          Speakers
        </Typography>

        <Stack
          ref={cardsContainerRef}
          direction={{ xs: "column", md: "row" }}
          flexWrap="wrap"
          gap={{ xs: 2, md: 1 }}
          sx={{ mt: 2 }}
        >
          {speakers.map((_, index) => {
            // Calculate flex values with smoother transitions
            const isHovered = hoveredIndex === index;
            const isSomeoneHovered = hoveredIndex !== null;
            
            let flexValue = 1;
            if (isSomeoneHovered) {
              flexValue = isHovered ? 2.2 : 0.7;
            }

            return (
              <Box
                key={index}
                className="speaker-card-wrapper"
                sx={{
                  flex: flexValue,
                  minWidth: { xs: '100%', md: 0 },
                  transition: "flex 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                  // Add subtle transform on hover for depth
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transitionProperty: 'flex, transform',
                  willChange: 'flex, transform',
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