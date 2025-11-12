import { Box, Stack, Typography, type CSSProperties } from "@mui/material";

type StylishPillProps = {
  left?: string;
  right?: string;
  sx?: CSSProperties;
};

const StylishPill = ({ left = "Ctrl", right = "Shift", sx }: StylishPillProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 160,
        height: 46,
        borderRadius: 9999,
        overflow: "hidden",
        px: 2.2,
        display: "flex",
        alignItems: "center",
        backgroundImage:
          "radial-gradient(60% 60% at 50% 0%, #1B1B1B 0%, #0B0B0B 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -6px 10px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(198,108,110,0.28) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          backgroundPosition: "0px 0px",
          pointerEvents: "none",
        } as CSSProperties,
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2} sx={{ zIndex: 1 }}>
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: 600,
            letterSpacing: 0.2,
            fontSize: 17,
          }}
        >
          {left}
        </Typography>
      </Stack>

      <Box
        sx={{
          position: "absolute",
          right: 6,
          top: 6,
          bottom: 6,
          width: 92,
          borderRadius: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #B1474A 0%, #942629 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -6px 10px rgba(0,0,0,0.45), 0 6px 14px rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <Typography
          sx={{
            color: "#FFFFFF",
            fontWeight: 600,
            letterSpacing: 0.2,
            fontSize: 16,
          }}
        >
          {right}
        </Typography>
      </Box>
    </Box>
  );
};

export default StylishPill;
