import type { Metadata } from "next";
import CypherShowcase from "@/components/CypherShowcase";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cypher AI — Holographic F.R.I.D.A.Y. Desktop HUD | Pratik Pattanayak",
  description:
    "Autonomous desktop voice assistant inspired by Tony Stark's F.R.I.D.A.Y. Vector Arc Reactor HUD, 32-band audio spectrum equalizer, telemetry gauges, and standalone Windows executable.",
  alternates: {
    canonical: "/projects/cypher",
  },
  openGraph: {
    title: "Cypher AI — Holographic F.R.I.D.A.Y. Desktop HUD",
    description:
      "Download standalone Windows executable. 4 reactive states, real-time audio visualizer, telemetry gauges, and Gemini 1.5 Flash intelligence.",
    url: "https://pattanayakpratik.vercel.app/projects/cypher",
    images: [
      {
        url: "/projects/cypher/cypher_gui_idle.png",
        width: 1280,
        height: 720,
        alt: "Cypher AI Holographic HUD — Standby Arc Reactor",
      },
    ],
  },
};

export default function CypherPage() {
  return (
    <>
      <ScrollProgress />
      <main>
        <CypherShowcase />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
