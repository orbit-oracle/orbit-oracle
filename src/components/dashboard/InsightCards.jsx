const insights = [
  { color:'var(--cyan)',  label:'Pattern',  text:'Battery bus voltage dipped 3 times this week, each after a drop in array current.', q:'Why did the battery bus voltage drop at 14:32 UTC?' },
  { color:'var(--amber)', label:'Watch',    text:'Battery pack B is running 4.1 °C above its 7-day average.', q:'Why is battery pack B running warm?' },
  { color:'var(--green)', label:'Resolved', text:'Star tracker 1 lost lock briefly at 03:48 UTC and recovered automatically.', q:'What happened to the star tracker at 03:48 UTC?' },
]

import { useNavigate } from 'react-router-dom'

export default function InsightCards() {
  const nav = useNavigate()
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
      {insights.map((ins, i) => (
        <div key={i} style={{
          background:'var(--bg2)', border:'1px solid var(--line)',
          borderRadius:16, padding:18, display:'flex', flexDirection:'column', gap:10
        }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            fontSize:11, fontWeight:700, color:ins.color,
            fontFamily:'var(--mono)', letterSpacing:'0.06em'
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:ins.color, animation:'ping 2s infinite' }}/>
            {ins.label}
          </div>
          <p style={{ fontSize:14, lineHeight:1.55, flex:1 }}>{ins.text}</p>
          <button onClick={() => nav('/copilot', { state: { q: ins.q } })} style={{
            alignSelf:'flex-start', background:'none',
            border:'none', color:'var(--cyan)', fontSize:13,
            fontWeight:600, cursor:'pointer', padding:0
          }}>
            Investigate →
          </button>
        </div>
      ))}
    </div>
  )
}