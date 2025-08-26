import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OptiMind AI - Advanced SEO/AEO/GEO AI Optimization Platform",
  description: "Intelligent content creation, photo editing, and digital optimization suite powered by AI. Transform your digital presence with advanced SEO, AEO, and GEO optimization.",
  keywords: ["SEO", "AEO", "GEO", "AI", "optimization", "content-creation", "photo-editing", "NSFW-detection", "machine-learning", "digital-marketing", "web-optimization", "AI-powered", "enterprise", "scalable"],
  authors: [{ name: "OptiMind AI Team" }],
  openGraph: {
    title: "OptiMind AI - Advanced SEO/AEO/GEO AI Optimization Platform",
    description: "Intelligent content creation, photo editing, and digital optimization suite powered by AI",
    url: "https://optimind-ai.com",
    siteName: "OptiMind AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiMind AI - Advanced SEO/AEO/GEO AI Optimization Platform",
    description: "Intelligent content creation, photo editing, and digital optimization suite powered by AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
