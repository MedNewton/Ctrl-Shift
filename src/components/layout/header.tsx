"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Stack, Typography, Button, IconButton } from "@mui/material";
import theme from "@/theme/theme";

import logo from "@/assets/images/logo/Asset 192.svg?url";

import { FiSearch } from "react-icons/fi";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuContentItem,
} from "@/components/generic/navigationMenu";

import pillar1 from "@/assets/images/hero/pillar1.webp";
import ornanment1 from "@/assets/images/hero/ornament1.webp";
import napulethCoin1 from "@/assets/images/hero/napulEthCoin.webp";
import napulethTickets from "@/assets/images/hero/napulethTickets.webp";

export default function Header() {
    return (
        <header className="z-50 w-full bg-transparent">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-10">
                <Link href="/" className="inline-flex items-center gap-3">
                    <Image src={logo} alt="mood global services mgs logo" width={120} height={27} priority />
                </Link>

                <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} gap={1}>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="nav-pill">
                                    <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                                        Home
                                    </Typography>
                                </NavigationMenuTrigger>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="nav-pill">
                                    <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                                        Agenda
                                    </Typography>
                                </NavigationMenuTrigger>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="nav-pill">
                                    <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary}>
                                        About
                                    </Typography>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Stack direction={"row"} alignItems={"stretch"} gap={0.75}>
                                        <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1 p-0"  >
                                            <Stack minWidth={300} className="h-full" height={"100%"} gap={1.5} sx={{
                                                borderRadius: 2,
                                                paddingX: 1,
                                                paddingY: 1.5,
                                                display: "flex",
                                                flex: 1,
                                                flexGrow: 1,
                                                gap: 2,
                                            }}>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Speakers</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Find the speakers of ctrl/shift 2026.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Team</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Meet the team behind the event.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >FAQ</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Answers to common questions.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Map</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Find the location of the event.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Archive</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Previous editions of NapulETH.</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </NavigationMenuContentItem>
                                        <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1"  >
                                            <Stack minWidth={200} className="h-full" height={"100%"} gap={1.5} sx={{
                                                backgroundColor: theme.palette.brand.napulETHYellow2.main,
                                                borderRadius: 2,
                                                padding: 1,
                                                display: "flex",
                                                flex: 1,
                                                flexGrow: 1,
                                            }}>
                                                <Image src={ornanment1} alt="ornanment1" fill style={{ objectFit: "cover" }} />
                                            </Stack>
                                        </NavigationMenuContentItem>
                                    </Stack>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="nav-pill">
                                    <Typography component={"span"} variant="subtitle1" fontWeight={600} color={theme.palette.text.primary} sx={{
                                        whiteSpace: "nowrap"
                                    }}>
                                        Events
                                    </Typography>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <Stack direction={"row"} alignItems={"stretch"} gap={0.75}>
                                        <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1 p-0"  >
                                            <Stack minWidth={340} className="h-full" height={"100%"} gap={1.5} sx={{
                                                borderRadius: 2,
                                                paddingX: 1,
                                                paddingY: 1.5,
                                                display: "flex",
                                                flex: 1,
                                                flexGrow: 1,
                                                gap: 2,
                                            }}>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Meetups</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Vibrant gatherings, held monthly.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Side Events</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>To explore the Ethereum community.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Hackathon</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Build and compete for prizes.</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Stack direction={"row"} alignItems={"center"} gap={1.5}>
                                                    <Stack height={40} width={40} sx={{
                                                        backgroundColor: theme.palette.brand.napulETHGrey1.main,
                                                        borderRadius: 1,
                                                    }}>
                                                    </Stack>
                                                    <Stack gap={0.5}>
                                                        <Typography component="span" variant="subtitle1" fontWeight={600} lineHeight={1.2} >Pitch Battle</Typography>
                                                        <Typography component="span" variant="body2" lineHeight={1.2} color={theme.palette.text.secondary}>Present your ideas and get rewarded.</Typography>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </NavigationMenuContentItem>
                                        <NavigationMenuContentItem href="/services/smart-contracts" className="flex flex-1"  >
                                            <Stack minWidth={200} className="h-full" height={"100%"} gap={1.5} sx={{
                                                backgroundColor: theme.palette.brand.napulETHYellow1.main,
                                                borderRadius: 2,
                                                padding: 1,
                                                display: "flex",
                                                flex: 1,
                                                flexGrow: 1,
                                            }}>
                                                <Image src={pillar1} alt="pillar1" fill style={{ objectFit: "cover" }} />
                                            </Stack>
                                        </NavigationMenuContentItem>
                                    </Stack>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                        <Button variant="contained" color="primary" sx={{
                            borderRadius: "10rem",
                            backgroundColor: theme.palette.brand.napulETHYellow2.main,
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: theme.palette.brand.napulETHYellow1.main,
                                boxShadow: "none",
                            }
                        }}>
                            <Typography component={"span"} variant="subtitle2" fontWeight={600} color={theme.palette.background.default}>
                                Get Your Tickets
                            </Typography>
                        </Button>
                        <IconButton sx={{
                            backgroundColor: theme.palette.brand.napulETHYellow2.main,
                            borderRadius: "50%",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: theme.palette.brand.napulETHYellow1.main,
                                boxShadow: "none",
                            }
                        }}>
                            <FiSearch color={theme.palette.background.default} size={18} />
                        </IconButton>
                    </Stack>
                </Stack>


            </div>
        </header>
    );
}
