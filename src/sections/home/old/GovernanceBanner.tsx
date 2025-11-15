'use client';

import React, { useLayoutEffect, useRef } from "react";
import { Stack, Typography, Button } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Assets
import sideOrnament from "@/assets/svg/svgOrnament5.svg?url";
import centerOrnament from "@/assets/svg/svgOrnament3.svg?url";

/** Split a string into word spans (for staggered animation) */
function SplitWords({
  text,
  containerClass,
  wordClass,
  typoProps,
}: {
  text: string;
  containerClass: string;
  wordClass: string;
  typoProps: React.ComponentProps<typeof Typography>;
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

export default function GovernanceBanner() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states (start outside the banner)
      gsap.set(".orn-left",  { autoAlpha: 0, xPercent: -60, y: 0 });
      gsap.set(".orn-right", { autoAlpha: 0, xPercent:  60, y: 0 });
      gsap.set(".orn-center",{ autoAlpha: 0, yPercent:  80 });

      gsap.set(".gov-title-word", { autoAlpha: 0, y: 8 });
      gsap.set(".gov-subtitle-word", { autoAlpha: 0, y: 8 });
      gsap.set(".gov-cta", { autoAlpha: 0, y: 8, scale: 0.98 });

      // Timeline – ornaments slide in from outside → text (word-by-word) → CTA
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
        // Ornaments
        .to(".orn-left",  { autoAlpha: 1, xPercent: 0, duration: 0.7 }, 0)
        .to(".orn-right", { autoAlpha: 1, xPercent: 0, duration: 0.7 }, 0)
        .to(".orn-center",{ autoAlpha: 1, yPercent: 0, duration: 0.7 }, 0.05)
        // Title / subtitle (word-by-word)
        .to(
          ".gov-title-word",
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.02 },
          "-=0.15"
        )
        .to(
          ".gov-subtitle-word",
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.02 },
          "-=0.18"
        )
        // CTA
        .to(".gov-cta", { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 }, "-=0.1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bg = theme.palette.brand.napulETHRed?.main ?? "#9F1D20";
  const textOnBg = "#FFF3E0";

  return (
    <Stack
      ref={sectionRef}
      sx={{ width: "100%", maxWidth: "90rem", mx: "auto", px: { xs: 2, sm: 4 } }}
    >
      <Stack
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          backgroundColor: bg,
          minHeight: { xs: 320, md: 420 },
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: { xs: 3, sm: 6 },
          py: { xs: 8, md: 20 },
        }}
        gap={3}
      >
        {/* Ornaments: one per side (right mirrored), center at bottom */}
        <Image
          src={centerOrnament}
          alt="Center ornament"
          width={150}
          height={150}
          className="orn-center"
          style={{
            position: "absolute",
            bottom: "-25%",
            left: "50%",
            transform: "translateX(-50%)",
            objectFit: "contain",
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />

        <Image
          src={sideOrnament}
          alt="Left ornament"
          width={300}
          height={200}
          className="orn-left"
          style={{
            position: "absolute",
            bottom: "-35%",
            left: -0,
            transform: "scaleX(-1) rotate(-90deg)",
            objectFit: "contain",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        <Image
          src={sideOrnament}
          alt="Right ornament"
          width={300}
          height={200}
          className="orn-right"
          style={{
            position: "absolute",
            bottom: "-35%",
            right: -0,
            transform: "rotate(-90deg)",
            objectFit: "contain",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        {/* Headline */}
        <SplitWords
          text="Governed by you & 216,761 others."
          containerClass="gov-title"
          wordClass="gov-title-word"
          typoProps={{
            variant: "h3",
            fontWeight: 800,
            sx: {
              color: textOnBg,
              fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
              lineHeight: 1.2,
            },
          }}
        />

        {/* Subtitle */}
        <SplitWords
          text="AAVE token holders guide the Aave Protocol via procedures, voting, and smart contract execution."
          containerClass="gov-subtitle"
          wordClass="gov-subtitle-word"
          typoProps={{
            variant: "h6",
            fontWeight: 500,
            sx: {
              color: textOnBg,
              opacity: 0.9,
              maxWidth: 900,
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.1rem" },
            },
          }}
        />

        {/* CTA */}
        <Button
          className="gov-cta"
          component={Link}
          href="https://governance.aave.com/"
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          sx={{
            mt: 1,
            borderRadius: 999,
            px: 3,
            py: 1.25,
            backgroundColor: "#fff",
            color: bg,
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          Go to the Forum →
        </Button>
      </Stack>
    </Stack>
  );
}
