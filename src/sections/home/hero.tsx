"use client";

import { Box, Stack, Typography, type TypographyProps } from "@mui/material";
import theme from "@/theme/theme";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion, useReducedMotion } from "motion/react";
import AnimatedHeroGraphic from "@/components/home/hero/animatedHeroGraphic";

function WordReveal({
  text,
  variant = "h2",
  color,
  fontWeight = 600,
  delay = 0,
  align = "center",
}: {
  text: string;
  variant: TypographyProps["variant"];
  color?: string;
  fontWeight?: number;
  delay?: number;
  align?: "center" | "left" | "right";
}) {
  const isReduced = useReducedMotion();
  const words = text.split(" ").map((w, i) => ({ w, key: `${w}-${i}` }));

  return (
    <Typography
      component="div"
      variant={variant}
      fontWeight={fontWeight}
      color={color}
      lineHeight={1.2}
      sx={{ display: "flex", flexWrap: "wrap", gap: "0.4ch", textAlign: `${align} !important` }}
    >
      {words.map(({ w, key }, idx) => (
        <motion.span
          key={key}
          style={{ display: "inline-block", whiteSpace: "pre-wrap", textAlign: align }}
          initial={isReduced ? { opacity: 0 } : { y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + idx * (isReduced ? 0 : 0.06),
            duration: isReduced ? 0.2 : 0.5,
            ease: "easeOut",
          }}
        >
          {w}
        </motion.span>
      ))}
    </Typography>
  );
}

export default function Hero() {
  const isReduced = useReducedMotion();

  const tImage = 0.0;
  const tTitles = tImage + 0.7;
  const tCta = tTitles + 0.9;
  const tMetric = tCta + 0.15;
  const tNews = tMetric + 0.15;

  return (
    <Stack
      width="100%"
      minHeight="90vh"
      gap={4}
      pt={10}
      className="max-w-7xl mx-auto"
      px={16}
      position="relative"
      overflow="hidden"
    >


      <Stack gap={2} alignItems={"center"} sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: tNews, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.5}
            width="fit-content"
            sx={{
              backgroundColor: theme.palette.brand.napulETHYellow2.main,
              borderRadius: "10rem",
              px: 1.5,
            }}
          >
            <Typography variant="caption" fontWeight={600} color={theme.palette.info.main}>
              Subscription to our hackathon is now open
            </Typography>
            <Typography variant="h6" color={theme.palette.info.main}>
              &bull;
            </Typography>
            <Typography variant="caption" fontWeight={400} color={theme.palette.info.main}>
              Learn more
            </Typography>
            <LiaLongArrowAltRightSolid size={16} color={theme.palette.background.default} />
          </Stack>
        </motion.div>

        <Stack width={"75%"} alignItems={"center"}>
          <WordReveal text="The Biggest Blockchain Event in Southern Italy" variant="h3" delay={tTitles} align="center" />
        </Stack>
        <WordReveal
          text="Talks, Panels, Workshops, and more."
          variant="h6"
          color={theme.palette.text.primary}
          delay={tTitles}
        />
      </Stack>

      <motion.div
        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: tCta, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1}
          width="fit-content"
          sx={{
            border: `0.5px solid ${theme.palette.grey[400]}`,
            borderRadius: "10rem",
            px: 1.5,
            py: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            Get Your Tickets
          </Typography>
          <HiOutlineArrowRight size={16} strokeWidth={2} />
        </Stack>
      </motion.div>

      <motion.div
        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: tMetric, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1} width="fit-content">
          <Box
            sx={{
              width: 7,
              height: 7,
              backgroundColor: theme.palette.brand.napulETHYellow2.main,
              borderRadius: "50%",
            }}
          />
          <Stack direction="row" alignItems="center" gap={0.5}>
            <Typography variant="body2" fontWeight={400} color={theme.palette.text.primary}>
              Villa D&apos;Angri - Naples, Italy
            </Typography>
          </Stack>
        </Stack>
      </motion.div>
    </Stack>
  );
}
