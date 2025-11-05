// brandColors.ts
export type BrandColor = { main: string };

export type BrandPalette = {
  napulETHYellow1: BrandColor;
  napulETHYellow2: BrandColor;
  napulETHRed: BrandColor;
  napulETHGrey1: BrandColor;
  napulETHGrey2: BrandColor;
  napulETHGrey3: BrandColor;
  napulETHBlue1: BrandColor;
  napulETHBlue2: BrandColor;
  napulETHLightBlue1: BrandColor;
  napulETHLightBlue2: BrandColor;
  napulETHCyan1: BrandColor;
  napulETHCyan2: BrandColor;
  napulETHPurple1: BrandColor;
  napulETHPurple2: BrandColor;
  napulETHOrange1: BrandColor;
  napulETHOrange2: BrandColor;
  napulETHGreen1: BrandColor;
  napulETHGreen2: BrandColor;
  napulETHGreen3: BrandColor;
};

export type BrandPaletteOptions = Partial<BrandPalette>;

export const brandColors: BrandPalette = {
  napulETHYellow1: { main: "#FCD221" },
  napulETHYellow2: { main: "#E39A01" },
  napulETHRed: { main: "#952527" },
  napulETHGrey1: { main: "#F0F0EF" },
  napulETHGrey2: { main: "#211D1D" },
  napulETHGrey3: { main: "#4D4A4A" },
  napulETHBlue1: { main: "#008AFF" },
  napulETHBlue2: { main: "#00AEFF" },
  napulETHLightBlue1: { main: "#39D1F9" },
  napulETHLightBlue2: { main: "#A7E9FD" },
  napulETHCyan1: { main: "#00827B" },
  napulETHCyan2: { main: "#39BEB7" },
  napulETHPurple1: { main: "#9896FF" },
  napulETHPurple2: { main: "#BDBBFF" },
  napulETHOrange1: { main: "#FF3200" },
  napulETHOrange2: { main: "#FF8130" },
  napulETHGreen1: { main: "#00BC20" },
  napulETHGreen2: { main: "#4CE27A" },
  napulETHGreen3: { main: "#73EAA4" },
};
