
import type { CSSProperties } from 'react';
import type { Interlude, InterludeStyle } from '@/data/interludes';
import styles from './InterludeBlock.module.css';

type Props = {
  interlude: Interlude;
};

const fontFamilies = {
  klee: "'Klee One', serif",
  yuji: "'Yuji Syuku', serif",
  zen: "'Zen Old Mincho', serif",
  serif: 'serif',
  sans: 'sans-serif',
};

function font(name?: InterludeStyle['fontFamily']) {
  return fontFamilies[name ?? 'klee'];
}

export default function InterludeBlock({ interlude }: Props) {
  const design = interlude.design ?? {};
  const mobile = design.mobile ?? {};

  const variables = {
    '--interlude-width': `${design.maxWidth ?? 680}px`,
    '--interlude-padding-x': `${design.paddingX ?? 24}px`,
    '--interlude-padding-y': `${design.paddingY ?? 40}px`,
    '--interlude-margin-top': `${design.marginTop ?? 64}px`,
    '--interlude-margin-bottom': `${design.marginBottom ?? 64}px`,

    '--interlude-font': font(design.fontFamily),
    '--interlude-title-font': font(
      design.titleFontFamily ?? design.fontFamily
    ),
    '--interlude-core-font': font(
      design.coreFontFamily ?? design.titleFontFamily ?? design.fontFamily
    ),

    '--interlude-title-size': `${design.titleSize ?? 24}px`,
    '--interlude-text-size': `${design.textSize ?? 16}px`,
    '--interlude-core-size': `${design.coreSize ?? 30}px`,

    '--interlude-line-height': design.lineHeight ?? 2.2,
    '--interlude-title-line-height': design.titleLineHeight ?? 1.6,
    '--interlude-core-line-height': design.coreLineHeight ?? 2,

    '--interlude-align': design.textAlign ?? 'center',
    '--interlude-color': design.color ?? '#514a41',
    '--interlude-letter-spacing': `${design.letterSpacing ?? 0}em`,
'--interlude-label-spacing': `${design.labelLetterSpacing ?? 0.25}em`,
'--interlude-label-size': `${design.labelSize ?? 12}px`,
'--interlude-label-margin': `${design.labelMarginBottom ?? 28}px`,
'--interlude-core-margin': `${design.coreMarginTop ?? 64}px`,
'--interlude-core-spacing': `${design.coreLetterSpacing ?? 0}em`,
    borderTop: design.borderTop
  ? '1px solid #c9c0af'
  : undefined,
borderBottom: design.borderBottom
  ? '1px solid #c9c0af'
  : undefined,

    '--mobile-width': `${mobile.maxWidth ?? design.maxWidth ?? 680}px`,
    '--mobile-padding-x': `${mobile.paddingX ?? design.paddingX ?? 12}px`,
    '--mobile-padding-y': `${mobile.paddingY ?? design.paddingY ?? 40}px`,
    '--mobile-margin-top': `${mobile.marginTop ?? design.marginTop ?? 64}px`,
    '--mobile-margin-bottom': `${mobile.marginBottom ?? design.marginBottom ?? 64}px`,

    '--mobile-font': font(mobile.fontFamily ?? design.fontFamily),
    '--mobile-title-font': font(
      mobile.titleFontFamily ?? design.titleFontFamily ?? design.fontFamily
    ),
    '--mobile-core-font': font(
      mobile.coreFontFamily ??
      design.coreFontFamily ??
      design.titleFontFamily ??
      design.fontFamily
    ),

    '--mobile-title-size': `${mobile.titleSize ?? design.titleSize ?? 20}px`,
    '--mobile-text-size': `${mobile.textSize ?? design.textSize ?? 15}px`,
    '--mobile-core-size': `${mobile.coreSize ?? design.coreSize ?? 21}px`,

    '--mobile-line-height': mobile.lineHeight ?? design.lineHeight ?? 1.85,
    '--mobile-title-line-height':
      mobile.titleLineHeight ?? design.titleLineHeight ?? 1.5,
    '--mobile-core-line-height':
      mobile.coreLineHeight ?? design.coreLineHeight ?? 2,

    '--mobile-align': mobile.textAlign ?? design.textAlign ?? 'center',
    '--mobile-color': mobile.color ?? design.color ?? '#514a41',
    '--mobile-letter-spacing':
  `${mobile.letterSpacing ?? design.letterSpacing ?? 0}em`,
'--mobile-label-spacing':
  `${mobile.labelLetterSpacing ?? design.labelLetterSpacing ?? 0.25}em`,
'--mobile-label-size':
  `${mobile.labelSize ?? design.labelSize ?? 12}px`,
'--mobile-label-margin':
  `${mobile.labelMarginBottom ?? design.labelMarginBottom ?? 28}px`,
'--mobile-core-margin':
  `${mobile.coreMarginTop ?? design.coreMarginTop ?? 64}px`,
'--mobile-core-spacing':
  `${mobile.coreLetterSpacing ?? design.coreLetterSpacing ?? 0}em`,
  } as CSSProperties;

  return (
    <section className={styles.interlude} style={variables}>
      {interlude.label && (
        <div className={styles.label}>{interlude.label}</div>
      )}

      {interlude.title && (
        <h3 className={styles.title}>{interlude.title}</h3>
      )}

      <div className={styles.body}>
        {interlude.text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {interlude.coreMessage && interlude.coreMessage.length > 0 && (
        <div className={styles.core}>
          {interlude.coreMessage.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </section>
  );
}
