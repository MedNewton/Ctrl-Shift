'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import theme from '@/theme/theme';

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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

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
          height: '100vh',
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
        <Stack>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            color: theme.palette.text.secondary,
          }}
        >
          Our last version
        </Typography>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          NapulETH 2025
        </Typography>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '95%', md: '50%' },
            height: { xs: '70%', md: '60%' },
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
                  backgroundColor: '#000',
                  borderRadius: '4px',
                  zIndex: 10,
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
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}