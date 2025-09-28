import Image from "next/image";
// ★ ここがポイント：JSONを直接import（fs不要）
import articles from "../data/articles.json";

// ボタンスタイル（あなたの既存のまま）
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

// 最小カード（この記事だけ出す）
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
  // JSONは import 時点でパースされる。ここでは featured を1件だけ拾う
  const featured = Array.isArray(articles) ? articles.find((a) => a.featured) : null;

  return (
    <main style={{ maxWidth: 768, margin: "0 auto", padding: "40px 16px" }}>
      {/* --- ヒーロー（あなたの既存セクション） --- */}
      <section style={{ display: "grid", gap: "1.25rem" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 260,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #eee",
          }}
        >
          <Image src="/map.jpg" alt="ワタシヘルツ" fill style={{ objectFit: "cover" }} priority />
        </div>

      <h1 style={{ fontSize: "1.9rem", margin: 0, textAlign: "center" }}>life atlas</h1>

<p
  style={{
    fontSize: "1.3rem",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textAlign: "center",
    color: "#222",
    margin: "1.5rem 0"
  }}
>
  自分を生きる上での、地図のような場所を。
</p>

<p style={{ margin: "0.25rem 0 0.75rem", color: "#555", whiteSpace: "pre-line", textAlign: "center" }}>
  {`ここには地図があります。生きている地図です。
過去のものも書き変わる、日々新しいものが加わる、そしてあなたの現在地に合わせて形を変えます。`}
</p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a href="/plans" style={btnPrimary}>
            プランを見る
          </a>
          <a href="/content" style={btnGhost}>
            コンテンツへ
          </a>
        </div>
      </section>

      {/* --- ガイド固定表示（featuredのみ） --- */}
      {featured && (
        <section style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>まずはここから</h2>
            <a href="/content" style={{ fontSize: 13, textDecoration: "underline", opacity: 0.8 }}>
              コンテンツ一覧へ
            </a>
          </div>
          <div style={{ marginTop: 12 }}>
            <ArticleCardInline a={featured} />
          </div>
        </section>
      )}
    </main>
  );
}
