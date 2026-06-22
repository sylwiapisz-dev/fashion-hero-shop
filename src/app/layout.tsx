import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Shell } from "@/components/shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "FashionHero — Comfortable, Sustainable Shoes",
  description:
    "Sustainable, supportive, and wildly comfortable shoes made from natural materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
