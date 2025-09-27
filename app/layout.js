import './globals.css';

export const metadata = {
  title: 'ワタシヘルツ',
  description: '人間として生きる上での地図',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <header style={{
          padding: '1rem 1.25rem', borderBottom: '1px solid #e6e2d9',
          background: '#F6F1E9', position: 'sticky', top: 0
        }}>
          <nav style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
            <a href="/" style={{ fontWeight: 700, textDecoration:'none', color:'#222' }}>ワタシヘルツ</a>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <a href="/plans" style={{ textDecoration:'none', color:'#444' }}>プラン</a>
              <a href="/content" style={{ textDecoration:'none', color:'#444' }}>コンテンツ</a>
            </div>
          </nav>
        </header>
        <main style={{ padding: '2rem 1.25rem', maxWidth: 960, margin: '0 auto' }}>
          {children}
        </main>
        <footer style={{ padding:'2rem 1.25rem', borderTop:'1px solid #e6e2d9', color:'#666' }}>
          © {new Date().getFullYear()} ワタシヘルツ
        </footer>
      </body>
    </html>
  );
}
