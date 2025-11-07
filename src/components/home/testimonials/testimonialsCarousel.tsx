"use client";

import { useRef, forwardRef, useState } from "react";
import Carousel, { type ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    Box,
    Stack,
    Typography,
    useTheme,
    ButtonBase,
} from "@mui/material";
import theme from "@/theme/theme";

type Testimonial = {
    quote: string;
    author: string;
    title: string;
};

const data: Testimonial[] = [
    {
        quote:
            "“Aave has played a pivotal role in driving USDT’s growth within the DeFi ecosystem. By providing stability and liquidity, USDT bridges traditional finance and crypto.”",
        author: "Paolo Ardoino",
        title: "CEO",
    },
    {
        quote:
            "“Aave has been a pioneer in decentralized finance, setting high standards for security, reliability, and risk management.”",
        author: "Sergey Nazarov",
        title: "Co-Founder",
    },
    {
        quote:
            "“Our integration reduced settlement time while improving UX. The collaboration was smooth and fast.”",
        author: "Ada Romero",
        title: "Product Lead",
    },
    {
        quote:
            "“Clear APIs, great docs, and excellent support. We shipped in days, not weeks.”",
        author: "Jon Patel",
        title: "Engineering Manager",
    },
];

const responsive: ResponsiveType = {
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 1,
        partialVisibilityGutter: 600,
    },
    tablet: {
        breakpoint: { max: 1199, min: 768 },
        items: 1,
        partialVisibilityGutter: 350,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
        partialVisibilityGutter: 40,
    },
};

const Dot = forwardRef<
    HTMLButtonElement,
    { onClick?: () => void; active?: boolean }
>(function DotComp({ onClick, active }, ref) {
    return (
        <ButtonBase
            ref={ref}
            onClick={onClick}
            sx={{
                mx: 0.5,
                width: 5,
                height: 5,
                borderRadius: 4,
                bgcolor: active ? theme.palette.brand.napulETHRed.main : theme.palette.brand.napulETHGrey1.main,
                opacity: active ? 1 : 0.4,
            }}
        />
    );
});

export default function TestimonialsCarousel() {
    const theme = useTheme();
    const carouselRef = useRef<Carousel | null>(null);

    const [current, setCurrent] = useState(0);
    const lastIndex = data.length - 1;

    return (
        <Box
            position="relative"
            sx={{
                py: { xs: 2, md: 3 },
            }}
        >
            <Carousel
                ref={carouselRef}
                responsive={responsive}
                partialVisible
                arrows={false}
                draggable
                swipeable
                infinite={true}
                showDots
                renderDotsOutside={true}
                customDot={<Dot />}
                customTransition="transform 400ms ease"
                transitionDuration={400}
                containerClass="carousel-container"
                itemClass="px-1 md:px-1"
                dotListClass="custom-dot-list"
                afterChange={(_prev, { currentSlide }) => setCurrent(currentSlide ?? 0)}
            >
                {data.map((t, idx) => (
                    <Box
                        key={idx}
                        onClick={() => {
                            carouselRef.current?.goToSlide(idx, true);
                        }}
                        sx={{ cursor: "pointer" }}
                    >
                        <Stack
                            className="no-select"
                            sx={{
                                bgcolor: (t) => t.palette.brand.napulETHRed.main,
                                borderRadius: 3,
                                p: { xs: 2, md: 3 },
                                minHeight: { xs: 180, md: 220 },
                                pointerEvents: "none",
                            }}
                        >
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                {t.quote}
                            </Typography>
                            <Stack>
                                <Typography variant="subtitle1" color="text.primary" fontWeight={600}>
                                    {t.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t.title}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                ))}
            </Carousel>

            <style jsx global>{`
        .custom-dot-list {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          margin: 8px auto 0;
          padding: 6px 10px;
          background: rgba(0, 0, 0, 0.06);
          border-radius: 9999px;
        }
        .custom-dot-list li {
          margin: 0 2px;
        }
        .custom-dot-list li button {
          outline: none;
          border: none;
        }
      `}</style>
        </Box>
    );
}
