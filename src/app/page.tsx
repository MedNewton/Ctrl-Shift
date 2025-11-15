"use client";

import { Stack } from "@mui/material";
import GlassAnimatedHero from "@/sections/home/GlassAnimatedHero";
import About from "@/sections/home/about";
import LastVersionStackedCardsSection from "@/sections/home/lastVersionStackedCards";
import LastVersionStatsSection from "@/sections/home/lastVersionStatsSection";
import Speakers from "@/sections/home/speakers";
import Sponsors from "@/sections/home/sponsors";
import Partners from "@/sections/home/partners";
import Footer from "@/components/layout/footer";

export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
      zIndex: 0,
      overflow: "visible",
    }}>
      <GlassAnimatedHero />
      <About />
      <LastVersionStackedCardsSection />
      <LastVersionStatsSection />
      <Speakers />
      <Sponsors />
      <Partners />
      <Footer />
    </Stack>
  );
}
