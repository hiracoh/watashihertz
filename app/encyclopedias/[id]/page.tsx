import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import encyclopedias from '@/data/encyclopedias.json';
import styles from './page.module.css';

export default function EncyclopediaPage({
  params,
}: {
  params: { id: string };
}) {
  const book = encyclopedias.find((item) => item.id === params.id);

  if (!book) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}
    >
      {/* 図鑑一覧へ戻る */}
      <Link
        href="/encyclopedias"
        style={{
          display: 'inline-block',
          marginBottom: 28,
          color: '#766d61',
          textDecoration: 'none',
          fontSize: 14,
        }}
      >
        ← 図鑑一覧へ
      </Link>

      {/* ===== あらすじページ ===== */}
      <article
  className={styles.introPage}
  style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 600,
          padding: '64px 48px',
          border: '1px solid #c9c0af',
          borderRadius: 8,

          /* 仮の紙 */
          background: `
  radial-gradient(circle at 20% 18%, rgba(120,90,55,0.025) 0 1px, transparent 1.6px),
  radial-gradient(circle at 72% 34%, rgba(120,90,55,0.02) 0 1px, transparent 1.5px),
  repeating-linear-gradient(
    8deg,
    rgba(120,95,65,0.018) 0 1px,
    transparent 1px 7px
  ),
  radial-gradient(
    ellipse at center,
    rgba(255,255,255,0) 68%,
    rgba(133,92,48,0.055) 100%
  ),
  linear-gradient(135deg, #faf7ef 0%, #f2eadc 100%)
`,

          boxShadow: '0 12px 35px rgba(70, 55, 35, 0.12)',
        }}
      >
        {/* 背景マーク */}
        {book.intro.design?.backgroundMark && (
          <Image
            src={book.intro.design.backgroundMark}
            alt=""
            fill
            sizes="900px"
            style={{
              objectFit: 'contain',
              opacity: book.intro.design.backgroundOpacity ?? 0.08,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}

        {/* 図鑑名 */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              marginBottom: 12,
              fontSize: 12,
              letterSpacing: '0.2em',
              color: '#968875',
            }}
          >
            {book.title}
          </div>

          <h1
  className={styles.introTitle}
  style={{
              margin: 0,
              fontSize: 32,
              lineHeight: 1.5,
              letterSpacing: '0.08em',
              color: '#403a32',
            }}
          >
            {book.intro.title}
          </h1>
        </div>

        {/* あらすじ本文 */}
        <p
  className={styles.introText}
  style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 620,
            margin: '0 auto',
            fontSize: 16,
            lineHeight: 2.2,
            color: '#514a41',
          }}
        >
          {book.intro.text}
        </p>

        {/* あらすじイラスト */}
        {book.intro.image && (
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: 620,
              aspectRatio: '3 / 2',
              margin: '48px auto 0',
            }}
          >
            <Image
              src={book.intro.image}
              alt={book.intro.title}
              fill
              sizes="(max-width: 900px) 100vw, 620px"
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* 本編への入口 */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 64,
            textAlign: 'center',
          }}
        >
          <a
            href="#encyclopedia-items"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              border: '1px solid #8d806d',
              borderRadius: 999,
              color: '#514a41',
              textDecoration: 'none',
              fontSize: 14,
              letterSpacing: '0.08em',
              background: 'rgba(255,255,255,0.35)',
            }}
          >
            図鑑をひらく
          </a>
        </div>
      </article>

      {/* ===== 図鑑本編：今は仮 ===== */}
      <section
        id="encyclopedia-items"
        style={{
          marginTop: 80,
        }}
      >
        <h2
          style={{
            marginBottom: 32,
            fontSize: 24,
            color: '#403a32',
          }}
        >
          {book.title}
        </h2>

        <div
          style={{
            display: 'grid',
            gap: 20,
          }}
        >
          {book.items.map((item) => (
            <article
              key={item.id}
              style={{
                padding: 24,
                borderBottom: '1px solid #ddd4c5',
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 12,
                  color: '#9a8c79',
                  letterSpacing: '0.12em',
                }}
              >
                {item.number}
              </div>
              {item.image && (
  <div
    style={{
      position: 'relative',
      width: '100%',
      maxWidth: 420,
      aspectRatio: '1 / 1',
      margin: '0 auto 20px',
    }}
  >
    <Image
      src={item.image}
      alt={item.title}
      fill
      sizes="(max-width: 600px) 90vw, 420px"
      style={{
        objectFit: 'contain',
      }}
    />
  </div>
)}

              <h3
                style={{
                  margin: '0 0 10px',
                  fontSize: 20,
                  color: '#403a32',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: '#666057',
                }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
