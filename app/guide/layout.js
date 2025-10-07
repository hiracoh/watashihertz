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

<style jsx global>{`
  main, article, p, li, blockquote {
    font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.9;
    font-weight: 400;
    color: #333;
    font-size: 16.5px;
  }

  h1 {
    font-family: "Noto Serif JP", serif;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    margin: 2rem 0 1.2rem;
    color: #111;
  }

  h2 {
    font-family: "Noto Serif JP", serif;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 1.8rem 0 1rem;
    color: #222;
  }

  h3 {
    font-family: "Noto Sans JP", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 1.5rem 0 0.8rem;
    color: #333;
  }
`}</style>


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
