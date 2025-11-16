"use client";

import { useRef } from "react";
import { Stack, Grid, Typography, Divider } from "@mui/material";
import { motion, useInView } from "framer-motion";
import theme from "@/theme/theme";
import { TeamMembersList, type TeamMember } from "@/data/team";
import Image from "next/image";
import Header from "@/components/layout/header";
import MobileHeader from "@/components/layout/mobileHeader";
import MobileFooter from "@/components/layout/mobile/mobileFooter";

const TeamCard = ({
    member,
    index
}: {
    member: TeamMember;
    index: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.name}>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.15,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
            >
                <Stack gap={2}>
                    <Divider sx={{
                        borderBottom: `2px solid ${theme.palette.text.primary}`,
                    }} />
                    <Stack direction={"row"} gap={0.5} alignItems={"center"}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {member.name}
                        </Typography>
                        <Typography variant="caption" fontWeight={500}>
                            &nbsp;&#9679;&nbsp;
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={300}>
                            {member.position}
                        </Typography>
                    </Stack>
                    <Stack width={"100%"} position={"relative"} sx={{
                        aspectRatio: "3/4",
                        backgroundColor: "red",
                        overflow: "hidden",
                    }}>
                        <Image src={member.image} alt={member.name} fill style={{ objectFit: "cover" }} />
                    </Stack>
                </Stack>
            </motion.div>
        </Grid>
    );
};

export default function Home() {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

    return (
        <Stack width={"100%"} alignItems={"center"} position={"relative"} sx={{
            zIndex: 0,
            overflow: "visible",
        }}>
            <Stack
                width="100%"
                height="fit-content"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 6,
                    display: { xs: "flex", md: "none" },
                }}
            >
                <MobileHeader />
            </Stack>
            <Stack
                ref={headerRef}
                width={"100%"}
                direction={"column"}
                gap={2}
                px={2}
                pt={14}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                >
                    <Typography
                        variant="h1"
                        color={theme.palette.primary.main}
                        fontWeight={600}
                        mb={{ xs: 2, md: 6 }}
                        sx={{
                            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                        }}
                    >
                        Meet Our Team
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                >
                    <Stack width={"100%"} gap={2}>
                        <Typography variant="body1" fontWeight={300} fontSize={16}>
                            The Ethereum ecosystem constantly talks about onboarding the masses, yet conferences are filled with the same familiar faces—marketing officers, lead developers, and ambassadors. While their insights are valuable, these events risk becoming echo chambers.
                        </Typography>
                        <Typography variant="body1" fontWeight={300} fontSize={16}>
                            To truly break this loop, we need to offer real incentives for those unfamiliar with web3 to join in. Our goal is to bring genuinely new faces into the Ethereum community by creating accessible, high-profile events. If you share this vision, NapulETH Open Village is for you.
                        </Typography>
                    </Stack>
                </motion.div>
            </Stack>

            <Grid
                container
                spacing={6}
                sx={{
                    width: "100%",
                    px: 2,
                    pt: 10,
                    pb: 6,
                }}
            >
                {TeamMembersList.map((member, index) => (
                    <TeamCard
                        key={member.name}
                        member={member}
                        index={index}
                    />
                ))}
            </Grid>
            <MobileFooter />
        </Stack>
    );
}