'use client';

import React, { useLayoutEffect, useRef } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Assets
import ornament1 from "@/assets/images/hero/ornament1.webp";
import ornament2 from "@/assets/svg/svgOrnament2.svg?url";
import ornament3 from "@/assets/svg/svgOrnament3.svg?url";

/** Split words for staggered animation (no plugin) */
function SplitWords({
  text,
  typoProps,
  containerClass,
  wordClass,
}: {
  text: string;
  typoProps: React.ComponentProps<typeof Typography>;
  containerClass: string;
  wordClass: string;
}) {
  const words = text.split(" ");
  return (
    <Typography {...typoProps} className={containerClass}>
      {words.map((w, i) => (
        <React.Fragment key={`${w}-${i}`}>
          <span
            className={wordClass}
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Typography>
  );
}

export default function GHO() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // gentler starting state
      gsap.set(".gho-title-word", { autoAlpha: 0, y: 12 });
      gsap.set(".gho-subtitle-word", { autoAlpha: 0, y: 12 });
      gsap.set(".ornament", { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" }, // smoother ease
      });

      // Title (very small stagger) → Subtitle (very small stagger) → Ornaments
      tl.to(".gho-title-word", {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.025, // tiny gap = smoother
      })
        .to(
          ".gho-subtitle-word",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02, // even tighter
          },
          "-=0.18"
        )
        .to(
          ".ornament",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.1"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      className="max-w-7xl mx-auto"
      alignItems="center"
      px={6}
      mb={4}
      gap={4}
      position="relative"
      overflow="hidden"
    >
      <Stack width="100%" gap={1}>
        <SplitWords
          text="GHO, the new stablecoin."
          containerClass="gho-title"
          wordClass="gho-title-word"
          typoProps={{
            variant: "h3",
            fontWeight: 700,
            sx: { fontSize: "2rem !important" },
          }}
        />
        <SplitWords
          text="GHO is a decentralized stablecoin powered by Aave."
          containerClass="gho-subtitle"
          wordClass="gho-subtitle-word"
          typoProps={{
            variant: "subtitle1",
            fontWeight: 500,
            sx: { opacity: 0.7 },
          }}
        />
      </Stack>

      <Grid container spacing={4} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.brand.napulETHRed.main,
              borderRadius: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={ornament1}
              alt="GHO"
              fill
              className="ornament"
              style={{ objectFit: "cover" }}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Stack gap={2}>
            <CardBox>
              <Image
                src={ornament2}
                alt="Swap"
                width={200}
                height={200}
                className="ornament"
                style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
              />
              <TileCopy title="GHO" subtitle="The new stablecoin." />
            </CardBox>

            <CardBox>
              <Image
                src={ornament3}
                alt="Swap"
                width={200}
                height={200}
                className="ornament"
                style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
              />
              <TileCopy title="GHO" subtitle="The new stablecoin." />
            </CardBox>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

/** Helpers */
function CardBox({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      width="100%"
      justifyContent="end"
      minHeight={260}
      sx={{
        backgroundColor: theme.palette.brand.napulETHRed.main,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      {children}
    </Stack>
  );
}

function TileCopy({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="subtitle1" fontWeight={500} sx={{ opacity: 0.7 }}>
        {subtitle}
      </Typography>
    </Stack>
  );
}
