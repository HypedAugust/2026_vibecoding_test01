import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Providers from "./components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily Chinese Horoscope | 데일리 사주",
  description: "Free personalized BaZi (Four Pillars of Destiny) fortune readings. Discover your daily, weekly, and monthly fortune based on traditional East Asian metaphysics. 무료 맞춤형 사주 운세 서비스.",
  keywords: ["BaZi", "Four Pillars of Destiny", "Chinese horoscope", "fortune reading", "사주", "운세", "명리학", "사주팔자", "오행"],
  authors: [{ name: "Daily Chinese Horoscope" }],
  openGraph: {
    title: "Daily Chinese Horoscope | 데일리 사주",
    description: "Free personalized BaZi fortune readings based on traditional Four Pillars of Destiny. 무료 맞춤형 사주 운세 서비스.",
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    siteName: "Daily Chinese Horoscope",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Chinese Horoscope | 데일리 사주",
    description: "Free personalized BaZi fortune readings. 무료 맞춤형 사주 운세 서비스.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "K7K-CRyJrqdl3ctHQJwBxXkITWO8WIalQYuLd-AYLEg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Daily Chinese Horoscope | 데일리 사주"
          href="https://your-chinese-horoscope.vercel.app/feed.xml"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4091214263021506"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
