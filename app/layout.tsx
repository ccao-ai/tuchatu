import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://ccao-ai.github.io/tuchatu/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "词跃｜小托福 50 词能力检测",
  description: "50 道 TOEFL Junior 核心词汇测试，即时评分与错词复盘。",
  icons: { icon: `${siteUrl}favicon.svg`, shortcut: `${siteUrl}favicon.svg` },
  openGraph: {
    title: "词跃｜小托福 50 词能力检测",
    description: "50 道核心词汇测试，即时评分与错词复盘。",
    url: siteUrl,
    images: [{ url: `${siteUrl}og.png`, width: 1200, height: 630, alt: "词跃小托福 50 词能力检测" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [`${siteUrl}og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
