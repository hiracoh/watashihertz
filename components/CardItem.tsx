'use client';
import Image from 'next/image';

type Card = {
  id: string;
  image: string;      // 例: "/cards/001.webp"
  message: string;
  tags?: string[];
};

export default function CardItem({ card }: { card: Card }) {
  return (
    <article
      style={{
        // カード全体の見た目（TCGっぽく）
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        // カードの縦横比（ポケカ：63x88mm ≒ 63/88）
        aspectRatio: '63 / 88',
        // レイアウト
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 上：画像エリア（カード高さの 3/5） */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          // 高さ配分（3:2）
          flexBasis: '60%',
          flexShrink: 0,
          background: '#f3f3f3',      // 余白部分の背景
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,                  // 画像まわりに少し額縁感
        }}
      >
        {/* 画像は “元の比率のまま” 収める（トリミングしない） */}
        <Image
          src={card.image}
          alt={card.message}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          style={{
            objectFit: 'contain',      // ← ここがポイント（cover だとトリミング）
            objectPosition: 'center',
          }}
          priority={false}
        />
      </div>

      {/* 下：本文＆タグ（カード高さの 2/5） */}
      <div
        style={{
          flex: '1 1 40%',
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: 700,
            color: '#1a1a1a',
          }}
        >
          {card.message}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 'auto', // 下側に寄せすぎない場合は削除
          }}
        >
          {(card.tags ?? []).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 12,
                border: '1px solid rgba(0,0,0,0.12)',
                borderRadius: 999,
                padding: '2px 8px',
                background: '#fafafa',
                color: '#333',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
