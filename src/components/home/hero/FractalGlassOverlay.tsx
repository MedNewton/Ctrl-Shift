import { Box } from "@mui/material";

const FractalGlassOverlay = () => {

  return (
    <>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          width: { xs: "246%", sm: "100%", md: "100%" },
          height: { xs: "100%", sm: "100%", md: "100%" },
          right: { xs: "0", md: "0" },
          top: { xs: "0", md: "0" },
          opacity: 0.75,
          borderRadius: "0px",
          transform: "rotate(0deg)",
          overflow: "hidden",
          zIndex: 5,
          pointerEvents: "none",
          mixBlendMode: "color-dodge",
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0.27) 60px)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "inset 0 0 0px #000",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "0px",
            filter: "blur(2px)",
            background:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(0,0,0,0.38) 30px, rgba(255,255,255,0) 60px)",
          },
        }}
      />
    </>
  );
};

export default FractalGlassOverlay;
