import Image from "next/image";
import articles from "../data/articles.json"; // 相対パスで安全

// ボタンスタイル
const btnPrimary = {
  display: "inline-block",
  padding: "0.6rem 1rem",
  borderRadius: 12,
  background: "#222",
  color: "#fff",
  textDecoration: "none",
};
const btnGhost = {
  display: "inline-block",
  padding: "0.6rem 1rem",
  borderRadius: 12,
  border: "1px solid #222",
  textDecoration: "none",
  color: "#222",
  background: "#fff",
};

// ガイド用の最小カード
function ArticleCardInline({ a }) {
  return (
    <article style={{ border: "1px solid #eee", borderRadius: 16, padding: 16, background: "#fff" }}>
      <div style={{ display: "flex", gap: 12 }}>
        {a.thumb && (
          <img
            src={a.thumb}
            alt=""
            style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 12, border: "1px solid #eee" }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: 16,
              fontWeight: 600,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {a.title}
            {a.featured && (
              <span
                style={{
                  marginLeft: 8,
                  fontSize: 11,
                  padding: "2px 8px",
                  border: "1px solid #ddd",
                  borderRadius: 999,
                  verticalAlign: "middle",
                }}
              >
                ガイド
              </span>
            )}
          </h3>
          {a.summary && <p style={{ margin: 0, opacity: 0.7, fontSize: 14 }}>{a.summary}</p>}
          <div style={{ marginTop: 8, display: "flex", gap: 8, fontSize: 12, opacity: 0.7 }}>
            {a.date && <time>{a.date}</time>}
            {a.date && <span>·</span>}
            <span>{(a.tags || []).join(" / ")}</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <a
              href={a.url}
              style={{
                padding: "8px 12px",
                border: "1px solid #333",
                borderRadius: 12,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              記事を読む
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const featured = Array.isArray(articles) ? articles.find((a) => a.featured) : null;

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "40px 16px" }}>
     {/* --- ヒーロー：下に行くほど白くなる＋等高線＋文字だけタイトル --- */}
<section style={{ position: "relative", marginBottom: "1.75rem" }}>
  <div
    style={{
      position: "relative",
      width: "100%",
      height: "clamp(360px, 48vh, 600px)",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #eee",
    }}
  >
    {/* 背景画像 */}
    <Image
      src="/map.jpg"
      alt="ワタシヘルツ"
      fill
      priority
      sizes="(max-width: 768px) 100vw, 768px"
      style={{
        objectFit: "cover",
        objectPosition: "50% 45%",
      }}
    />

    {/* 柔らかグラデ（上:透明 → 下:白寄り）※最背面より一段上 */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.28) 75%, rgba(255,255,255,0.45) 100%)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />

    {/* 等高線SVG（グラデの上に来るよう zIndex:2） */}
    <svg
      aria-hidden="true"
      width="100%"
      height="140"
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2,              // 0.12〜0.25で調整
        pointerEvents: "none",
        zIndex: 2,                 // ← これで見えるようになる
      }}
    >
      <defs>
        <linearGradient id="contourStroke" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8f8573" />
          <stop offset="100%" stopColor="#bfb6a3" />
        </linearGradient>
      </defs>
      <path d="M0,95 C220,80 380,125 600,110 C820,95 980,125 1200,110" fill="none" stroke="url(#contourStroke)" strokeWidth="2" />
      <path d="M0,115 C200,105 400,140 600,125 C800,110 1000,140 1200,125" fill="none" stroke="url(#contourStroke)" strokeWidth="1.5" />
      <path d="M0,75 C260,65 420,105 600,90 C780,75 960,105 1200,90" fill="none" stroke="url(#contourStroke)" strokeWidth="1" />
    </svg>

    {/* タイトル（文字のみ／テキストシャドウで読みやすさ確保） */}
    <h1
      style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(14px, 5vh, 40px)",
        transform: "translateX(-50%)",
        margin: 0,
        fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)",
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: "#222",
        zIndex: 3, // 等高線のさらに上
        // 薄い縁取り効果：PCでも浮きすぎない程度
        textShadow: "0 1px 2px rgba(255,255,255,0.6)",
      }}
    >
      life atlas
    </h1>
  </div>

  {/* 画像の下：サブタイトル／本文／ボタン（中央寄せ） */}
  <div style={{ marginTop: "1.1rem", textAlign: "center" }}>
    <p
      style={{
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        color: "#222",
        margin: "0.75rem 0",
      }}
    >
      自分を生きる上での、地図のような場所を。
    </p>

    <p
      style={{
        margin: "0.25rem 0 0.75rem",
        color: "#555",
        whiteSpace: "pre-line",
      }}
    >
      {`ここには地図があります。生きている地図です。
過去のものも書き変わる、日々新しいものが加わる、そしてあなたの現在地に合わせて形を変えます。`}
    </p>

    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.75rem" }}>
      <a href="/plans" style={{
        display:"inline-block", padding:"0.6rem 1rem", borderRadius:12,
        background:"#222", color:"#fff", textDecoration:"none"
      }}>
        プランを見る
      </a>
      <a href="/content" style={{
        display:"inline-block", padding:"0.6rem 1rem", borderRadius:12,
        border:"1px solid #222", textDecoration:"none", color:"#222", background:"#fff"
      }}>
        コンテンツへ
      </a>
    </div>
  </div>
</section>

      {/* --- ガイド固定表示（featured のみ。リンク無し） --- */}
      {featured && (
        <section style={{ marginTop: 24 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 600 }}>まずはここから</h2>
          <div style={{ marginTop: 12 }}>
            <ArticleCardInline a={featured} />
          </div>
        </section>
      )}
    </main>
  );
}
