import Link from 'next/link';
import encyclopedias from '@/data/encyclopedias.json';

export default function EncyclopediasPage() {
  return (
    <main
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 80px',
      }}
    >
      {/* ページ上部 */}
      <div
        style={{
          marginBottom: 40,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          図鑑
        </h1>

        <p
          style={{
            marginTop: 12,
            marginBottom: 0,
            fontSize: 14,
            lineHeight: 1.8,
            color: '#666',
          }}
        >
          人間に現れるさまざまな姿を、ひとつの視点から眺めます。
        </p>
      </div>

      {/* 図鑑一覧 */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 280px))',
          gap: 32,
        }}
      >
        {encyclopedias.map((book) => (
          <Link
            key={book.id}
            href={`/encyclopedias/${book.id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <article>
              {/* 本の表紙 */}
              <div
                style={{
                  aspectRatio: '3 / 4',
                  borderRadius: '4px 12px 12px 4px',
                  border: '1px solid #c9c0af',
                  background:
                    'linear-gradient(135deg, #f5efe3 0%, #e7ddca 100%)',
                  boxShadow:
                    '4px 8px 18px rgba(70, 55, 35, 0.15)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* 本の背 */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 12,
                    background:
                      'linear-gradient(90deg, rgba(80,60,40,0.18), rgba(255,255,255,0.15))',
                  }}
                />

               <h2
  style={{
    margin: 0,
    fontSize: 28,
    lineHeight: 1.45,
    letterSpacing: '0.04em',
    color: '#403a32',
    fontFamily: "'Yuji Syuku', serif",
    fontWeight: 400,
  }}
>
  {book.title}
</h2>

<div
  style={{
    marginTop: 4,
    fontSize: 14,
    letterSpacing: '0.12em',
    color: '#766d61',
  }}
>
  ─ 不足編 ─
</div>

<div
  style={{
    width: 150,
height: 150,
margin: '24px 0 22px',
    borderRadius: '50%',
    border: '1px dashed rgba(90,70,45,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9a8c79',
    fontSize: 11,
    letterSpacing: '0.08em',
  }}
>
  紋章
</div>

<div
  style={{
    fontSize: 11,
    letterSpacing: '0.22em',
    color: '#887b68',
  }}
>
  WATASHI HERTZ
</div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}
