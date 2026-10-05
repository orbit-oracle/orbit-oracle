import Badge from '../ui/Badge'

export default function EvidencePanel({ sources = [], onClose }) {
  if (!sources.length) return null
  return (
    <div style={{
      background:'var(--bg3)', border:'1px solid var(--line)', borderRadius:14,
      padding:18, marginTop:14, animation:'fadeUp 0.3s ease'
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <span style={{ fontWeight:700, fontSize:14 }}>📎 Evidence Sources</span>
        <button onClick={onClose} style={{
          background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:16
        }}>✕</button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {sources.map((src, i) => (
          <div key={i} style={{
            background:'var(--bg2)', border:'1px solid var(--line)',
            borderRadius:10, padding:'12px 14px'
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <Badge color={src.type === 'telemetry' ? 'cyan' : src.type === 'procedure' ? 'amber' : 'muted'}>
                {src.id}
              </Badge>
              <span style={{ fontSize:12, color:'var(--muted)' }}>{src.type} · {src.time}</span>
            </div>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>{src.title}</div>
            <div style={{
              fontSize:13, color:'var(--muted)', lineHeight:1.55,
              borderLeft:'2px solid var(--cyan)', paddingLeft:10
            }}>
              {src.excerpt}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}