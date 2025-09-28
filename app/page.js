import Image from "next/image";
import articles from "../data/articles.json"; // 相対パスで安全

// ボタンスタイル（既存踏襲）
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
              style={{ padding: "8px 12px", border: "1px solid #333", borderRadius: 12, fontSize: 14, textDecoration: "none" }}
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
      {/* --- ヒーロー：画像にオーバーレイ＋下に被る白カード --- */}
      {/* --- ヒーロー：画像クリップ＋外側に重ねるカード（切れない版） --- */}
<section
  style={{
    position: "relative",
    marginBottom: "5rem",   // ← カードが被る分の余白を確保
  }}
>
  {/* 画像コンテナ（ここだけ overflow:hidden で角丸クリップ） */}
  <div
    style={{
      position: "relative",
      width: "100%",
      height: 320,
      borderRadius: 16,
      overflow: "hidden",     // ← 画像のためだけに適用
      border: "1px solid #eee",
    }}
  >
    <Image src="/map.jpg" alt="ワタシヘルツ" fill style={{ objectFit: "cover" }} priority />

    {/* 暗めの半透明オーバーレイ */}
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
  </div>

  {/* 下に少しはみ出す白カード（親は overflow:visible なので切れない） */}
  <div
    style={{
      position: "absolute",
      left: "50%",
      bottom: "-2.5rem",       // ← 被り量。切れる場合は -2.0rem などに調整
      transform: "translateX(-50%)",
      background: "#fff",
      padding: "1.5rem 1.25rem",
      borderRadius: 16,
      boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
      textAlign: "center",
      width: "92%",
      maxWidth: 680,
      zIndex: 1,
    }}
  >
    <h1 style={{ fontSize: "2rem", margin: 0 }}>life atlas</h1>

    <p
      style={{
        fontSize: "1.3rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        margin: "0.75rem 0",
        color: "#222",
      }}
    >
      自分を生きる上での、地図のような場所を。
    </p>

    <p style={{ margin: "0 0 1rem", color: "#555", whiteSpace: "pre-line" }}>
      {`ここには地図があります。生きている地図です。
過去のものも書き変わる、日々新しいものが加わる、そしてあなたの現在地に合わせて形を変えます。`}
    </p>

    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
      <a href="/plans" style={btnPrimary}>プランを見る</a>
      <a href="/content" style={btnGhost}>コンテンツへ</a>
    </div>
  </div>
</section>


      {/* --- ガイド固定表示（featured のみ）※「コンテンツ一覧へ」リンクは削除 --- */}
      {featured && (
        <section style={{ marginTop: 0 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 600 }}>まずはここから</h2>
          <ArticleCardInline a={featured} />
        </section>
      )}
    </main>
  );
}
