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
        /* 本文系：下書きの改行をそのまま反映 */
        main p,
        main li,
        main blockquote {
          white-space: pre-line;
          line-height: 1.9;
          color: #333;
          font-size: 16.5px;
          white-space: pre-wrap;
          font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
          font-weight: 400;
        }

        /* 見出し：フォントとサイズ */
        main h1 {
          font-family: "Noto Serif JP", serif;
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #111;
          margin: 2rem 0 1.2rem; /* 任意（記事タイトル用） */
        }
        main h2 {
          font-family: "Noto Serif JP", serif;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #222;
          /* 指定：上に5行、下は0行（行=約1.9行分をrem換算で近似） */
          margin-top: 9.5rem;  /* ≒ 5行分 */
          margin-bottom: 0;
        }
        main h3 {
          font-family: "Noto Sans JP", sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          /* 指定：上に3行、下は0行 */
          margin-top: 5.7rem;  /* ≒ 3行分 */
          margin-bottom: 0;
        }

        /* 引用などの見栄え（任意） */
        main blockquote {
          border-left: 3px solid #ddd;
          padding-left: 1em;
          color: #444;
        }

        /* 画像とキャプションの基本 */
        main figure {
          margin: 2rem 0;
          text-align: center;
        }
        main figcaption {
          margin-top: 0.25rem;
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>
      {children}
    </div>
  );
}
