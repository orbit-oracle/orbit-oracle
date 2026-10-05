export default function StatusBanner() {
  const statuses = [
    { label:'Copilot',      status:'Online',   color:'var(--green)' },
    { label:'Sources',      status:'4 indexed',color:'var(--cyan)'  },
    { label:'Last query',   status:'2 min ago',color:'var(--muted)' },
    { label:'Mode',         status:'Advisory', color:'var(--amber)' },
  ]
  return (
    <div style={{
      display:'flex', gap:12, flexWrap:'wrap',
      background:'var(--bg2)', border:'1px solid var(--line)',
      borderRadius:14, padding:'12px 18px', marginBottom:24
    }}>
      {statuses.map(s => (
        <div key={s.label} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:s.color, flexShrink:0 }}/>
          <span style={{ color:'var(--muted)' }}>{s.label}:</span>
          <span style={{ fontWeight:600, color:s.color }}>{s.status}</span>
        </div>
      ))}
    </div>
  )
}