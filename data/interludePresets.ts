
import type { InterludeStyle } from './interludes';

// 通常図鑑：通常の途中説明
export const encyclopediaInterludePreset: InterludeStyle = {
  maxWidth: 680,
  paddingX: 24,
  paddingY: 40,
  marginTop: 140,
  marginBottom: 140,

  fontFamily: 'klee',
  titleSize: 24,
  textSize: 16,
  coreSize: 30,

  lineHeight: 2.2,
  titleLineHeight: 1.6,
  coreLineHeight: 2,

  textAlign: 'left',
  color: '#514a41',
  borderTop: true,
  borderBottom: true,
  paragraphSpacing: 20,

  mobile: {
    paddingX: 12,
    titleSize: 20,
    textSize: 15,
    lineHeight: 1.85,
    paragraphSpacing: 20,
  },
};

// 雑誌図鑑：通常の途中説明
export const magazineInterludePreset: InterludeStyle = {
  maxWidth: 980,
  paddingX: 40,
  paddingY: 0,
  marginTop: 220,
  marginBottom: 260,

  fontFamily: 'inherit',
  coreFontFamily: 'zen',

  textSize: 18,
  coreSize: 30,
  lineHeight: 2.6,
  coreLineHeight: 2,

  letterSpacing: 0.045,
  coreLetterSpacing: 0.08,
  labelSize: 12,
  labelLetterSpacing: 0.38,
  labelMarginBottom: 42,
  coreMarginTop: 100,

  textAlign: 'center',
  color: '#5f5a54',
  paragraphSpacing: 30,

  mobile: {
    paddingX: 12,
    marginTop: 170,
    marginBottom: 190,
    textSize: 14,
    coreSize: 21,
    lineHeight: 2.2,
    coreLineHeight: 2,
    labelSize: 10,
    labelMarginBottom: 32,
    coreMarginTop: 62,
    coreLetterSpacing: 0.06,
    paragraphSpacing: 24,
  },
};
