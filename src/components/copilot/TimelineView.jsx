export default function TimelineView({ events = [] }) {
  if (!events.length) return null
  return (
    <div style={{ marginTop:16 }}>
      <div style={{ fontSize:13, fontWeight:700, color:'var(--muted)', marginBottom:12,
        fontFamily:'var(--mono)', letterSpacing:'0.06em' }}>
        AUTO-BUILT INCIDENT TIMELINE
      </div>
      <div style={{ position:'relative', paddingLeft:20 }}>
        <div style={{
          position:'absolute', left:7, top:0, bottom:0,
          width:2, background:'linear-gradient(180deg,var(--cyan),var(--amber))'
        }}/>
        {events.map((ev, i) => (
          <div key={i} style={{ position:'relative', marginBottom:16 }}>
            <div style={{
              position:'absolute', left:-13, top:4, width:10, height:10,
              borderRadius:'50%', background: i===events.length-1 ? 'var(--amber)' : 'var(--cyan)',
              boxShadow:`0 0 8px ${i===events.length-1?'var(--amber)':'var(--cyan)'}`
            }}/>
            <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{
                fontFamily:'var(--mono)', fontSize:12,
                color:'var(--cyan)', flexShrink:0, marginTop:2
              }}>{ev.time}</span>
              <div>
                <div style={{ fontWeight:600, fontSize:14 }}>{ev.event}</div>
                {ev.source && (
                  <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>
                    Source: <span style={{ color:'var(--cyan)' }}>{ev.source}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}