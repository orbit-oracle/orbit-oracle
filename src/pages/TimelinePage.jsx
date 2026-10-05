import TimelineView from '../components/copilot/TimelineView'

const events = [
  {time:"14:31 UTC",event:"Solar array current dropped below threshold on panel string B.",source:"LOG-4521"},
  {time:"14:32 UTC",event:"Battery bus voltage fell from 28.1 V to 26.4 V.",source:"T-17"},
  {time:"14:35 UTC",event:"BUS-LOW alert raised to operator console.",source:"LOG-4533"},
  {time:"14:40 UTC",event:"Operator started procedure EPS-07 Low bus voltage.",source:"EPS-07"},
  {time:"14:55 UTC",event:"Array pointing corrected. Voltage returned to 27.9 V.",source:"T-18"},
]

export default function TimelinePage() {
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', marginBottom:8 }}>
          INCIDENT TIMELINE
        </div>
        <h1 style={{ fontSize:26, fontWeight:700 }}>Auto-Built Incident Timeline</h1>
        <p style={{ color:'var(--muted)', marginTop:6 }}>Every event is linked to its source. Click a citation to see the original text.</p>
      </div>
      <div style={{ background:'var(--bg2)', border:'1px solid var(--line)', borderRadius:18, padding:28 }}>
        <TimelineView events={events} />
      </div>
    </div>
  )
}