'use client';
import { useEffect, useMemo, useState } from 'react';
import cards from '@/data/cards.json';
import CardItem from '@/components/CardItem'; // 👈 これを追加！

const hash32 = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

const todayInJST = () => {
  const f = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const y = f.find((p) => p.type === 'year')?.value;
  const m = f.find((p) => p.type === 'month')?.value;
  const d = f.find((p) => p.type === 'day')?.value;
  return `${y}-${m}-${d}`;
};

const getOrCreateUserKey = () => {
  if (typeof window === 'undefined') return 'guest';
  const key = localStorage.getItem('userKey');
  if (key) return key;
  const nk = crypto?.randomUUID?.() ?? String(Math.random());
  localStorage.setItem('userKey', nk);
  return nk;
};

export default function GachaPage() {
  const [userKey, setUserKey] = useState('guest');
  useEffect(() => setUserKey(getOrCreateUserKey()), []);

  const pool = useMemo(() => cards as any[], []); // 全カードから引く
  const today = useMemo(() => todayInJST(), []);

  const card = useMemo(() => {
    if (!pool.length) return null;
    const idx = hash32(`${today}-${userKey}`) % pool.length;
    return pool[idx];
  }, [pool, today, userKey]);

  if (!card) return <main style={{ padding: 24 }}>カード準備中です。</main>;

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>今日の1枚</h1>
        <p style={{ opacity: 0.7, fontSize: 12, marginTop: 4 }}>{today}</p>
      </header>

      {/* ここがCardItemに置き換わった */}
      <CardItem card={card as any} />

      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
        ※ 日替わりは端末ごとのキー＋JST基準です。
      </p>
    </main>
  );
}
