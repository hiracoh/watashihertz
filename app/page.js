import articles from "../data/articles.json"; // 相対パスで安全（Imageは使わないのでimport不要）

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
    <>
      {/* ======================= フルブリード・ヒーロー（画面いっぱい） ======================= */}
      <section
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",             // 画角いっぱい
          marginLeft: "calc(50% - 50vw)", // コンテナ幅に関係なく左右ぴったりに
          marginRight: "calc(50% - 50vw)",
          overflow: "hidden",
          // 角丸や白フチはいったん外す（本当に全画面にしたいならこの方が自然）
          border: "none",
          borderRadius: 0,
          // 背景：和室写真
          backgroundImage: "url('/washitsu2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%", // 見せたい位置に合わせて調整
          // 雰囲気調整
          filter: "saturate(0.88) contrast(1.06)",
        }}
      >
        {/* 薄ノイズ（繰り返しタイル） */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/paper-noise.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            opacity: 0.09,
            mixBlendMode: "soft-light",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* 下にいくほど白っぽくなる柔らかグラデーション（可読性アップ） */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.12) 55%, rgba(255,255,255,0.28) 75%, rgba(255,255,255,0.45) 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

       {/* タイトルは一旦非表示 */}
{/*
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
    color: "#2a2a2a",
    mixBlendMode: "multiply",
    textShadow: `
      0 1px 0 rgba(255,255,255,0.55),
      0 -1px 0 rgba(0,0,0,0.20),
      0 2px 6px rgba(0,0,0,0.10)`,
    zIndex: 3,
  }}
>
  life atlas
</h1>
*/}
      </section>

      {/* ======================= 本文（中央 768px コンテナ） ======================= */}
      <main style={{ maxWidth: 768, margin: "0 auto", padding: "40px 16px" }}>
        {/* 画像の下：サブタイトル／説明文／ボタン */}
        <section style={{ textAlign: "center" }}>
          {/* サブタイトル */}
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              color: "#222",
              margin: "0 0 1.5rem",
            }}
          >
            自分を生きる地図を描く。
          </p>

          {/* 説明文 */}
          <p
            style={{
              margin: "0 0 2rem",
              color: "#555",
              whiteSpace: "pre-line",
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            {`ここは図書室であり瞑想室です。
気になる情報に触れて、少し座って自分に問い、たゆたう次を描く場所。`}
          </p>

          {/* ボタン */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/plans" style={btnPrimary}>
              プランを見る
            </a>
            <a href="/content" style={btnGhost}>
              コンテンツへ
            </a>
          </div>
        </section>

        {/* ガイド固定表示（featured のみ） */}
        {featured && (
          <section style={{ marginTop: 24 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 600 }}>まずはここから</h2>
            <div style={{ marginTop: 12 }}>
              <ArticleCardInline a={featured} />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
