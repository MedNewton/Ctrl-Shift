"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { usePathname } from "next/navigation";
import theme from "@/theme/theme";

import logo from "@/assets/images/logo/Asset 190.svg?url";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const menuPanelVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subListVariants: Variants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      when: "afterChildren",
    },
  },
  expanded: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
};

const subItemVariants: Variants = {
  collapsed: { opacity: 0, x: 12 },
  expanded: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ABOUT_ROUTES = ["/speakers", "/team", "/faq", "/map", "/archive"];

const ACTIVE_RED = theme.palette.brand.napulETHRed.main;

export default function MobileHeader() {
  const isReduced = useReducedMotion();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = React.useState<boolean>(false);

  const isHomeActive =
    pathname === "/" || pathname === "/mobile" || pathname === "";

  const isAboutActive =
    typeof pathname === "string" &&
    ABOUT_ROUTES.some((route) => pathname.startsWith(route));

  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (!next) setIsAboutOpen(false);
      return next;
    });
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setIsAboutOpen(false);
  };

  const toggleAbout = (): void => {
    setIsAboutOpen((prev) => !prev);
  };

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
    return;
  }, [isMenuOpen]);

  const ActiveDot = ({ active }: { active: boolean }) => (
    <Box
      sx={{
        width: 10,
        height: 10,
        mr: 1,
        borderRadius: "50%",
        bgcolor: ACTIVE_RED,
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(0.6)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    />
  );

  return (
    <>
      {/* Top bar */}
      <header className="z-50 w-full bg-transparent flex md:hidden">
        <motion.div
          initial={isReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
          animate={{ opacity: 1, marginTop: 0 }}
          transition={{
            duration: isReduced ? 0.2 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="relative z-120 w-full"
        >
          <Stack
            direction="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            paddingX={2.5}
            paddingY={2}
          >
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={logo}
                alt="ctrl/shift logo"
                width={120}
                height={27}
                priority
              />
            </Link>

            <IconButton
              aria-label={isMenuOpen ? "close menu" : "open menu"}
              onClick={toggleMenu}
              sx={{ padding: 0, zIndex: 1301 }}
            >
              {isMenuOpen ? (
                <CloseIcon
                  sx={{ fontSize: 32, color: theme.palette.primary.main }}
                />
              ) : (
                <DragHandleIcon
                  sx={{ fontSize: 40, color: theme.palette.primary.main }}
                />
              )}
            </IconButton>
          </Stack>
        </motion.div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            variants={menuPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              zIndex: 1300,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(8, 8, 8, 0.78)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                pt: 2,
                pb: 4,
                px: 3,
              }}
            >
              {/* Close icon inside menu */}
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                mb={3}
              >
                <IconButton
                  aria-label="close menu"
                  onClick={closeMenu}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <CloseIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Stack>

              {/* Navigation */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <Stack spacing={3}>
                  {/* Home */}
                  <motion.div variants={itemVariants}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Link
                        href="/"
                        onClick={closeMenu}
                        style={{ textDecoration: "none", flex: 1 }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: isHomeActive
                              ? ACTIVE_RED
                              : theme.palette.primary.main,
                            transition: "color 0.2s ease",
                          }}
                        >
                          Home
                        </Typography>
                      </Link>
                      <ActiveDot active={isHomeActive} />
                    </Stack>
                  </motion.div>

                  {/* About + subitems */}
                  <motion.div variants={itemVariants}>
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ cursor: "pointer", userSelect: "none" }}
                        onClick={toggleAbout}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: isAboutActive
                              ? ACTIVE_RED
                              : theme.palette.primary.main,
                            transition: "color 0.2s ease",
                          }}
                        >
                          About
                        </Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          {isAboutOpen ? (
                            <ExpandLessIcon
                              sx={{ color: theme.palette.text.secondary }}
                            />
                          ) : (
                            <ExpandMoreIcon
                              sx={{ color: theme.palette.text.secondary }}
                            />
                          )}
                        </Stack>
                      </Stack>

                      <AnimatePresence initial={false}>
                        {isAboutOpen && (
                          <motion.div
                            variants={subListVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            style={{ overflow: "hidden" }}
                          >
                            <Stack spacing={1.1}>
                              {[
                                { label: "Speakers", href: "/speakers" },
                                { label: "Team", href: "/team" },
                                { label: "FAQ", href: "/faq" },
                                { label: "Map", href: "/map" },
                                { label: "Archive", href: "/archive" },
                              ].map((item) => {
                                const isActive =
                                  typeof pathname === "string" &&
                                  pathname.startsWith(item.href);
                                return (
                                  <motion.div
                                    key={item.label}
                                    variants={subItemVariants}
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      justifyContent="space-between"
                                    >
                                      <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        style={{
                                          textDecoration: "none",
                                          flex: 1,
                                        }}
                                      >
                                        <Typography
                                          variant="h6"
                                          sx={{
                                            fontWeight: 500,
                                            color: isActive
                                              ? ACTIVE_RED
                                              : theme.palette.grey[600],
                                            transition: "color 0.2s ease",
                                          }}
                                        >
                                          {item.label}
                                        </Typography>
                                      </Link>
                                      <ActiveDot active={isActive} />
                                    </Stack>
                                  </motion.div>
                                );
                              })}
                            </Stack>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Stack>
                  </motion.div>
                </Stack>
              </motion.div>

              {/* Bottom area – optional */}
              <Box />
            </Box>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
