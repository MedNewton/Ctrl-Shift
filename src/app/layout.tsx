import "@/styles/globals.css";
import "react-multi-carousel/lib/styles.css"
import { type Metadata } from "next";
import { Urbanist } from "next/font/google";
import ThemeRegistry from "@/components/layout/ThemeRegistry";

export const metadata: Metadata = {
  title: "NapulETH 2026 | Biggest Web3 event in southern Italy",
  description: "NapulETH 2026 is the biggest Web3 event in southern Italy.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const urbanist = Urbanist({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
