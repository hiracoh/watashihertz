export default function Home() {
  return (
    <section>
      <h1 style={{ fontSize: '1.75rem', margin: 0 }}>human atlas</h1>
      <p style={{ marginTop: '0.75rem', color:'#555' }}>
        自分を生きていく上での地図のような場所      </p>

      <div style={{
        marginTop:'1.5rem', padding:'1rem', background:'#fff',
        border:'1px solid #eee', borderRadius:12
      }}>
        <h2 style={{ marginTop:0, fontSize:'1.25rem' }}>ここでできること</h2>
        <ul>
          <li>記事・音声・カード（一言メモ）を読む/聴く</li>
          <li>問題が起きた時に “立ち返る” ための枠組みを参照する</li>
          <li>（将来）会員プランで深いコンテンツにアクセス</li>
        </ul>
      </div>
    </section>
  );
}
