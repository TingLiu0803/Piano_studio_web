import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for H1/H2 ("Ivory & Felt" design system). opsz axis: elegant
// at large sizes, sturdy at small. Applied via the h1/h2 rule in globals.css.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = headerList.get("x-site-locale");
  const htmlLang = locale === "zh" ? "zh-CN" : "en-US";

  return (
    <html lang={htmlLang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} min-h-screen text-[color:var(--foreground)] antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
