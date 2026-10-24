import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import SpotlightEffect from "@/components/SpotlightEffect";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#101010" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pattanayakpratik.vercel.app"),
  title: `${profile.name} | ${profile.role}`,
  description: profile.summary,
  authors: [{ name: profile.name }],
  keywords: [
    "Pratik Pattanayak",
    "Backend Engineer",
    "AI Engineer",
    "Python Developer",
    "Generative AI",
    "AI Agents",
    "Flask",
    "Next.js",
    "Machine Learning",
    "PostgreSQL",
    "Supabase",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.summary,
    url: "https://pattanayakpratik.vercel.app",
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/og.image.png",
        width: 1200,
        height: 630,
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
    images: [
      {
        url: "/og.image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored ? stored === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
      <body className="bg-[--background] px-4 sm:px-12 md:px-20 lg:px-28">
        <SpotlightEffect />
        <div className="ambient" aria-hidden="true">
          <span className="ambient-orb ambient-orb--1"></span>
          <span className="ambient-orb ambient-orb--2"></span>
        </div>
        {children}
      </body>
    </html>
  );
}
