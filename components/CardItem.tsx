'use client';

import Image from 'next/image';

type Card = {
  id: string;
  image: string;
  name?: string;
  description?: string; // 1〜3文想定
  message?: string;     // 旧フィールド（後方互換）
  tags?: string[];
};

function paletteFromTags(tags: string[] = []) {
  const Ts = tags.map(t => String(t).trim().toLowerCase());
  const has = (needle: string) => Ts.some(t => t.includes(needle));

  const isRed   = has('人間の傾向');       // 赤
  const isBlue  = has('人間・人生とは');   // 青
  const isGreen = has('よりよく生きる');   // 緑

  if (isRed) {
    return {
      frame: '#C86848',
      nameBar: 'linear-gradient(180deg,#E8A08A 0%, #B65A43 100%)',
      chip: '#F7E3DE',
      chipBorder: '#E4B7AA',
      shadow: 'rgba(182,90,67,0.35)',
      surfaceBase: '#F9F4F1',
      surfaceTint: 'rgba(230, 176, 160, 0.35)',
    };
  }
  if (isBlue) {
    return {
      frame: '#5C7EA6',
      nameBar: 'linear-gradient(180deg,#B0C7E2 0%, #5C7EA6 100%)',
      chip: '#E4EEF7',
      chipBorder: '#B8CCE2',
      shadow: 'rgba(92,126,166,0.35)',
      surfaceBase: '#F4F7FB',
      surfaceTint: 'rgba(146, 176, 210, 0.35)',
    };
  }
  if (isGreen) {
    return {
      frame: '#5E9A6C',
      nameBar: 'linear-gradient(180deg,#A9D7B3 0%, #5E9A6C 100%)',
      chip: '#E3F3E9',
      chipBorder: '#B6D9C1',
      shadow: 'rgba(94,154,108,0.35)',
      surfaceBase: '#F4FAF6',
      surfaceTint: 'rgba(120, 180, 140, 0.35)',
    };
  }
  return {
    frame: '#A09A92',
    nameBar: 'linear-gradient(180deg,#E6DED1 0%, #A09A92 100%)',
    chip: '#F1EEE8',
    chipBorder: '#D4CEC6',
    shadow: 'rgba(128,120,110,0.35)',
    surfaceBase: '#F6F2EC',
    surfaceTint: 'rgba(170, 160, 150, 0.35)',
  };
}

/* ノイズSVG */
const NOISE_SVG_DATAURI =
  "url(\"data:image/svg+xml;utf8,\
<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'>\
<rect width='8' height='8' fill='rgba(0,0,0,0)'/>\
<circle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.03)'/>\
<circle cx='4' cy='3' r='0.5' fill='rgba(0,0,0,0.03)'/>\
<circle cx='6' cy='6' r='0.5' fill='rgba(0,0,0,0.03)'/>\
</svg>\")";

export default function CardItem({ card }: { card: Card }) {
  const title = card.name || (card.message ? String(card.message).slice(0, 18) : 'カード');
  const desc = card.description || card.message || '';
  const tags = card.tags || [];
  const color = paletteFromTags(tags);

  return (
    <article
      className="card"
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        border: '8px solid transparent',
        boxShadow: `0 10px 26px ${color.shadow}`,
        background: [
          // 紙質・テクスチャ
          `radial-gradient(120% 80% at 50% 20%, rgba(255,255,255,0.8), rgba(255,255,255,0) 60%)`,
          `repeating-linear-gradient(-25deg, rgba(255,255,255,0.12) 0 2px, rgba(0,0,0,0.03) 2px 3px)`,
          `linear-gradient(180deg, ${color.surfaceTint} 0%, rgba(255,255,255,0) 85%)`,
          color.surfaceBase,
          `linear-gradient(white, white)`,
          `linear-gradient(180deg, #ECECEC 0%, #C0C0C0 100%)`
        ].join(', '),
        backgroundOrigin: 'padding-box, padding-box, padding-box, padding-box, padding-box, border-box',
        backgroundClip: 'padding-box, padding-box, padding-box, padding-box, padding-box, border-box',
        display: 'grid',
        position: 'relative',
      }}
    >
      {/* ノイズ */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: NOISE_SVG_DATAURI,
          backgroundSize: '8px 8px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* 名前バー */}
      <div
        style={{
          background: color.nameBar,
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          borderBottom: `1px solid ${color.frame}`,
          position: 'relative',
          zIndex: 1,
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

      {/* 画像枠 */}
      <div
        className="imgWrap"
        style={{
          position: 'relative',
          margin: 10,
          border: '4px solid transparent',
          background: [
            `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.6), rgba(255,255,255,0.1))`,
            `linear-gradient(white, white)`,
            `linear-gradient(180deg, #ECECEC 0%, #C0C0C0 100%)`
          ].join(', '),
          backgroundOrigin: 'padding-box, padding-box, border-box',
          backgroundClip: 'padding-box, padding-box, border-box',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
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

      {/* タグ＋説明 */}
      <div
        className="bottom"
        style={{
          position: 'relative',
          zIndex: 2,
          margin: '0 0px 2px',
          padding: '12px',
          borderRadius: 12,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.96))',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gap: 4,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#fff',
                color: '#333',
                borderRadius: 999,
                padding: '2px 8px',
                boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          className="desc"
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: '#1d1d1d',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>
      </div>

      <style jsx>{`
        @media (min-width: 601px) {
          .card { aspect-ratio: 63 / 88; grid-template-rows: 12% 65% 23%; }
          .imgWrap { margin: 10px; height: 50%; max-height: none; }
        }
        @media (max-width: 600px) {
          .card { aspect-ratio: auto; grid-template-rows: auto auto auto; }
          .imgWrap { margin: 8px; border-width: 1.5px; height: 44vw; max-height: 260px; }
          .imgWrap :global(img) { width: 100%; height: 100%; object-fit: contain; }
          .bottom { gap: 6px; padding: 10px 12px 14px; margin: 0 0 2px; border-radius: 0; }
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
