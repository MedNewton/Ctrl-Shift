import "@/styles/globals.css";
import "react-multi-carousel/lib/styles.css"
import { type Metadata } from "next";
import { Urbanist } from "next/font/google";
import ThemeRegistry from "@/components/layout/ThemeRegistry";

export const metadata: Metadata = {
  title: "Ctrl/Shift 2026 | Southern Italy’s Gateway to the Future",
  description: "8 - 14 June 2026 · Naples, Italy · A world-class summit uniting the pioneers ofAI, Quantum Computing, and Web3.",
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
