"use client";

import { Stack } from "@mui/material";
import GlassAnimatedHero from "@/sections/home/GlassAnimatedHero";
import MobileAbout from "@/sections/home/mobile/about";
import MobileLastVersionStackedCardsSection from "@/sections/home/mobile/mobileLastVersionStackedCardsSection";
import MobileLastVersionStatsSection from "@/sections/home/mobile/mobileLastVersionStatsSection";
import MobileSpeakers from "@/sections/home/mobile/mobileSpeakers";
import MobileSponsors from "@/sections/home/mobile/mobileSponsors";
import MobilePartners from "@/sections/home/mobile/mobilePartners";
import HackathonBanner from "@/sections/home/hackathonBanner";
import MobileFooter from "@/components/layout/mobile/mobileFooter";




export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
      zIndex: 0,
      overflow: "visible",
    }}>
      <MobileAbout />
      <MobileLastVersionStackedCardsSection />
      <MobileLastVersionStatsSection />
      <MobileSpeakers />
      <MobileSponsors />
      <MobilePartners />
      <MobileFooter />
    </Stack>
  );
}
