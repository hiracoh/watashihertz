
export type InterludeStyle = {
  fontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans';
  titleFontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans';
  coreFontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans';

  maxWidth?: number;
  paddingX?: number;
  paddingY?: number;
  marginTop?: number;
  marginBottom?: number;

  titleSize?: number;
  textSize?: number;
  coreSize?: number;

  lineHeight?: number;
  titleLineHeight?: number;
  coreLineHeight?: number;

  textAlign?: 'left' | 'center' | 'right';
  color?: string;

  mobile?: Omit<InterludeStyle, 'mobile'>;
};

export type Interlude = {
  id: string;

  before?: string;
  after?: string;

  type?: 'text';
  label?: string;
  title?: string;
  text: string[];
  coreMessage?: string[];

  design?: InterludeStyle;
};

export type InterludeSettings = {
  interludes?: Interlude[];
};
