import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";

export const viewport: Viewport = {
  themeColor: "#101010",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pattanayakpratik.vercel.app"),
  title: `${profile.name} | ${profile.role}`,
  description: profile.summary,
  authors: [{ name: profile.name }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    url: "https://pattanayakpratik.vercel.app",
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og.image.png",
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    images: ["/og.image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://pattanayakpratik.vercel.app",
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: Object.values(profile.socials),
    knowsAbout: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Backend Engineering",
      "Generative AI",
      "Machine Learning",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "C++",
      "C#",
      "Flutter",
    ],
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/montserrat-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[--background] sm:px-28 lg:px-20 px-9">
        <div className="ambient" aria-hidden="true">
          <span className="ambient-orb ambient-orb--1"></span>
          <span className="ambient-orb ambient-orb--2"></span>
        </div>
        {children}
      </body>
    </html>
  );
}
