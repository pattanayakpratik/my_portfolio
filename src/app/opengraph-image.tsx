import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0c 0%, #111827 50%, #030712 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Subtle cyan glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0) 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              P
            </div>
            <span style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
              {profile.name}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "9999px",
              background: "rgba(34, 211, 238, 0.12)",
              border: "1px solid rgba(34, 211, 238, 0.35)",
              color: "#38bdf8",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22d3ee" }} />
            {profile.role}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "960px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "800",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              background: "linear-gradient(90deg, #ffffff 40%, #94a3b8 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Engineering scalable backend systems & AI-powered applications.
          </div>
          <div style={{ fontSize: "22px", color: "#94a3b8", lineHeight: 1.5, maxWidth: "880px" }}>
            {profile.summary}
          </div>
        </div>

        {/* Bottom Tech Pills & Domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Python", "Next.js", "PyShare P2P", "Cypher AI", "AWS ML"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  fontSize: "16px",
                  color: "#cbd5e1",
                  fontWeight: "500",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ fontSize: "20px", color: "#64748b", fontWeight: "500" }}>
            pattanayakpratik.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
