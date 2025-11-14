import { Stack, Box, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FractalGlassOverlay from "@/components/home/hero/FractalGlassOverlay";
import Header from "@/components/layout/header";
import MobileHeader from "@/components/layout/mobileHeader";
import GlowButton from "@/components/ui/glowButton";
import BlackButton from "@/components/ui/blackButton";
import StylishPill from "@/components/home/hero/stylishPill";

import bars from "@/assets/svg/bars.svg?url";
import HeroCircuit from "@/assets/images/hero/circuit.png";



const LOOP_SECONDS = 44;
const PULSE_SECONDS = 6.5;

const GlassAnimatedHero = () => {
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
            <Box
                component={motion.div}
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    width: { xs: "200%", md: "200%" },
                    height: "100%",
                    zIndex: 0,
                    opacity: { xs: 0.75, md: 1 },
                }}
                animate={prefersReduced ? undefined : { x: ["0%", "-50%", "0%", "-40%", "0%"] }}
                transition={
                    prefersReduced
                        ? undefined
                        : { duration: LOOP_SECONDS, ease: "linear", repeat: Infinity }
                }
            >
                <Box
                    component={motion.div}
                    sx={{ position: "relative", width: "50%", height: "100%" }}
                    style={{ transformOrigin: "bottom" }}
                    initial={{ scaleY: 0.7 }}
                >
                    <Image
                        src={bars}
                        alt="bars"
                        fill
                        priority
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </Box>

                <Box
                    component={motion.div}
                    sx={{ position: "relative", width: "50%", height: "100%", opacity: { xs: 0.85, md: 1 } }}
                    style={{ transformOrigin: "bottom" }}
                    initial={{ scaleY: 0.7 }}
                    animate={prefersReduced ? undefined : { scaleY: [0.55, 0.8, 0.55] }}
                    transition={
                        prefersReduced
                            ? undefined
                            : { duration: PULSE_SECONDS, ease: "easeInOut", repeat: Infinity }
                    }
                >
                    <Image
                        src={bars}
                        alt="bars"
                        fill
                        priority
                        style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                </Box>
            </Box>

            <FractalGlassOverlay />

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
                animation: "circuit-animation 10s linear infinite",
                "@keyframes circuit-animation": {
                    "0%": {
                        opacity: 0.45,
                    },
                    "50%": {
                        opacity: 0.35,
                    },
                    "100%": {
                        opacity: 0.45,
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
                    display: { xs: "none", md: "flex" },
                }}
            >
                <Header />
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
                    display: { xs: "flex", md: "none" },
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
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    className="relative"
                >
                    <StylishPill />
                </motion.div>

                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                    animate={{ opacity: 1, marginTop: 0 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                    className="relative w-full"
                >
                    <Stack width={{ xs: "85%", md: "35%" }} alignItems={"center"} justifyContent={"center"} marginX={"auto"} gap={2}>
                        <Typography variant="h3" component="h3" fontWeight={600} textAlign={"center"}>
                            The biggest Web3 event in southern Italy
                        </Typography>
                        <Typography variant="h6" component="h6" fontWeight={500} textAlign={"center"} sx={{
                            width: { xs: "85%", md: "100%" },
                        }}>
                            17-19 September, Villa Doria D’Angri, Naples, Italy
                        </Typography>
                    </Stack>
                </motion.div>

                <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                    animate={{ opacity: 1, marginTop: 6 }}
                    transition={{ duration: prefersReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    className="relative"
                >
                    <Stack direction={"row"} gap={2}>
                        <GlowButton sx={{
                            paddingX: 3,
                            paddingY: 1,
                        }}>
                            <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                                Get Your Tickets
                            </Typography>
                        </GlowButton>
                        <BlackButton sx={{
                            paddingX: 3,
                            paddingY: 1,
                        }}>
                            <Typography component={"span"} variant="subtitle1" fontWeight={600}>
                                See Our Agenda
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

export default GlassAnimatedHero;
