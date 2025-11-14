"use client";

import { Stack } from "@mui/material";
import theme from "@/theme/theme";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

export interface SpeakerCardHoverPayload {
  el: HTMLDivElement;
  name: string;
  title: string;
}

interface SpeakerCardProps {
  name: string;
  title: string;
  image: StaticImageData;
  onHover?: (p: SpeakerCardHoverPayload) => void;
  onLeave?: () => void;
}

const SpeakerCard = ({ name, title, image, onHover, onLeave }: SpeakerCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <Stack
      ref={cardRef}
      className="speaker-card"
      direction="column"
      alignItems="center"
      justifyContent="end"
      gap={2}
      p={1}
      onMouseEnter={() => {
        if (cardRef.current) onHover?.({ el: cardRef.current, name, title });
      }}
      onMouseLeave={() => onLeave?.()}
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
        src={image}
        alt={name}
        className="speaker-image"
        fill
        style={{ objectFit: "cover" }}
      />
    </Stack>
  );
};

export default SpeakerCard;
