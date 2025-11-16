import { Button, type ButtonProps, Box } from "@mui/material";
import { forwardRef, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface GlowButtonProps extends ButtonProps {
  hoverText?: React.ReactNode;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, sx, hoverText, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (contentRef.current && hoverText) {
        const { offsetWidth, offsetHeight } = contentRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }, [children, hoverText]);

    const displayContent = isHovered ? hoverText : children;

    return (
      <Button
        ref={ref}
        disableElevation
        {...props}
        onMouseEnter={(e) => {
          if (hoverText) setIsHovered(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (hoverText) setIsHovered(false);
          props.onMouseLeave?.(e);
        }}
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
        {hoverText ? (
          <Box
            sx={{
              display: "inline-flex",
              position: "relative",
              width: dimensions.width || "auto",
              height: dimensions.height || "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              ref={contentRef}
              sx={{
                visibility: "hidden",
                position: "absolute",
              }}
            >
              {children}
            </Box>
            <AnimatePresence mode="wait">
              <motion.div
                key={isHovered ? "hover" : "default"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{
                  duration: 0.15,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {displayContent}
              </motion.div>
            </AnimatePresence>
          </Box>
        ) : (
          children
        )}
      </Button>
    );
  }
);

GlowButton.displayName = "GlowButton";
export default GlowButton;