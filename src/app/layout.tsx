import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
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
    { media: "(prefers-color-scheme: light)", color: "#F1F4F6" },
    { media: "(prefers-color-scheme: dark)", color: "#101B25" },
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
