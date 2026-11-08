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
          background: "linear-gradient(135deg, #05070D 0%, #090E1A 50%, #030509 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "46px 64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Ambient Top-Right Cyan Glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Ambient Bottom-Left Violet Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0) 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Top Header: Brand & Live Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Left: Avatar Monogram & Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #0C1424, #1E293B)",
                border: "1.5px solid rgba(34, 211, 238, 0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "21px",
                fontWeight: 900,
                color: "#22D3EE",
                letterSpacing: "1px",
              }}
            >
              PP
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.3px" }}>
                {profile.name}
              </span>
              <span style={{ fontSize: "13px", color: "#64748B", fontFamily: "monospace" }}>
                github.com/pattanayakpratik
              </span>
            </div>
          </div>

          {/* Right: Active Status Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.08)",
              border: "1.2px solid rgba(16, 185, 129, 0.35)",
              color: "#34D399",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 10px #10B981",
              }}
            />
            AVAILABLE FOR ROLES
            <span style={{ color: "#64748B", fontWeight: 500 }}>· Mumbai</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: "52px", fontWeight: 900, letterSpacing: "-1px" }}>
            <span style={{ color: "#FFFFFF" }}>Backend &nbsp;</span>
            <span
              style={{
                background: "linear-gradient(90deg, #22D3EE, #38BDF8, #60A5FA)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              AI Engineer
            </span>
          </div>

          <div style={{ fontSize: "20px", color: "#94A3B8", maxWidth: "980px", lineHeight: 1.4 }}>
            Building scalable distributed backends, high-throughput APIs &amp; production Generative AI.
          </div>

          {/* Credential Chips */}
          <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 14px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "12px",
                color: "#F8FAFC",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#FBBF24" }}>★</span> 8.65 CGPI <span style={{ color: "#64748B", fontWeight: 500 }}>B.Sc. IT</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 14px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "12px",
                color: "#F8FAFC",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#38BDF8" }}>☁</span> AWS Certified <span style={{ color: "#64748B", fontWeight: 500 }}>ML &amp; AI</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 14px",
                borderRadius: "9999px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "12px",
                color: "#F8FAFC",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#F59E0B" }}>⚡</span> 15+ Repos <span style={{ color: "#64748B", fontWeight: 500 }}>Shipped</span>
            </div>
          </div>
        </div>

        {/* Bento Grid: 3 Flagship Cards */}
        <div style={{ display: "flex", gap: "20px", width: "100%", zIndex: 10 }}>
          {/* CARD 1: PyShare */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "18px 20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, rgba(17, 24, 39, 0.88), rgba(9, 14, 23, 0.94))",
              border: "1px solid rgba(6, 182, 212, 0.28)",
              borderTop: "2.5px solid #06B6D4",
              height: "186px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(6, 182, 212, 0.14)",
                  border: "1px solid rgba(6, 182, 212, 0.35)",
                  color: "#22D3EE",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                }}
              >
                P2P FILE HUB
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}>
                PyShare Hub
              </div>
              <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.35 }}>
                Cross-device WebRTC P2P &amp; Wi-Fi LAN transfer with universal clipboard sync.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(6, 182, 212, 0.08)",
                border: "1px solid rgba(6, 182, 212, 0.2)",
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#38BDF8",
                fontWeight: 700,
              }}
            >
              ⚡ 50-100 MB/s · Zero-Install P2P
            </div>
          </div>

          {/* CARD 2: Cypher Assistant */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "18px 20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, rgba(17, 24, 39, 0.88), rgba(9, 14, 23, 0.94))",
              border: "1px solid rgba(168, 85, 247, 0.28)",
              borderTop: "2.5px solid #C084FC",
              height: "186px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(168, 85, 247, 0.14)",
                  border: "1px solid rgba(168, 85, 247, 0.35)",
                  color: "#C084FC",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                }}
              >
                VOICE HUD ENGINE
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}>
                Cypher Assistant
              </div>
              <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.35 }}>
                Autonomous Tony Stark F.R.I.D.A.Y. HUD with Vector Arc Reactor &amp; 32-band EQ.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(168, 85, 247, 0.08)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#E879F9",
                fontWeight: 700,
              }}
            >
              🎙️ Gemini 1.5 Flash · Windows EXE
            </div>
          </div>

          {/* CARD 3: PulseEngine */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "18px 20px",
              borderRadius: "16px",
              background: "linear-gradient(180deg, rgba(17, 24, 39, 0.88), rgba(9, 14, 23, 0.94))",
              border: "1px solid rgba(59, 130, 246, 0.28)",
              borderTop: "2.5px solid #60A5FA",
              height: "186px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  background: "rgba(59, 130, 246, 0.14)",
                  border: "1px solid rgba(59, 130, 246, 0.35)",
                  color: "#60A5FA",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                }}
              >
                DISTRIBUTED PIPELINE
              </div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF" }}>
                PulseEngine
              </div>
              <div style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.35 }}>
                Event-driven analytics stream pipeline with robust Transactional Outbox pattern.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "8px",
                background: "rgba(59, 130, 246, 0.08)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
                fontSize: "12px",
                fontFamily: "monospace",
                color: "#93C5FD",
                fontWeight: 700,
              }}
            >
              📊 FastAPI · Redis · Postgres · Docker
            </div>
          </div>
        </div>

        {/* Bottom Dock: Tech Pills & Domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Tech Pills */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "Next.js", "Gemini AI", "AWS"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    fontSize: "13px",
                    color: "#E2E8F0",
                    fontWeight: 600,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          {/* Domain Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              borderRadius: "12px",
              background: "#0C1424",
              border: "1.2px solid rgba(34, 211, 238, 0.35)",
              color: "#38BDF8",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            🌐 pattanayakpratik.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
