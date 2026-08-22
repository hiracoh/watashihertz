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
    circle at 18% 22%,
    rgba(255,255,255,0.08) 0 1px,
    transparent 2px
  ),
  radial-gradient(
    circle at 67% 38%,
    rgba(0,0,0,0.10) 0 1.2px,
    transparent 2.4px
  ),
  radial-gradient(
    circle at 42% 74%,
    rgba(255,255,255,0.045) 0 1.5px,
    transparent 3px
  ),
  repeating-linear-gradient(
    12deg,
    rgba(255,255,255,0.025) 0 1px,
    rgba(0,0,0,0.018) 1px 2px,
    transparent 2px 7px
  ),
  radial-gradient(
    ellipse at 45% 40%,
    rgba(255,255,255,0.10) 0%,
    rgba(255,255,255,0.025) 35%,
    rgba(0,0,0,0.08) 72%,
    rgba(0,0,0,0.20) 100%
  ),
  linear-gradient(
    135deg,
    #70482D 0%,
    #51321F 55%,
    #352016 100%
  )
`,
                  boxShadow:
  'inset 0 0 18px rgba(20,10,5,0.28), inset 2px 2px 3px rgba(255,230,190,0.08), 5px 10px 22px rgba(45,30,20,0.22)',
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
