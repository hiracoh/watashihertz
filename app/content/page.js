'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import NoteEmbed from '@/components/NoteEmbed';

export default function Content() {
  const search = useSearchParams();
  const tab = search.get('tab') || 'articles';

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
          <p style={{ color:'#666' }}>ここに音声（ポッドキャスト等）を並べます。</p>
          <audio controls src="" style={{ width:'100%' }} />
        </div>
      );
    }
    if (tab === 'cards') {
      return (
        <div>
          <h2>カード（一言メモ）</h2>
          <div style={{ display:'grid', gap:'0.75rem', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))' }}>
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
    // 記事タブ：note埋め込み
    return (
      <div>
        <h2 style={{ marginTop:0 }}>記事</h2>
        <p style={{ color:'#666' }}>外部プラットフォーム（note）で公開中の記事一覧をそのまま埋め込んで表示します。</p>

        <NoteEmbed url="https://note.com/hiracoh" height={1600} />

        <p style={{ color:'#777', fontSize:13, marginTop:'0.5rem' }}>
          ※ ブラウザやnote側の設定により、埋め込みが表示されない場合があります。
          その際は上の「直接開く →」リンクからご覧ください。
        </p>
      </div>
    );
  }, [tab]);

  return (
    <section>
      <h1 style={{ fontSize:'1.5rem', marginTop:0 }}>コンテンツ</h1>
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
