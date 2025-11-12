"use client";

import { Stack } from "@mui/material";
import GlassAnimatedHero from "@/sections/home/GlassAnimatedHero";


export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} gap={4} position={"relative"} sx={{
      zIndex: 0,
    }}>
      <GlassAnimatedHero />
    </Stack>
  );
}
