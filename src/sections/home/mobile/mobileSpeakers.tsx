"use client";

import { type FC, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import theme from "@/theme/theme";

import ExampleSpeaker from "@/assets/images/speakers/speakerPoster.webp";
import SpeakerCard, {
  type SpeakerCardHoverPayload,
} from "@/components/home/speakers/speakerCard";

const speakers = Array.from({ length: 1 });

const sectionVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};


const MobileSpeakers: FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const makeHoverHandler =
    (index: number) =>
    (_payload: SpeakerCardHoverPayload): void => {
      setHoveredIndex(index);
    };

  const handleLeave = (): void => {
    setHoveredIndex(null);
  };

  return (
    <Stack
      component="section"
      width="100%"
      sx={{
        position: "relative",
        px: 3,
        py: 6,
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        isolation: "isolate",
        display: { xs: "flex", md: "none" }, // mobile-only
      }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }} // animate once when section enters view
        style={{ width: "100%" }}
      >
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520, mx: "auto" }}>
          {/* Title */}
          <motion.div variants={titleVariants}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="h2"
                color={theme.palette.primary.main}
                fontWeight={600}
                mb={4}
                sx={{
                  fontSize: "2.4rem",
                }}
              >
                Speakers
              </Typography>
              <NorthEastIcon
                sx={{
                  fontSize: 26,
                  color: theme.palette.text.primary,
                }}
              />
            </Stack>
          </motion.div>

          {/* Cards */}
          <motion.div variants={cardsContainerVariants}>
            <Stack
              direction="column"
              gap={2}
              sx={{
                mt: 1,
              }}
            >
              {speakers.map((_, index) => {
                const isHovered = hoveredIndex === index;
                const isSomeoneHovered = hoveredIndex !== null;

                let flexValue = 1;
                if (isSomeoneHovered) {
                  flexValue = isHovered ? 1.1 : 0.9;
                }

                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    style={{ width: "100%" }}
                  >
                    <Box
                      sx={{
                        flex: flexValue,
                        minWidth: "100%",
                        transition: "flex 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                        transform: isHovered
                          ? "translateY(-4px)"
                          : "translateY(0)",
                        transitionProperty: "flex, transform",
                        willChange: "flex, transform",
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
                  </motion.div>
                );
              })}
            </Stack>
          </motion.div>
        </Box>
      </motion.div>
    </Stack>
  );
};

export default MobileSpeakers;
