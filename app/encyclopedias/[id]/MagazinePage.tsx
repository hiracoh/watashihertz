import Image from 'next/image';

type MagazineBook = {
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
    }>;
  }>;
};

export default function MagazinePage({
  book,
}: {
  book: MagazineBook;
}) {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '32px 20px 80px',
      }}
    >
      <div
        style={{
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            marginBottom: 8,
            fontSize: 12,
            letterSpacing: '0.2em',
            color: '#888',
          }}
        >
          WATASHI HERTZ
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 32,
            letterSpacing: '0.08em',
          }}
        >
          {book.title}
        </h1>
      </div>

      {book.items.map((item) => (
        <article
          key={item.id}
          style={{
            marginBottom: 64,
          }}
        >
          <h2
            style={{
              margin: '0 0 24px',
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            {item.title}
          </h2>

          {item.image && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 700,
                aspectRatio: '4 / 5',
                margin: '0 auto',
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 95vw, 700px"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          )}
        </article>
      ))}
    </main>
  );
}
