"use client";

import { type FC } from "react";
import { Box, Stack, Typography, Grid } from "@mui/material";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import theme from "@/theme/theme";

import sponsor1 from "@/assets/images/sponsors/1.webp";
import sponsor2 from "@/assets/images/sponsors/2.webp";
import sponsor5 from "@/assets/images/sponsors/5.webp";

interface Sponsor {
  src: typeof sponsor1;
  alt: string;
}

const sponsors: Sponsor[] = [
  { src: sponsor1, alt: "Sponsor 1" },
  { src: sponsor2, alt: "Sponsor 2" },
  { src: sponsor5, alt: "Sponsor 5" },
  { src: sponsor1, alt: "Sponsor 1" },
  { src: sponsor2, alt: "Sponsor 2" },
  { src: sponsor5, alt: "Sponsor 5" },
  { src: sponsor1, alt: "Sponsor 1" },
  { src: sponsor2, alt: "Sponsor 2" },
];

const sectionVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const gridVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const MobilePartners: FC = () => {
  return (
    <Stack
      component="section"
      width="100%"
      sx={{
        position: "relative",
        px: 1,
        py: 6,
        backgroundColor: theme.palette.background.default,
        overflow: "hidden",
        isolation: "isolate",
        display: { xs: "flex", md: "none" }, // mobile-only
        "& .sponsor-card-wrapper": {
          cursor: "pointer",
        },
      }}
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        style={{ width: "100%" }}
      >
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 520, mx: "auto" }}>
          {/* Title */}
          <motion.div variants={titleVariants}>
            <Typography
              variant="h2"
              color={theme.palette.primary.main}
              fontWeight={600}
              mb={3}
              px={3}
              sx={{
                fontSize: "2.4rem",
              }}
            >
              Partners
            </Typography>
          </motion.div>

          {/* Grid of logos – 2 per row */}
          <motion.div variants={gridVariants}>
            <Grid
              container
              rowSpacing={1.5}       // tighter vertical spacing
              columnSpacing={2.5}     // comfortable horizontal spacing
              justifyContent="center"
              alignItems="center"
              px={2}
            >
              {sponsors.map((sponsor, index) => (
                <Grid size={6} key={`${sponsor.alt}-${index}`}>
                  <motion.div variants={logoVariants}>
                    <Box
                      className="sponsor-card-wrapper"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Stack width="100%" direction="row" alignItems="center" justifyContent="center" gap={2} sx={{
                        backgroundColor: "#252525",
                        paddingY: 2.5,
                        paddingX: 4,
                        borderRadius: 2,
                        boxShadow: theme.shadows[1],
                      }}>
                        <Typography variant="body1" color={theme.palette.text.primary}>
                          Your Logo Here
                        </Typography>
                      </Stack>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </motion.div>
    </Stack>
  );
};

export default MobilePartners;
