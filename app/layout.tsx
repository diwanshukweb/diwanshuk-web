import type { Metadata } from "next";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(siteUrl
    ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: "Diwanshu Kumar | Web Developer & Digital Solutions",
  description:
    "Professional websites for businesses, restaurants, hotels and local brands. Modern, mobile-first web development focused on enquiries, bookings and customer engagement.",
  openGraph: {
    title: "Diwanshu Kumar | Web Developer & Digital Solutions",
    description: "Modern websites. Built for your business.",
    type: "website",
    locale: "en_IN",
    ...(siteUrl
      ? {
          images: [
            {
              url: "/og.png",
              width: 1200,
              height: 630,
              alt: "Diwanshu Kumar — Web Developer & Digital Solutions",
            },
          ],
        }
      : {}),
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
