import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "词跃｜小托福 50 词能力检测",
    description: "50 道 TOEFL Junior 核心词汇测试，即时评分与错词复盘。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "词跃｜小托福 50 词能力检测",
      description: "50 道核心词汇测试，即时评分与错词复盘。",
      images: [{ url: new URL("/og.png", base).toString(), width: 1200, height: 630, alt: "词跃小托福 50 词能力检测" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", images: [new URL("/og.png", base).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
