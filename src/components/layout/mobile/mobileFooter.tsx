"use client";

import { useRef, type FC } from "react";
import {
    Box,
    Stack,
    Typography,
    Link as MuiLink,
    IconButton,
    Link,
} from "@mui/material";
import { motion, useInView, type Variants } from "framer-motion";
import theme from "@/theme/theme";

import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";

const socialIcons = [
    { Icon: XIcon, label: "X (Twitter)", href: "https://x.com/napulETH" },
    { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/napulETH" },
    { Icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/company/napulETH" },
    { Icon: TelegramIcon, label: "Telegram", href: "https://t.me/napulETH" },
];

const barVariants: Variants = {
    hidden: { width: 0 },
    visible: {
        width: "100%",
        transition: {
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    },
};

const circlesContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.6,
        },
    },
};

const circleVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.35,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    },
};

const columnsContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 1.0,
        },
    },
};

const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.43, 0.13, 0.23, 0.96],
        },
    },
};

const bottomVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.45,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: 1.5,
        },
    },
};

const MobileFooter: FC = () => {
    const footerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(footerRef, { once: false, amount: 0.2 });

    return (
        <Box
            ref={footerRef}
            component="footer"
            sx={{
                width: "100%",
                minHeight: "90dvh",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                px: 3,
                py: 4,
                display: "flex",
                flexDirection: "column",
                gap: 4,
            }}
        >
            <Box sx={{ width: "100%" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            height: 4,
                            mr: 2,
                            overflow: "hidden",
                            bgcolor: "transparent",
                        }}
                    >
                        <motion.div
                            variants={barVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{
                                height: "100%",
                                backgroundColor: theme.palette.text.primary,
                            }}
                        />
                    </Box>

                    <motion.div
                        variants={circlesContainerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        style={{ display: "flex", gap: 12, alignItems: "center" }}
                    >
                        {socialIcons.map(({ Icon, label, href }, i) => (
                            <motion.div key={`social-${i}`} variants={circleVariants}>
                                <Stack
                                    component="div"
                                    onClick={() => {
                                        window.open(href, '_blank');
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
                                    <Icon component={Icon} sx={{ fontSize: 20, color: theme.palette.text.primary }} />
                                </Stack>
                            </motion.div>
                        ))}
                    </motion.div>
                </Stack>
            </Box>

            <Box sx={{ flex: 1 }}>
                <motion.div
                    variants={columnsContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ width: "100%" }}
                >
                    <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
                        <Stack direction="row" spacing={3} sx={{ width: "100%" }}>
                            <motion.div variants={columnVariants} style={{ flex: 1 }}>
                                <Stack spacing={2}>
                                    <motion.div variants={itemVariants}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    bgcolor: theme.palette.brand.napulETHRed.main,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.12em",
                                                    color: theme.palette.text.secondary,
                                                }}
                                            >
                                                About us
                                            </Typography>
                                        </Stack>
                                    </motion.div>

                                    <Stack spacing={0.8}>
                                        {[
                                            { label: "Team", href: "/team" },
                                            { label: "Location", href: "/" },
                                            { label: "Archive 2025", href: "https://www.napuleth.org/archive/2025" },
                                            { label: "Archive 2024", href: "https://www.napuleth.org/archive/2024" },
                                        ].map((item) => (
                                            <motion.div key={item.label} variants={itemVariants}>
                                                <Link href={item.href} underline="none">
                                                    <Typography
                                                        sx={{
                                                            fontSize: 20,
                                                            fontWeight: 500,
                                                            "&:hover": {
                                                                color: theme.palette.text.secondary,
                                                            },
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </Stack>
                                </Stack>
                            </motion.div>

                            <motion.div variants={columnVariants} style={{ flex: 1 }}>
                                <Stack spacing={2}>
                                    <motion.div variants={itemVariants}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    bgcolor: theme.palette.brand.napulETHRed.main,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.12em",
                                                    color: theme.palette.text.secondary,
                                                }}
                                            >
                                                Join Us
                                            </Typography>
                                        </Stack>
                                    </motion.div>

                                    <Stack spacing={0.8}>
                                        {[
                                            { label: "Sponsors us", href: "https://docsend.com/view/zaw8ij7k9avkcg6z" },
                                            { label: "Join as a speaker", href: "https://docsend.com/view/zaw8ij7k9avkcg6z" },
                                            { label: "Text us", href: "https://t.me/napulETH" },
                                            { label: "Volunteers", href: "https://t.me/napulETH" },
                                        ].map((item) => (
                                            <motion.div key={item.label} variants={itemVariants}>
                                                <Link href={item.href} underline="none">
                                                    <Typography
                                                        sx={{
                                                            fontSize: 20,
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Typography>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </Stack>
                                </Stack>
                            </motion.div>
                        </Stack>

                        <motion.div variants={columnVariants}>
                            <Stack spacing={2}>
                                <motion.div variants={itemVariants}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                bgcolor: theme.palette.brand.napulETHRed.main,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                textTransform: "uppercase",
                                                letterSpacing: "0.12em",
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            Date
                                        </Typography>
                                    </Stack>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Stack spacing={0.7}>
                                        <Typography sx={{ fontSize: 15 }}>
                                            8 - 14 June 2026
                                        </Typography>
                                    </Stack>
                                </motion.div>
                            </Stack>
                        </motion.div>

                        <motion.div variants={columnVariants}>
                            <Stack spacing={2}>
                                <motion.div variants={itemVariants}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                bgcolor: theme.palette.brand.napulETHRed.main,
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                textTransform: "uppercase",
                                                letterSpacing: "0.12em",
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            Location
                                        </Typography>
                                    </Stack>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Link
                                    href="https://www.google.com/maps?rlz=1C1GCEA_enMA1157MA1157&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQLhiABDIGCAIQRRhAMgYIAxBFGDkyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyEwgHEC4YrwEYxwEYgAQYmAUYmQXSAQgxNjYzajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=ma&sa=X&geocode=KSVSUD5UCTsTMWR_h4VL9kmF&daddr=Via+Francesco+Petrarca,+80,+80123+Napoli+NA,+%D8%A5%D9%8A%D8%B7%D8%A7%D9%84%D9%8A%D8%A7"
                                    underline="none"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    >
                                    <Stack spacing={0.7}>
                                        <Typography sx={{ fontSize: 15 }}>
                                            Villa Doria D&apos;Angri, Via Francesco Petrarca,
                                        </Typography>
                                        <Typography sx={{ fontSize: 15 }}>
                                            80, 80123 Napoli NA
                                        </Typography>
                                    </Stack>
                                    </Link>
                                </motion.div>
                            </Stack>
                        </motion.div>
                    </Stack>
                </motion.div>
            </Box>

            <motion.div
                variants={bottomVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ width: "100%" }}
            >
                <Stack direction="column" alignItems="center" spacing={2} sx={{ width: "100%", pb: 2 }}>
                    <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                        © All rights reserved - Ctrl/Shift 2026
                    </Typography>
                </Stack>
            </motion.div>
        </Box>
    );
};

export default MobileFooter;
