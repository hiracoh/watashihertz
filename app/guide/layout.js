"use client";

import "../globals.css";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";

const notoSans = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const notoSerif = Noto_Serif_JP({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function GuideLayout({ children }) {
  return (
    <div className={notoSans.className}>
      <style jsx global>{`
        main, article, p, li, blockquote {
          font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.9;
          font-weight: 400;
          color: #333;
          font-size: 16.5px;
        }

        h1, h2, h3 {
          font-family: "Noto Serif JP", serif;
          letter-spacing: 0.03em;
          color: #222;
        }
      `}</style>
      {children}
    </div>
  );
}
