"use client";

import { Stack } from "@mui/material";
import { motion, useReducedMotion } from "motion/react";

import HeroLiquidReveal from "@/components/test/HeroLiquidReveal";
import Newsletter from "@/sections/home/newsletter";
import Testimonials from "@/sections/home/testimonials";
import YourMoney from "@/sections/home/yourMoney";
import GHO from "@/sections/home/GHO";
import GovernanceBanner from "@/sections/home/GovernanceBanner";

export default function Home() {
  const isReduced = useReducedMotion();

  return (
    <Stack width={"100%"} alignItems={"center"} gap={4} position={"relative"} sx={{
      zIndex: 0,
    }}>
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
          <HeroLiquidReveal />
        </motion.div>
      </Stack>
      <Stack width={"100%"} className="max-w-7xl mx-auto px-10" borderRadius={4} overflow={"hidden"}>
        <Newsletter />
      </Stack>
      <Stack width={"100%"} className="max-w-7xl mx-auto px-10" borderRadius={4} overflow={"hidden"}>
        <Testimonials />
      </Stack>
      <YourMoney />
      <GHO />
      <Stack width={"100%"} className="max-w-7xl mx-auto px-4" borderRadius={4} overflow={"hidden"}>
        <GovernanceBanner />
      </Stack>
      <Stack width={"100%"} className="max-w-7xl mx-auto px-4 h-40" borderRadius={4} overflow={"hidden"}>
      </Stack>
    </Stack>
  );
}
