import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogOut, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

const ROLES = {
  Operator: 'Can ask questions and export timelines.',
  Reviewer: 'Can read the audit log and all sessions.',
  Viewer:   'Read-only access to shared investigations.',
}

const label = { fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }
const inputStyle = {
  width: '100%', padding: '10px 14px', fontSize: 14,
  background: 'var(--bg)', color: 'var(--text)',
  border: '1px solid var(--line)', borderRadius: 12, outline: 'none',
}

export const initials = name =>
  (name || '?').split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

function Card({ title, children, right }) {
  return (
    <section style={{
      background: 'var(--bg2)', border: '1px solid var(--line)',
      borderRadius: 16, padding: 20, minWidth: 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

function Field({ id, label: text, hint, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label htmlFor={id} style={{ ...label, display: 'block', marginBottom: 6 }}>{text}</label>
      {children}
      {hint && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{hint}</div>}
    </div>
  )
}

// Border turns cyan while an input is focused (same effect as your other inputs)
const focusRing = {
  onFocus: e => (e.target.style.borderColor = 'var(--cyan)'),
  onBlur:  e => (e.target.style.borderColor = 'var(--line)'),
}

function Message({ msg }) {
  return (
    <p role="status" style={{
      fontSize: 13, minHeight: 20, marginTop: 10,
      color: msg?.error ? 'var(--red)' : 'var(--green)',
    }}>
      {msg?.text}
    </p>
  )
}

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const nav = useNavigate()
  const role = user?.role || 'Operator'

  /* ---- details form ---- */
  const [name, setName] = useState(user?.name || '')
  const [team, setTeam] = useState(user?.team || '')
  const [detailsMsg, setDetailsMsg] = useState(null)

  function saveDetails(e) {
    e.preventDefault()
    const clean = name.trim()
    if (clean.length < 2 || clean.length > 60) {
      setDetailsMsg({ text: 'Name must be 2 to 60 characters.', error: true })
      return
    }
    updateUser({ name: clean, team: team.trim() })
    setDetailsMsg({ text: 'Profile saved.', error: false })
  }

  /* ---- password form ---- */
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [pwMsg, setPwMsg] = useState(null)
  const setField = k => e => setPw(p => ({ ...p, [k]: e.target.value }))

  async function changePassword(e) {
    e.preventDefault()
    if (!pw.current || !pw.next || !pw.confirm) return setPwMsg({ text: 'Please fill all fields.', error: true })
    if (pw.next.length < 8)       return setPwMsg({ text: 'New password must be at least 8 characters.', error: true })
    if (pw.next !== pw.confirm)   return setPwMsg({ text: 'New passwords do not match.', error: true })
    if (pw.next === pw.current)   return setPwMsg({ text: 'New password must be different from the current one.', error: true })

    setBusy(true); setPwMsg(null)
    try {
      await authAPI.changePassword({ currentPassword: pw.current, newPassword: pw.next })
      setPw({ current: '', next: '', confirm: '' })
      setPwMsg({ text: 'Password changed.', error: false })
    } catch (err) {
      // FastAPI sends error text in err.response.data.detail
      setPwMsg({ text: err.response?.data?.detail || 'Could not change the password. Check your connection and try again.', error: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ maxWidth: 980 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ ...label, marginBottom: 8 }}>ACCOUNT</div>
        <h1 style={{ fontSize: 26, fontWeight: 700 }}>Your Profile</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          Manage your details, password and see what your role can do.
        </p>
      </div>

      {/* Identity */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        background: 'var(--bg2)', border: '1px solid var(--line)',
        borderRadius: 16, padding: 24, marginBottom: 16,
      }}>
        <div aria-hidden="true" style={{
          width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 40%, #0b3a6b 100%)',
          boxShadow: '0 0 24px var(--cyan-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 24, color: '#03050b',
        }}>
          {initials(user?.name)}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, wordBreak: 'break-word' }}>{user?.name}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)', marginTop: 2, wordBreak: 'break-all' }}>
            {user?.email}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <Badge color="cyan">{role}</Badge>
            {user?.team && <Badge color="muted">{user.team}</Badge>}
          </div>
        </div>
      </div>

      {/* Forms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 16, marginBottom: 16 }}>
        <Card title="Personal details">
          <form onSubmit={saveDetails} noValidate>
            <Field id="pf-name" label="FULL NAME">
              <input id="pf-name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} {...focusRing} />
            </Field>
            <Field id="pf-email" label="EMAIL" hint="Email cannot be changed here.">
              <input id="pf-email" value={user?.email || ''} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
            </Field>
            <Field id="pf-team" label="TEAM OR ORGANISATION (OPTIONAL)">
              <input id="pf-team" value={team} onChange={e => setTeam(e.target.value)} placeholder="e.g. EPS operations" style={inputStyle} {...focusRing} />
            </Field>
            <Button full onClick={saveDetails}>Save changes</Button>
            <Message msg={detailsMsg} />
          </form>
        </Card>

        <Card
          title="Change password"
          right={
            <button type="button" onClick={() => setShow(s => !s)} aria-label={show ? 'Hide passwords' : 'Show passwords'}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', display: 'flex' }}>
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        >
          <form onSubmit={changePassword} noValidate>
            <Field id="pw-cur" label="CURRENT PASSWORD">
              <input id="pw-cur" type={show ? 'text' : 'password'} autoComplete="current-password"
                value={pw.current} onChange={setField('current')} style={inputStyle} {...focusRing} />
            </Field>
            <Field id="pw-new" label="NEW PASSWORD" hint="At least 8 characters.">
              <input id="pw-new" type={show ? 'text' : 'password'} autoComplete="new-password"
                value={pw.next} onChange={setField('next')} style={inputStyle} {...focusRing} />
            </Field>
            <Field id="pw-conf" label="CONFIRM NEW PASSWORD">
              <input id="pw-conf" type={show ? 'text' : 'password'} autoComplete="new-password"
                value={pw.confirm} onChange={setField('confirm')} style={inputStyle} {...focusRing} />
            </Field>
            <Button full disabled={busy} onClick={changePassword}>{busy ? 'Updating…' : 'Update password'}</Button>
            <Message msg={pwMsg} />
          </form>
        </Card>
      </div>

      {/* Role + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap: 16, marginBottom: 16 }}>
        <Card title="Your role" right={<ShieldCheck size={18} color="var(--cyan)" />}>
          {Object.entries(ROLES).map(([r, text]) => {
            const on = r === role
            return (
              <div key={r} style={{
                padding: '10px 14px', borderRadius: 12, marginBottom: 8,
                border: `1px solid ${on ? 'var(--cyan)' : 'var(--line)'}`,
                background: on ? 'var(--cyan-dim)' : 'var(--bg3)',
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: on ? 'var(--cyan)' : 'var(--text)' }}>
                  {r}{on && ' (you)'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{text}</div>
              </div>
            )
          })}
        </Card>

        <Card title="Your activity" right={<Badge color="muted">Sample data</Badge>}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {[
              { n: '47',  l: 'Questions asked',    c: 'var(--cyan)'  },
              { n: '138', l: 'Citations verified', c: 'var(--green)' },
              { n: '12',  l: 'Incidents logged',   c: 'var(--amber)' },
              { n: '0',   l: 'Unsourced answers',  c: 'var(--green)' },
            ].map(s => (
              <div key={s.l} style={{ background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.c, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <Button variant="secondary" full style={{ marginTop: 14 }} onClick={() => nav('/history')}>View my history</Button>
        </Card>
      </div>

      {/* Session */}
      <Card title="Session">
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Signing out removes your session from this browser.
        </p>
        <Button variant="danger" onClick={logout}><LogOut size={16} /> Sign out</Button>
      </Card>
    </div>
  )
}