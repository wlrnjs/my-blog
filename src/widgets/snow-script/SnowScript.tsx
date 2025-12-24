"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function SnowScript() {
  const pathname = usePathname();

  if (pathname !== "/about") return null;

  return <Script src="https://app.embed.im/snow.js" strategy="afterInteractive" />;
}
