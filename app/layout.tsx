import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./studio.css";
import { StudioCursor } from "@/components/studio-cursor";

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "../fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Endlls Studio — Creativity Never Ends",
    template: "%s — Endlls Studio",
  },
  description:
    "Endlls is a design studio for identity, digital experiences, and campaigns. Creativity never ends.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${clashDisplay.variable} ${cabinetGrotesk.variable}`}>
        <StudioCursor />
        {children}
      </body>
    </html>
  );
}
