// サーバーコンポーネント版（useSearchParams不要）
import Parser from 'rss-parser';
function pickThumbnail(item) {
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;

  const mediaThumb = item['media:thumbnail'];
  if (mediaThumb) {
    const url = mediaThumb.url || (mediaThumb.$ && mediaThumb.$.url);
    if (url) return url;
  }

  const html = item['content:encoded'] || item.content || '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match && match[1]) return match[1];

  return '/map.jpg'; // プレースホルダー（public/map.jpg など）
}
const FEED_URL = 'https://note.com/hiracoh/rss';

export default async function Content({ searchParams }) {
  const tab = (searchParams?.tab || 'articles');

  const tabs = [
    { key: 'articles', label: '記事' },
    { key: 'audio',    label: '音声' },
    { key: 'cards',    label: 'カード' },
  ];

  // ===== 記事タブ：RSSを取得して一覧化 =====
  let articles = [];
  let rssError = null;
  if (tab === 'articles') {
    try {
      const parser = new Parser();
      const feed = await parser.parseURL(FEED_URL);
      articles = (feed.items || []).slice(0, 12).map(item => ({
        title: item.title,
        link: item.link,
        excerpt: (item.contentSnippet || '').slice(0, 100),
        pubDate: item.pubDate,
      }));
    } catch (e) {
      rssError = 'RSSの取得に失敗しました。時間をおいて再度お試しください。';
    }
  }

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

      {/* 本体 */}
      {tab === 'audio' && (
        <div>
          <h2>音声</h2>
          <p style={{ color:'#666' }}>ここに音声（ポッドキャスト等）を並べます。</p>
          <audio controls src="" style={{ width:'100%' }} />
        </div>
      )}

      {tab === 'cards' && (
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
      )}

      {tab === 'articles' && (
        <div>
          <h2 style={{ marginTop:0 }}>記事</h2>
          <p style={{ color:'#666' }}>
            noteの最新記事を自動で一覧表示します（クリックでnoteに移動）。
          </p>

          {rssError ? (
            <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem', color:'#a00' }}>
              {rssError} <a href="https://note.com/hiracoh" target="_blank" rel="noopener noreferrer">noteを直接開く →</a>
            </div>
          ) : (
            <div style={{ display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', marginTop:'1rem' }}>
              {articles.map(a => (
                <article key={a.link} style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem' }}>
                  <h3 style={{ margin:'0 0 .25rem', fontSize:'1.05rem', lineHeight:1.35 }}>{a.title}</h3>
                  <p style={{ color:'#666', margin:0 }}>{a.excerpt}…</p>
                  <a href={a.link} target="_blank" rel="noopener noreferrer"
                     style={{ display:'inline-block', marginTop:'.75rem', padding:'.5rem .9rem',
                              borderRadius:8, background:'#222', color:'#fff', textDecoration:'none' }}>
                    noteで読む
                  </a>
                </article>
              ))}
            </div>
          )}

          <p style={{ color:'#777', fontSize:13, marginTop:'0.75rem' }}>
            すべての記事：<a href="https://note.com/hiracoh" target="_blank" rel="noopener noreferrer">noteプロフィール</a>
          </p>
        </div>
      )}
    </section>
  );
}
