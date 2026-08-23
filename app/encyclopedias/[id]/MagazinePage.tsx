'use client';

import Image from 'next/image';

const DEBUG_POINTS = false;

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
  x: number;
  y: number;
  side: string;
  textY: number;
}>;
  }>;
};

export default function MagazinePage({
  book,
}: {
  book: MagazineBook;
}) {
  return (
    <main className="magazinePage">
      {/* 雑誌上部 */}
      <header className="magazineHeader">
        <div className="magazineBrand">WATASHI HERTZ</div>
        <h1>{book.title}</h1>
      </header>

      {book.items.map((item) => (
        <article key={item.id} className="fashionArticle">
          <h2>{item.title}</h2>

          {/* 人物＋パーツ解説をまとめた誌面 */}
          <div className="fashionStage">
            {/* 人物画像＋パーツ起点 */}
<div
  className="fashionModel"
  onClick={(e) => {
    if (!DEBUG_POINTS) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    alert(`x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
  }}
  style={{
    cursor: DEBUG_POINTS ? 'crosshair' : 'default',
  }}
>
  {item.image && (
    <Image
      src={item.image}
      alt={item.title}
      fill
      sizes="(max-width: 700px) 70vw, 550px"
      style={{
        objectFit: 'contain',
      }}
    />
  )}

  {/* パーツ位置確認用ポイント */}
{DEBUG_POINTS &&
  item.parts?.map((part) => (
    <span
      key={`${part.label}-point`}
      className="fashionPoint"
      style={{
        left: `${part.x}%`,
        top: `${part.y}%`,
      }}
    />
  ))}
</div>

{/* 人物の座標から左右の説明へ伸びる線 */}
<svg
  className="fashionLines"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  {item.parts?.map((part) => {
    const modelLeft = 24;
    const modelWidth = 52;

    const startX =
      modelLeft + (part.x / 100) * modelWidth;

    return (
      <line
        key={`${part.label}-line`}
        x1={startX}
        y1={part.y}
        x2={part.side === 'left' ? 10 : 90}
        y2={part.textY}
      />
    );
  })}
</svg>
            {/* パーツ説明 */}
            {item.parts?.map((part) => (
  <div
    key={part.label}
    className={`fashionPart ${part.side}`}
    style={{
      top: `${part.textY}%`,
    }}
  >
                <div className="fashionLabel">
                  {part.label}
                </div>

                <div className="fashionTitle">
                  {part.title}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}

      <style>{`
        .magazinePage {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 20px 80px;
          box-sizing: border-box;
        }

        .magazineHeader {
          text-align: center;
          margin-bottom: 48px;
        }

        .magazineBrand {
          margin-bottom: 8px;
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #777;
        }

        .magazineHeader h1 {
          margin: 0;
          font-size: 32px;
          letter-spacing: 0.08em;
        }

        .fashionArticle {
          margin-bottom: 80px;
        }

        .fashionArticle h2 {
          margin: 0 0 24px;
          text-align: center;
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .fashionStage {
          position: relative;
          width: 100%;
          max-width: 1050px;
          aspect-ratio: 2 / 3;
          margin: 0 auto;
        }

        .fashionModel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24%;
  right: 24%;
  z-index: 1;
}

.fashionPoint {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(45, 45, 45, 0.72);
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
}
        .fashionLines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .fashionLines line {
  stroke: rgba(45, 45, 45, 0.72);
  stroke-width: 0.8;
  vector-effect: non-scaling-stroke;
}

        .fashionPart {
          position: absolute;
          width: 20%;
          transform: translateY(-50%);
          z-index: 3;
        }

        .fashionPart.left {
          left: 0;
          text-align: right;
        }

        .fashionPart.right {
          right: 0;
          text-align: left;
        }

        .fashionLabel {
  margin-bottom: 5px;
  font-size: clamp(10px, 1.15vw, 14px);
  letter-spacing: 0.16em;
  color: #777;
}

.fashionTitle {
  font-size: clamp(15px, 1.75vw, 22px);
  line-height: 1.35;
  font-weight: 500;
  color: #252525;
}

        @media (max-width: 700px) {
          .magazinePage {
            padding: 24px 6px 60px;
          }

          .magazineHeader {
            margin-bottom: 28px;
          }

          .magazineHeader h1 {
            font-size: 26px;
          }

          .fashionArticle h2 {
            margin-bottom: 14px;
            font-size: 18px;
          }

          .fashionStage {
            width: 100%;
            max-width: none;
            aspect-ratio: 2 / 3;
          }

          .fashionPart {
            width: 22%;
          }

          .fashionPart.left {
            left: 1%;
          }

          .fashionPart.right {
            right: 1%;
          }

          .fashionLabel {
  font-size: 9px;
  letter-spacing: 0.1em;
}

.fashionTitle {
  font-size: clamp(12px, 3.6vw, 16px);
  line-height: 1.3;
}
         
        }
      `}</style>
    </main>
  );
}
