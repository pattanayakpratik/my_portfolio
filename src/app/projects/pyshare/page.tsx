import type { Metadata } from "next";
import PyShareShowcase from "@/components/PyShareShowcase";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "PyShare — High-Speed Cross-Device File Transfer & Clipboard Hub | Pratik Pattanayak",
  description:
    "Cross-platform WebRTC P2P and local Wi-Fi file sharing & universal clipboard hub. Zero-install web app at pyshare.vercel.app and standalone Windows executable with 50-100 MB/s transfer speeds.",
  alternates: {
    canonical: "/projects/pyshare",
  },
  openGraph: {
    title: "PyShare — High-Speed Cross-Device File Transfer & Clipboard Hub",
    description:
      "Instant zero-install Web P2P mode, high-speed offline Wi-Fi LAN transfer, Cloudflare tunnel, HTTP 206 streaming, and standalone Windows executable.",
    url: "https://pattanayakpratik.vercel.app/projects/pyshare",
    images: [
      {
        url: "/projects/pyshare/banner.png",
        width: 1280,
        height: 720,
        alt: "PyShare Cross-Device File Transfer Hub",
      },
    ],
  },
};

export default function PySharePage() {
  return (
    <>
      <ScrollProgress />
      <main>
        <PyShareShowcase />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
