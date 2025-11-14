// components/ui/WipeRevealParagraph.tsx
"use client";

import { Box, Typography, type TypographyProps } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import theme from "@/theme/theme";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  triggerRef: React.RefObject<HTMLElement>;
  start?: string; // when reveal starts
  end?: string;   // when fully revealed
  tyProps?: TypographyProps;
};

export default function WipeRevealParagraph({
  text,
  triggerRef,
  start = "top 80%",
  end = "top 10%",
  tyProps,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const clipRef = useRef<HTMLDivElement | null>(null);
  const whiteRef = useRef<HTMLDivElement | null>(null);

  const [fullHeight, setFullHeight] = useState<number>(0);

  // Measure white text height after layout
  useLayoutEffect(() => {
    if (!whiteRef.current) return;
    setFullHeight(whiteRef.current.getBoundingClientRect().height);
  }, [text]);

  useEffect(() => {
    const triggerEl = triggerRef.current;
    const clipEl = clipRef.current;
    if (!triggerEl || !clipEl || fullHeight === 0) return;

    // init: hidden
    gsap.set(clipEl, { height: 0, willChange: "height, transform, filter" });

    // animate height from 0 -> fullHeight; also ease a tiny y/blur to feel “ink-like”
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(clipEl, { height: fullHeight, ease: "none" }, 0)
      .fromTo(
        clipEl,
        { y: 12, filter: "blur(1.5px)" },
        { y: 0, filter: "blur(0px)", ease: "none" },
        0
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start, end, triggerRef, fullHeight]);

  return (
    <Box ref={rootRef} sx={{ position: "relative", width: "fit-content" }}>
      {/* Base gray */}
      <Typography
        {...tyProps}
        sx={{ color: theme.palette.text.secondary, ...tyProps?.sx }}
      >
        {text}
      </Typography>

      {/* White overlay clipped by animated wrapper */}
      <Box
        ref={clipRef}
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Typography
          {...tyProps}
          ref={whiteRef}
          sx={{
            color: theme.palette.common.white,
            m: 0, // ensure match
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
