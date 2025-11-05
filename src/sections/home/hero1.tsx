"use client";

import { Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion, useReducedMotion } from "motion/react";

import Image from "next/image";
import skyline from "@/assets/images/hero/skyline.webp";

export default function Hero1({ borderRadius, backgroundColor }: { borderRadius: number, backgroundColor: string }) {
    const isReduced = useReducedMotion();

    const tImage = 0.10;
    const tNews = tImage + 0.15;
    const tTitles = tImage + 0.3;
    const tCta = tTitles + 0.45;


    return (
        <Stack
            width="100%"
            minHeight="88vh"
            gap={4}
            pt={8}
            borderRadius={borderRadius}
            px={16}
            position="relative"
            overflow="hidden"
            sx={{
                backgroundColor: backgroundColor,
            }}
        >
            <Stack gap={4} alignItems={"center"} sx={{ position: "relative", zIndex: 2 }} >
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
                <Stack alignItems={"center"} gap={2}>
                    <motion.div
                        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: tTitles, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={0.5}
                            width="fit-content"
                        >
                            <Typography variant="h3" fontWeight={600} color={theme.palette.text.primary} textAlign={"center"} sx={{
                                width: "60%",
                            }}>
                                The Biggest Blockchain Event in Southern Italy
                            </Typography>
                        </Stack>
                    </motion.div>
                    <motion.div
                        initial={isReduced ? { opacity: 0 } : { y: 18, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: tTitles + 0.2, duration: isReduced ? 0.25 : 0.5, ease: "easeOut" }}
                        style={{ position: "relative", zIndex: 2 }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={0.5}
                            width="fit-content"
                        >
                            <Typography variant="h6" fontWeight={500} color={theme.palette.text.primary} textAlign={"center"} sx={{
                                width: "100%",
                            }}>
                                17-19 September 2026 | Villa D’Anri, Napoli, Italy
                            </Typography>
                        </Stack>
                    </motion.div>
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
            </Stack>
            {/* SKYLINE */}
            <Stack
                width="100%"
                position="absolute"
                sx={{ top: "70%", left: 0, right: 0 }}
            >
                <Stack
                    component={motion.div}
                    initial={isReduced ? { opacity: 0 } : { y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: tImage,
                        duration: isReduced ? 0.25 : 0.6,
                        ease: "easeOut",
                    }}
                    style={{ willChange: "transform, opacity" }}
                    position="absolute"
                    width="100%"
                    height="fit-content"
                    sx={{ top: 0, right: 0, zIndex: 1 }}
                >
                    <Image
                        src={skyline}
                        alt="skyline"
                        width={1000}
                        height={1000}
                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        priority
                    />
                </Stack>
            </Stack>

        </Stack>
    );
}
