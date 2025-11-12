import { Button, type ButtonProps } from "@mui/material";
import { forwardRef } from "react";

const BlackButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => (
    <Button
      ref={ref}
      disableElevation
      {...props}
      sx={{
        display: "inline-flex",
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

        backgroundImage:
          "radial-gradient(50% 50% at 50% 50%, #1F1F1F 0%, #0B0B0B 100%)",
        backgroundColor: "transparent",
        boxShadow:
          "0px 0px 1px 4px rgba(255, 255, 255, 0.1), inset 0px -4px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 1px rgba(255, 255, 255, 0.25)",

        "&&:hover": {
          backgroundImage:
            "radial-gradient(50% 50% at 50% 50%, #1A1A1A 0%, #060606 100%)",
          boxShadow:
            "0px 0px 1px 4px rgba(255, 255, 255, 0.1), inset 0px -4px 2px rgba(0, 0, 0, 0.25), inset 0px 2px 1px rgba(255, 255, 255, 0.25)",
        },

        ...sx,
      }}
    >
      {children}
    </Button>
  )
);

BlackButton.displayName = "BlackButton";
export default BlackButton;
