import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bon_foyage = localFont({
  src: "../app/fonts/Bon-Foyage-Demo.otf",
  display: "swap",
  variable: "--font-bon_foyage",
});
const satoshi = localFont({
  src: [
    {
      path: "../app/fonts/Satoshi-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Fashionista",
  description: "Generated by create next app",
  robots: "index, follow",
  authors: [
    {
      name: "Fashionistar clothings",
      url: "https://www.fashionistarclothings.com",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://www.fashionistarclothings.com",
    title: "Fashionistar Clothings",
    description: "",
    siteName: "",
    images: [{ url: "/logo.svg", username: "" }],
  },
  twitter: { card: "summary_large_image", site: "@site", images: "" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${bon_foyage.variable}`}>
        {children}
      </body>
    </html>
  );
}
