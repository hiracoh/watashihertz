'use client';

import { useEffect, useMemo, useState } from 'react';
import cards from '../../data/cards.json';
import { isPaid } from '../../lib/plan';

// FNV-1a 32bit 簡易ハッシュ
const hash32 = (s: string) => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// アジア/東京の“日付文字列”をつくる（ユーザーのPCが海外でも固定）
const todayInJST = () => {
  const f = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const y = f.find(p=>p.type==='year')?.value;
  const m = f.find(p=>p.type==='month')?.value;
  const d = f.find(p=>p.type==='day')?.value;
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

  // 有料のカードだけがプール
  const pool = useMemo(() => cards, []);
  const today = useMemo(() => todayInJST(), []);

  const card = useMemo(() => {
    if (!pool.length) return null;
    const idx = hash32(`${today}-${userKey}`) % pool.length;
    return pool[idx];
  }, [pool, today, userKey]);

  if (!card) return <main className="p-6">カード準備中です。</main>;

  return (
    <main className="p-6 max-w-2xl mx-auto flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-bold">今日の1枚</h1>
        <p className="text-sm opacity-70">{today}</p>
      </header>

      <article className="rounded-2xl overflow-hidden shadow">
        <div className="relative">
          {/* next/image を使っているなら置換 */}
          <img src={card.image} alt={card.message} className="w-full h-72 object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <p className="text-lg leading-relaxed">{card.message}</p>
          </div>
        </div>
        <div className="p-4 flex gap-2 flex-wrap">
          {(card.tags ?? []).map((t: string) => (
            <span key={t} className="text-xs border rounded px-2 py-0.5">{t}</span>
          ))}
        </div>
      </article>

      <p className="text-xs opacity-60">
        ※ 試験運用：端末ごとに日替わり固定。のちほどサーバ時刻＆有料検証に切り替え予定。
      </p>
    </main>
  );
}
