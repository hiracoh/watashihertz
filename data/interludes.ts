
export type InterludeStyle = {
fontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans' | 'inherit';
titleFontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans' | 'inherit';
coreFontFamily?: 'klee' | 'yuji' | 'zen' | 'serif' | 'sans' | 'inherit';


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
  letterSpacing?: number;
labelLetterSpacing?: number;
labelSize?: number;
labelMarginBottom?: number;
coreMarginTop?: number;
coreLetterSpacing?: number;

paragraphSpacing?: number;
  borderTop?: boolean;
borderBottom?: boolean;

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
