import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', textAlign:'center', gap:16 }}>
      <div style={{ fontSize:72, fontWeight:700, color:'var(--line)' }}>404</div>
      <h2 style={{ fontSize:22, fontWeight:700 }}>Page not found</h2>
      <p style={{ color:'var(--muted)' }}>This sector is outside our mission boundary.</p>
      <Button onClick={() => nav('/dashboard')}>Return to Dashboard</Button>
    </div>
  )
}