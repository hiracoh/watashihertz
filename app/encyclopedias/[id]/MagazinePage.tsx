import Image from 'next/image';

type MagazineBook = {
  id: string;
  type: string;
  layout?: string;
  title: string;
  cover?: {
    subtitle?: string;
    image?: string;
  };
  intro?: {
    title?: string;
    text?: string[];
    image?: string;
  };
  items: Array<{
    id: string;
    number?: string;
    title: string;
    image?: string;
    description?: string;
    parts?: Array<{
      label: string;
      title: string;
    }>;
  }>;
};

export default function MagazinePage({
  book,
}: {
  book: MagazineBook;
}) {
  return (
    <main
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}
    >
      {/* 雑誌上部 */}
      <div
        style={{
          marginBottom: 48,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontSize: 12,
            letterSpacing: '0.2em',
            color: '#777',
          }}
        >
          WATASHI HERTZ
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 32,
            letterSpacing: '0.08em',
          }}
        >
          {book.title}
        </h1>
      </div>

      {book.items.map((item) => (
        <article
          key={item.id}
          style={{
            marginBottom: 80,
          }}
        >
          <h2
            style={{
              margin: '0 0 32px',
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            {item.title}
          </h2>

          {/* ===== PC用：全身ルック＋左右解説 ===== */}
          <div className="fashionDesktop">
            <div className="fashionSide fashionLeft">
              {item.parts
                ?.filter((_, index) => index % 2 === 0)
                .map((part) => (
                  <div key={part.label} className="fashionPart">
                    <div className="fashionLabel">{part.label}</div>
                    <div className="fashionTitle">{part.title}</div>
                    <div className="fashionLine" />
                  </div>
                ))}
            </div>

            <div className="fashionModel">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="500px"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              )}
            </div>

            <div className="fashionSide fashionRight">
              {item.parts
                ?.filter((_, index) => index % 2 === 1)
                .map((part) => (
                  <div key={part.label} className="fashionPart">
                    <div className="fashionLine" />
                    <div className="fashionLabel">{part.label}</div>
                    <div className="fashionTitle">{part.title}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* ===== スマホ用 ===== */}
          <div className="fashionMobile">
            <div className="fashionMobileModel">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="95vw"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              )}
            </div>

            <div className="fashionMobileParts">
              {item.parts?.map((part) => (
                <div key={part.label} className="fashionMobilePart">
                  <div className="fashionLabel">{part.label}</div>
                  <div className="fashionTitle">{part.title}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}

      <style>{`
        .fashionDesktop {
          display: grid;
          grid-template-columns: minmax(160px, 1fr) minmax(320px, 500px) minmax(160px, 1fr);
          gap: 24px;
          align-items: center;
        }

        .fashionModel {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
        }

        .fashionSide {
          display: flex;
          flex-direction: column;
          gap: 72px;
          justify-content: center;
        }

        .fashionPart {
          font-size: 14px;
        }

        .fashionLeft .fashionPart {
          text-align: right;
        }

        .fashionRight .fashionPart {
          text-align: left;
        }

        .fashionLabel {
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #8a8a8a;
          margin-bottom: 4px;
        }

        .fashionTitle {
          font-size: 16px;
          font-weight: 500;
          color: #222;
          line-height: 1.5;
        }

        .fashionLine {
          height: 1px;
          background: rgba(30, 30, 30, 0.5);
          margin-top: 8px;
          width: 100%;
        }

        .fashionRight .fashionLine {
          margin-bottom: 8px;
          margin-top: 0;
        }

        .fashionMobile {
          display: none;
        }

        @media (max-width: 700px) {
          .fashionDesktop {
            display: none;
          }

          .fashionMobile {
            display: block;
          }

          .fashionMobileModel {
            position: relative;
            width: 100%;
            aspect-ratio: 2 / 3;
            margin: 0 auto 32px;
          }

          .fashionMobileParts {
            display: grid;
            gap: 20px;
          }

          .fashionMobilePart {
            padding-bottom: 14px;
            border-bottom: 1px solid rgba(40, 40, 40, 0.15);
          }

          .fashionLabel {
            font-size: 11px;
          }

          .fashionTitle {
            font-size: 17px;
          }
        }
      `}</style>
    </main>
  );
}
