import Image from "next/image";
import articles from "../data/articles.json";

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

// 最小カード
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
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
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
            <time>{a.date}</time>
            <span>·</span>
            <span>{(a.tags || []).join(" / ")}</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <a href={a.url} style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 12, fontSize: 14, textDecoration: "none" }}>
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
      {/* --- ヒーロー --- */}
     {/* --- ヒーロー（高さ可変 + タイトルだけオーバーレイ） --- */}
<section style={{ position: "relative", marginBottom: "1.75rem" }}>
  <div
    style={{
      position: "relative",
      width: "100%",
      // 高さ：モバイルで最低320px、画面の45vh、最大560pxにクランプ
      height: "clamp(320px, 45vh, 560px)",
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid #eee",
    }}
  >
    <Image
      src="/map.jpg"
      alt="ワタシヘルツ"
      fill
      style={{
        objectFit: "cover",
        // 切れてほしくない焦点に合わせて調整（中央= "50% 50%"、上寄せ= "50% 30%" など）
        objectPosition: "50% 45%",
      }}
      priority
      // 表示最適化：モバイルは幅100%、デスクは~60%
      sizes="(max-width: 768px) 100vw, 60vw"
    />

    {/* タイトルだけ薄めのオーバーレイ＋背景ピル */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(16px, 6vh, 48px)", // 画面が小さいほど余白を確保
        transform: "translateX(-50%)",
        textAlign: "center",
        padding: "0.5rem 0.75rem",
        // タイトルの読みやすさを上げるための半透明ピル
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: 12,
        boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)", fontWeight: 700, letterSpacing: "0.02em", color: "#222" }}>
        life atlas
      </h1>
    </div>
  </div>

  {/* 画像の下に置く：サブタイトル＆本文＆ボタン（中央寄せのまま） */}
  <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
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

      {/* --- ガイド固定表示（featuredのみ） --- */}
      {featured && (
        <section style={{ marginTop: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>まずはここから</h2>
          <div style={{ marginTop: 12 }}>
            <ArticleCardInline a={featured} />
          </div>
        </section>
      )}
    </main>
  );
}

