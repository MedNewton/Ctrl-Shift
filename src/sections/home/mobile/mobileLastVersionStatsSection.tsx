'use client';

import type { FC } from 'react';
import { Stack, Typography, Box, Grid } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import theme from '@/theme/theme';

interface Stat {
    number: string;
    label: string;
}

const stats: Stat[] = [
    { number: '30+', label: 'Sponsors' },
    { number: '60+', label: 'Partners' },
    { number: '1200+', label: 'Attendees' },
    { number: '80+', label: 'Speakers' },
];

// Parent card animation
const statContainerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
            staggerChildren: 0.12,
        },
    },
};

// Child parts
const numberVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1 },
};

const labelVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const MobileLastVersionStatsSection: FC = () => {
    return (
        <Stack
            component="section"
            width="100%"
            sx={{
                backgroundColor: theme.palette.background.default,
                display: { xs: 'flex', md: 'none' }, // mobile-only
                alignItems: 'center',
                justifyContent: 'center',
                px: 3,
                py: 6,
            }}
        >
            <Grid container spacing={3} width="100%">
                {stats.map((stat, index) => {
                    const isNumberTop = index % 2 === 0;

                    return (
                        <Grid size={6} key={stat.label}>
                            <motion.div
                                key={stat.label}
                                variants={statContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{
                                    // slight delay between each stat block
                                    delay: index * 0.1,
                                }}
                                style={{ width: '100%' }}
                            >
                                <Stack
                                    alignItems="center"
                                    spacing={3}
                                    sx={{
                                        minWidth: '100%',
                                        flexDirection: "column-reverse",
                                    }}
                                >
                                    {/* Number */}
                                    <motion.div variants={numberVariants}>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                color: '#fff',
                                                fontWeight: 700,
                                                fontSize: '3rem',
                                                lineHeight: 1,
                                                mt: 2,
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                    </motion.div>

                                    {/* Vertical line */}
                                    <motion.div
                                        variants={lineVariants}
                                        style={{ transformOrigin: 'top' }}
                                    >
                                        <Box
                                            sx={{
                                                width: '2px',
                                                height: 100,
                                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                            }}
                                        />
                                    </motion.div>

                                    {/* Label */}
                                    <motion.div variants={labelVariants}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                textTransform: 'capitalize',
                                                letterSpacing: '0.1em',
                                                fontWeight: 400,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </motion.div>
                                </Stack>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default MobileLastVersionStatsSection;
