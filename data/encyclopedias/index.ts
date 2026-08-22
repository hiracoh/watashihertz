import guilt from './guilt.json';
import yoroi from './yoroi.json';

export const encyclopediaData = {
  guilt,
  yoroi,
};

export type EncyclopediaId = keyof typeof encyclopediaData;
