import type { Metadata } from "next";
import "@fontsource/goldman/400.css";
import "@fontsource/goldman/700.css";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
