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

  return null;
}
