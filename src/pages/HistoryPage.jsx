import Badge from '../components/ui/Badge'
import { useNavigate } from 'react-router-dom'

const sessions = [
  { id:1, q:'Why did battery bus voltage drop at 14:32 UTC?', conf:91, t:'Today 14:42', status:'Resolved' },
  { id:2, q:'Battery pack B temperature anomaly investigation.', conf:74, t:'Today 15:02', status:'Open' },
  { id:3, q:'Star tracker 1 loss of lock at 03:48 UTC.', conf:68, t:'Yesterday 03:50', status:'Resolved' },
]

export default function HistoryPage() {
  const nav = useNavigate()
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', marginBottom:8 }}>HISTORY</div>
        <h1 style={{ fontSize:26, fontWeight:700 }}>Investigation History</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>All past investigations, saved automatically.</p>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {sessions.map(s => (
          <div key={s.id} onClick={() => nav('/copilot')} style={{
            background:'var(--bg2)', border:'1px solid var(--line)',
            borderRadius:14, padding:'16px 20px', cursor:'pointer',
            display:'flex', justifyContent:'space-between', alignItems:'center',
            gap:12, flexWrap:'wrap', transition:'border-color 0.18s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor='var(--cyan)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='var(--line)'}>
            <div>
              <div style={{ fontWeight:600, fontSize:15, marginBottom:6 }}>{s.q}</div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>{s.t}</div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <Badge color={s.conf>=80?'green':s.conf>=50?'amber':'red'}>{s.conf}%</Badge>
              <Badge color={s.status==='Resolved'?'green':'amber'}>{s.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}