"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { JSX } from "react";
import theme from "@/theme/theme";
import { Box, Stack, Typography } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

import svgOrnament1 from "@/assets/svg/svgOrnament1.svg?url";
import svgOrnament2 from "@/assets/svg/svgOrnament2.svg?url";
import svgOrnament3 from "@/assets/svg/svgOrnament3.svg?url";
import svgOrnament4 from "@/assets/svg/svgOrnament4.svg?url";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Safe, shared ref shape (no `any`)
type RefLike<T> = { current: T | null };
function getCurrent<T extends HTMLElement>(ref: RefLike<T>): T | null {
  return ref.current;
}

export default function WhyChooseAave(): JSX.Element {
  const rightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const leftInnerRef = useRef<HTMLDivElement>(null);

  const stRef = useRef<ScrollTrigger | null>(null);
  const wheelTweenRef = useRef<gsap.core.Tween | null>(null);
  const leftTweenRef = useRef<gsap.core.Tween | null>(null);
  const leftAtBottomRef = useRef<boolean>(false);

  const roRightRef = useRef<ResizeObserver | null>(null);
  const roLeftRef = useRef<ResizeObserver | null>(null);

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
          ScrollTrigger.update();
        } else {
          wheelTweenRef.current?.kill();
          wheelTweenRef.current = gsap.to(right, {
            scrollTo: { y: target, autoKill: false },
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => ScrollTrigger.update(),
            onComplete: () => {
              wheelTweenRef.current = null;
            },
          });
        }

        setLeftPosition(self.progress >= SNAP_AT);
      },

      onEnter: (self) => {
        const target = Math.round(self.progress * maxScroll);
        right.scrollTop = target;
        ScrollTrigger.update();
        setLeftPosition(self.progress >= SNAP_AT);
      },
      onEnterBack: (self) => {
        const target = Math.round(self.progress * maxScroll);
        right.scrollTop = target;
        ScrollTrigger.update();
        setLeftPosition(self.progress >= SNAP_AT);
      },

      onLeave: () => {
        wheelTweenRef.current?.kill();
        wheelTweenRef.current = null;
        right.scrollTop = maxScroll;
        ScrollTrigger.update();
        setLeftPosition(true);
      },
      onLeaveBack: () => {
        wheelTweenRef.current?.kill();
        wheelTweenRef.current = null;
        right.scrollTop = 0;
        ScrollTrigger.update();
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
        sx={{ position: "sticky", top: 0, height: "100dvh", zIndex: 1 }}
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
          {/* LEFT */}
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

          {/* RIGHT — scroller */}
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <ContentBlock
              scrollerRef={rightRef}
              title="4.87%"
              description="Average stablecoin supply APY Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={
                <Image
                  src={svgOrnament3}
                  alt="Ornament"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              }
            />
            <ContentBlock
              scrollerRef={rightRef}
              title="4.87%"
              description="Average stablecoin supply APY Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={
                <Image
                  src={svgOrnament3}
                  alt="Ornament"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              }
            />
            <ContentBlock
              scrollerRef={rightRef}
              title="4.87%"
              description="Average stablecoin supply APY Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={
                <Image
                  src={svgOrnament3}
                  alt="Ornament"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              }
            />
            <ContentBlock
              scrollerRef={rightRef}
              title="7.69%"
              description="Average stablecoin borrow APR Ethereum network, past year."
              color={theme.palette.brand.napulETHRed.main}
              image={
                <Image
                  src={svgOrnament4}
                  alt="Ornament"
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              }
            />
          </Stack>
        </Stack>
      </Box>

      {/* Spacer so sticky section can "scroll" */}
      <Box sx={{ height: spacer }} />
    </Stack>
  );
}

/* ---------- Card with on-scroll fade-in of the actual <img> using IntersectionObserver ---------- */
function ContentBlock({
  scrollerRef,
  title,
  description,
  color,
  image,
}: {
  scrollerRef: RefLike<HTMLDivElement>;
  title: string;
  description: string;
  color: string;
  image: React.ReactElement<React.ComponentProps<typeof Image>>;
}): JSX.Element {
  const blockRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = imgWrapRef.current;
    const scroller = getCurrent(scrollerRef);
    if (!wrapper || !scroller) return;

    const getImg = (): HTMLImageElement | null => wrapper.querySelector("img");

    const ensureHidden = (el: HTMLImageElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition =
        "opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)";
      el.style.willChange = "opacity, transform";
    };
    const show = (el: HTMLImageElement) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };
    const hide = (el: HTMLImageElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
    };

    // Prepare current img (if any) and also react to Next/Image swaps
    let img = getImg();
    if (img) ensureHidden(img);

    const mo = new MutationObserver(() => {
      const candidate = getImg();
      if (candidate && candidate !== img) {
        img = candidate;
        ensureHidden(img);
        // run immediate check again after swap
        firstCheck();
      }
    });
    mo.observe(wrapper, { childList: true, subtree: true });

    // Use the wrapper as the target (has the fixed height)
    const io = new IntersectionObserver(
      (entries) => {
        const currentImg = getImg();
        if (!currentImg) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(currentImg);
          } else {
            // comment out to reveal once-only
            hide(currentImg);
          }
        }
      },
      {
        root: scroller,
        // Slightly forgiving so items at top edge still trigger
        rootMargin: "5% 0px -10% 0px",
        threshold: [0, 0.01, 0.1],
      }
    );

    io.observe(wrapper);

    // Manual first-check for items already visible when observer attaches
    const firstCheck = () => {
      const currentImg = getImg();
      if (!currentImg) return;
      const rootRect = scroller.getBoundingClientRect();
      const targetRect = wrapper.getBoundingClientRect();
      const isInView = !(targetRect.bottom <= rootRect.top || targetRect.top >= rootRect.bottom);
      if (isInView) show(currentImg);
    };
    requestAnimationFrame(firstCheck);
    setTimeout(firstCheck, 60);

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [scrollerRef]);

  return (
    <Stack ref={blockRef} p={3} gap={1.5}>
      <Box
        ref={imgWrapRef}
        sx={{
          height: 220,
          borderRadius: 2,
          bgcolor: color,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {React.cloneElement(image, { priority: true })}
      </Box>

      <Stack width="100%" direction="row" alignItems="start" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ opacity: 0.75, width: "90%", fontWeight: 500 }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}
