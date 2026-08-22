import Image from 'next/image';
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
                  border: '1px solid #2E1B12',
                 background: `
  radial-gradient(
    circle at 22% 18%,
    rgba(255,255,255,0.045) 0 1px,
    transparent 1.6px
  ),
  radial-gradient(
    circle at 72% 66%,
    rgba(0,0,0,0.05) 0 1px,
    transparent 1.8px
  ),
  repeating-linear-gradient(
    12deg,
    rgba(255,255,255,0.018) 0 1px,
    transparent 1px 5px
  ),
  radial-gradient(
    ellipse at center,
    rgba(255,255,255,0.03) 0%,
    rgba(0,0,0,0.12) 100%
  ),
  linear-gradient(
    135deg,
    #6A442A 0%,
    #4A2F1F 55%,
    #362219 100%
  )
`,
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
    color: '#E6D3B3',
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
    color: '#D0B38A',
  }}
>
  ─ {book.cover.subtitle} ─
</div>

<div
  style={{
    position: 'relative',
    width: 230,
    height: 230,
    margin: '20px 0 20px',
  }}
>
  <Image
    src={book.cover.image}
    alt=""
    fill
    sizes="170px"
    style={{
      objectFit: 'contain',
    }}
  />
</div>

<div
  style={{
    fontSize: 11,
    letterSpacing: '0.22em',
    color: '#BFA37A',
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
