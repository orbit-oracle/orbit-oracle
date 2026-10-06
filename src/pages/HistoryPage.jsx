import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import { auditAPI } from '../services/api'

export default function HistoryPage() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    auditAPI.log()
      .then(res => setSessions(res.data))
      .catch(() => setError('Could not load history.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em', marginBottom: 8 }}>HISTORY</div>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Investigation History</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6 }}>All past investigations, saved automatically.</p>
      </div>

      {loading && <p style={{ color: 'var(--muted)' }}>Loading…</p>}
      {error   && <p style={{ color: 'var(--red)' }}>{error}</p>}

      {!loading && !error && sessions.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>No investigations yet. Ask the copilot a question to start one.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sessions.map(s => (
          <div key={s.id} onClick={() => nav('/copilot')} style={{
            background: 'var(--bg2)', border: '1px solid var(--line)',
            borderRadius: 14, padding: '16px 20px', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: 12, flexWrap: 'wrap', transition: 'border-color 0.18s'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{s.question}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                {new Date(s.created_at).toUTCString().slice(0, 25)} · {s.user_name}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Badge color={s.confidence >= 80 ? 'green' : s.confidence >= 50 ? 'amber' : 'red'}>
                {s.confidence}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}