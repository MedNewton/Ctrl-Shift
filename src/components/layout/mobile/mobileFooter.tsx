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
                minHeight: "100vh",
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
                                <IconButton
                                    component={motion.a}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    sx={{
                                        width: 36,
                                        height: 36,
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
                                    <Icon sx={{ fontSize: 18 }} />
                                </IconButton>
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
                                            { label: "Speakers", href: "/" },
                                            { label: "Team", href: "/team" },
                                            { label: "Map", href: "/" },
                                            { label: "Faq", href: "/" },
                                            { label: "Archive", href: "https://www.napuleth.org/archive/2025" },
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
                                                Event
                                            </Typography>
                                        </Stack>
                                    </motion.div>

                                    <Stack spacing={0.8}>
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
                                                        fontSize: 20,
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
                        </Stack>

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
                                                Visions
                                            </Typography>
                                        </Stack>
                                    </motion.div>

                                    <Stack spacing={0.8}>
                                        {["Exhibition", "Manifesto", "Artworks", "Artists", "Archive"].map(
                                            (item) => (
                                                <motion.div key={item} variants={itemVariants}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: 20,
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
                                            "Tickets",
                                            "Join as a speaker",
                                            "Sponsor us",
                                            "Partner with us",
                                            "Volunteers",
                                        ].map((item) => (
                                            <motion.div key={item} variants={itemVariants}>
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
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
                                            Contact us
                                        </Typography>
                                    </Stack>
                                </motion.div>

                                <motion.div variants={itemVariants}>
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
                                    <Stack spacing={0.7}>
                                        <Typography sx={{ fontSize: 15 }}>
                                            Villa Doria D&apos;Angri, Via Francesco Petrarca,
                                        </Typography>
                                        <Typography sx={{ fontSize: 15 }}>
                                            80, 80123 Napoli NA
                                        </Typography>
                                    </Stack>
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
                <Stack direction="column" alignItems="center" spacing={2} sx={{ width: "100%", py: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
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
                    <Typography sx={{ fontSize: 13, color: "#8a8a8a" }}>
                        © All rights reserved - Ctrl/Shift 2026
                    </Typography>


                </Stack>
            </motion.div>
        </Box>
    );
};

export default MobileFooter;
