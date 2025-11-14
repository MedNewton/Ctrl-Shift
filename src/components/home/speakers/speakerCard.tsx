"use client";

import { Box, Stack } from "@mui/material";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

export interface SpeakerCardHoverPayload {
  el: HTMLDivElement;
  name: string;
  title: string;
}

export interface SpeakerCardProps {
  name: string;
  title: string;
  image: StaticImageData;
  onHover?: (payload: SpeakerCardHoverPayload) => void;
  onLeave?: () => void;
}

const SpeakerCard = ({
  name,
  title,
  image,
  onHover,
  onLeave,
}: SpeakerCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <Stack
      ref={cardRef}
      className="speaker-card"
      direction="column"
      alignItems="center"
      justifyContent="flex-end"
      gap={2}
      p={0.5}
      onMouseEnter={() => {
        if (cardRef.current) {
          onHover?.({ el: cardRef.current, name, title });
        }
      }}
      onMouseLeave={() => onLeave?.()}
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fixed-height container so height stays constant */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          // height is fixed, width is flexible
          height: { xs: 260, md: 400 },
          overflow: "hidden",
          borderRadius: 1,
        }}
      >
        {/* This is the element GSAP scales from left → right */}
        <Box
          className="speaker-card-inner"
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            filter: "grayscale(100%)",
            transition: "filter 0.3s ease-in-out",
            willChange: "filter",
            backgroundImage: `url(${image.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&:hover": {
                filter: "grayscale(0%)",
            },
          }}
        >
        </Box>
      </Box>
    </Stack>
  );
};

export default SpeakerCard;
