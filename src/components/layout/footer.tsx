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
    { Icon: XIcon, label: "X (Twitter)", href: "https://twitter.com" },
    { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
    { Icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
    { Icon: TelegramIcon, label: "Telegram", href: "https://t.me" },
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
                height: "100vh",
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
                                <IconButton
                                    component={motion.a}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: `2px solid ${theme.palette.text.primary}`,
                                        borderRadius: "50%",
                                        backgroundColor: "transparent",
                                        color: theme.palette.text.primary,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: theme.palette.brand.napulETHRed.main,
                                            borderColor: theme.palette.brand.napulETHRed.main,
                                            color: theme.palette.text.primary,
                                        },
                                    }}
                                >
                                    <Icon sx={{ fontSize: 20 }} />
                                </IconButton>
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
                        spacing={{ xs: 6, md: 0 }}
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
                                    {[{ label: "Speakers", href: "/speakers" }, { label: "Team", href: "/team" }, { label: "Map", href: "/map" }, { label: "Faq", href: "/faq" }, { label: "Archive", href: "/archive" }].map((item) => (
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
                                        "Mettups",
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

                        {/* VISIONS */}
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
                                            Visons
                                        </Typography>
                                    </Stack>
                                </motion.div>

                                <Stack spacing={1.2}>
                                    {["Exhibition", "Manifesto", "Artworks", "Artists", "Archive"].map(
                                        (item) => (
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
                                        )
                                    )}
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
                                        "Tickets",
                                        "Join as a speaker",
                                        "Sponsor us",
                                        "Partner with us",
                                        "Volunteers",
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
                                                Contact us
                                            </Typography>
                                        </Stack>

                                        <Stack spacing={0.7}>
                                            <Typography sx={{ fontSize: 15 }}>
                                                +1 980 971-24-19
                                            </Typography>
                                            <MuiLink
                                                href="#"
                                                underline="none"
                                                sx={{ color: "inherit", fontSize: 15 }}
                                            >
                                                contact@ctrlshift.com
                                            </MuiLink>
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
                    <Stack width="25%">
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                            © All rights reserved - Ctrl/Shift 2026
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        width="50%"
                    >
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                            Privacy Policy
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                            Terms & Conditions
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                            Cookie Policy
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={3}
                        alignItems="center"
                        justifyContent="end"
                        width="25%"
                    >
                        <Typography sx={{ fontSize: 13 }}>English</Typography>
                        <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>Italian</Typography>
                    </Stack>
                </Stack>
            </motion.div>
        </Box>
    );
};

export default Footer;