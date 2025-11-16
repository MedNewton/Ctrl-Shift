'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import theme from '@/theme/theme';
import NorthEastIcon from '@mui/icons-material/NorthEast';

import image1 from '@/assets/images/2025/1.webp';
import image2 from '@/assets/images/2025/2.webp';
import image3 from '@/assets/images/2025/3.webp';
import image4 from '@/assets/images/2025/4.webp';
import image5 from '@/assets/images/2025/5.webp';

gsap.registerPlugin(ScrollTrigger);

interface Card {
  tag: string;
  image: string;
}

const cards: Card[] = [
  { tag: 'Blockchain', image: image1.src },
  { tag: 'Quantum Computing', image: image2.src },
  { tag: 'AI', image: image3.src },
  { tag: 'NFTs', image: image4.src },
  { tag: 'DeFi', image: image5.src },
];

export default function LastVersionStackedCardsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const titleArrowRef = useRef<SVGSVGElement>(null);
  const arrowAnimationRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const allCards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
    const allImages = imagesRef.current.filter((el): el is HTMLImageElement => el !== null);

    if (allCards.length === 0) return;

    gsap.set(allCards[0], { y: '0%', scale: 1, rotation: 0 });
    gsap.set(allImages[0], { scale: 1 });

    allCards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, { y: '100%', scale: 1, rotation: 0 });
        gsap.set(allImages[index], { scale: 1 });
      }
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const allCards = cardsRef.current.filter((el): el is HTMLDivElement => el !== null);
      const allImages = imagesRef.current.filter((el): el is HTMLImageElement => el !== null);
      const totalCards = allCards.length;

      if (totalCards === 0) return;

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = allCards[i];
        const currentImage = allImages[i];
        const nextCard = allCards[i + 1];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `top+=${i * window.innerHeight} top`,
            end: () => `top+=${(i + 1) * window.innerHeight} top`,
            scrub: 0.5,
          },
        });

        tl.to(currentCard, {
          scale: 0.5,
          rotation: -5,
          ease: 'none',
        }, 0)
          .to(currentImage, {
            scale: 1.5,
            ease: 'none',
          }, 0)
          .to(nextCard, {
            y: '0%',
            ease: 'none',
          }, 0);
      }

      if (titleArrowRef.current) {
        arrowAnimationRef.current = gsap.fromTo(
          titleArrowRef.current,
          {
            x: -40,
            y: 40,
            opacity: 0,
          },
          {
            x: 40,
            y: -40,
            opacity: 0,
            duration: 1.2,
            ease: 'none',
            paused: true,
            repeat: -1,
            repeatDelay: 0.2,
            keyframes: {
              '0%': { x: -40, y: 40, opacity: 0 },
              '25%': { x: 0, y: 0, opacity: 1 },
              '75%': { x: 0, y: 0, opacity: 1 },
              '100%': { x: 40, y: -40, opacity: 0 },
            },
          }
        );
      }
    }, containerRef);

    return () => {
      if (arrowAnimationRef.current) {
        arrowAnimationRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = () => {
    if (arrowAnimationRef.current) {
      arrowAnimationRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (arrowAnimationRef.current) {
      arrowAnimationRef.current.pause();
      gsap.to(titleArrowRef.current, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: `${100 + (cards.length - 1) * 100}vh`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: {xs: '100dvh', md: '100vh'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          overflow: 'hidden',
          padding: { xs: 2, md: 4 },
          gap: 10,
        }}
      >
        <Stack
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            '&:hover .subtitle-text': {
              color: theme.palette.text.primary,
            },
            '&:hover .title-text': {
              color: theme.palette.text.secondary,
            },
          }}
        >
          <Typography
            className="subtitle-text"
            variant="h6"
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              color: theme.palette.text.secondary,
              transition: 'color 0.3s ease',
            }}
          >
            Our last version
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              className="title-text"
              variant="h2"
              sx={{
                textAlign: 'center',
                fontWeight: 600,
                transition: 'color 0.3s ease',
              }}
            >
              NapulETH 2025
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NorthEastIcon
                ref={titleArrowRef}
                sx={{
                  fontSize: { xs: 32, md: 40 },
                  position: 'absolute',
                }}
              />
            </Box>
          </Stack>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '95%', md: '50%' },
            height: { xs: '40%', md: '60%' },
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el as HTMLDivElement | null;
              }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <Box
                ref={(el) => {
                  imagesRef.current[index] = el as HTMLImageElement | null;
                }}
                component="img"
                src={card.image}
                alt={card.tag}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  padding: '8px 16px',
                  backgroundColor: theme.palette.background.default,
                  borderRadius: '4px',
                  zIndex: 10,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.brand.napulETHRed.main,
                    color: theme.palette.background.default,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.tag}
                </Typography>
              </Box>

              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 10,
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.brand.napulETHRed.main,
                    color: theme.palette.background.default,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <NorthEastIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}