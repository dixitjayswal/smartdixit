import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic Open Graph image rendered at the edge. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 100% at 0% 0%, #11204a 0%, #0a0e1a 55%)",
          color: "#e8e8e8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#3b82f6",
            }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#8a93a6",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1 }}>
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#b4bccc",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            {site.hero.subHeadline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 24,
            color: "#8a93a6",
          }}
        >
          <span style={{ color: "#3b82f6" }}>2.5M+ events/day</span>
          <span>·</span>
          <span>AWS · Kafka · Node.js</span>
          <span>·</span>
          <span>{site.location}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
