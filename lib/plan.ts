export const isFree = (a: any) =>
  (a?.plan ?? 'free').toString().trim().toLowerCase() === 'free';

export const isPaid = (a: any) => !isFree(a);
