import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer
} from 'recharts'
import Badge from '../components/ui/Badge'

// Sample telemetry data
const BUS_DATA = [
  { t: '14:28', v: 28.2, nominal: 27.5 },
  { t: '14:29', v: 28.1, nominal: 27.5 },
  { t: '14:30', v: 28.0, nominal: 27.5 },
  { t: '14:31', v: 27.6, nominal: 27.5 },
  { t: '14:32', v: 26.4, nominal: 27.5 },
  { t: '14:33', v: 26.6, nominal: 27.5 },
  { t: '14:34', v: 26.9, nominal: 27.5 },
  { t: '14:35', v: 27.1, nominal: 27.5 },
  { t: '14:40', v: 27.8, nominal: 27.5 },
  { t: '14:45', v: 28.0, nominal: 27.5 },
  { t: '14:50', v: 28.1, nominal: 27.5 },
]

const TEMP_DATA = [
  { t: '09:00', v: 27.4 },
  { t: '09:05', v: 28.1 },
  { t: '09:10', v: 29.6 },
  { t: '09:15', v: 31.2 },
  { t: '09:20', v: 31.8 },
  { t: '09:25', v: 31.5 },
  { t: '09:30', v: 31.1 },
  { t: '09:40', v: 30.4 },
  { t: '09:50', v: 29.0 },
]

const CHANNELS = [
  { id: 'T-17',  label: 'Bus Voltage',       unit: 'V',   limit: [27.5, 28.5], status: 'anomaly', data: BUS_DATA,  key: 'v', color: '#22d3ee' },
  { id: 'T-22',  label: 'Battery Pack B Temp',unit:'°C',  limit: [20, 30],     status: 'warning', data: TEMP_DATA, key: 'v', color: '#fbbf24' },
]

const STATS = [
  { ch: 'T-17', label: 'Bus Voltage', min: 26.4, max: 28.2, avg: 27.6, unit: 'V', status: 'anomaly' },
  { ch: 'T-22', label: 'Battery Temp', min: 27.4, max: 31.8, avg: 30.1, unit: '°C', status: 'warning' },
  { ch: 'T-31', label: 'Star Tracker', min: null, max: null, avg: null, unit: 'lock', status: 'resolved' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--line)',
      borderRadius: 10, padding: '10px 14px', fontSize: 13
    }}>
      <div style={{ color: 'var(--muted)', marginBottom: 6, fontFamily: 'var(--mono)' }}>{label} UTC</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value} {p.unit || ''}
        </div>
      ))}
    </div>
  )
}

export default function TelemetryPage() {
  const [active, setActive] = useState('T-17')
  const ch = CHANNELS.find(c => c.id === active)

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 26 }}>
        <div style={{
          fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)',
          letterSpacing: '0.08em', marginBottom: 8
        }}>
          TELEMETRY SUMMARIES · SPACECRAFT HEALTH
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>Telemetry Summaries</h1>
          <Badge color="muted">Sample data · Not live</Badge>
        </div>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          Aggregated summaries indexed in the knowledge base. Click a channel to inspect it.
        </p>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))',
        gap: 12, marginBottom: 24
      }}>
        {STATS.map(s => (
          <div
            key={s.ch}
            onClick={() => CHANNELS.find(c => c.id === s.ch) && setActive(s.ch)}
            style={{
              background: 'var(--bg2)',
              border: `1px solid ${active === s.ch ? 'var(--cyan)' : 'var(--line)'}`,
              borderRadius: 14, padding: '16px 18px', cursor: 'pointer',
              transition: 'border-color 0.18s',
              boxShadow: active === s.ch ? '0 0 0 2px var(--cyan-dim)' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 11,
                color: 'var(--cyan)', fontWeight: 700
              }}>{s.ch}</span>
              <Badge color={
                s.status === 'anomaly' ? 'red' :
                s.status === 'warning' ? 'amber' : 'green'
              }>
                {s.status}
              </Badge>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{s.label}</div>
            {s.min !== null ? (
              <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--muted)' }}>
                <div>
                  <div style={{ color: 'var(--red)', fontWeight: 700, fontSize: 16 }}>{s.min}</div>
                  <div>min</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 16 }}>{s.avg}</div>
                  <div>avg</div>
                </div>
                <div>
                  <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: 16 }}>{s.max}</div>
                  <div>max</div>
                </div>
                <div style={{ marginLeft: 'auto', alignSelf: 'flex-end', fontSize: 11 }}>{s.unit}</div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>Lock lost 6 s, self-recovered</div>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      {ch && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--line)',
          borderRadius: 18, padding: '24px 20px 16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>
                {ch.label}
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 12,
                  color: 'var(--muted)', marginLeft: 10
                }}>{ch.id}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
                Nominal range: {ch.limit[0]} – {ch.limit[1]} {ch.unit}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge color="red">Anomaly window marked</Badge>
              <Badge color="muted">UTC timestamps</Badge>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ch.data} margin={{ top: 4, right: 20, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
              <XAxis
                dataKey="t"
                tick={{ fill: 'var(--muted)', fontSize: 12, fontFamily: 'var(--mono)' }}
                tickLine={false} axisLine={{ stroke: 'var(--line)' }}
              />
              <YAxis
                tick={{ fill: 'var(--muted)', fontSize: 12, fontFamily: 'var(--mono)' }}
                tickLine={false} axisLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={ch.limit[0]} stroke="var(--amber)" strokeDasharray="5 3"
                label={{ value: 'Lower limit', fill: 'var(--amber)', fontSize: 11, position: 'insideTopRight' }} />
              <ReferenceLine y={ch.limit[1]} stroke="var(--green)" strokeDasharray="5 3"
                label={{ value: 'Upper limit', fill: 'var(--green)', fontSize: 11, position: 'insideBottomRight' }} />
              <Line
                type="monotone" dataKey={ch.key}
                stroke={ch.color} strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy, payload } = props
                  const isAnomaly = ch.id === 'T-17' && payload.v < 27.5
                  return (
                    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={isAnomaly ? 6 : 3}
                      fill={isAnomaly ? 'var(--red)' : ch.color}
                      stroke={isAnomaly ? 'var(--red)' : 'none'}
                      strokeWidth={isAnomaly ? 2 : 0}
                      opacity={isAnomaly ? 1 : 0.7}
                    />
                  )
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Anomaly legend */}
          <div style={{
            marginTop: 14, padding: '10px 14px',
            background: 'rgba(248,113,113,0.08)',
            border: '1px solid rgba(248,113,113,0.25)',
            borderRadius: 10, fontSize: 13, color: 'var(--muted)'
          }}>
            <span style={{ color: 'var(--red)', fontWeight: 700 }}>● Anomaly points</span>
            {' '}— Values below nominal range, cited as evidence in the Copilot response.
          </div>
        </div>
      )}

      {/* Source table */}
      <div style={{
        marginTop: 24, background: 'var(--bg2)',
        border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)', fontWeight: 700, fontSize: 15 }}>
          Indexed Telemetry Items
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--line)' }}>
              {['ID', 'Channel', 'Time (UTC)', 'Summary', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left', fontSize: 12,
                  fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id:'T-17', ch:'Bus Voltage',      time:'14:30–14:50', summary:'Fell to 26.4 V at 14:32, nominal 27.5–28.5 V.', s:'anomaly' },
              { id:'T-22', ch:'Battery Pack B',   time:'09:00–09:50', summary:'Reached 31.8 °C, 4.1 °C above 7-day average.',  s:'warning'  },
              { id:'T-31', ch:'Star Tracker 1',   time:'03:48–03:49', summary:'Lost lock 6 s, attitude error 0.4 deg, recovered.',s:'resolved'},
              { id:'T-18', ch:'Bus Voltage Post', time:'14:50–15:00', summary:'Returned to 27.9 V after array correction.',      s:'nominal'  },
            ].map((r, i, arr) => (
              <tr key={r.id} style={{ borderBottom: i < arr.length-1 ? '1px solid var(--line)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--cyan)' }}>{r.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>{r.ch}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>{r.time}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{r.summary}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge color={r.s==='anomaly'?'red':r.s==='warning'?'amber':r.s==='resolved'?'green':'muted'}>
                    {r.s}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}