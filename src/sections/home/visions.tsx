'use client';

import { Box, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";

import visionsAssets from "@/assets/images/visions/asset.webp";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function Visions() {

    const containerRef = useRef<HTMLDivElement>(null);
    const titleArrowRef = useRef<SVGSVGElement>(null);
    const arrowAnimationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            if (titleArrowRef.current) {
                arrowAnimationRef.current = gsap.fromTo(
                    titleArrowRef.current,
                    {
                        x: -40,
                        y: 40,
                        opacity: 0,
                    },
                    {
                        x: 40,
                        y: -40,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'none',
                        paused: true,
                        repeat: -1,
                        repeatDelay: 0.2,
                        keyframes: {
                            '0%': { x: -40, y: 40, opacity: 0 },
                            '25%': { x: 0, y: 0, opacity: 1 },
                            '75%': { x: 0, y: 0, opacity: 1 },
                            '100%': { x: 40, y: -40, opacity: 0 },
                        },
                    }
                );
            }
        }, containerRef);

        return () => {
            if (arrowAnimationRef.current) {
                arrowAnimationRef.current.kill();
            }
            ctx.revert();
        };
    }, []);

    const handleMouseEnter = () => {
        if (arrowAnimationRef.current) {
            arrowAnimationRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (arrowAnimationRef.current) {
            arrowAnimationRef.current.pause();
            gsap.to(titleArrowRef.current, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.3,
            });
        }
    };

    return (
        <Stack
            ref={containerRef}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            width="50%"
            flexGrow={1}
            justifyContent="center"
            position="relative"
            sx={{
                background: "linear-gradient(180deg, #942629 0%, #2E0C0D 100%)",
                mt: 6,
                mx: "auto",
                mb: 4,
                borderRadius: 4,
                py: 4,
                px: 4,
                overflow: "hidden",
            }}
        >
            {/* Image - animates first */}
            <Stack
                component={motion.div}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, ease: "easeOut" }
                    }
                }}
                width="100%"
                alignItems="center"
                position="absolute"
                sx={{ 
                    zIndex: 1,
                    top: "20%", 
                    right: "-36%",
                    animation: "float 20s ease-in-out infinite",
                    '@keyframes float': {
                        '0%': { transform: 'translateY(-10%)' },
                        '50%': { transform: 'translateY(-5%)' },
                        '100%': { transform: 'translateY(-10%)' },
                    },
                }}
            >
                <Image src={visionsAssets} alt="Visions" width={350} height={350} />
            </Stack>

            {/* Title - animates second */}
            <Stack
                component={motion.div}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
                    }
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    '&:hover .subtitle-text': {
                        color: theme.palette.text.primary,
                    },
                    '&:hover .title-text': {
                        color: theme.palette.text.secondary,
                    },
                }}
            >
                <Typography
                    className="subtitle-text"
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        color: theme.palette.text.secondary,
                        transition: 'color 0.3s ease',
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    Art Exhibition
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={2}
                    sx={{
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Typography
                        className="title-text"
                        variant="h3"
                        sx={{
                            fontWeight: 600,
                            transition: 'color 0.3s ease',
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        Visions 2026
                    </Typography>
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: 32, md: 40 },
                            height: { xs: 32, md: 40 },
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <NorthEastIcon
                            ref={titleArrowRef}
                            sx={{
                                fontSize: { xs: 32, md: 40 },
                                position: 'absolute',
                            }}
                        />
                    </Box>
                </Stack>
            </Stack>

            {/* Text - animates last */}
            <Typography
                component={motion.p}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
                    }
                }}
                variant="subtitle1"
                fontWeight={500}
                color={theme.palette.text.primary}
                sx={{
                    width: { xs: '90%', md: '75%' },
                    mt: { xs: 2, md: 0 },
                    transform: 'translateY(-20%)',
                    position: "relative",
                    zIndex: 2,
                }}
            >
                The exhibition Napuleth visions, through key concepts such as hybridization, concrescence and crystallization, explores how the process of &quot;dematerialization&quot; of value relates to the production of meaning in art, showing how the aesthetic and economic dimensions are constantly evolving, shaped by a network of interconnected actors.
            </Typography>
        </Stack>
    )
}