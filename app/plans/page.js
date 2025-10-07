export default function Plans() {
  return (
    <section>
      <h1 style={{ fontSize:'1.5rem', marginTop:0 }}>プラン</h1>
      <p style={{ color:'#555' }}>まずは読み物から。必要なら深い層へ。</p>

   <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem' }}>
  <h2 style={{ marginTop:0 }}>こんにちは</h2>
  <p>まずはご挨拶から始めるプラン</p>
  <p style={{ margin:'0.25rem 0', color:'#666' }}>無料</p>

  <div style={{
    display:'inline-block',
    background:'#eee',
    color:'#333',
    fontSize:'0.8rem',
    fontWeight:'bold',
    padding:'0.2rem 0.5rem',
    borderRadius:'6px',
    marginTop:'0.5rem'
  }}>
    ついでに…
  </div>

  <ul style={{ paddingLeft:'1.2rem', marginTop:'0.5rem' }}>
    <li>すべての<strong>無料記事</strong>へのアクセス</li>
   <li>すべての<strong>カード</strong>へのアクセス</li>
  </ul>

</div>
      
      <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, padding:'1rem' }}>
  <h2 style={{ marginTop:0 }}>とりあえず一杯</h2>
  <p>運営者に<strong>「まあ一杯どうぞ」</strong>とできるプラン</p>
  <p style={{ margin:'0.25rem 0', color:'#666' }}>¥700 / 月</p>

  <div style={{
    display:'inline-block',
    background:'#eee',
    color:'#333',
    fontSize:'0.8rem',
    fontWeight:'bold',
    padding:'0.2rem 0.5rem',
    borderRadius:'6px',
    marginTop:'0.5rem'
  }}>
    ついでに…
  </div>

  <ul style={{ paddingLeft:'1.2rem', marginTop:'0.5rem' }}>
    <li>すべての<strong>記事</strong>へのアクセス</li>
    <li>すべての<strong>カード</strong>へのアクセス</li>
  </ul>

  <a href="#" style={{
    display:'inline-block', marginTop:'0.75rem', padding:'0.5rem 0.9rem',
    borderRadius:8, background:'#222', color:'#fff', textDecoration:'none'
  }}>
    このプランにする
  </a>
</div>


        <div style={{ background:'#fff', border:'2px solid #222', borderRadius:12, padding:'1rem' }}>
  <h2 style={{ marginTop:0 }}>チキン南蛮定食</h2>
  <p>運営者に<strong>チキン南蛮定食</strong>をご馳走できるプラン</p>
  <p style={{ margin:'0.25rem 0', color:'#666' }}>¥1,500 / 月</p>

  <div style={{
    display:'inline-block',
    background:'#eee',
    color:'#333',
    fontSize:'0.8rem',
    fontWeight:'bold',
    padding:'0.2rem 0.5rem',
    borderRadius:'6px',
    marginTop:'0.5rem'
  }}>
    ついでに…
  </div>

  <ul style={{ paddingLeft:'1.2rem', marginTop:'0.5rem' }}>
    <li>上記に加え + <strong>解説音声</strong>へのアクセス</li>
    <li>自分の現在地と照らし合わせるロードマップへのアクセス</li>
  </ul>

  <a href="#" style={{
    display:'inline-block', marginTop:'0.75rem', padding:'0.5rem 0.9rem',
    borderRadius:8, background:'#222', color:'#fff', textDecoration:'none'
  }}>
    このプランにする
  </a>
</div>

      <p style={{ marginTop:'1rem', color:'#777', fontSize:14 }}>
        ※ 決済は後でMemberful/Stripe連携に差し替え可能です。
      </p>
    </section>
  );
}
