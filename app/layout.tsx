import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/content/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { Nav } from "@/components/layout/nav";
import { Loader } from "@/components/layout/loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.hero.subHeadline,
  keywords: [
    "Backend Engineer",
    "Distributed Systems",
    "Apache Kafka",
    "AWS",
    "Event-Driven Architecture",
    "Full Stack Developer",
    site.name,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role}`,
    description: site.hero.subHeadline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.hero.subHeadline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="grain min-h-dvh bg-background text-foreground antialiased">
        {/* Anti-flash: set the theme class before paint. Hoisted by next/script
            so it isn't a React-rendered <script> (avoids the dev warning). */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;if(t==='light'){r.classList.add('light');}r.style.colorScheme=t;}catch(e){}`}
        </Script>
        <ThemeProvider>
          <Loader />
          <SmoothScroll>
            <CursorFollower />
            <Nav />
            <main id="top">{children}</main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
