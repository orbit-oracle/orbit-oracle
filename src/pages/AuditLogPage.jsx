import { useEffect, useState } from 'react'
import Badge from '../components/ui/Badge'
import { auditAPI } from '../services/api'

export default function AuditLogPage() {
  const [rows, setRows]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    auditAPI.log()
      .then(res => setRows(res.data))
      .catch(() => setError('Could not load audit log.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: 8 }}>
          AUDIT LOG
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Session Audit Log</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6 }}>
          Every question, answer and source is saved. Any session can be replayed for review.
        </p>
      </div>

      {loading && <p style={{ color: 'var(--muted)' }}>Loading…</p>}
      {error   && <p style={{ color: 'var(--red)' }}>{error}</p>}

      {!loading && !error && rows.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>No audit entries yet. Ask the copilot a question to create one.</p>
      )}

      {!loading && rows.length > 0 && (
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden' }}>
          <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg3)' }}>
                {['User', 'Question', 'Confidence', 'Sources', 'Time'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--line)' : 'none' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{r.user_name}</div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 14, maxWidth: 320 }}>{r.question}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge color={r.confidence >= 80 ? 'green' : r.confidence >= 50 ? 'amber' : 'red'}>
                      {r.confidence}%
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 13 }}>{r.sources_count}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>
                    {new Date(r.created_at).toUTCString().slice(0, 25)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}