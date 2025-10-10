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
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.06)',
        background: '#fff',
      }}
    >
      {/* 画像ラッパ：アスペクト比を固定（4:5） */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          // 互換性フォールバック（旧ブラウザ用）
          minHeight: 280,
        }}
      >
        <Image
          src={card.image}
          alt={card.message}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          priority={false}
        />
        {/* 下部グラデ＋本文 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
            color: '#fff',
            padding: 12,
          }}
        >
          <p
            style={{
              margin: 0,
              lineHeight: 1.4,
              fontSize: 16,
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {card.message}
          </p>
        </div>
      </div>

      {/* タグ */}
      <div style={{ padding: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(card.tags ?? []).map((t) => (
          <span
            key={t}
            style={{
              fontSize: 12,
              border: '1px solid rgba(0,0,0,0.12)',
              borderRadius: 999,
              padding: '2px 8px',
              background: '#fafafa',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
