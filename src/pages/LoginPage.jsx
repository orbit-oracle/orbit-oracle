import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [err, setErr]   = useState('')
  const [busy, setBusy] = useState(false)
  const { login }       = useAuth()
  const nav             = useNavigate()

  const submit = async e => {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      // Demo login — replace with real API call
      if (form.email && form.password) {
        login({ name: form.email.split('@')[0], email: form.email, role: 'Operator' }, 'demo-token')
        nav('/dashboard')
      } else setErr('Please fill all fields.')
    } catch { setErr('Login failed. Please try again.') }
    finally { setBusy(false) }
  }

  const inp = {
    width:'100%', padding:'12px 16px', borderRadius:12,
    border:'1px solid var(--line)', background:'var(--bg3)',
    color:'var(--text)', fontSize:15, fontFamily:'var(--font)', outline:'none'
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', margin:'0 auto 14px',
            background:'radial-gradient(circle at 35% 30%,#fff 0,var(--cyan) 30%,#0b3a6b 100%)',
            boxShadow:'0 0 30px rgba(34,211,238,.35)' }}/>
          <h2 style={{ fontSize:24, fontWeight:700 }}>Sign in to Orbit Oracle</h2>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Mission Operations Copilot</p>
        </div>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Email</label>
            <input style={inp} type="email" value={form.email}
              onChange={e => setForm(f => ({...f, email:e.target.value}))}
              placeholder="operator@mission.space" />
          </div>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Password</label>
            <input style={inp} type="password" value={form.password}
              onChange={e => setForm(f => ({...f, password:e.target.value}))}
              placeholder="••••••••" />
          </div>
          {err && <div style={{ color:'var(--red)', fontSize:13 }}>{err}</div>}
          <Button full size="lg" disabled={busy}>{busy ? 'Signing in…' : 'Sign In'}</Button>
        </form>

        <p style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
          No account? <Link to="/register" style={{ color:'var(--cyan)' }}>Register</Link>
        </p>
        <p style={{ textAlign:'center', marginTop:28, fontSize:12, color:'var(--line)' }}>
          Advisory only · Never commands spacecraft
        </p>
      </div>
    </div>
  )
}