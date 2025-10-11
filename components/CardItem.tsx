'use client';
import Image from 'next/image';

type Card = {
  id: string;
  image: string;
  name?: string;
  description?: string; // 1〜3文想定
  message?: string;     // 後方互換
  tags?: string[];
};

function paletteFromTags(tags: string[] = []) {
  const Ts = tags.map(t => String(t).trim().toLowerCase());
  const has = (needle: string) => Ts.some(t => t.includes(needle));
  const isRed   = has('人間の傾向');
  const isBlue  = has('人間・人生とは');
  const isGreen = has('よりよく生きる');

  if (isRed)   return { frame:'#C86848', nameBar:'linear-gradient(180deg,#E8A08A 0%, #B65A43 100%)', chip:'#F7E3DE', chipBorder:'#E4B7AA', shadow:'rgba(182,90,67,0.35)' };
  if (isBlue)  return { frame:'#5C7EA6', nameBar:'linear-gradient(180deg,#B0C7E2 0%, #5C7EA6 100%)', chip:'#E4EEF7', chipBorder:'#B8CCE2', shadow:'rgba(92,126,166,0.35)' };
  if (isGreen) return { frame:'#5E9A6C', nameBar:'linear-gradient(180deg,#A9D7B3 0%, #5E9A6C 100%)', chip:'#E3F3E9', chipBorder:'#B6D9C1', shadow:'rgba(94,154,108,0.35)' };
  return { frame:'#A09A92', nameBar:'linear-gradient(180deg,#E6DED1 0%, #A09A92 100%)', chip:'#F1EEE8', chipBorder:'#D4CEC6', shadow:'rgba(128,120,110,0.35)' };
}

export default function CardItem({ card }: { card: Card }) {
  const title = card.name || (card.message ? String(card.message).slice(0, 18) : 'カード');
  const desc  = card.description || card.message || '';
  const tags  = card.tags || [];
  const color = paletteFromTags(tags);

  return (
    <article
      className="card"
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: `0 10px 26px ${color.shadow}`,
        border: `2px solid ${color.frame}`,
        background: '#fff',
        display: 'grid',                         // ← レイアウトはCSSに任せる
      }}
    >
      {/* 上：名前バー */}
      <div
        style={{
          background: color.nameBar,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          borderBottom: `1px solid ${color.frame}`,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 2,
            color: '#5A3C0D',
            textShadow: '0 1.5px 0 rgba(255,255,255,0.45)',
            fontFamily: `'BIZ UDPGothic', 'Noto Sans JP', system-ui, sans-serif`,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={title}
        >
          {title}
        </h3>
      </div>

      {/* 中：画像枠（画像自体は contain） */}
      <div className="imgWrap"
        style={{
          position: 'relative',
          margin: 10,
          border: `2px solid ${color.frame}`,
          borderRadius: 10,
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={card.image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          style={{ objectFit: 'contain' }}
          priority={false}
        />
      </div>

      {/* 下：タグ＋説明 */}
      <div className="bottom"
        style={{
          padding: '10px 12px 12px',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gap: 8,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
        }}
      >
        <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((t) => (
            <span
              key={t}
              className="chip"
              style={{
                fontSize: 12,
                border: `1px solid ${color.chipBorder}`,
                background: color.chip,
                color: '#333',
                borderRadius: 999,
                padding: '2px 8px',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p className="desc"
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: '#1d1d1d',
            display: '-webkit-box',
            WebkitLineClamp: 4,                  // PC時：4行
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>
      </div>

      {/* ====== レイアウトはCSSで切り替え（inlineをやめる） ====== */}
      <style jsx>{`
        /* PC/タブレット：当初どおり */
        @media (min-width: 601px) {
          .card { aspect-ratio: 63 / 88; grid-template-rows: 12% 68% 20%; }
        }

        /* スマホ：余白をなくしてタグ＋本文を上げる */
        @media (max-width: 600px) {
          .card { aspect-ratio: auto; grid-template-rows: auto auto auto; }

          /* 画像“枠”の高さだけを適度に確保（横幅はそのまま） */
          .imgWrap { margin: 8px; border-width: 1.5px; height: 44vw; max-height: 260px; }
          .imgWrap :global(img) { width: 100%; height: 100%; object-fit: contain; }

          .bottom { gap: 6px; padding: 8px 10px 12px; }
          .tags .chip { font-size: 11px; padding: 1px 6px; }

          /* 説明は全文表示（縛りを完全解除） */
          .desc {
            display: block;
            overflow: visible !important;
            -webkit-line-clamp: unset !important;
            line-clamp: unset !important;
            max-height: none !important;
            white-space: normal;
            font-size: 13px;
            line-height: 1.7;
          }
        }
      `}</style>
    </article>
  );
}
