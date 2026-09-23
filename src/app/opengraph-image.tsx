import { ImageResponse } from "next/og";
import { projects } from "@/data/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card: name, tagline, flagship builds. */
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
          padding: "80px",
          background: "#0b0b0d",
          color: "#f2f0e9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#d6fd5c", letterSpacing: 4 }}>~/theoxfaber</div>
        <div style={{ fontSize: 72, fontWeight: 800, marginTop: 12 }}>Shanmukha Kiran Sagar</div>
        <div style={{ fontSize: 30, color: "#b7b7c0", marginTop: 12 }}>
          I build fast tools in Rust · B.Tech AI/DS @ Parul &apos;28
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
          {projects.slice(0, 3).map((p) => (
            <div
              key={p.name}
              style={{
                border: "1px solid #3f3f46",
                borderRadius: 12,
                padding: "10px 18px",
                fontSize: 24,
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
