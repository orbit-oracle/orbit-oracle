import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authAPI } from '../../services/api'
import Button from '../ui/Button'
import { Eye, EyeOff, Mail, Lock, Satellite } from 'lucide-react'

export default function LoginForm() {
  const [form, setForm]       = useState({ email: '', password: '' })
  const [show, setShow]       = useState(false)
  const [err, setErr]         = useState('')
  const [busy, setBusy]       = useState(false)
  const [focused, setFocused] = useState('')
  const { login }             = useAuth()
  const nav                   = useNavigate()

  const submit = async e => {
  e.preventDefault()
  setErr('')
  if (!form.email || !form.password) { setErr('Please fill all fields.'); return }
  setBusy(true)
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })
    const data = await res.json()
    if (!res.ok) {
      setErr(data.detail || 'Invalid credentials.')
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
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>
          {label}
        </label>
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
              color: 'var(--text)', fontSize: 15,
              fontFamily: 'var(--font)'
            }}
          />
          {id === 'password' && (
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              style={{ background: 'none', border: 'none', padding: 0,
                color: 'var(--muted)', cursor: 'pointer', display: 'flex' }}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          margin: '0 auto 16px',
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 35%, #0b3a6b 100%)',
          boxShadow: '0 0 40px rgba(34,211,238,0.4)',
          animation: 'breathe 4s ease-in-out infinite'
        }} />
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          Sign in to Orbit Oracle
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          Mission Operations Copilot · ST-10
        </p>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {field('email',    'Email address', 'email',    Mail, 'operator@mission.space')}
        {field('password', 'Password',      'password', Lock, '••••••••')}

        {err && (
          <div style={{
            background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)',
            borderRadius: 10, padding: '10px 14px', fontSize: 13,
            color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8
          }}>
            ⚠ {err}
          </div>
        )}

        <div style={{ textAlign: 'right', marginTop: -6 }}>
          <span style={{ fontSize: 13, color: 'var(--cyan)', cursor: 'pointer' }}>
            Forgot password?
          </span>
        </div>

        <Button full size="lg" disabled={busy}>
          {busy ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.3)',
                borderTopColor: '#000',
                animation: 'spin 0.7s linear infinite',
                display: 'inline-block'
              }} />
              Signing in…
            </span>
          ) : 'Sign In'}
        </Button>
      </form>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        margin: '24px 0', color: 'var(--muted)', fontSize: 13
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        or continue with
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>

      <button
        type="button"
        onClick={() => setForm({ email: 'demo@mission.space', password: 'demo1234' })}
        style={{
          width: '100%', padding: '12px', borderRadius: 12,
          border: '1px solid var(--line)', background: 'var(--bg3)',
          color: 'var(--text)', fontSize: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'border-color 0.2s', fontFamily: 'var(--font)'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
      >
        <Satellite size={16} color="var(--cyan)" />
        Fill demo credentials
      </button>

      <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--muted)' }}>
        No account?{' '}
        <Link to="/register" style={{ color: 'var(--cyan)', fontWeight: 600 }}>
          Register
        </Link>
      </p>

      <div style={{
        marginTop: 32, padding: '10px 14px',
        border: '1px solid var(--line)', borderRadius: 10,
        fontSize: 12, color: 'var(--muted)', textAlign: 'center',
        lineHeight: 1.6
      }}>
        🛡 Advisory only · Evidence-grounded · Never commands spacecraft
      </div>
    </div>
  )
}