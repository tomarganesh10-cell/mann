import { ImageResponse } from "next/og";

export const alt = "Our Franchise Portfolio — Great Brands. Bigger Possibilities.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, background: "#071A14", color: "#F4F0E6" }}>
        <div style={{ fontSize: 24, letterSpacing: 8, color: "#C5A66A" }}>KALPAVRIKSHA / FRANCHISE ECOSYSTEM</div>
        <div style={{ fontSize: 96, marginTop: 30, lineHeight: 1.05 }}>Great Brands.</div>
        <div style={{ fontSize: 96, lineHeight: 1.05, color: "#C4E879" }}>Bigger Possibilities.</div>
      </div>
    ),
    size,
  );
}
