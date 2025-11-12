import { Stack, Box, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FractalGlassOverlay from "@/components/home/hero/FractalGlassOverlay";
import Header from "@/components/layout/header";
import GlowButton from "@/components/ui/glowButton";
import BlackButton from "@/components/ui/blackButton";
import StylishPill from "@/components/home/hero/stylishPill";

import bars from "@/assets/svg/bars.svg?url";



const LOOP_SECONDS = 26;
const PULSE_SECONDS = 6.5;

const GlassAnimatedHero = () => {
    const prefersReduced = useReducedMotion();

    return (
        <Stack
            width="100%"
            minHeight={{ xs: "100dvh", md: "100vh" }}
            height={{xs: "100dvh", md: "fit-content"}}
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
                    width: { xs: "480%", md: "200%" },
                    height: "100%",
                    zIndex: 0,
                    opacity: { xs: 0.75, md: 1 },
                }}
                animate={prefersReduced ? undefined : { x: ["0%", "0%"] }}
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
                    sx={{ position: "relative", width: "50%", height: "100%" }}
                    style={{ transformOrigin: "bottom" }}
                    initial={{ scaleY: 0.7 }}
                    animate={
                        prefersReduced ? undefined : { scaleY: [0.67, 0.73, 0.67] }
                    }
                    transition={
                        prefersReduced
                            ? undefined
                            : {
                                duration: PULSE_SECONDS,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: PULSE_SECONDS / 2,
                            }
                    }
                >
                    <Image
                        src={bars}
                        alt="bars duplicate"
                        fill
                        priority
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                    />
                </Box>
            </Box>

            <FractalGlassOverlay />

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
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 5,
                    gap: 4,
                    marginY: "auto",
                    transform: { xs: "translateY(-10%)", md: "translateY(0%)" },
                }}
            >
                <StylishPill />
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
            </Stack>
        </Stack>
    );
};

export default GlassAnimatedHero;
