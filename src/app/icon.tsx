import { ImageResponse } from "next/og";

// Browser tab icon: an aurora-green "S" on the site's dark background, with one star.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export function Mark({ px }: { px: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0f",
        borderRadius: px * 0.22,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#4fe3b2",
          fontSize: px * 0.78,
          fontWeight: 800,
          lineHeight: 1,
          marginTop: -px * 0.04,
          fontFamily: "sans-serif",
          WebkitTextStroke: `${px * 0.05}px #4fe3b2`,
        }}
      >
        S
      </div>
      <div
        style={{
          position: "absolute",
          top: px * 0.14,
          right: px * 0.16,
          width: px * 0.1,
          height: px * 0.1,
          borderRadius: 999,
          background: "#eceae4",
        }}
      />
    </div>
  );
}

export default function Icon() {
  return new ImageResponse(<Mark px={64} />, size);
}
