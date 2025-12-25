import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { cn } from "../shared/lib";
import { Header } from "@/widgets";
import { ThemeProvider } from "./providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.wlrnjs.xyz"),
  title: {
    default: "지권 | 프론트엔드 개발 블로그",
    template: "%s | 지권",
  },
  description:
    "프론트엔드 개발 과정에서 마주한 문제와 해결 과정을 기록하는 개인 기술 블로그입니다.",
  openGraph: {
    siteName: "지권",
    type: "website",
    title: {
      default: "지권 | 프론트엔드 개발 블로그",
      template: "%s | 지권",
    },
    description:
      "프론트엔드 개발 과정에서 마주한 문제와 해결 과정을 기록하는 개인 기술 블로그입니다.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "개발 블로그",
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />

        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50",
          "transition-colors",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem enableColorScheme>
          <div className="mx-auto max-w-2xl px-4 py-10">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
