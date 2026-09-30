import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CinematicProvider from "@/components/providers/CinematicProvider";
import FilmGrain from "@/components/cinematic/FilmGrain";
import CinematicLetterbox from "@/components/cinematic/CinematicLetterbox";
import CustomCursor from "@/components/ui/CustomCursor";
import GameHUD from "@/components/game/GameHUD";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hacker-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akshayrathod.dev"),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Akshay Rathod",
    "Data & AI Engineer",
    "GenAI",
    "RAG",
    "Data Engineering",
    "Machine Learning",
    "Python",
    "FastAPI",
    "Next.js",
    "LLM Agents",
    "Data Analytics",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshayrathod.dev",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.bio,
    url: "https://akshayrathod.dev",
    sameAs: [siteConfig.github, siteConfig.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.education.institution,
    },
    knowsAbout: [
      "Artificial Intelligence",
      "Retrieval-Augmented Generation",
      "Data Engineering",
      "Big Data",
      "Machine Learning",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${orbitron.variable} ${shareTechMono.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-midnight text-white selection:bg-electric-blue selection:text-white relative">
        <CinematicProvider>
          <FilmGrain />
          <CinematicLetterbox />
          <CustomCursor />
          <GameHUD />
          <SmoothScrollProvider>
            <Navbar />
            <main id="main-content" className="relative z-10 flex flex-col min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </CinematicProvider>
      </body>
    </html>
  );
}
