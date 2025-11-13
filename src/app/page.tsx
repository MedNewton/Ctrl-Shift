"use client";

import { Stack } from "@mui/material";
import GlassAnimatedHero from "@/sections/home/GlassAnimatedHero";
import About from "@/sections/home/about";

export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
      zIndex: 0,
    }}>
      <GlassAnimatedHero />
      <About />
      <Stack width={"100%"} height={"100dvh"}>

      </Stack>
    </Stack>
  );
}
