"use client";

import theme from "@/theme/theme";
import { Box, Stack, Typography, Link as MuiLink, IconButton, Link } from "@mui/material";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

const socialIcons = [
    { Icon: XIcon, label: "X (Twitter)", href: "https://x.com/napulETH" },
    { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com/napulETH" },
    { Icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/company/napulETH" },
    { Icon: TelegramIcon, label: "Telegram", href: "https://t.me/napulETH" },
];

const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: false, amount: 0.2 }); // once: false for re-animation

    // Animation variants with proper typing
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
                delayChildren: 0.8,
            },
        },
    };

    const circleVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.43, 0.13, 0.23, 0.96],
            },
        },
    };

    const columnsContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 1.3,
            },
        },
    };

    const columnVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: [0.43, 0.13, 0.23, 0.96],
            },
        },
    };

    const bottomVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
                delay: 1.8,
            },
        },
    };

    return (
        <Box
            ref={footerRef}
            component="footer"
            sx={{
                width: "100%",
                height: "80vh",
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                px: { xs: 3, md: 10 },
                py: { xs: 4, md: 6 },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* === TOP BAR (bar left, circles right) ============================= */}
            <Box
                sx={{
                    width: "100%",
                    mb: { xs: 6, md: 10 },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                >
                    {/* Animated line */}
                    <Box
                        sx={{
                            flex: 1,
                            height: 4,
                            mr: 4,
                            overflow: "hidden",
                            bgcolor: "transparent", // Changed from theme.palette.text.primary
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

                    {/* Animated circles */}
                    <motion.div
                        variants={circlesContainerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        style={{ display: "flex", gap: "16px", alignItems: "center" }}
                    >
                        {socialIcons.map(({ Icon, label, href }, i) => (
                            <motion.div
                                key={`social-${i}`}
                                variants={circleVariants}
                            >
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

            {/* === MAIN CONTENT: columns ======================================= */}
            <Box sx={{ flex: 1 }}>
                <motion.div
                    variants={columnsContainerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ width: "100%", display: "flex" }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        alignItems="flex-start"
                        justifyContent={{ xs: "flex-start", md: "space-between" }}
                        spacing={{ xs: 6, md: 6 }}
                        sx={{ width: "100%" }}
                    >
                        {/* ABOUT US */}
                        <motion.div variants={columnVariants} style={{ flex: 1, minWidth: 160 }}>
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

                                <Stack spacing={1.2}>
                                    {[{ label: "Team", href: "/team" }, { label: "Location", href: "/" }, { label: "Archive 2025", href: "https://www.napuleth.org/archive/2025" }, { label: "Archive 2024", href: "https://www.napuleth.org/archive/2024" }].map((item) => (
                                        <motion.div key={item.label} variants={itemVariants}>
                                            <Link href={item.href} key={item.href} underline="none">
                                                <Typography
                                                    sx={{
                                                        fontSize: { xs: 26, md: 24 },
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

                        {/* EVENT */}
                        <motion.div variants={columnVariants} style={{ flex: 1, minWidth: 160 }}>
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
                                            Event
                                        </Typography>
                                    </Stack>
                                </motion.div>

                                <Stack spacing={1.2}>
                                    {[
                                        "Agenda",
                                        "Workshops",
                                        "Hackathon",
                                        "Meetups",
                                        "Side Events",
                                    ].map((item) => (
                                        <motion.div key={item} variants={itemVariants}>
                                            <Typography
                                                sx={{
                                                    fontSize: { xs: 26, md: 24 },
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </motion.div>
                                    ))}
                                </Stack>
                            </Stack>
                        </motion.div>

                        {/* JOIN US */}
                        <motion.div variants={columnVariants} style={{ flex: 1, minWidth: 160 }}>
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

                                <Stack spacing={1.2}>
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
                                                        fontSize: { xs: 26, md: 24 },
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

                        {/* CONTACT US + LOCATION */}
                        <motion.div variants={columnVariants} style={{ flex: 1.2, minWidth: 240 }}>
                            <Stack spacing={6}>
                                {/* Contact us */}
                                <motion.div variants={itemVariants}>
                                    <Stack spacing={2}>
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

                                        <Stack spacing={0.7}>
                                            <Typography sx={{ fontSize: 15 }}>
                                                8 - 14 June 2026
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </motion.div>

                                {/* Location */}
                                <motion.div variants={itemVariants}>
                                    <Stack spacing={2}>
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

                                        <Stack spacing={0.7}>
                                            <Typography sx={{ fontSize: 15, maxWidth: 360 }}>
                                                Villa Doria D&apos;Angri, Via Francesco Petrarca,
                                            </Typography>
                                            <Typography sx={{ fontSize: 15, maxWidth: 360 }}>
                                                80, 80123 Napoli NA
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </motion.div>
                            </Stack>
                        </motion.div>
                    </Stack>
                </motion.div>
            </Box>

            {/* === BOTTOM ROW =================================================== */}
            <motion.div
                variants={bottomVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ width: "100%", marginTop: 16 }}
            >
                <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack width="100%" alignItems="center">
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a", textAlign: "center" }}>
                            © All rights reserved - Ctrl/Shift 2026
                        </Typography>
                    </Stack>
                </Stack>
            </motion.div>
        </Box>
    );
};

export default Footer;