'use client';

import { useEffect, useRef } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import theme from '@/theme/theme';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: '35+', label: 'Sponsors' },
  { number: '70+', label: 'Partners' },
  { number: '1200+', label: 'Attendees' },
  { number: '80+', label: 'Speakers' },
];

export default function LastVersionStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const labels = gsap.utils.toArray<HTMLElement>('[data-stat-label]');
      const lines = gsap.utils.toArray<HTMLElement>('[data-stat-line]');
      const numbers = gsap.utils.toArray<HTMLElement>('[data-stat-number]');

      // Set initial states
      gsap.set(labels, { opacity: 0, y: 20 });
      gsap.set(lines, { scaleY: 0, transformOrigin: 'top' });
      gsap.set(numbers, { opacity: 0, y: -20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          // Only animate if we haven't animated before
          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            const tl = gsap.timeline();

            tl.to(labels, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              stagger: 0.1,
            })
              .to(
                lines,
                {
                  scaleY: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                  stagger: 0.1,
                },
                '-=0.3'
              )
              .to(
                numbers,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power3.out',
                  stagger: 0.1,
                },
                '-=0.5'
              );
          }
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      hasAnimatedRef.current = false; // Reset on unmount
    };
  }, []);

  return (
    <Stack
      ref={sectionRef}
      width="100%"
      sx={{
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 4, md: 8 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 8, md: 12 }}
        sx={{
          width: '100%',
          maxWidth: '1400px',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {stats.map((stat, index) => {
          const isNumberTop = index % 2 === 0;

          return (
            <Stack
              key={index}
              alignItems="center"
              spacing={3}
              sx={{
                minWidth: { xs: '200px', md: '250px' },
                flexDirection: isNumberTop ? 'column' : 'column-reverse',
              }}
            >
              <Typography
                data-stat-number
                variant="h2"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: { xs: '3rem', md: '5.5rem', lg: '7rem' },
                  opacity: 0,
                  lineHeight: 1,
                  ...(isNumberTop 
                    ? { mb: 0 } 
                    : { mt: 0, mb: 3 }
                  ),
                }}
              >
                {stat.number}
              </Typography>

              <Box
                data-stat-line
                sx={{
                  width: '2px',
                  height: { xs: '120px', md: '180px' },
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  scaleY: 0,
                }}
              />

              <Typography
                data-stat-label
                variant="h6"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textTransform: 'capitalize',
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                  opacity: 0,
                  ...(isNumberTop 
                    ? { mt: 0 } 
                    : { mb: 0, mt: 3 }
                  ),
                }}
              >
                {stat.label}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}