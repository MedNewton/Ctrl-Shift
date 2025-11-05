"use client";

import { Stack } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import Hero1 from "@/sections/home/hero1";
import Newsletter from "@/sections/home/newsletter";

export default function Home() {
  const isReduced = useReducedMotion();

  return (
    <Stack width={"100%"} alignItems={"center"} gap={4}>
      <Stack width={"100%"} className="max-w-7xl mx-auto px-10" borderRadius={4} overflow={"hidden"}>
        <motion.div
          initial={isReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: isReduced ? 0.2 : 0.45,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <Hero1 borderRadius={4} backgroundColor="#952527" />
        </motion.div>
      </Stack>

      <Stack width={"100%"} className="max-w-7xl mx-auto px-10" borderRadius={4} overflow={"hidden"}>
        <Newsletter />
      </Stack>
    </Stack>
  );
}
