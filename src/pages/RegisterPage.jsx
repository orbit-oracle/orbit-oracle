import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'

export default function RegisterPage() {
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'Operator' })
  const [err, setErr]   = useState('')
  const [busy, setBusy] = useState(false)
  const { login }       = useAuth()
  const nav             = useNavigate()

  const submit = async e => {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      if (form.name && form.email && form.password) {
        login({ name: form.name, email: form.email, role: form.role }, 'demo-token')
        nav('/dashboard')
      } else setErr('Please fill all fields.')
    } catch { setErr('Registration failed.') }
    finally { setBusy(false) }
  }

  const inp = {
    width:'100%', padding:'12px 16px', borderRadius:12,
    border:'1px solid var(--line)', background:'var(--bg3)',
    color:'var(--text)', fontSize:15, fontFamily:'var(--font)', outline:'none'
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', margin:'0 auto 14px',
            background:'radial-gradient(circle at 35% 30%,#fff 0,var(--cyan) 30%,#0b3a6b 100%)',
            boxShadow:'0 0 30px rgba(34,211,238,.35)' }}/>
          <h2 style={{ fontSize:24, fontWeight:700 }}>Create your account</h2>
          <p style={{ color:'var(--muted)', marginTop:6 }}>Join Mission Operations Copilot</p>
        </div>

        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Full Name</label>
            <input style={inp} value={form.name}
              onChange={e => setForm(f => ({...f, name:e.target.value}))} placeholder="Sneha Dhonde" />
          </div>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Email</label>
            <input style={inp} type="email" value={form.email}
              onChange={e => setForm(f => ({...f, email:e.target.value}))} placeholder="you@mission.space" />
          </div>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Password</label>
            <input style={inp} type="password" value={form.password}
              onChange={e => setForm(f => ({...f, password:e.target.value}))} placeholder="••••••••" />
          </div>
          <div>
            <label style={{ fontSize:13, color:'var(--muted)', display:'block', marginBottom:6 }}>Role</label>
            <select style={{...inp, cursor:'pointer'}} value={form.role}
              onChange={e => setForm(f => ({...f, role:e.target.value}))}>
              <option>Operator</option>
              <option>Reviewer</option>
              <option>Viewer</option>
            </select>
          </div>
          {err && <div style={{ color:'var(--red)', fontSize:13 }}>{err}</div>}
          <Button full size="lg" disabled={busy}>{busy ? 'Creating account…' : 'Create Account'}</Button>
        </form>

        <p style={{ textAlign:'center', marginTop:20, fontSize:13, color:'var(--muted)' }}>
          Already registered? <Link to="/login" style={{ color:'var(--cyan)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}