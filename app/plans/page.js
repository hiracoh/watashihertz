export default function Plans() {
  return (
    <section>
      <h1 style={{ fontSize:'1.5rem', marginTop:0 }}>プラン</h1>
      <p style={{ color:'#555' }}>まずは読み物から。必要なら深い層へ。</p>

      <div style={{ display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', marginTop:'1rem' }}>
        <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem' }}>
          <h2 style={{ marginTop:0 }}>ベーシック</h2>
          <p style={{ margin:'0.25rem 0', color:'#666' }}>¥700 / 月</p>
          <ul>
            <li>すべての<strong>記事</strong>が読める</li>
          </ul>
          <a href="#" style={{ display:'inline-block', marginTop:'0.75rem', padding:'0.5rem 0.9rem',
            borderRadius:8, background:'#222', color:'#fff', textDecoration:'none' }}>このプランにする</a>
        </div>

        <div style={{ background:'#fff', border:'2px solid #222', borderRadius:12, padding:'1rem' }}>
          <h2 style={{ marginTop:0 }}>オールアクセス</h2>
          <p style={{ margin:'0.25rem 0', color:'#666' }}>¥1,500 / 月</p>
          <ul>
            <li>記事 + <strong>音声</strong> + <strong>カード</strong></li>
            <li>（将来）限定アーカイブ、プライベート配信など</li>
          </ul>
          <a href="#" style={{ display:'inline-block', marginTop:'0.75rem', padding:'0.5rem 0.9rem',
            borderRadius:8, background:'#222', color:'#fff', textDecoration:'none' }}>このプランにする</a>
        </div>
      </div>

      <p style={{ marginTop:'1rem', color:'#777', fontSize:14 }}>
        ※ 決済は後でMemberful/Stripe連携に差し替え可能です。
      </p>
    </section>
  );
}
