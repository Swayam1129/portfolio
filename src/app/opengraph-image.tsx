import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// The preview card LinkedIn, Slack and others show when the site link is shared.
export const alt = `${profile.name}: from a blank repo to production`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Deterministic "stars" so the card looks the same every time.
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 1200, y: r(2) * 630, s: 1 + r(3) * 2.5, a: 0.25 + r(4) * 0.6, g: r(5) < 0.15 };
});

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 80px",
          background: "#0b0b0f",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {stars.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.s,
              height: s.s,
              borderRadius: 999,
              background: s.g ? "#4fe3b2" : "#eceae4",
              opacity: s.a,
            }}
          />
        ))}
        <div style={{ display: "flex", fontSize: 30, color: "#a3a1aa", fontWeight: 700 }}>
          {profile.name}, Computing Science, University of Alberta
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span style={{ color: "#eceae4" }}>From a blank repo</span>
          <span style={{ color: "#4fe3b2" }}>to production.</span>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 30, color: "#eceae4" }}>
          Five team projects. 39,000 of my lines in the final code.
        </div>
      </div>
    ),
    size,
  );
}
