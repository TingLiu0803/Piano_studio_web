import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Analytics from "@/components/Analytics";

// Single typeface for the whole system, per the MusicNBrain family brand:
// 400 body, 700 headings/labels, 900 heavy display wordmark. Exposed as
// --font-lato and wired to --font-sans / --font-display in globals.css.
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
        className={`${lato.variable} min-h-screen text-[color:var(--foreground)] antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
