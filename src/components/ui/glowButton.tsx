import { Button, type ButtonProps } from "@mui/material";
import { forwardRef } from "react";

const GlowButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => (
    <Button
      ref={ref}
      disableElevation
      {...props}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        width: "fit-content",
        minWidth: 0,
        height: "auto",
        borderRadius: "29.4545px",
        textTransform: "none",
        color: "#fff",
        fontSize: "18px",
        fontWeight: 500,
        background:
          "radial-gradient(50% 50% at 50% 50%, #B1474A 0%, #942629 100%)",
        boxShadow:
          "0px 0px 50px rgba(148, 38, 41, 0.8), 0px 0px 1px 4px rgba(255, 255, 255, 0.1), inset 0px -4px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 1px rgba(255, 255, 255, 0.25)",
        "&:hover": {
          background:
            "radial-gradient(50% 50% at 50% 50%, #9B3A3D 0%, #7C1F22 100%)",
          boxShadow:
            "0px 0px 50px rgba(148, 38, 41, 0.8), 0px 0px 1px 4px rgba(255, 255, 255, 0.1), inset 0px -4px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 1px rgba(255, 255, 255, 0.25)",
        },
        "&:active": {
          boxShadow:
            "0px 0px 40px rgba(148, 38, 41, 0.65), 0px 0px 1px 4px rgba(255, 255, 255, 0.1), inset 0px -2px 1px rgba(0, 0, 0, 0.35), inset 0px 1px 1px rgba(255, 255, 255, 0.22)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  )
);

GlowButton.displayName = "GlowButton";
export default GlowButton;
