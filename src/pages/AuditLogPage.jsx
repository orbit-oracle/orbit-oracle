import Badge from '../components/ui/Badge'

const rows = [
  { id:1, user:'Sneha Dhonde', q:'Why did battery bus voltage drop at 14:32 UTC?', conf:91, sources:4, t:'14:42 UTC', role:'Operator' },
  { id:2, user:'Aditya Kadage', q:'Build an incident timeline for the BUS-LOW alert.', conf:88, sources:3, t:'14:50 UTC', role:'Team Leader' },
  { id:3, user:'Sneha Dhonde', q:'What is causing the battery pack temperature rise?', conf:74, sources:2, t:'15:02 UTC', role:'Operator' },
  { id:4, user:'Sneha Dhonde', q:'Show EPS-07 procedure steps.', conf:95, sources:1, t:'15:18 UTC', role:'Operator' },
]

export default function AuditLogPage() {
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', marginBottom:8 }}>
          AUDIT LOG
        </div>
        <h1 style={{ fontSize:26, fontWeight:700 }}>Session Audit Log</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Every question, answer and source is saved. Any session can be replayed for review.</p>
      </div>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:18, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--line)', background:'var(--bg3)' }}>
              {['#','User','Question','Confidence','Sources','Time'].map(h => (
                <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:12,
                  fontWeight:700, color:'var(--muted)', fontFamily:'var(--mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: i<rows.length-1 ? '1px solid var(--line)':'none' }}>
                <td style={{ padding:'14px 16px', fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)' }}>{r.id}</td>
                <td style={{ padding:'14px 16px' }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{r.user}</div>
                  <div style={{ fontSize:12, color:'var(--muted)' }}>{r.role}</div>
                </td>
                <td style={{ padding:'14px 16px', fontSize:14, maxWidth:320 }}>{r.q}</td>
                <td style={{ padding:'14px 16px' }}>
                  <Badge color={r.conf>=80?'green':r.conf>=50?'amber':'red'}>{r.conf}%</Badge>
                </td>
                <td style={{ padding:'14px 16px', fontFamily:'var(--mono)', fontSize:13 }}>{r.sources}</td>
                <td style={{ padding:'14px 16px', fontFamily:'var(--mono)', fontSize:12, color:'var(--muted)' }}>{r.t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}