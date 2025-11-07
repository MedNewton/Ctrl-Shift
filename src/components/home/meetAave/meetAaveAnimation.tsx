"use client";

import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  ButtonBase,
  useMediaQuery,
  type SxProps,
} from "@mui/material";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { useMemo, useState, useCallback } from "react";
import theme from "@/theme/theme";

const MotionBox = motion.create(Box);

function Circle({ sx = {} }: { sx?: SxProps }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      sx={{ display: "block", width: "100%", height: "100%", ...sx } as SxProps}
    >
      <path d="M250 0C316.304 0 379.893 26.3392 426.777 73.2233C473.661 120.107 500 183.696 500 250C500 316.304 473.661 379.893 426.777 426.777C379.893 473.661 316.304 500 250 500L250 0Z" fill="#1A88F8" />
      <path d="M250 500C183.696 500 120.107 473.661 73.2233 426.777C26.3392 379.893 5.00582e-06 316.304 0 250C-5.00582e-06 183.696 26.3392 120.107 73.2233 73.2233C120.107 26.3392 183.696 1.00116e-05 250 0L250 500Z" fill="#48ABFF" />
    </Box>
  );
}

function useWave(columnIndex: number) {
  const reduce = useReducedMotion();
  const y = useMotionValue(0);
  const col = columnIndex % 4;

  const { amp, freq, phase } = useMemo(() => {
    const amps = [26, 18, 30, 20];
    const freqs = [0.25, 0.325, 0.225, 0.3];
    const phases = [0.0, 0.9, 1.8, 2.7];
    return { amp: amps[col], freq: freqs[col], phase: phases[col] };
  }, [col]);

  useAnimationFrame((t) => {
    if (reduce) {
      y.set(0);
      return;
    }
    const time = t / 1000;
    const offset = Math.sin(time * 2 * Math.PI * freq + phase) * amp;
    y.set(offset);
  });

  return y;
}

function AnimatedCell({
  index,
  total,
  columns,
  active,
  children,
}: {
  index: number;
  total: number;
  columns: number;
  active: "supply" | "borrow";
  children: React.ReactNode;
}) {
  const yWave = useWave(index);

  const rows = Math.ceil(total / columns);
  const rowIndex = Math.floor(index / columns);
  const isTop = rowIndex === 0;
  const isBottom = rowIndex === rows - 1;
  const col = index % columns;

  const isBaseDownColumn = index % 4 === 0 || index % 4 === 2;
  const applyBaseDown = isBaseDownColumn && !(active === "borrow" && isTop);

  const cascadeDelay = active === "borrow" ? col * 0.15 : (columns - 1 - col) * 0.12;

  const centerShiftPercent = ((rows - 1) / 2) * 100;

  const dropVariants = {
    rest: { y: 0 },
    drop: { y: "250%" },
  } as const;

  const centerVariants = {
    rest: { y: 0 },
    center: { y: `${centerShiftPercent * 1.75}%` },
  } as const;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        transform: applyBaseDown ? "translateY(10%)" : "none",
        willChange: "transform",
      }}
    >
      {isTop ? (
        <motion.div
          style={{ willChange: "transform" }}
          variants={centerVariants}
          animate={active === "borrow" ? "center" : "rest"}
          transition={{ type: "spring", stiffness: 160, damping: 22, delay: cascadeDelay }}
        >
          <MotionBox style={{ y: yWave, willChange: "transform" }} sx={{ width: "100%", height: "100%" }}>
            {children}
          </MotionBox>
        </motion.div>
      ) : (
        <MotionBox
          variants={dropVariants}
          animate={isBottom ? (active === "borrow" ? "drop" : "rest") : "rest"}
          transition={{ type: "spring", stiffness: 160, damping: 22, delay: isBottom ? cascadeDelay : 0 }}
          sx={{ width: "100%", height: "100%" }}
          style={{ willChange: "transform" }}
        >
          <MotionBox style={{ y: yWave, willChange: "transform" }} sx={{ width: "100%", height: "100%" }}>
            {children}
          </MotionBox>
        </MotionBox>
      )}
    </Box>
  );
}

function AnimatedPanel({
  active,
  title,
  description,
  onActivate,
  testId,
}: {
  active: boolean;
  title: string;
  description: string;
  onActivate: () => void;
  testId?: string;
}) {
  const activeColor = theme.palette.brand.napulETHBlue1.main;
  const inactiveColor = theme.palette.text.secondary;

  const cleanClickableSx = {
    alignSelf: "stretch",
    borderRadius: 1,
    p: 0,
    bgcolor: "transparent",
    "&:hover": { bgcolor: "transparent" },
    "&:active": { bgcolor: "transparent" },
    "&:focus-visible": { outline: "none" },
    WebkitTapHighlightColor: "transparent",
  } as const;

  return (
    <MotionBox
      animate={{ flexBasis: active ? "60%" : "40%" }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 0,
        flexShrink: 1,
        minWidth: 0,
      }}
      data-testid={testId}
    >
      <Stack spacing={1.5}>
        <ButtonBase
          onClick={onActivate}
          sx={cleanClickableSx}
          aria-label={`Activate ${title}`}
          disableRipple
          disableTouchRipple
        >
          <Divider
            sx={{
              width: "100%",
              borderBottom: `4px solid ${active ? activeColor : inactiveColor}`,
            }}
          />
        </ButtonBase>

        <ButtonBase
          onClick={onActivate}
          sx={{ ...cleanClickableSx, justifyContent: "flex-start", textAlign: "left" }}
          aria-pressed={active}
          aria-label={`Activate ${title}`}
          disableRipple
          disableTouchRipple
        >
          <Typography variant="h5" fontWeight={600} color={active ? activeColor : inactiveColor}>
            {title}
          </Typography>
        </ButtonBase>

        <AnimatePresence mode="wait" initial={false}>
          {active && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <Typography
                variant="h6"
                fontWeight={500}
                color={theme.palette.text.secondary}
                sx={{ pr: { xs: 0, sm: 2 } }}
              >
                {description}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </MotionBox>
  );
}

export default function MeetAaveAnimation() {
  const [active, setActive] = useState<"supply" | "borrow">("supply");
  const activateSupply = useCallback(() => setActive("supply"), []);
  const activateBorrow = useCallback(() => setActive("borrow"), []);

  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const columns = mdUp ? 4 : smUp ? 2 : 1;

  const totalItems = 8;

  return (
    <Stack width="100%" gap={2}>
      <Stack
        sx={{
          width: "100%",
          minHeight: 500,
          bgcolor: "#F7F6F6",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            bgcolor: "rgba(252, 252, 251, 0.5)",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            zIndex: 2,
          }}
        />

        <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 2, sm: 3 },
            }}
          >
            <Grid
              container
              spacing={0}
              columnSpacing={0}
              rowSpacing={0}
              sx={{
                width: { xs: "100%", sm: "100%", md: "80%" },
                marginX: 0,
                marginBottom: 0,
                marginTop: "-20%",
              }}
              justifyContent="center"
            >
              {Array.from({ length: totalItems }).map((_, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }} sx={{ p: 0 }}>
                  <AnimatedCell
                    index={i}
                    total={totalItems}
                    columns={columns}
                    active={active}
                  >
                    <Box sx={{ width: "100%", aspectRatio: "1 / 1" }}>
                      <Circle />
                    </Box>
                  </AnimatedCell>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="stretch" justifyContent="center" gap={2}>
        <AnimatedPanel
          active={active === "supply"}
          title="Supply"
          description="Earn interest by supplying assets to the lending network."
          onActivate={activateSupply}
          testId="panel-supply"
        />
        <AnimatedPanel
          active={active === "borrow"}
          title="Borrow"
          description="Borrow against your collateral from across multiple networks and assets."
          onActivate={activateBorrow}
          testId="panel-borrow"
        />
      </Stack>
    </Stack>
  );
}