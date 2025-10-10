'use client';

import { useMemo, useState } from 'react';
import cards from '@/data/cards.json';
import { isPaid } from '@/lib/plan';
import Image from 'next/image';

export default function CardsPage() {
  const paidCards = useMemo(() => cards.filter(isPaid), []);
  const [q, setQ] = useState('');

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return paidCards;
    return paidCards.filter((c) => {
      const hay = [c.message, ...(c.tags ?? [])].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [q, paidCards]);

  return (
    <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 検索欄 */}
      <div style={{ marginBottom: '16px' }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="タグ・メッセージで検索"
          style={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '14px',
          }}
        />
      </div>

      {/* カード一覧 */}
      <section
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'start',
        }}
      >
        {visible.map((c: any) => (
          <article
            key={c.id}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.06)',
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 画像エリア：サイズを揃える */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                minHeight: 280,
              }}
            >
              <Image
                src={c.image}
                alt={c.message}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority={false}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
                  color: '#fff',
                  padding: '12px',
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
                  {c.message}
                </p>
              </div>
            </div>

            {/* タグ */}
            <div
              style={{
                padding: '12px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {(c.tags ?? []).map((t: string) => (
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
        ))}
      </section>
    </main>
  );
}
