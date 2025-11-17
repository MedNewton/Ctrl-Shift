"use client";

import { Stack } from "@mui/material";
import GlassAnimatedHero from "@/sections/home/GlassAnimatedHero";
import About from "@/sections/home/about";
import LastVersionStackedCardsSection from "@/sections/home/lastVersionStackedCards";
import LastVersionStatsSection from "@/sections/home/lastVersionStatsSection";
import Speakers from "@/sections/home/speakers";
import Sponsors from "@/sections/home/sponsors";
import Partners from "@/sections/home/partners";
import Visions from "@/sections/home/visions";
import HackathonBanner from "@/sections/home/hackathonBanner";
import EthFamily from "@/sections/home/ethFamily";
import Footer from "@/components/layout/footer";

import MobileAbout from "@/sections/home/mobile/about";
import Topics from "@/sections/home/topics";



export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
      zIndex: 0,
      overflow: "visible",
    }}>
      <GlassAnimatedHero />
      <About />
      <MobileAbout />
      <Stack
        minHeight={{ xs: "70vh", md: "50vh" }}
        direction={"row"}
        alignItems={"stretch"}
        justifyContent={"center"}
        gap={3}
        width={"100%"}
        px={8}
      >
        <Topics />
        <HackathonBanner />
      </Stack>
      <LastVersionStackedCardsSection />
      <LastVersionStatsSection />
      <Speakers />
      <Sponsors />
      <Partners />
      <EthFamily />
      <Footer />
    </Stack>
  );
}
