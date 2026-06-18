import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football AI Analytics",
  description:
    "Premium AI-powered football predictions. Daily curated matches, deep analysis, and portfolio tracking.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Football AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-dvh bg-black text-white font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}
