'use client';

import { type FC } from 'react';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { motion, type Variants } from 'framer-motion';
import theme from '@/theme/theme';

import quantum from '@/assets/images/2025/new/quantum.jpeg';
import web3 from '@/assets/images/2025/new/web3.jpg';
import image1 from '@/assets/images/2025/1.webp';
import image2 from '@/assets/images/2025/2.webp';
import image3 from '@/assets/images/2025/3.webp';
import image4 from '@/assets/images/2025/4.webp';
import image5 from '@/assets/images/2025/5.webp';
import image6 from '@/assets/images/2025/new/opportunities.jpeg';

interface Card {
  tag: string;
  image: string;
}

const cards: Card[] = [
  { tag: 'Quantum Computing', image: quantum.src },
  { tag: 'AI', image: image3.src },
  { tag: 'Web3', image: web3.src },
  { tag: 'Law', image: image4.src },
  { tag: 'Art', image: image5.src },
  { tag: 'Unique Venue', image: image2.src },
  { tag: 'Networking Opportunities', image: image6.src },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, 
    y: 0,
  },
};

const MobileLastVersionStackedCardsSection: FC = () => {
  const handleClick = () => {
    window.open('https://www.napuleth.org/archive/2025', '_blank');
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        py: 6,
        px: 2,
      }}
    >
      {/* Title */}
      <Stack
        component="div"
        onClick={handleClick}
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
        mb={4}
      >
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

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '2.1rem',
            }}
          >
            NapulETH 2025
          </Typography>
          <NorthEastIcon
            sx={{
              fontSize: 28,
              color: theme.palette.text.primary,
            }}
          />
        </Stack>
      </Stack>

      {/* Column of cards with Framer Motion fade-in */}
      <Stack spacing={3}>
        {cards.map((card, index) => (
          <motion.div
            key={card.tag}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: index * 0.08,
            }}
            style={{ width: '100%' }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
              }}
            >
              <Box
                component="img"
                src={card.image}
                alt={card.tag}
                sx={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  px: 1.5,
                  py: 0.75,
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 1,
                  zIndex: 2,
                  color: theme.palette.text.primary,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {card.tag}
                </Typography>
              </Box>

              <IconButton
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 2,
                  width: 40,
                  height: 40,
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: theme.palette.brand.napulETHRed.main,
                    color: theme.palette.background.default,
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <NorthEastIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};

export default MobileLastVersionStackedCardsSection;
