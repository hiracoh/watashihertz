'use client';

import { useMemo, useState } from 'react';
import cards from '@/data/cards.json';
import { isPaid } from '@/lib/plan';
import CardItem from '@/components/CardItem';

export default function CardsPage() {
  const paidCards = useMemo(() => (cards as any[]).filter(isPaid), []);
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
    <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="タグ・メッセージで検索"
          style={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: '10px 12px',
            fontSize: 14,
          }}
        />
      </div>

      <section
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // 横長カードでも潰れない幅
          alignItems: 'start',
        }}
      >
        {visible.map((c: any) => (
          <CardItem key={c.id} card={c} />
        ))}
      </section>
    </main>
  );
}
