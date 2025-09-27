import Parser from 'rss-parser';
import Image from 'next/image'; // ← これを追加


// サムネURLを取り出す（なければプレースホルダー）
function pickThumbnail(item) {
  // 0) ヘルパー：media系の様々な形からURLを抜く
  const fromMediaNode = (node) => {
    if (!node) return null;
    const first = Array.isArray(node) ? node[0] : node;
    if (!first) return null;
    // 形その1: { $: { url: '...' } }
    if (first.$ && first.$.url) return first.$.url;
    // 形その2: { url: '...' } or { '@_url': '...' }
    if (first.url) return first.url;
    if (first['@_url']) return first['@_url'];
    // 形その3: 文字列
    if (typeof first === 'string') return first;
    return null;
  };

  // 1) enclosure（画像の場合）
  if (item.enclosure && item.enclosure.url) return item.enclosure.url;

  // 2) media:thumbnail
  const mt = fromMediaNode(item['media:thumbnail']);
  if (mt) return mt;

  // 3) media:content（画像タイプが来ることもある）
  const mc = fromMediaNode(item['media:content']);
  if (mc) return mc;

  // 4) HTML本文から <img src="..."> を抽出（content:encoded → description → content）
  const html =
    item['content:encoded'] ||
    item.description ||
    item.content ||
    '';
  if (html) {
    const m = html.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
    if (m && m[1]) return m[1];
  }

  // 5) 何も無ければプレースホルダー
  return '/map.jpg'; // public/map.jpg（or 名前に合わせて '/map.jpeg' に変更）
}


const FEED_URL = 'https://note.com/hiracoh/rss';

// サーバーコンポーネント版（useSearchParams不要）
export default async function Content({ searchParams }) {
  const tab = (searchParams?.tab || 'articles');

  const tabs = [
    { key: 'articles', label: '記事' },
    { key: 'audio',    label: '音声' },
    { key: 'cards',    label: 'カード' },
  ];

  // 記事タブ：RSS取得
  let articles = [];
  let rssError = null;
  if (tab === 'articles') {
    try {
      const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'watashihertz-site/1.0 (+https://watashihertz.vercel.app)' },
  customFields: {
    item: [
      ['media:thumbnail', 'media:thumbnail', { keepArray: true }],
      ['media:content', 'media:content', { keepArray: true }],
      ['content:encoded', 'content:encoded'],
      ['description', 'description'],
      ['enclosure', 'enclosure']
    ]
  }
});

      const feed = await parser.parseURL(FEED_URL);
      articles = (feed.items || []).slice(0, 12).map(item => ({
        title: item.title,
        link: item.link,
        excerpt: (item.contentSnippet || '').slice(0, 100),
        pubDate: item.pubDate,
        thumb: pickThumbnail(item),
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

      {/* 本体：記事 */}
      {tab === 'articles' && (
        <div>
          <h2 style={{ marginTop:0 }}>記事</h2>
          <p style={{ color:'#666' }}>
            noteの最新記事を自動で一覧表示します（クリックでnoteに移動）。
          </p>

          {rssError ? (
            <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem', color:'#a00' }}>
              {rssError}{' '}
              <a href="https://note.com/hiracoh" target="_blank" rel="noopener noreferrer">
                noteを直接開く →
              </a>
            </div>
          ) : (
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
                    <h3 style={{ margin:'0 0 .25rem', fontSize:'1.05rem', lineHeight:1.35 }}>
                      {a.title}
                    </h3>
                    {a.pubDate && (
                      <div style={{ color:'#888', fontSize:12, marginBottom:'.35rem' }}>
                        {new Date(a.pubDate).toLocaleDateString('ja-JP')}
                      </div>
                    )}
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display:'inline-block',
                        marginTop:'.75rem',
                        padding:'.5rem .9rem',
                        borderRadius:8,
                        background:'#222',
                        color:'#fff',
                        textDecoration:'none'
                      }}
                    >
                      noteで読む
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          <p style={{ color:'#777', fontSize:13, marginTop:'0.75rem' }}>
            すべての記事：{' '}
            <a href="https://note.com/hiracoh" target="_blank" rel="noopener noreferrer">
              noteプロフィール
            </a>
          </p>
        </div>
      )}

      {/* 本体：音声 */}
      {tab === 'audio' && (
        <div>
          <h2>音声</h2>
          <p style={{ color:'#666' }}>ここに音声（ポッドキャスト等）を並べます。</p>
          <audio controls src="" style={{ width:'100%' }} />
        </div>
      )}

      {/* 本体：カード */}
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
