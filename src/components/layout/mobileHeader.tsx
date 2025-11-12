"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconButton, Stack } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";
import theme from "@/theme/theme";

import logo from "@/assets/images/logo/Asset 190.svg?url";
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { useState } from "react";

export default function MobileHeader() {

    const isReduced = useReducedMotion();

    return (
        <header className="z-50 w-full bg-transparent flex md:hidden">
            <motion.div
                initial={isReduced ? { opacity: 0 } : { opacity: 0, marginTop: 14 }}
                animate={{ opacity: 1, marginTop: 0 }}
                transition={{ duration: isReduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="relative z-120 w-full"
            >
                <Stack
                    direction={"row"}
                    width="100%"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={1}
                    paddingX={2.5}
                    paddingY={2}
                >
                    <Link href="/" className="inline-flex items-center gap-3">
                        <Image src={logo} alt="mood global services mgs logo" width={120} height={27} priority />
                    </Link>

                    <IconButton 
                    aria-label="open menu"
                    onClick={() => console.log("open menu")}
                    sx={{
                        padding: 0,
                    }}
                    >
                        <DragHandleIcon sx={{
                            fontSize: 40,
                            color: theme.palette.primary.main,
                        }} />
                    </IconButton>
                </Stack>
            </motion.div>

        </header>
    );
}
