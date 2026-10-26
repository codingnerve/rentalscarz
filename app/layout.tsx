import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CookieConsent } from "../components/CookieConsent";
import { AnalyticsTracker } from "../components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#213052",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rentalscarz.co"),
  title: {
    default: "RentalsCarz | Premium Car Rental Services - USA, UK & Canada",
    template: "%s | RentalsCarz Car Rental",
  },
  description:
    "Book premium, economy, and SUV car rentals across major airport hubs in the United States, United Kingdom, and Canada. Transparent daily rates, 24/7 support, and free 48-hour cancellation.",
  keywords: [
    "car rental",
    "airport car rental",
    "SUV rental",
    "luxury car rental",
    "economy car rental",
    "RentalsCarz",
    "JFK car rental",
    "LAX car rental",
    "Heathrow car rental",
    "Pearson airport rental",
  ],
  authors: [{ name: "RentalsCarz Global Reservations" }],
  openGraph: {
    title: "RentalsCarz | Premium Car Rental Services",
    description:
      "Reliable car rental solutions for business travel, airport transit, and vacations. Upfront pricing and verified fleet reservations.",
    url: "https://rentalscarz.co",
    siteName: "RentalsCarz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalsCarz | Premium Car Rental Services",
    description: "Reliable car rental solutions across the USA, UK, and Canada.",
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://rentalscarz.co" />
        <AnalyticsTracker />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-[#ED6029] selection:text-white">
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
