import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/700-italic.css";
import "./globals.css";
import "./studio.css";
import { StudioCursor } from "@/components/studio-cursor";

export const metadata: Metadata = {
  title: {
    default: "Endlls Studio — Creativity Never Ends",
    template: "%s — Endlls Studio",
  },
  description:
    "Endlls Creative Studio — creativity never ends. An engineering multiverse of flight, field systems, silicon, and stories.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StudioCursor />
        {children}
      </body>
    </html>
  );
}
