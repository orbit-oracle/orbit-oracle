import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Siren } from 'lucide-react'
import SectionCard from './SectionCard'
import FilterChips from './FilterChips'
import Badge from '../ui/Badge'
import { anomalies, SEV_COLOR, fmtUTC } from '../../data/dashboardData'

const FILTERS = ['All', 'Active', 'Resolved', 'Critical']

// "Critical" is a severity, "Active"/"Resolved" are statuses, so one helper handles both.
const matches = (a, f) =>
  f === 'All' || (f === 'Critical' ? a.severity === 'critical' : a.status === f.toLowerCase())

export default function AnomalyCenter() {
  const nav = useNavigate()
  const [filter, setFilter] = useState('All')

  const counts = Object.fromEntries(FILTERS.map(f => [f, anomalies.filter(a => matches(a, f)).length]))
  const list = anomalies.filter(a => matches(a, filter))

  return (
    <SectionCard icon={Siren} title="Anomaly Center" right={<Badge color="red">{counts.Active} active</Badge>}>
      <FilterChips options={FILTERS} value={filter} onChange={setFilter} counts={counts} />

      {list.length === 0 && (
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>No anomalies match this filter.</p>
      )}

      {list.map((a, i) => (
        <div key={a.id} style={{
          padding: '14px 0', display: 'flex', flexDirection: 'column', gap: 8,
          borderTop: i === 0 ? 'none' : '1px solid var(--line)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                {a.id} · {a.subsystem} · {fmtUTC(a.time)}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <Badge color={SEV_COLOR[a.severity]}>{a.severity}</Badge>
              <Badge color={a.status === 'resolved' ? 'green' : 'muted'}>{a.status}</Badge>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {a.evidence.map(e => (
              <span key={e} style={{
                fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)',
                background: 'var(--cyan-dim)', borderRadius: 6, padding: '1px 8px',
              }}>{e}</span>
            ))}
            <button onClick={() => nav('/copilot', { state: { q: a.q } })} style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              color: 'var(--cyan)', fontSize: 13, fontWeight: 600, padding: 0,
            }}>
              Investigate →
            </button>
          </div>
        </div>
      ))}
    </SectionCard>
  )
}