// NOTE: use a relative path, not "@/..."
import type { BrandPalette, BrandPaletteOptions } from "../theme/brandColors";

declare module "@mui/material/styles" {
  interface Palette {
    brand: BrandPalette;
  }
  interface PaletteOptions {
    brand?: BrandPaletteOptions;
  }
}

// Optional: enable color="brand" on MUI Button
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    brand: true;
  }
}
