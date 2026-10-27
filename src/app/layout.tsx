import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/content/profile";
import { RevealInit } from "@/components/motion/RevealInit";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  alternates: { canonical: "/" },
  title: `${profile.name}, software engineering student`,
  description: profile.intro,
  openGraph: { title: profile.name, description: profile.intro, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        {children}
        <RevealInit />
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
