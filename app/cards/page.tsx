'use client';

import { useMemo, useState } from 'react';
import cards from '../../data/cards.json';
import { isPaid } from '../../lib/plan';

export default function CardsPage() {
  const paidCards = useMemo(() => cards.filter(isPaid), []);
  const [q, setQ] = useState('');
  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return paidCards;
    return paidCards.filter(c => {
      const hay = [c.message, ...(c.tags ?? [])].join(' ').toLowerCase();
      return hay.includes(needle);
    });
  }, [q, paidCards]);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="mb-4">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="タグ・メッセージで検索"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c:any) => (
          <article key={c.id} className="rounded-xl overflow-hidden border">
            <div className="relative">
              <img src={c.image} alt={c.message} className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="text-sm">{c.message}</p>
              </div>
            </div>
            <div className="p-3 flex gap-2 flex-wrap">
              {(c.tags ?? []).map((t:string) => (
                <span key={t} className="text-xs border rounded px-2 py-0.5">{t}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
