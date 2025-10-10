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
  const t = (tags[0] || '').toLowerCase();

  // ゆるい分類（必要に応じて増やしてOK）
  const isRed =
    /怒|喧嘩|葛藤|対立|苛立ち|不安|恐れ|焦り|被害/.test(t);
  const isGreen =
    /関係|つながり|共感|家族|友情|人間関係/.test(t);
  const isBlue =
    /静けさ|観察|洞察|内省|人間の傾向|落ち着き/.test(t);

  if (isRed) {
    return {
      frame: '#C86848',
      nameBar: 'linear-gradient(180deg,#E8A08A 0%, #B65A43 100%)',
      chip: '#F7E3DE',
      chipBorder: '#E4B7AA',
      shadow: 'rgba(182,90,67,0.35)',
    };
  }
  if (isGreen) {
    return {
      frame: '#5E9A6C',
      nameBar: 'linear-gradient(180deg,#A9D7B3 0%, #5E9A6C 100%)',
      chip: '#E3F3E9',
      chipBorder: '#B6D9C1',
      shadow: 'rgba(94,154,108,0.35)',
    };
  }
  if (isBlue) {
    return {
      frame: '#5C7EA6',
      nameBar: 'linear-gradient(180deg,#B0C7E2 0%, #5C7EA6 100%)',
      chip: '#E4EEF7',
      chipBorder: '#B8CCE2',
      shadow: 'rgba(92,126,166,0.35)',
    };
  }
  // default neutral
  return {
    frame: '#A09A92',
    nameBar: 'linear-gradient(180deg,#E6DED1 0%, #A09A92 100%)',
    chip: '#F1EEE8',
    chipBorder: '#D4CEC6',
    shadow: 'rgba(128,120,110,0.35)',
  };
}

export default function CardItem({ card }: { card: Card }) {
  const title =
    card.name ||
    (card.message ? String(card.message).slice(0, 18) : 'カード');
  const desc = card.description || card.message || '';
  const tags = card.tags || [];
  const color = paletteFromTags(tags);

  return (
    <article
      style={{
        // 外枠（遊戯王っぽい額縁）
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: `0 10px 26px ${color.shadow}`,
        border: `2px solid ${color.frame}`,
        background: '#fff',
        // カードの縦横比（遊戯王 ≒ 63×88mm）
        aspectRatio: '63 / 88',
        display: 'grid',
        gridTemplateRows: '10% 70% 20%', // 上1/10, 中7/10, 下2/10
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
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 0.5,
            color: '#2a1d15',
            textShadow: '0 1px 0 rgba(255,255,255,0.45)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={title}
        >
          {title}
        </h3>
      </div>

      {/* 中：画像エリア（額装、画像は比率維持でcontain） */}
      <div
        style={{
          position: 'relative',
          margin: 10,
          border: `2px solid ${color.frame}`,
          borderRadius: 10,
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src={card.image}
          alt={title}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          style={{ objectFit: 'contain' }} // トリミングせず収める
          priority={false}
        />
      </div>

      {/* 下：タグ＋説明 */}
      <div
        style={{
          padding: '10px 12px 12px',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          gap: 8,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
        }}
      >
        {/* タグ */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map((t) => (
            <span
              key={t}
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

        {/* 説明（1〜3文想定） */}
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.55,
            color: '#1d1d1d',
            display: '-webkit-box',
            WebkitLineClamp: 4,      // 入りすぎたら折り返し・省略
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {desc}
        </p>
      </div>
    </article>
  );
}
