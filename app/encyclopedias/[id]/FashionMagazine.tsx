'use client';

import Image from 'next/image';
import { Zen_Old_Mincho } from 'next/font/google';

const zenOldMincho = Zen_Old_Mincho({
  weight: '600',
  display: 'swap',
  preload: false,
});

const DEBUG_POINTS = true;

export type MagazineBook = {
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
  description?: string;
  x: number;
  y: number;
  side: string;
  lineY?: number;
}>;
  }>;
};

export default function FashionMagazine({
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
          <div className="fashionHeading">
  <div className="fashionHeadingMeta">
    <span className="fashionHeadingNumber">
      {item.number}
    </span>

    <span className="fashionHeadingEn">
      YOROI
    </span>
  </div>

  <h2 className={zenOldMincho.className}>
    {item.title}
  </h2>
</div>

          {/* 人物＋パーツ解説をまとめた誌面 */}
          <div className="fashionStage">
            {/* 人物画像＋パーツ起点 */}
            <div
              className="fashionModel"
              onClick={(e) => {
                if (!DEBUG_POINTS) return;

                const rect =
                  e.currentTarget.getBoundingClientRect();

                const x =
                  ((e.clientX - rect.left) / rect.width) * 100;

                const y =
                  ((e.clientY - rect.top) / rect.height) * 100;

                alert(
                  `x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`
                );
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

            {/* PC用の引き出し線 */}
<svg
  className="fashionLines fashionLinesDesktop"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  {item.parts?.map((part) => {
    const modelSize = 52;
    const modelOffsetX = (100 - modelSize) / 2;
    const modelOffsetY = 8;

    const startX =
      modelOffsetX + (part.x / 100) * modelSize;

    const startY =
      modelOffsetY + (part.y / 100) * modelSize;

    const endX =
      part.side === 'left' ? 10 : 96;

    const targetY =
  part.lineY !== undefined
    ? modelOffsetY + (part.lineY / 100) * modelSize
    : startY;

    // lineYがない場合は従来どおり水平線
    if (part.lineY === undefined) {
      return (
        <line
          key={`${part.label}-desktop-line`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={startY}
        />
      );
    }

    // lineYがある場合は「斜め → 水平」の折れ線
    const bendX =
      part.side === 'left'
        ? startX - 6
        : startX + 6;

    return (
      <polyline
        key={`${part.label}-desktop-line`}
        points={`${startX},${startY} ${bendX},${targetY} ${endX},${targetY}`}
        fill="none"
      />
    );
  })}
</svg>

{/* スマホ用の引き出し線 */}
<svg
  className="fashionLines fashionLinesMobile"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  {item.parts?.map((part) => {
    const modelSize = 68;
    const modelOffset = (100 - modelSize) / 2;

    const startX =
      modelOffset + (part.x / 100) * modelSize;

    const startY =
      modelOffset + (part.y / 100) * modelSize;

    const endX =
      part.side === 'left' ? 10 : 94;

    const targetY =
  part.lineY !== undefined
    ? modelOffset + (part.lineY / 100) * modelSize
    : startY;
  
    // lineYがない場合は従来どおり水平線
    if (part.lineY === undefined) {
      return (
        <line
          key={`${part.label}-mobile-line`}
          x1={startX}
          y1={startY}
          x2={endX}
          y2={startY}
        />
      );
    }

    // lineYがある場合は「斜め → 水平」の折れ線
    const bendX =
      part.side === 'left'
        ? startX - 6
        : startX + 6;

    return (
      <polyline
        key={`${part.label}-mobile-line`}
        points={`${startX},${startY} ${bendX},${targetY} ${endX},${targetY}`}
        fill="none"
      />
    );
  })}
</svg>
            {/* パーツ説明 */}
            {item.parts?.map((part) => {
  const desktopPartY =
    part.lineY ?? part.y;

  const mobilePartY =
    part.lineY ?? part.y;

  const desktopTop =
    8 + (desktopPartY / 100) * 52;

  const mobileTop =
    16 + (mobilePartY / 100) * 68;

  return (
    <div
      key={part.label}
      className={`fashionPart ${part.side}`}
      style={{
        '--desktop-top': `${desktopTop}%`,
        '--mobile-top': `${mobileTop}%`,
      } as React.CSSProperties}
    >
                  <div className="fashionLabel">
                    {part.label}
                  </div>

                  <div className="fashionTitle">
                    {part.title}
                  </div>

                  {part.description && (
                    <div className="fashionDescription">
                      {part.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* スマホ用：商品クレジット風の詳細一覧 */}
          <div className="fashionCredits">
            <div className="fashionCreditsHeading">
              EQUIPMENT DETAILS
            </div>

            <div className="fashionCreditsList">
              {item.parts?.map((part) => (
                <div
                  key={`${part.label}-credit`}
                  className="fashionCreditItem"
                >
                  <div className="fashionCreditTitle">
                    {part.title}
                  </div>

                  {part.description && (
                    <div className="fashionCreditDescription">
                      {part.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
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

        .fashionHeading {
  margin-bottom: 24px;
  text-align: center;
}

.fashionHeadingMeta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.fashionHeadingNumber {
  font-size: 11px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #5f5a54;
}

.fashionHeadingEn {
  font-size: 11px;
  line-height: 1;
  font-weight: 400;
  letter-spacing: 0.42em;
  color: #77716a;
}

.fashionArticle h2 {
  margin: 0;
  text-align: center;
  font-size: 40px;
  line-height: 1.35;
  font-weight: 600;
  letter-spacing: 0.10em;
  color: #252525;
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
  width: 52%;
  aspect-ratio: 2 / 3;
  left: 50%;
  top: 34%;
  transform: translate(-50%, -50%);
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

        .fashionLinesMobile {
          display: none;
        }

        .fashionLines line,
.fashionLines polyline {
  stroke: rgba(45, 45, 45, 0.72);
  stroke-width: 0.8;
  vector-effect: non-scaling-stroke;
}
        .fashionPart {
          position: absolute;
          width: 27%;
          top: var(--desktop-top);
          transform: translateY(-50%);
          z-index: 3;
        }

        .fashionPart.left {
          left: 0;
          text-align: left;
        }

        .fashionPart.right {
  right: -6%;
  text-align: left;
}

        .fashionLabel {
          display: inline-block;
          margin-bottom: 8px;
          padding: 4px 8px;

          font-size: clamp(10px, 1.15vw, 14px);
          letter-spacing: 0.16em;
          color: #5f5a54;

          background: rgba(238, 232, 222, 0.95);
          box-shadow: 0 2px 6px rgba(35, 28, 22, 0.10);
          border-radius: 2px;
        }

        .fashionTitle {
          font-size: clamp(15px, 1.75vw, 22px);
          line-height: 1.35;
          font-weight: 500;
          color: #252525;
          word-break: keep-all;
          overflow-wrap: normal;
        }

        .fashionDescription {
          margin-top: 4px;
          font-size: clamp(12px, 1.15vw, 15px);
          line-height: 1.7;
          font-weight: 400;
          color: #5f5a54;
          letter-spacing: 0.02em;
        }

        /* スマホ用の商品クレジット欄：PCでは非表示 */
        .fashionCredits {
          display: none;
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

          .fashionModel {
  width: 68%;
  top: 50%;
}

          .fashionLinesDesktop {
            display: none;
          }

          .fashionLinesMobile {
            display: block;
          }

          /*
           * スマホ：
           * 長タイトル対策で27%に広げていたものを22%へ戻す。
           * 左右とも文字そのものは左揃え。
           */
          .fashionPart {
            width: 22%;
            top: var(--mobile-top);
          }

          /*
           * 画面左側
           * 会社知名度・容姿・モテ度など
           */
          .fashionPart.left {
            left: 1%;
            text-align: left;
          }

          /*
           * 画面右側
           * 学歴・肩書・多忙さなど
           */
          .fashionPart.right {
            right: -4%;
            text-align: left;
          }

          .fashionLabel {
  font-size: 9px;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

          .fashionTitle {
            font-size: clamp(12px, 3.6vw, 16px);
            line-height: 1.3;
          }

          /* スマホでは人物横の詳細説明を隠す */
          .fashionPart .fashionDescription {
            display: none;
          }

          /* スマホ用：商品クレジット風の詳細一覧 */
          .fashionCredits {
            display: block;
            margin: 6px 4px 0;
          }

          .fashionCreditsHeading {
            margin-bottom: 8px;
            font-size: 9px;
            letter-spacing: 0.16em;
            color: #777;
          }

          .fashionCreditsList {
            border-top: 1px solid rgba(70, 60, 50, 0.18);
          }

          .fashionCreditItem {
            display: grid;
            grid-template-columns: 34% 66%;
            gap: 10px;
            padding: 9px 0;
            border-bottom: 1px solid rgba(70, 60, 50, 0.14);
            align-items: start;
          }

          .fashionCreditTitle {
            font-size: 14px;
            line-height: 1.45;
            font-weight: 600;
            color: #252525;
            word-break: keep-all;
          }

          .fashionCreditDescription {
            font-size: 13px;
            line-height: 1.6;
            font-weight: 400;
            color: #625d56;
            letter-spacing: 0.01em;
          }
        }
      `}</style>
    </main>
  );
}
