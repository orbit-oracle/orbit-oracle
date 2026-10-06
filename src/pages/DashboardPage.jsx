import StatusBanner from '../components/dashboard/StatusBanner'
import InsightCards from '../components/dashboard/InsightCards'
import AnomalyCenter from '../components/dashboard/AnomalyCenter'
import AlertsPanel from '../components/dashboard/AlertsPanel'
import SpacecraftHealth from '../components/dashboard/SpacecraftHealth'
import DataSources from '../components/dashboard/DataSources'
import MissionKnowledge from '../components/dashboard/MissionKnowledge'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user } = useAuth()
  const nav = useNavigate()

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', marginBottom:6 }}>
          MISSION CONTROL · SPACECRAFT HEALTH
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <h1 style={{ fontSize:28, fontWeight:700 }}>
            Welcome back, {user?.name?.split(' ')[0]}
          </h1>
          <Button onClick={() => nav('/copilot')}>Open Copilot →</Button>
        </div>
      </div>

      <StatusBanner />

      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', marginBottom:14 }}>
          AI-DETECTED INSIGHTS
        </div>
        <InsightCards />
      </div>

      {/* Quick stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12, marginTop:24 }}>
        {[
          { n:'47', l:'Questions asked',   c:'var(--cyan)'  },
          { n:'138', l:'Citations verified', c:'var(--green)' },
          { n:'12',  l:'Incidents logged',   c:'var(--amber)' },
          { n:'0',   l:'Unsourced answers',  c:'var(--green)' },
        ].map(s => (
          <div key={s.l} style={{
            background:'var(--bg2)', border:'1px solid var(--line)',
            borderRadius:14, padding:'16px 18px'
          }}>
            <div style={{ fontSize:30, fontWeight:700, color:s.c, lineHeight:1 }}>{s.n}</div>
            <div style={{ fontSize:13, color:'var(--muted)', marginTop:6 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ---------- NEW: operations section ---------- */}
      <div style={{ fontSize:12, color:'var(--muted)', fontFamily:'var(--mono)', letterSpacing:'0.08em', margin:'32px 0 14px' }}>
        MISSION OPERATIONS
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(380px,100%),1fr))', gap:16 }}>
        <AnomalyCenter />
        <AlertsPanel />
        <SpacecraftHealth />
        <DataSources />
        <MissionKnowledge />
      </div>
    </div>
  )
}