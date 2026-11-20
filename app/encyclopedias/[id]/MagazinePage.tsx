import FashionMagazine, {
  type MagazineBook,
} from './FashionMagazine';

export default function MagazinePage({
  book,
}: {
  book: MagazineBook;
}) {
  if (book.layout === 'fashion-magazine') {
    return <FashionMagazine book={book} />;
  }

  throw new Error(
    `未対応の雑誌レイアウトです: ${book.layout ?? '未指定'}（図鑑ID: ${book.id}）。layout には "fashion-magazine" を指定してください。`
  );
}
