'use client';
import Image from 'next/image';

type Card = {
  id: string;
  image: string;
  message: string;
  tags?: string[];
};

export default function CardItem({ card }: { card: Card }) {
  return (
    <article
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
        border: '1px solid rgba(0,0,0,0.08)',
        background: '#fff',
        aspectRatio: '63 / 88', // カード全体は縦長で固定
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 上：画像エリア（3/5） */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flexBasis: '60%', // 3/5
          flexShrink: 0,
          background: '#f3f3f3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8, // 額縁感
        }}
      >
        <Image
          src={card.image}
          alt={card.message}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          style={{ objectFit: 'contain', objectPosition: 'center' }} // トリミングなし
          priority={false}
        />
      </div>

      {/* 下：本文＆タグ（2/5） */}
      <div style={{ flex: '1 1 40%', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, fontWeight: 700, color: '#1a1a1a' }}>
          {card.message}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(card.tags ?? []).map(t => (
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
