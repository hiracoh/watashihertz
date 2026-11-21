import './globals.css';
import ContentDropdown from '../components/ContentDropdown';
import { Zen_Maru_Gothic } from 'next/font/google';

const zenMaru = Zen_Maru_Gothic({ subsets: ['latin'], weight: ['400','500','700'] });

export const metadata = {
  title: 'ワタシヘルツ',
  description: '人間として生きる上での地図',
  icons: {
    icon: "/favicon4.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={zenMaru.className}>
        <header style={{
          padding:'1rem 1.25rem', borderBottom:'1px solid var(--line)',
          background:'var(--ivory)', position:'sticky', top:0, zIndex:1000
        }}>
          <nav style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
            <a href="/" style={{ fontWeight:700, textDecoration:'none', color:'var(--ink)' }}>ワタシヘルツ</a>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <a href="/plans" style={{ textDecoration:'none', color:'#444' }}>プラン</a>
              <ContentDropdown />
            </div>
          </nav>
        </header>
        <main style={{ padding:'var(--page-padding-y) var(--page-padding-x)', maxWidth:'var(--page-max-width)', margin:'0 auto' }}>
          {children}
        </main>
        <footer style={{ padding:'var(--page-padding-y) var(--page-padding-x)', borderTop:'1px solid var(--line)', color:'var(--muted)' }}>
          © {new Date().getFullYear()} ワタシヘルツ
        </footer>
      </body>
    </html>
  );
}
