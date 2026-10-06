import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react'
import SectionCard from './SectionCard'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { alerts as initial, SEV_COLOR, fmtUTC } from '../../data/dashboardData'

export default function AlertsPanel() {
  const nav = useNavigate()
  const [alerts, setAlerts] = useState(initial)
  const unread = alerts.filter(a => !a.acknowledged).length

  const acknowledge = id =>
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, acknowledged: true } : a)))

  return (
    <SectionCard
      icon={Bell}
      title="Alerts"
      right={unread > 0 ? <Badge color="amber">{unread} new</Badge> : <Badge color="green">All acknowledged</Badge>}
    >
      {alerts.map((a, i) => (
        <div key={a.id} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
          padding: '14px 0', opacity: a.acknowledged ? 0.6 : 1,
          borderTop: i === 0 ? 'none' : '1px solid var(--line)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Badge color={SEV_COLOR[a.severity]}>{a.severity}</Badge>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>
                {a.id} · {fmtUTC(a.time)}
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{a.message}</div>
            <button onClick={() => nav('/copilot', { state: { q: a.q } })} style={{
              background: 'none', border: 'none', color: 'var(--cyan)',
              fontSize: 13, fontWeight: 600, padding: 0, marginTop: 4,
            }}>
              Investigate →
            </button>
          </div>
          {a.acknowledged
            ? <span style={{ fontSize: 12, color: 'var(--muted)' }}>Acknowledged</span>
            : <Button size="sm" variant="ghost" onClick={() => acknowledge(a.id)}>Acknowledge</Button>}
        </div>
      ))}
    </SectionCard>
  )
}