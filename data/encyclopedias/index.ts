
import guilt from './guilt.json';
import yoroi from './yoroi.json';
import shonin from './shonin.json';

export const encyclopediaData = {
  guilt,
  yoroi,
  shonin,
};

export type EncyclopediaId = keyof typeof encyclopediaData;
