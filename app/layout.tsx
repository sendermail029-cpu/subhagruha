import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/cormorant-garamond/700.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import AosInit from "@/components/AosInit";
import BookingModal from "@/components/BookingModal";
import PosterPopup from "@/components/PosterPopup";
import PageTransition from "@/components/PageTransition";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";


export const viewport: Viewport = { themeColor: "#8E1218", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Subhagruha Group of Companies | RERA Approved Plots in Hyderabad, Vizag & Vijayawada",
    template: "%s | Subhagruha",
  },
  description:
    "Subhagruha Projects (India) Pvt Ltd – HMDA, DTCP, VMRDA, APCRDA & RERA approved gated community and villa plots in Hyderabad, Visakhapatnam and Vijayawada since 2011. Book a free site visit.",
  keywords: [
    "plots in Hyderabad", "open plots in Hyderabad", "gated community plots in Hyderabad", "plots for sale in Hyderabad",
    "RERA approved plots", "HMDA approved plots", "plots in Vijayawada", "CRDA approved plots Vijayawada",
    "plots in Vizag", "VMRDA approved plots", "villa plots", "Subhagruha", "Subhagruha Group", "Subhagruha Group of Companies", "Subhagruha Projects", "Subha Gruha", "Sukrithi Pride", "Tree Shades Shadnagar",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Real Estate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: "Subhagruha Group of Companies | RERA Approved Plots in Hyderabad, Vizag & Vijayawada",
    description: "Gated community & villa plots with clear titles, 100% Vastu layouts and ready infrastructure. Book your free site visit today.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Subhagruha Group of Companies – RERA approved plots" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhagruha | RERA Approved Open Plots",
    description: "Gated community & villa plots in Hyderabad, Vizag & Vijayawada.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: { telephone: true },
  // Paste your Google Search Console code here (Search Console → Settings → Ownership → HTML tag):
  // verification: { google: "PASTE_GOOGLE_SEARCH_CONSOLE_CODE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Header />
        <main><PageTransition>{children}</PageTransition></main>
        <Footer />
        <FloatingContact />
        <AosInit />
        <BookingModal />
        <PosterPopup />
      </body>
    </html>
  );
}
