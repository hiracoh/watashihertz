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
  {/* 紙の厚み：右端 */}
  <div
    style={{
      position: 'absolute',
      top: 8,
      right: 0,
      bottom: 8,
      width: 3,
      background:
        'repeating-linear-gradient(0deg, #d8c49f 0 1px, #bda681 1px 2px, #e1cfaa 2px 4px)',
      boxShadow: 'inset 1px 0 2px rgba(55,30,15,0.35)',
      opacity: 0.7,
      zIndex: 0,
    }}
  />

  {/* 紙の厚み：下端 */}
  <div
    style={{
      position: 'absolute',
      left: 18,
      right: 8,
      bottom: 0,
      height: 3,
      background:
        'repeating-linear-gradient(90deg, #d8c49f 0 1px, #bda681 1px 2px, #e1cfaa 2px 4px)',
      boxShadow: 'inset 0 1px 2px rgba(55,30,15,0.35)',
      opacity: 0.7,
      zIndex: 0,
    }}
  />

               {/* 本の背 */}
<div
  style={{
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 22,
    background:
      'linear-gradient(90deg, rgba(25,12,7,0.42) 0%, rgba(45,24,14,0.28) 55%, rgba(255,220,180,0.08) 100%)',
    boxShadow:
      'inset -2px 0 3px rgba(20,10,5,0.28), 2px 0 3px rgba(255,220,180,0.05)',
  }}
/>

               <h2
  style={{
    margin: 0,
    fontSize: 28,
    lineHeight: 1.45,
    letterSpacing: '0.04em',
    fontFamily: "'Yuji Syuku', serif",
    fontWeight: 400,
    color: '#B18B67',
textShadow:
  '-1px -1px 1px rgba(35,20,12,0.65), 1px 1px 1px rgba(255,225,185,0.08)',
WebkitTextStroke: '0px',
  }}
>
  {book.title}
</h2>

<div
  style={{
    marginTop: 4,
    fontSize: 14,
    letterSpacing: '0.12em',
    color: '#A8895E',
    textShadow:
      '-1px -1px 1px rgba(20,10,5,0.75), 1px 1px 1px rgba(255,210,160,0.18)',
    WebkitTextStroke: '0.2px rgba(35,18,10,0.3)',
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
    sizes="230px"
    style={{
      objectFit: 'contain',
    }}
  />
</div>

<div
  style={{
    fontSize: 11,
    letterSpacing: '0.22em',
    color: '#A8895E',
    textShadow:
      '-1px -1px 1px rgba(20,10,5,0.7), 1px 1px 1px rgba(255,210,160,0.16)',
    WebkitTextStroke: '0.15px rgba(35,18,10,0.28)',
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
