import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/atkinson-hyperlegible-next";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  alternates: { canonical: "/" },
  title: `${profile.name}, software and ML`,
  description: profile.headline,
  openGraph: { title: profile.name, description: profile.headline, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1A14" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
