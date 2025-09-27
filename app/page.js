import Image from 'next/image';

export default function Home() {
  return (
    <section style={{ display:'grid', gap:'1.25rem' }}>
      <div style={{ position:'relative', width:'100%', height: 260, borderRadius:16, overflow:'hidden', border:'1px solid #eee' }}>
        <Image src="/map.jpg" alt="ワタシヘルツ" fill style={{ objectFit:'cover' }} priority />
      </div>

      <h1 style={{ fontSize:'1.9rem', margin:0 }}>life atlas</h1>
      <p style={{ margin:'0.25rem 0 0.75rem', color:'#555' }}>
        自分を生きる上での、地図のような場所を。

        ここには地図があります。生きている地図です。日々新しく入れ替わるし、あなたの現在地合わせて形を変えます。
      </p>

      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
        <a href="/plans" style={btnPrimary}>プランを見る</a>
        <a href="/content" style={btnGhost}>コンテンツへ</a>
      </div>
    </section>
  );
}

const btnPrimary = {
  display:'inline-block', padding:'0.6rem 1rem', borderRadius:12,
  background:'#222', color:'#fff', textDecoration:'none'
};
const btnGhost = {
  display:'inline-block', padding:'0.6rem 1rem', borderRadius:12,
  border:'1px solid #222', textDecoration:'none', color:'#222', background:'#fff'
};
