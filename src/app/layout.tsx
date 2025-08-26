import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OptiMind AI Ecosystem - Platinum Grade Enterprise AI Platform",
  description: "Transform your enterprise with cutting-edge AI technology. Built for scale, security, and performance.",
  keywords: [
    "AI",
    "Enterprise",
    "Platform",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Prisma",
    "Authentication",
    "Real-time",
    "Platinum Grade"
  ],
  authors: [{ name: "Black Nobility Enterprise LLC" }],
  openGraph: {
    title: "OptiMind AI Ecosystem",
    description: "Platinum Grade Enterprise AI Platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiMind AI Ecosystem",
    description: "Platinum Grade Enterprise AI Platform",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background font-sans antialiased">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}