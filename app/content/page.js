import Image from 'next/image';
import articlesData from '../../data/articles.json';

// タグ一覧を集めるユーティリティ
const collectTags = (items) => {
  const set = new Set();
  items.forEach(a => (a.tags || []).forEach(t => set.add(t)));
  return Array.from(set).sort();
};

// （任意）後付けサマリー辞書：JSONにsummaryが無いときの保険
const customSummaries = {
  "https://note.com/hiracoh/n/n30bdf42b4dee": "SNSの炎上に見る、現代を生きる人間とは。",
  "https://note.com/hiracoh/n/n4d32a54331e6": "人間って実は…AIだった!?",
};

export default function Content({ searchParams }) {
  const tab = searchParams?.tab || 'articles';
  const q   = (searchParams?.q || '').trim().toLowerCase();
  const tag = (searchParams?.tag || '').trim();

  const tabs = [
    { key: 'articles', label: '記事' },
    { key: 'audio', label: '音声' },
    { key: 'cards', label: 'カード' },
  ];

  // ===== 記事：JSONから作成（新しい順） =====
  const all = (articlesData || [])
    .filter(a => !a.featured)
    .slice()
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  let items = all;
  if (tag) items = items.filter(a => (a.tags || []).includes(tag));
  if (q) {
    items = items.filter(a => {
      const hay = [a.title || '', a.summary || '', (a.tags || []).join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }

  const articles = items.map(item => ({
    title: item.title,
    link: item.url,
    pubDate: item.date,
    thumb: item.thumb,
    summary: item.summary || '',
    tags: item.tags || [],
    charCount: item.charCount || null,
  }));

  const allTags = collectTags(all);

  return (
    <section>
      <h1 style={{ fontSize: '1.5rem', marginTop: 0 }}>コンテンツ</h1>

      {/* タブ */}
      <div style={{ display: 'flex', gap: '0.5rem', margin: '0.75rem 0 1rem' }}>
        {tabs.map(t => {
          const active = tab === t.key;
          return (
            <a
              key={t.key}
              href={`/content?tab=${t.key}`}
              style={{
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: 999,
                border: active ? '1px solid #222' : '1px solid #ddd',
                background: active ? '#fff' : '#F6F1E9',
                color: '#222',
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
          <h2 style={{ marginTop: 0 }}>記事</h2>
          <p style={{ color: '#666' }}>
            テーマ別に整理した記事の一覧です（クリックで note に移動）。
          </p>

          {/* ① 検索フォーム */}
          <form action="/content" method="get" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input type="hidden" name="tab" value="articles" />
            <input
              name="q"
              defaultValue={q}
              placeholder="キーワード検索（例：嫉妬 / 選択）"
              style={{ flex: 1, padding: '0.55rem 0.75rem', borderRadius: 10, border: '1px solid #ddd' }}
            />
            <button
              type="submit"
              style={{ padding: '0.55rem 0.9rem', borderRadius: 10, border: '1px solid #222', background: '#fff' }}
            >
              検索
            </button>
          </form>

          {/* ② タグ一覧 */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.75rem 0' }}>
            <a
              href="/content?tab=articles"
              style={{
                fontSize: 14,
                padding: '0.25rem 0.6rem',
                borderRadius: 999,
                border: '1px solid #ddd',
                textDecoration: 'none',
                color: tag ? '#222' : '#fff',
                background: tag ? '#fff' : '#222',
              }}
            >
              すべて
            </a>
            {allTags.map(t => (
              <a
                key={t}
                href={`/content?tab=articles&tag=${encodeURIComponent(t)}`}
                style={{
                  fontSize: 14,
                  padding: '0.25rem 0.6rem',
                  borderRadius: 999,
                  border: '1px solid #ddd',
                  textDecoration: 'none',
                  background: tag === t ? '#222' : '#fff',
                  color: tag === t ? '#fff' : '#222',
                }}
              >
                {t}
              </a>
            ))}
          </div>

          {/* ③ 件数 */}
          <div style={{ color: '#777', fontSize: 13, margin: '0.25rem 0 0.75rem' }}>
            {articles.length} 件
            {tag ? `（タグ: ${tag}）` : ''}
            {q ? `（検索: ${q}）` : ''}
          </div>

          {/* ④ カード一覧 */}
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
              marginTop: '1rem',
            }}
          >
            {articles.map(a => (
              <article
                key={a.link}
                style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}
              >
                {/* ▼ サムネ */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '56.25%', // 16:9
                    background: '#f4f2ed',
                    overflow: 'hidden',
                  }}
                >
                  {a.thumb && (
                    <Image
                      src={a.thumb}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />
                  )}

                  {/* ★ 文字数マスクエリア */}
                  {a.charCount && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.0) 90%)',
                        color: '#fff',
                        padding: '0.4rem 0.8rem',
                        fontSize: 13,
                        fontWeight: 500,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        boxSizing: 'border-box',
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 12,
                      }}
                    >
                      <span style={{ opacity: 0.9 }}>
                        {a.charCount.toLocaleString()}字
                      </span>
                    </div>
                  )}
                </div>

                {/* ▼ テキスト */}
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.25rem' }}>
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: '#222' }}
                    >
                      {a.title}
                    </a>
                  </h3>

                  <div
                    style={{
                      color: '#777',
                      fontSize: 12,
                      margin: '0 0 0.5rem',
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    {(a.tags && a.tags.length > 0) && (
                      <span>{a.tags.join(' / ')}</span>
                    )}
                  </div>

                  {a.summary && (
                    <p style={{ color: '#555', margin: '0 0 0.75rem' }}>
                      {a.summary}
                    </p>
                  )}

                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 8,
                      background: '#222',
                      color: '#fff',
                      fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    noteで読む →
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p style={{ color: '#777', fontSize: 13, marginTop: '0.75rem' }}>
            すべての記事：{' '}
            <a
              href="https://note.com/hiracoh"
              target="_blank"
              rel="noopener noreferrer"
            >
              noteプロフィール
            </a>
          </p>
        </div>
      )}

      {/* ===== 音声 ===== */}
      {tab === 'audio' && (
        <div>
          <h2>音声</h2>
          <p style={{ color: '#666' }}>ここに音声（ポッドキャスト等）を並べます。</p>
          <audio controls src="" style={{ width: '100%' }} />
        </div>
      )}

      {/* ===== カード ===== */}
      {tab === 'cards' && (
        <div>
          <h2>カード（一言メモ）</h2>
          <div
            style={{
              display: 'grid',
              gap: '0.75rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))',
            }}
          >
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: '0.9rem' }}
              >
                <div style={{ fontWeight: 600 }}>カード {i}</div>
                <div style={{ color: '#666', marginTop: '0.25rem' }}>
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
