'use client';

import React, { useLayoutEffect, useRef } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Assets
import ornament1 from "@/assets/svg/svgOrnament3.svg?url";
import ornament2 from "@/assets/svg/svgOrnament2.svg?url";
import ornament3 from "@/assets/svg/svgOrnament2.svg?url";
import ornament4 from "@/assets/svg/svgOrnament3.svg?url";

/** Split a string into word spans so we can stagger them with GSAP (no plugin needed) */
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
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Typography>
  );
}

export default function YourMoney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // start states (gentle motion)
      gsap.set(".ym-title-word", { autoAlpha: 0, y: 12 });
      gsap.set(".ornament", { autoAlpha: 0, y: 16 });

      // timeline: title words → ornaments; replays on each re-entry
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
          },
          defaults: { ease: "power3.out" },
        })
        .to(".ym-title-word", {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.02, // tiny gap = smoother
        })
        .to(
          ".ornament",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
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
          text="Your money, your choice."
          containerClass="ym-title"
          wordClass="ym-title-word"
          typoProps={{
            variant: "h3",
            fontWeight: 700,
            sx: { fontSize: "2rem !important" },
          }}
        />
      </Stack>

      <Grid container spacing={8}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CardBox>
            <Image
              src={ornament1}
              alt="Earn"
              width={200}
              height={200}
              className="ornament"
              style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
            />
            <TileCopy title="Earn" subtitle="Earn interest lending out assets." />
          </CardBox>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CardBox>
            <Image
              src={ornament2}
              alt="Swap"
              width={200}
              height={200}
              className="ornament"
              style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
            />
            <TileCopy title="Swap" subtitle="Trade tokens quickly and securely." />
          </CardBox>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CardBox>
            <Image
              src={ornament3}
              alt="Save"
              width={200}
              height={200}
              className="ornament"
              style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
            />
            <TileCopy title="Save" subtitle="Build a safer, steadier balance." />
          </CardBox>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CardBox>
            <Image
              src={ornament4}
              alt="Health"
              width={200}
              height={200}
              className="ornament"
              style={{ position: "absolute", top: 0, right: 0, scale: 2 }}
            />
            <TileCopy title="Health" subtitle="Track spending and stay on target." />
          </CardBox>
        </Grid>
      </Grid>
    </Stack>
  );
}

/** Helpers to keep JSX tidy */
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
