"use client";

import type { JSX } from "react";
import theme from "@/theme/theme";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import svgOrnament1 from "@/assets/svg/svgOrnament1.svg?url";
import svgOrnament2 from "@/assets/svg/svgOrnament2.svg?url";
import svgOrnament3 from "@/assets/svg/svgOrnament3.svg?url";
import svgOrnament4 from "@/assets/svg/svgOrnament4.svg?url";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseAave(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const leftInnerRef = useRef<HTMLDivElement | null>(null);

  const stRef = useRef<ScrollTrigger | null>(null);
  const roRightRef = useRef<ResizeObserver | null>(null);
  const roLeftRef = useRef<ResizeObserver | null>(null);

  const wheelTweenRef = useRef<gsap.core.Tween | null>(null);
  const leftTweenRef = useRef<gsap.core.Tween | null>(null);
  const leftAtBottomRef = useRef<boolean>(false);

  const [spacer, setSpacer] = useState<number>(0);
  const travelRef = useRef<number>(0);

  const SNAP_AT = 0.75;

const measureLeftTravel = (): number => {
    const outer = leftColRef.current;
    const inner = leftInnerRef.current;
    if (!outer || !inner) return 0;
  
    const cs = window.getComputedStyle(inner);
    const paddingBottom = parseFloat(cs.paddingBottom) || 0;
  
    const travel = Math.max(0, outer.clientHeight - inner.offsetHeight - paddingBottom);
  
    travelRef.current = travel;
    return travel;
  };
  

  const setLeftPosition = (toBottom: boolean): void => {
    const inner = leftInnerRef.current;
    if (!inner) return;
    if (leftAtBottomRef.current === toBottom) return;

    leftTweenRef.current?.kill();
    leftTweenRef.current = gsap.to(inner, {
      y: toBottom ? travelRef.current : 0,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        leftAtBottomRef.current = toBottom;
        leftTweenRef.current = null;
      },
    });
  };

  const recalc = (): void => {
    const section = sectionRef.current;
    const right = rightRef.current;
    if (!section || !right) return;

    const maxScroll = Math.max(0, right.scrollHeight - right.clientHeight);
    setSpacer(maxScroll);

    measureLeftTravel();

    stRef.current?.kill();
    wheelTweenRef.current?.kill();
    leftTweenRef.current?.kill();
    wheelTweenRef.current = null;
    leftTweenRef.current = null;

    stRef.current = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${Math.max(1, maxScroll)}`,
      pin: false,
      scrub: true,
      invalidateOnRefresh: true,
      fastScrollEnd: true,

      onUpdate: (self) => {
        const target = Math.round(self.progress * maxScroll);
        const current = right.scrollTop ?? 0;

        if (Math.abs(current - target) < 1) {
          right.scrollTop = target;
        } else {
          wheelTweenRef.current?.kill();
          wheelTweenRef.current = gsap.to(right, {
            scrollTop: target,
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => { wheelTweenRef.current = null; },
          });
        }

        setLeftPosition(self.progress >= SNAP_AT);
      },

      onEnter: (self) => {
        right.scrollTop = Math.round(self.progress * maxScroll);
        setLeftPosition(self.progress >= SNAP_AT);
      },

      onEnterBack: (self) => {
        right.scrollTop = Math.round(self.progress * maxScroll);
        setLeftPosition(self.progress >= SNAP_AT);
      },

      onLeave: () => {
        wheelTweenRef.current?.kill();
        wheelTweenRef.current = null;
        right.scrollTop = maxScroll;
        setLeftPosition(true);
      },

      onLeaveBack: () => {
        wheelTweenRef.current?.kill();
        wheelTweenRef.current = null;
        right.scrollTop = 0;
        setLeftPosition(false);
      },
    });

    ScrollTrigger.refresh();
  };

  useLayoutEffect(() => {
    recalc();
    return () => {
      stRef.current?.kill();
      wheelTweenRef.current?.kill();
      leftTweenRef.current?.kill();
      wheelTweenRef.current = null;
      leftTweenRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const right = rightRef.current;
    const leftInner = leftInnerRef.current;
    if (!right || !leftInner) return;

    const roRight = new ResizeObserver(() => recalc());
    const roLeft = new ResizeObserver(() => recalc());
    roRight.observe(right);
    roLeft.observe(leftInner);
    roRightRef.current = roRight;
    roLeftRef.current = roLeft;

    const onResize = (): void => recalc();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      roRight.disconnect();
      roLeft.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack width="100%">
      <Box
        ref={sectionRef}
        sx={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          zIndex: 1,
        }}
      >
        <Stack
          width="100%"
          className="max-w-7xl mx-auto"
          px={0}
          mb={4}
          gap={10}
          position="relative"
          overflow="hidden"
          direction="row"
          justifyContent="space-between"
          sx={{ height: "100%" }}
        >
          <Stack
            ref={leftColRef}
            width="50%"
            justifyContent="start"
            sx={{ position: "relative", overflow: "visible" }}
          >
            <Box ref={leftInnerRef} pt={8} pb={4} pl={6}>
              <Typography variant="h3" fontWeight={700} sx={{ fontSize: "2.5rem !important" }}>
                Why Choose Aave?
              </Typography>
              <Typography
                variant="h6"
                fontWeight={600}
                lineHeight={1.2}
                sx={{ opacity: 0.6, width: "75%" }}
              >
                Aave handles tens of billions of dollars across 12+ networks.
              </Typography>
            </Box>
          </Stack>

          <Stack
            ref={rightRef}
            width="50%"
            height="100%"
            gap={2}
            sx={{
              overflowY: "auto",
              pr: 2,
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              willChange: "transform",
              transform: "translateZ(0)",
              contain: "layout paint",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ContentBlock
              title="$64.03B"
              description="Net deposits supplied across 12+ networks."
              color={theme.palette.brand.napulETHRed.main}
              image={<Image src={svgOrnament1} alt="Ornament" fill style={{
                objectFit: "cover",
                borderRadius: 2,
              }}/>}
            />
            <ContentBlock
              title="$176.82B"
              description="Volume, past 30 days."
              color={theme.palette.brand.napulETHRed.main}
              image={<Image src={svgOrnament2} alt="Ornament" fill />}
            />
            <ContentBlock
              title="4.87%"
              description="Average stablecoin supply APY Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={<Image src={svgOrnament3} alt="Ornament" fill />}
            />
            <ContentBlock
              title="7.69%"
              description="Average stablecoin borrow APR Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={<Image src={svgOrnament4} alt="Ornament" fill />}
            />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ height: spacer }} />
    </Stack>
  );
}

function ContentBlock({
  title,
  description,
  color,
  image,
}: {
  title: string;
  description: string;
  color: string;
  image: React.ReactElement;
}): JSX.Element {
  return (
    <Stack p={3} gap={1.5}>
      <Box sx={{ height: 220, borderRadius: 2, bgcolor: color, position: "relative", overflow: "hidden" }} >
        {image}
      </Box>
      <Stack
        width="100%"
        direction="row"
        alignItems="start"
        gap={2}
      >
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.75, width: "90%", fontWeight: 500 }}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
