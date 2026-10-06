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