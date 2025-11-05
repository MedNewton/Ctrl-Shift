import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import type { BrandPalette, BrandPaletteOptions } from "@/theme/brandColors";
import { brandColors } from "@/theme/brandColors";
import type { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette { brand: BrandPalette }
    interface PaletteOptions { brand?: BrandPaletteOptions }
  }

const brand: BrandPaletteOptions = brandColors;

const palette: PaletteOptions = {
  primary: { main: "#FFFFFF" },
  secondary: { main: "#8F8E8E" },
  background: { default: "#0B0B0B" },
  text: { primary: "#FFFFFF", secondary: "rgba(255, 255, 255, 0.8)" },
  info: { main: "#000000" },
  error: { main: "#DC2626" },
  success: { main: "#389685" },
  brand, // typed, not any
};

let theme = createTheme({
  palette,
  typography: {
    fontFamily: "Urbanist",
  },
})

theme = responsiveFontSizes(theme)

export default theme
