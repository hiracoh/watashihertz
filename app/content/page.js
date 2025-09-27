'use client';

import { useMemo } from 'react';

export default function Content() {
  // URLクエリ ?tab=articles|audio|cards を読む
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const tab = params?.get('tab') || 'articles';

  const tabs = [
    { key:'articles', label:'記事' },
    { key:'audio',    label:'音声' },
    { key:'cards',    label:'カード' },
  ];

  const body = useMemo(() => {
    if (tab === 'audio') {
      return (
        <div>
          <h2>音声</h2>
          <p style={{ color:'#666' }}>ここに音声（ポッドキャスト的）を並べます。</p>
          <audio controls src="" style={{ width:'100%' }} />
        </div>
      );
    }
    if (tab === 'cards') {
      return (
        <div>
          <h2>カード（一言メモ）</h2>
          <div style={{ display:'grid', gap:'0.75rem', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'0.9rem' }}>
                <div style={{ fontWeight:600 }}>カード {i}</div>
                <div style={{ color:'#666', marginTop:'0.25rem' }}>“違っても同じでも自分は自分”</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // default: articles
    return (
      <div>
        <h2>記事</h2>
        <p style={{ color:'#666' }}>ここに記事一覧を並べます（のちほどMDXや外部連携に差し替え）</p>
        <ul>
          <li><a href="#">民衆が騒動に加担するまでの道のり</a></li>
          <li><a href="#">“違い”を受け入れることが世界を変える</a></li>
          <li><a href="#">フィルター（エゴ）を脇に置く練習</a></li>
        </ul>
      </div>
    );
  }, [tab]);

  return (
    <section>
      <h1 style={{ fontSize:'1.5rem', marginTop:0 }}>コンテンツ</h1>

      {/* タブ */}
      <div style={{ display:'flex', gap:'0.5rem', margin:'0.75rem 0 1rem' }}>
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <a key={t.key} href={`/content?tab=${t.key}`}
               style={{
                 textDecoration:'none',
                 padding:'0.4rem 0.75rem', borderRadius:999,
                 border: active ? '1px solid #222' : '1px solid #ddd',
                 background: active ? '#fff' : '#F6F1E9',
                 color:'#222'
               }}>
              {t.label}
            </a>
          );
        })}
      </div>

      {body}
    </section>
  );
}
