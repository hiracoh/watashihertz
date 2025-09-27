import Image from 'next/image';
import articlesData from '../../data/articles.json'; // ← 相対パス。エイリアス未設定でも確実に動く

// （任意）後付けサマリー辞書：JSONにsummaryが無いときの保険
const customSummaries = {
  // "https://note.com/hiracoh/n/xxxxxxxx": "ここにあなたの要約",
  "https://note.com/hiracoh/n/n30bdf42b4dee": "SNSの炎上に見る、現代を生きる人間とは。",
  "https://note.com/hiracoh/n/n4d32a54331e6": "人間って実は…AIだった!?",
};

export default function Content({ searchParams }) {
  const tab = (searchParams?.tab || 'articles');

  const tabs = [
    { key: 'articles', label: '記事' },
    { key: 'audio',    label: '音声' },
    { key: 'cards',    label: 'カード' },
  ];

  // ===== 記事：JSONから作成（新しい順） =====
  const articles = (articlesData || [])
    .slice()
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map(item => ({
      title: item.title,
      link: item.url,
      pubDate: item.date,
      thumb: item.thumb,
      summary: item.summary || customSummaries[item.url] || '',
      tags: item.tags || [],
    }));

  return (
    <section>
      <h1 style={{ fontSize:'1.5rem', marginTop:0 }}>コンテンツ</h1>

      {/* タブ */}
      <div style={{ display:'flex', gap:'0.5rem', margin:'0.75rem 0 1rem' }}>
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <a
              key={t.key}
              href={`/content?tab=${t.key}`}
              style={{
                textDecoration:'none',
                padding:'0.4rem 0.75rem', borderRadius:999,
                border: active ? '1px solid #222' : '1px solid #ddd',
                background: active ? '#fff' : '#F6F1E9',
                color:'#222'
              }}
            >
              {t.label}
            </a>
          );
        })}
      </div>

      {/* ===== 本体：記事 ===== */}
      {tab === 'articles' && (
        <div>
          <h2 style={{ marginTop:0 }}>記事</h2>
          <p style={{ color:'#666' }}>
            テーマ別に整理した記事の一覧です（クリックで note に移動）。
          </p>

          <div
            style={{
              display:'grid',
              gap:'1rem',
              gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))',
              marginTop:'1rem'
            }}
          >
            {articles.map(a => (
              <article
                key={a.link}
                style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, overflow:'hidden' }}
              >
                {/* サムネ（16:9） */}
                <div
                  style={{
                    position:'relative',
                    width:'100%',
                    height:0,
                    paddingBottom:'56.25%', // 16:9
                    background:'#f4f2ed'
                  }}
                >
                  {a.thumb && (
                    <Image
                      src={a.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit:'cover' }}
                      loading="lazy"
                    />
                  )}
                </div>

                {/* テキスト */}
                <div style={{ padding:'1rem' }}>
                  <h3 style={{ margin:'0 0 0.25rem' }}>
                    <a href={a.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', color:'#222' }}>
                      {a.title}
                    </a>
                  </h3>

                  {a.pubDate && (
                    <p style={{ color:'#999', fontSize:12, margin:'0 0 0.5rem' }}>
                      {new Date(a.pubDate).toLocaleDateString('ja-JP')}
                    </p>
                  )}

                  {a.summary && (
                    <p style={{ color:'#555', margin:'0 0 0.75rem' }}>{a.summary}</p>
                  )}

                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display:'inline-block',
                      padding:'0.4rem 0.8rem',
                      borderRadius:8,
                      background:'#222',
                      color:'#fff',
                      fontSize:14,
                      textDecoration:'none'
                    }}
                  >
                    noteで読む →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p style={{ color:'#777', fontSize:13, marginTop:'0.75rem' }}>
            すべての記事：{' '}
            <a href="https://note.com/hiracoh" target="_blank" rel="noopener noreferrer">
              noteプロフィール
            </a>
          </p>
        </div>
      )}

      {/* ===== 本体：音声 ===== */}
      {tab === 'audio' && (
        <div>
          <h2>音声</h2>
          <p style={{ color:'#666' }}>ここに音声（ポッドキャスト等）を並べます。</p>
          <audio controls src="" style={{ width:'100%' }} />
        </div>
      )}

      {/* ===== 本体：カード ===== */}
      {tab === 'cards' && (
        <div>
          <h2>カード（一言メモ）</h2>
          <div
            style={{
              display:'grid',
              gap:'0.75rem',
              gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))'
            }}
          >
            {[1,2,3].map(i => (
              <div
                key={i}
                style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'0.9rem' }}
              >
                <div style={{ fontWeight:600 }}>カード {i}</div>
                <div style={{ color:'#666', marginTop:'0.25rem' }}>
                  “違っても同じでも自分は自分”
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
