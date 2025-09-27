export default function NoteEmbed({ url, height = 1600 }) {
  return (
    <div style={{ background:'#fff', border:'1px solid #eee', borderRadius:12, overflow:'hidden' }}>
      {/* 先頭にフォールバックリンク（iframeがブロックされたときユーザーが移動できる） */}
      <div style={{ padding:'0.75rem 1rem', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontWeight:600 }}>note（外部）</div>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none', color:'#222' }}>
          直接開く →
        </a>
      </div>

      {/* noteをiframe表示（ブロックされる場合もある） */}
      <iframe
        src={url}
        style={{ width:'100%', height, border:'0', display:'block' }}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        title="note embed"
      />
    </div>
  );
}
