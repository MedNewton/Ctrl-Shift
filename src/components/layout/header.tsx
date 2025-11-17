"use client";

import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Stack, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import theme from "@/theme/theme";

import logo from "@/assets/images/logo/Asset 190.svg?url";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuContentItem,
} from "@/components/generic/navigationMenu";

import pillar1 from "@/assets/images/hero/pillar1.webp";
import ornanment1 from "@/assets/images/hero/ornament1.webp";
import map1 from "@/assets/images/hero/map1.webp";
import napulethCoin1 from "@/assets/images/hero/napulEthCoin.webp";
import wifi1 from "@/assets/images/hero/wifi1.webp";
import { useState } from "react";

export default function Header() {

    const [hoveredAboutItem, setHoveredAboutItem] = useState<number>(0);
    const isReduced = useReducedMotion();
    const aboutPreview: Record<number, StaticImageData> = {
        0: ornanment1,
        1: ornanment1,
        2: pillar1,
        3: wifi1,
        4: map1,
        5: napulethCoin1,
    };

    return (
        <header className="z-999 w-full bg-transparent hidden md:block">
            <motion.div
                initial={isReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                animate={{ opacity: 1, marginTop: 0 }}
                transition={{ duration: isReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative z-120"
            >
                <Stack
                    marginX={"auto"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={1}
                    paddingX={6}
                    className="h-20 max-w-7xl"
                >
                    <Stack sx={{
                        width: "25%",
                    }}>
                        <Link href="/" className="inline-flex items-center gap-3" style={{
                            width: "fit-content"
                        }}>
                            <Image src={logo} alt="mood global services mgs logo" width={120} height={27} priority />
                        </Link>
                    </Stack>

                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={1} width={"50%"}>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="nav-pill">
                                        <Link href="/" className="inline-flex items-center gap-3">
                                            <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                                                Home
                                            </Typography>
                                        </Link>
                                    </NavigationMenuTrigger>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="nav-pill">
                                        <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                                            About
                                        </Typography>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <Stack direction={"row"} alignItems={"stretch"} gap={0.75}>
                                            <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1 p-0"  >
                                                <Stack minWidth={300} className="h-full" height={"100%"} gap={1.5} sx={{
                                                    borderRadius: 2,
                                                    paddingX: 1,
                                                    paddingY: 1.5,
                                                    display: "flex",
                                                    flex: 1,
                                                    flexGrow: 1,
                                                    gap: 2,
                                                }}>
                                                    <Stack direction={"row"} alignItems={"center"} gap={1.5} component={"div"} onMouseEnter={() => {
                                                        setHoveredAboutItem(1);
                                                    }} onMouseLeave={() => {
                                                        setHoveredAboutItem(0);
                                                    }}>
                                                        <Stack gap={0.5}>
                                                            <Typography component="p" variant="subtitle1" fontWeight={600} lineHeight={1.2} >
                                                                Speakers
                                                                <span style={{
                                                                    color: theme.palette.grey[900],
                                                                    backgroundColor: theme.palette.grey[700],
                                                                    padding: "2px 4px",
                                                                    borderRadius: 20,
                                                                    fontSize: 12,
                                                                    marginLeft: 3,
                                                                    fontWeight: 500,
                                                                }}>Coming Soon
                                                                </span>
                                                            </Typography>
                                                            <Typography component="p" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Find the speakers of ctrl/shift 2026.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} gap={1.5} component={"div"} onMouseEnter={() => {
                                                        setHoveredAboutItem(2);
                                                    }} onMouseLeave={() => {
                                                        setHoveredAboutItem(0);
                                                    }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.location.href = "/team";
                                                        }}
                                                    >
                                                        <Stack gap={0.5}>
                                                            <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Team</Typography>
                                                            <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Meet the team behind the event.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} gap={1.5} onMouseEnter={() => {
                                                        setHoveredAboutItem(4);
                                                    }} onMouseLeave={() => {
                                                        setHoveredAboutItem(0);
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = "https://maps.app.goo.gl/eXBj6TjTjL6Haj4HA";
                                                    }}
                                                    >
                                                        <Stack gap={0.5}>
                                                        <Typography component="p" variant="subtitle1" fontWeight={600} lineHeight={1.2} >
                                                                Event Location
                                                            </Typography>                                                            
                                                            <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Find the location of the event.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} gap={1.5} onMouseEnter={() => {
                                                        setHoveredAboutItem(5);
                                                    }} onMouseLeave={() => {
                                                        setHoveredAboutItem(0);
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = "/archive/2025";
                                                    }}
                                                    >
                                                        <Stack gap={0.5}>
                                                            <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Archive 2025</Typography>
                                                            <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Previous editions of NapulETH.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack direction={"row"} alignItems={"center"} gap={1.5} onMouseEnter={() => {
                                                        setHoveredAboutItem(5);
                                                    }} onMouseLeave={() => {
                                                        setHoveredAboutItem(0);
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = "https://www.napuleth.org/archive/2024";
                                                    }}
                                                    >
                                                        <Stack gap={0.5}>
                                                            <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Archive 2024</Typography>
                                                            <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Previous editions of NapulETH.</Typography>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </NavigationMenuContentItem>
                                            <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1">
                                                <Stack
                                                    minWidth={200}
                                                    className="h-full"
                                                    height="100%"
                                                    sx={{
                                                        position: "relative",
                                                        transition: "background-color 300ms cubic-bezier(0.22, 1, 0.36, 1)", // keep your eased bg
                                                        backgroundColor: theme.palette.brand.napulETHYellow2.main,
                                                        borderRadius: 2,
                                                        display: "flex",
                                                        flex: 1,
                                                        overflow: "hidden", // clip the fade
                                                    }}
                                                >
                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={hoveredAboutItem} // triggers crossfade when the state changes
                                                            initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={isReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                                            transition={{
                                                                duration: isReduced ? 0.15 : 0.28,
                                                                ease: [0.22, 1, 0.36, 1], // same vibe as your bg easing
                                                            }}
                                                            style={{
                                                                position: "absolute",
                                                                inset: 0,
                                                                borderRadius: 8,
                                                                overflow: "hidden",
                                                                willChange: "opacity, transform",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Image
                                                                src={aboutPreview[hoveredAboutItem]}
                                                                alt="about preview"
                                                                fill={hoveredAboutItem != 4 && hoveredAboutItem != 5 ? true : false}
                                                                style={{
                                                                    objectFit: hoveredAboutItem === 4 ? "contain" : "cover",
                                                                    marginLeft: hoveredAboutItem === 4 ? "-5%" : hoveredAboutItem === 5 ? "-2%" : "auto",
                                                                }}
                                                                priority={false}
                                                            />
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </Stack>
                                            </NavigationMenuContentItem>

                                        </Stack>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </Stack>

                    <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} gap={1} sx={{
                        width: "25%",
                    }}>
                        <Stack
                            component="div"
                            onClick={() => {
                                window.open('https://x.com/napuleth', '_blank');
                            }}
                            sx={{
                                cursor: "pointer",
                                padding: 1.2,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                position: "relative",
                                backgroundColor: "rgba(255, 255, 255, 0.025)",
                                backdropFilter: "blur(4px)",
                                WebkitBackdropFilter: "blur(4px)",
                                boxShadow: `
      inset 0 1px 0px rgba(255, 255, 255, 0.35),
      0 0 9px rgba(0, 0, 0, 0.2),
      0 3px 0px rgba(0, 0, 0, 0.15)
    `,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(149, 37, 39, 0.26)",
                                    backdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                    WebkitBackdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent, transparent)",
                                    opacity: 0.7,
                                    pointerEvents: "none",
                                },
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(315deg, rgba(255, 255, 255, 0.3), transparent, transparent)",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                },
                            }}
                        >
                            <XIcon sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>
                        <Stack
                            component="div"
                            onClick={() => {
                                window.open('https://www.instagram.com/napuleth', '_blank');
                            }}
                            sx={{
                                cursor: "pointer",
                                padding: 1.2,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                position: "relative",
                                backgroundColor: "rgba(255, 255, 255, 0.025)",
                                backdropFilter: "blur(4px)",
                                WebkitBackdropFilter: "blur(4px)",
                                boxShadow: `
      inset 0 1px 0px rgba(255, 255, 255, 0.35),
      0 0 9px rgba(0, 0, 0, 0.2),
      0 3px 0px rgba(0, 0, 0, 0.15)
    `,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(149, 37, 39, 0.26)",
                                    backdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                    WebkitBackdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent, transparent)",
                                    opacity: 0.7,
                                    pointerEvents: "none",
                                },
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(315deg, rgba(255, 255, 255, 0.3), transparent, transparent)",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                },
                            }}
                        >
                            <InstagramIcon sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>
                        <Stack
                            component="div"
                            onClick={() => {
                                window.open('https://www.linkedin.com/company/napul-eth/?originalSubdomain=it', '_blank');
                            }}
                            sx={{
                                cursor: "pointer",
                                padding: 1.2,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                position: "relative",
                                backgroundColor: "rgba(255, 255, 255, 0.025)",
                                backdropFilter: "blur(4px)",
                                WebkitBackdropFilter: "blur(4px)",
                                boxShadow: `
      inset 0 1px 0px rgba(255, 255, 255, 0.35),
      0 0 9px rgba(0, 0, 0, 0.2),
      0 3px 0px rgba(0, 0, 0, 0.15)
    `,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(149, 37, 39, 0.26)",
                                    backdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                    WebkitBackdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent, transparent)",
                                    opacity: 0.7,
                                    pointerEvents: "none",
                                },
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(315deg, rgba(255, 255, 255, 0.3), transparent, transparent)",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                },
                            }}
                        >
                            <LinkedInIcon sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>
                        <Stack
                            component="div"
                            onClick={() => {
                                window.open('https://t.me/napuleth', '_blank');
                            }}
                            sx={{
                                cursor: "pointer",
                                padding: 1.2,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                position: "relative",
                                backgroundColor: "rgba(255, 255, 255, 0.025)",
                                backdropFilter: "blur(4px)",
                                WebkitBackdropFilter: "blur(4px)",
                                boxShadow: `
      inset 0 1px 0px rgba(255, 255, 255, 0.35),
      0 0 9px rgba(0, 0, 0, 0.2),
      0 3px 0px rgba(0, 0, 0, 0.15)
    `,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(149, 37, 39, 0.26)",
                                    backdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                    WebkitBackdropFilter: "blur(12px) saturate(150%) contrast(125%)",
                                },
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent, transparent)",
                                    opacity: 0.7,
                                    pointerEvents: "none",
                                },
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(315deg, rgba(255, 255, 255, 0.3), transparent, transparent)",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                },
                            }}
                        >
                            <TelegramIcon sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                        </Stack>

                    </Stack>
                </Stack>
            </motion.div>

        </header>
    );
}
