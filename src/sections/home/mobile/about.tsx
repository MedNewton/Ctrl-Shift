"use client";

import type { FC } from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import theme from "@/theme/theme";

import CallMadeIcon from "@mui/icons-material/CallMade";
import aboutAsset1 from "@/assets/images/about/aboutAsset1.svg?url";
import aboutAsset2 from "@/assets/images/about/aboutAsset2.svg?url";
import aboutAsset3 from "@/assets/images/about/aboutAsset3.svg?url";
import NapulethLogo from "@/assets/images/about/napulethLogo.webp";
import CtrlShiftLogo from "@/assets/images/logo/Asset 302.svg?url";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const MobileAbout: FC = () => {
  return (
    <Stack
      width="100%"
      position="relative"
      sx={{
        zIndex: 0,
        px: 2,
        py: 4,
        isolation: "isolate",
        display: { xs: "flex", md: "none" },
        gap: 6,
      }}
    >
      {/* Intro block */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <Stack gap={1}>
          <Stack
            gap={0.5}
          >
            <Typography
              variant="h6"
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
              variant="h6"
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
          <Typography
            variant="h5"
            fontWeight={500}
            lineHeight={1.6}
          >
            <br />Ctrl/Shift 2026 is the moment our identity expands.
            <br />What started as a spark in Web3 now unfolds into a wider constellation— AI, Quantum Computing, blockchain, and the technologies that bend the horizon.
            <br />This year, thinkers and builders gather not just to speak, but to experiment, to collide, to imagine.
            <br />Institutions, researchers, creators, and protocols meet under one roof to trace new patterns, uncover hidden connections,and turn emerging ideas into living, breathing experiences.
            <br />
            <br />
            A shift in scale.
            <br />A shift in ambition.
            <br />A shift in what’s possible.
            <br />
            <br />
            Welcome to the new chapter.
          </Typography>
        </Stack>
      </motion.div>

      {/* Cards column */}
      <Stack gap={4}>
        {/* Sponsor block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          style={{ width: "100%" }}
        >
          <Stack
            width="100%"
            gap={3}
            pr={4}
            mb={16}
          >
            <Box
              width="40%"
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
                  sx={{ opacity: 0.6, width: "100%" }}
                >
                  Become a sponsor and get the opportunity to showcase your brand
                  to a global audience.
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
                    boxShadow: "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
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
        </motion.div>

        {/* Speaker block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          style={{ width: "100%" }}
        >
          <Stack
            width="100%"
            gap={3}
            pr={4}
            mb={16}
          >
            <Box
              width="40%"
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
                  sx={{ opacity: 0.6, width: "100%" }}
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
                    boxShadow: "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
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
        </motion.div>

        {/* Agenda block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          style={{ width: "100%" }}
        >
          <Stack
            width="100%"
            gap={3}
            pr={4}
            mb={4}
          >
            <Box
              width="40%"
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
                  sx={{ opacity: 0.6, width: "100%" }}
                >
                  Explore the event agenda and find the best talks, panels,
                  workshops & more.
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
                    boxShadow: "inset 0px 1.25px 1.25px rgba(255, 255, 255, 0.24)",
                    borderColor: "transparent",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography component="span" variant="subtitle1" fontWeight={600}>
                    Coming Soon...
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Stack>
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default MobileAbout;
