// components/Sections/Topics.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { Box, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RowSpec = {
  topics: string[];
  speed: number;
  direction: "left" | "right";
};

const TAGS = [
  "AI", "Art", "Blockchain", "Business", "Crypto", "DeFi", "Design", "Economy",
  "Education", "EVM", "Finance", "Game Theory", "Gaming", "IoT", "IT", "Legal",
  "Marketing", "Media", "Music", "Network", "NFT", "Privacy", "Quantum", "RWA",
  "Security", "Tokenomics", "Trading", "UX", "Web3", "ZK Proofs",
];

// split evenly into N rows in reading order
function splitIntoRows<T>(items: T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => []);
  items.forEach((item, i) => out[i % rows].push(item));
  return out;
}

const rowsFromTags = splitIntoRows(TAGS, 3);

const ROWS: RowSpec[] = [
  { topics: rowsFromTags[0], speed: 34, direction: "left" },
  { topics: rowsFromTags[1], speed: 44, direction: "left" },
  { topics: rowsFromTags[2], speed: 30, direction: "left" },
];

// ---- Copy for the word-by-word reveal ----
const TRACKS_COPY =
  "Ctrl/Shift 2026 spotlights tracks spanning Builders & Protocols, DeFi/Tokenomics, Privacy & ZK, AI × Web3, Security, Gaming & Metaverse, Culture/Media & NFTs, and Legal/Governance. Expect crisp talks, hands-on workshops, and live demos that turn research into production—so you leave with code, partners, and a clear roadmap to ship what’s next.";

export default function Topics() {
  const [play, setPlay] = useState(true);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // split text into words once
  const words = useMemo(() => {
    return TRACKS_COPY.split(" ").map((w, i) => ({ w, k: `w-${i}` }));
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setPlay(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const title = titleRef.current ?? undefined;
      const text = textRef.current ?? undefined;

      // Title: fade in from below on enter; reverse on scroll back up
      if (title) {
        gsap.set(title, { opacity: 0, y: 28, willChange: "transform,opacity" });
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
            end: "top 70%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
      }

      // Word-by-word reveal on scroll (0.2 -> 1.0), reversible
      if (text) {
        const wordEls = Array.from(
          text.querySelectorAll<HTMLElement>("[data-word]")
        );
        gsap.set(wordEls, { opacity: 0.2, willChange: "opacity" });

        gsap.to(wordEls, {
          opacity: 1,
          ease: "none",
          // tweak speed of sweep via each
          stagger: { each: 0.05, from: 0 },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",   // begin sweeping soon after entering
            end: "top 38%",     // finish as the section approaches the top
            scrub: true,        // ties to scroll; reverses cleanly
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    // ensure layout is measured after first paint
    requestAnimationFrame(() => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => ctx.revert();
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      height="100vh"
      sx={{
        position: "relative",
        backgroundColor: theme.palette.background.default, // black
        overflow: "hidden",
      }}
    >
      {/* Header row: title + paragraph */}
      <Stack
        width="100%"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Typography
          ref={titleRef}
          variant="h1"
          color={theme.palette.primary.main}
          fontWeight={600}
          sx={{
            px: { xs: 3, md: 16 },
            pt: { xs: 4, md: 8 },
            zIndex: 2,
            opacity: 0, // prevent flash before GSAP kicks in
          }}
        >
          Tracks
        </Typography>

        {/* Word-by-word reveal paragraph */}
        <Typography
          ref={textRef}
          variant="h6"
          color={theme.palette.primary.main}
          fontWeight={500}
          sx={{
            pr: { xs: 3, md: 16 },
            pl: { xs: 3, md: 8 },
            pt: { xs: 4, md: 8 },
            zIndex: 2,
            textAlign: "right",
            width: { xs: "100%", md: "50%" },
            maxWidth: 900,
            ml: "auto",
            lineHeight: 1.6,
            wordBreak: "normal",
            whiteSpace: "pre-wrap",
          }}
        >
          {words.map(({ w, k }, idx) => (
            <Box
              key={k}
              component="span"
              data-word
              sx={{ opacity: 0.2 }}
            >
              {w}
              {idx < words.length - 1 ? " " : ""}
            </Box>
          ))}
        </Typography>
      </Stack>

      {/* Bottom masked marquee zone */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: "44vh", md: "48vh" },
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          zIndex: 1,
        }}
      >
        <Stack justifyContent="flex-end" sx={{ height: "100%", gap: { xs: 0.75, md: 1 } }}>
          {ROWS.map((row, i) => (
            <LineMarquee
              key={i}
              topics={row.topics}
              speed={row.speed}
              direction={row.direction}
              play={play}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function LineMarquee({
  topics,
  speed,
  direction,
  play,
}: {
  topics: string[];
  speed: number;
  direction: "left" | "right";
  play: boolean;
}) {
  return (
    <Marquee
      play={play}
      speed={speed}
      direction={direction}
      gradient={false}
      autoFill
      pauseOnHover={false}
      style={{ lineHeight: 1.08, overflowY: "hidden" }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          fontSize: {
            xs: "clamp(16px, 5.5vw, 24px)",
            md: "clamp(22px, 3.2vw, 40px)",
          },
          fontWeight: 800,
          letterSpacing: "-0.01em",
          pr: { xs: "2vw", md: "1.5vw" },
        }}
      >
        {topics.map((t, i) => (
          <Box key={`${t}-${i}`} component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                px: { xs: "1.1vw", md: "0.75vw" }, // tight item spacing
                color: "rgba(255,255,255,0.32)",
                transform: "translateZ(0)",
                transition:
                  "opacity 160ms ease, color 160ms ease, transform 200ms cubic-bezier(.2,.7,.2,1)",
                cursor: "default",
                "&:hover": {
                  color: "rgba(255,255,255,0.96)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {t}
            </Box>
            <Box
              component="span"
              sx={{
                px: { xs: "0.65vw", md: "0.5vw" }, // even tighter slash spacing
                color: "rgba(255,255,255,0.18)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              /
            </Box>
          </Box>
        ))}
      </Box>
    </Marquee>
  );
}
