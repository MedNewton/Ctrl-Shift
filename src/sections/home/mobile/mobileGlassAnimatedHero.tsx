"use client";

import { Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MobileHeader from "@/components/layout/mobileHeader";
import GlowButton from "@/components/ui/glowButton";
import BlackButton from "@/components/ui/blackButton";
import StylishPill from "@/components/home/hero/stylishPill";
import dynamic from "next/dynamic";

const MobileGradientWave = dynamic(() => import("@/sections/home/mobile/mobileGradientWave"), { ssr: false });

import HeroCircuit from "@/assets/images/hero/mobileCircuit.png";

const MobileGlassAnimatedHero = () => {
    const prefersReduced = useReducedMotion();

    return (
        <Stack
            width="100%"
            minHeight={{ xs: "105dvh", md: "105vh" }}
            height={{ xs: "100dvh", md: "fit-content" }}
            position="relative"
            overflow="hidden"
            sx={{ backgroundColor: theme.palette.background.default }}
        >
            {/* Gradient Wave Background */}
            <MobileGradientWave color="#942629" />

            <Stack position="absolute" sx={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 5,
                pointerEvents: "none",
                overflow: "hidden",
                opacity: 0.45,
                willChange: "opacity",
                animation: "circuit-animation 36s linear infinite",
                "@keyframes circuit-animation": {
                    "0%": {
                        opacity: 0.85,
                        transform: "translateY(-3%)",
                    },
                    "50%": {
                        opacity: 0.45,
                        transform: "translateY(0%)",
                    },
                    "100%": {
                        opacity: 0.85,
                        transform: "translateY(-3%)",
                    },
                }
            }}>
                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                >
                    <Image src={HeroCircuit} alt="Hero Circuit" fill priority style={{ objectFit: "cover" }}></Image>
                </motion.div>
            </Stack>
            <Stack
                width="100%"
                height="fit-content"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 6,
                }}
            >
                <MobileHeader />
            </Stack>

            <Stack
                width="100%"
                height="fit-content"
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 5,
                    gap: 2,
                    marginY: "auto",
                    transform: { xs: "translateY(-10%)", md: "translateY(-15%)" },
                }}
            >
                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                    animate={{ opacity: 1, marginTop: 0 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="relative"
                >
                    <StylishPill />
                </motion.div>

                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                    animate={{ opacity: 1, marginTop: 0 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="relative w-full"
                >
                    <Stack width={{ xs: "85%", md: "35%" }} alignItems={"center"} justifyContent={"center"} marginX={"auto"} gap={2}>
                        <Typography variant="h3" component="h3" fontWeight={600} textAlign={"center"}>
                            The biggest Web3 event in southern Italy
                        </Typography>
                        <Typography variant="h6" component="h6" fontWeight={500} textAlign={"center"} sx={{
                            width: { xs: "85%", md: "100%" },
                        }}>
                            17-19 September, Villa Doria D&apos;Angri, Naples, Italy
                        </Typography>
                    </Stack>
                </motion.div>

                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                    animate={{ opacity: 1, marginTop: 6 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="relative"
                >
                    <Stack direction={"row"} gap={2}>
                        <GlowButton
                            hoverText={
                                <Typography component="span" variant="subtitle1" fontWeight={600} whiteSpace={"nowrap"}>
                                    Coming Soon...
                                </Typography>
                            }
                            sx={{ paddingX: 3, paddingY: 1 }}
                        >
                            <Typography component="span" variant="subtitle1" fontWeight={600} whiteSpace={"nowrap"}>
                                Get Your Tickets
                            </Typography>
                        </GlowButton>
                        <BlackButton sx={{
                            paddingX: 3,
                            paddingY: 1,
                        }}>
                            <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                                Become a Sponsor
                            </Typography>
                        </BlackButton>
                    </Stack>
                </motion.div>
            </Stack>

            <Stack width={"100%"} height={"25vh"} sx={{
                background: "linear-gradient(180deg, rgba(11, 11, 11, 0) 0%, #0B0B0B 90%)",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 12,
            }}>
            </Stack>
        </Stack>
    );
};

export default MobileGlassAnimatedHero;