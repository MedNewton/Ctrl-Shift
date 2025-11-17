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
        <Grid size={{ xs: 6, sm: 6, md: 4 }} key={member.name}>
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
                    <Stack gap={0}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {member.name}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={300}>
                            {member.position}
                        </Typography>
                    </Stack>
                    <Stack width={"100%"} position={"relative"} sx={{
                        aspectRatio: "3/4",
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
                            At ctrl/shift, we’re builders pushing the frontier.
                            <br />Our team brings together experts in AI, Web3, and Quantum Computing, shaped by research, design, engineering, and community leadership.
                            <br />Different backgrounds, one mission:
                            <br />expand access to emerging technologies and grow a global ecosystem rooted in Naples.
                        </Typography>
                    </Stack>
                </motion.div>
            </Stack>

            <Grid
                container
                spacing={2}
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