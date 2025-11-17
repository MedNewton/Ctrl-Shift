"use client";

import { Stack } from "@mui/material";
import MobileGlassAnimatedHero from "@/sections/home/mobile/mobileGlassAnimatedHero";
import MobileAbout from "@/sections/home/mobile/about";
import MobileLastVersionStackedCardsSection from "@/sections/home/mobile/mobileLastVersionStackedCardsSection";
import MobileLastVersionStatsSection from "@/sections/home/mobile/mobileLastVersionStatsSection";
import MobileSpeakers from "@/sections/home/mobile/mobileSpeakers";
import MobileSponsors from "@/sections/home/mobile/mobileSponsors";
import MobilePartners from "@/sections/home/mobile/mobilePartners";
import MobileVisions from "@/sections/home/mobile/mobileVisions";
import MobileHackathonBanner from "@/sections/home/mobile/mobileHackathonBanner";
import MobileEthFamily from "@/sections/home/mobile/mobileEthFamily";
import MobileFooter from "@/components/layout/mobile/mobileFooter";

export default function Home() {

    return (
        <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
            zIndex: 0,
            overflow: "visible",
        }}>
            <MobileGlassAnimatedHero />
            <MobileAbout />
            <Stack px={2} width={"100%"} alignItems={"center"} justifyContent={"center"}>
                <MobileHackathonBanner />
                <MobileVisions />
            </Stack>
            <MobileLastVersionStackedCardsSection />
            <MobileLastVersionStatsSection />
            <MobileSpeakers />
            <MobileSponsors />
            <MobilePartners />
            <MobileFooter />
        </Stack>
    );
}
