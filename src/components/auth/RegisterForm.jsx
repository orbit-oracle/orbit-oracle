import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import Button from '../ui/Button'
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react'

const ROLES = ['Operator', 'Reviewer', 'Viewer']

const strengthLabel = pw => {
  if (!pw) return { label: '', color: 'var(--line)', w: 0 }
  let s = 0
  if (pw.length >= 8)           s++
  if (/[A-Z]/.test(pw))         s++
  if (/[0-9]/.test(pw))         s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  const map = [
    { label: 'Too short',   color: 'var(--red)',   w: 25  },
    { label: 'Weak',        color: 'var(--red)',   w: 40  },
    { label: 'Fair',        color: 'var(--amber)', w: 65  },
    { label: 'Strong',      color: 'var(--green)', w: 85  },
    { label: 'Very strong', color: 'var(--green)', w: 100 },
  ]
  return map[s] || map[0]
}

export default function RegisterForm() {
  const [form, setForm]       = useState({ name: '', email: '', password: '', role: 'Operator' })
  const [show, setShow]       = useState(false)
  const [err, setErr]         = useState('')
  const [busy, setBusy]       = useState(false)
  const [focused, setFocused] = useState('')
  const { login }             = useAuth()
  const nav                   = useNavigate()

  const pw = strengthLabel(form.password)

  const submit = async e => {
  e.preventDefault()
  setErr('')
  if (!form.name || !form.email || !form.password) { setErr('Please fill all fields.'); return }
  if (form.password.length < 8) { setErr('Password must be at least 8 characters.'); return }
  setBusy(true)
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (!res.ok) {
      setErr(data.detail || 'Registration failed.')
      return
    }
    login(data.user, data.access_token)
    nav('/dashboard')
  } catch {
    setErr('Cannot reach the backend. Make sure it is running on port 8000.')
  } finally {
    setBusy(false)
  }
}

  const field = (id, label, type, Icon, placeholder) => {
    const active = focused === id
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>{label}</label>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--bg3)',
          border: `1px solid ${active ? 'var(--cyan)' : 'var(--line)'}`,
          borderRadius: 12, padding: '0 14px',
          boxShadow: active ? '0 0 0 3px var(--cyan-dim)' : 'none',
          transition: 'all 0.2s'
        }}>
          <Icon size={16} color={active ? 'var(--cyan)' : 'var(--muted)'} style={{ flexShrink: 0 }} />
          <input
            type={id === 'password' ? (show ? 'text' : 'password') : type}
            value={form[id]}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused('')}
            placeholder={placeholder}
            style={{
              flex: 1, padding: '13px 0', border: 'none',
              outline: 'none', background: 'transparent',
              color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font)'
            }}
          />
          {id === 'password' && (
            <button type="button" onClick={() => setShow(v => !v)}
              style={{ background: 'none', border: 'none', padding: 0,
                color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {id === 'password' && form.password && (
          <div>
            <div style={{
              height: 4, borderRadius: 99, background: 'var(--line)',
              overflow: 'hidden', marginTop: 4
            }}>
              <div style={{
                height: '100%', borderRadius: 99,
                width: `${pw.w}%`, background: pw.color,
                transition: 'all 0.3s'
              }} />
            </div>
            <div style={{ fontSize: 11, color: pw.color, marginTop: 3 }}>{pw.label}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', margin: '0 auto 16px',
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 35%, #0b3a6b 100%)',
          boxShadow: '0 0 40px rgba(34,211,238,0.4)',
          animation: 'breathe 4s ease-in-out infinite'
        }} />
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          Create your account
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          Join Mission Operations Copilot
        </p>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {field('name',     'Full name', 'text',     User, 'Sneha Dhonde')}
        {field('email',    'Email',     'email',    Mail, 'you@mission.space')}
        {field('password', 'Password',  'password', Lock, 'min. 8 characters')}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)',
            display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={14} /> Role
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {ROLES.map(r => (
              <button
                key={r} type="button"
                onClick={() => setForm(f => ({ ...f, role: r }))}
                style={{
                  flex: 1, padding: '10px 8px', borderRadius: 10,
                  border: `1px solid ${form.role === r ? 'var(--cyan)' : 'var(--line)'}`,
                  background: form.role === r ? 'var(--cyan-dim)' : 'var(--bg3)',
                  color: form.role === r ? 'var(--cyan)' : 'var(--muted)',
                  fontSize: 13, fontWeight: form.role === r ? 700 : 400,
                  cursor: 'pointer', transition: 'all 0.18s',
                  fontFamily: 'var(--font)'
                }}>
                {r}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', paddingLeft: 2 }}>
            {form.role === 'Operator' && 'Can ask questions and export timelines.'}
            {form.role === 'Reviewer' && 'Can read the audit log and all sessions.'}
            {form.role === 'Viewer'   && 'Read-only access to shared investigations.'}
          </div>
        </div>

        {err && (
          <div style={{
            background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)',
            borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--red)'
          }}>
            ⚠ {err}
          </div>
        )}

        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
          By registering you agree that Orbit Oracle is advisory only and never
          issues real spacecraft commands.
        </div>

        <Button full size="lg" disabled={busy}>
          {busy ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.3)',
                borderTopColor: '#000',
                animation: 'spin 0.7s linear infinite', display: 'inline-block'
              }} />
              Creating account…
            </span>
          ) : 'Create Account'}
        </Button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: 'var(--muted)' }}>
        Already registered?{' '}
        <Link to="/login" style={{ color: 'var(--cyan)', fontWeight: 600 }}>Sign in</Link>
      </p>
    </div>
  )
}