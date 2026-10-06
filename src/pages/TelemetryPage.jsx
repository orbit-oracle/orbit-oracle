import Badge from '../components/ui/Badge'

const TELEMETRY = [
  { id: 'T-17', ch: 'Bus Voltage',       time: '14:30–14:50 UTC', summary: 'Fell to 26.4 V at 14:32, nominal 27.5–28.5 V.', status: 'anomaly' },
  { id: 'T-22', ch: 'Battery Pack B Temp', time: '09:00–09:50 UTC', summary: 'Reached 31.8 °C, 4.1 °C above 7-day average.', status: 'warning' },
  { id: 'T-31', ch: 'Star Tracker 1',    time: '03:48–03:49 UTC', summary: 'Lost lock 6 s, attitude error 0.4 deg, recovered.', status: 'resolved' },
  { id: 'T-18', ch: 'Bus Voltage Post',  time: '14:50–15:00 UTC', summary: 'Returned to 27.9 V after array correction.',      status: 'nominal' },
]

export default function TelemetryPage() {
  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: 8 }}>
          TELEMETRY SUMMARIES · SPACECRAFT HEALTH
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Telemetry Summaries</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          Aggregated telemetry summaries indexed in the knowledge base — used as evidence by the copilot.
        </p>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden' }}>
        <table style={{ width: '100%', minWidth: 500, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg3)', borderBottom: '1px solid var(--line)' }}>
              {['ID', 'Channel', 'Time (UTC)', 'Summary', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TELEMETRY.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: i < TELEMETRY.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--cyan)' }}>{r.id}</td>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600 }}>{r.ch}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>{r.time}</td>
                <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{r.summary}</td>
                <td style={{ padding: '12px 16px' }}>
                  <Badge color={r.status === 'anomaly' ? 'red' : r.status === 'warning' ? 'amber' : r.status === 'resolved' ? 'green' : 'muted'}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)', padding: '10px 14px', background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 10 }}>
        ℹ These are the telemetry summaries indexed in the knowledge base. The copilot cites them (e.g. T-17) when answering questions about spacecraft health events.
      </div>
    </div>
  )
}