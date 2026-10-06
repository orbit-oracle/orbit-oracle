import { Satellite } from 'lucide-react'
import SectionCard from './SectionCard'
import Badge from '../ui/Badge'
import { health, SEV_COLOR } from '../../data/dashboardData'

// A sparkline is a tiny line chart with no axes. Each reading becomes an
// (x, y) point and the points are joined by one SVG <polyline>.
function Sparkline({ data, color }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1 // avoids dividing by zero when a sensor is flat-lined
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / range) * 28}`)
    .join(' ')
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true"
         style={{ width: '100%', height: 32, display: 'block' }}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2"
                vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  )
}

export default function SpacecraftHealth() {
  return (
    <SectionCard icon={Satellite} title="Spacecraft Health" right={<Badge color="muted">Sample data</Badge>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 12 }}>
        {health.map(m => {
          const color = `var(--${SEV_COLOR[m.status]})`
          return (
            <div key={m.key} style={{
              background: 'var(--bg3)', border: '1px solid var(--line)',
              borderRadius: 14, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.label}</span>
                <Badge color={SEV_COLOR[m.status]}>{m.status}</Badge>
              </div>
              <div style={{ margin: '10px 0 8px', lineHeight: 1 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color }}>{m.value}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 6 }}>{m.unit}</span>
              </div>
              <Sparkline data={m.trend} color={color} />
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}