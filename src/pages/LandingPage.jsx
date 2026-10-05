import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function LandingPage() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', textAlign:'center' }}>
      {/* Orb */}
      <div style={{ position:'relative', width:120, height:120, margin:'0 auto 32px' }}>
        <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1.5px solid var(--cyan)', opacity:.4, animation:'spin 18s linear infinite' }}/>
        <div style={{ position:'absolute', inset:10, borderRadius:'50%', border:'1.5px dashed var(--amber)', opacity:.4, animation:'spin 26s linear infinite reverse' }}/>
        <div style={{ position:'absolute', inset:22, borderRadius:'50%',
          background:'radial-gradient(circle at 35% 30%,#fff 0,var(--cyan) 30%,#0b3a6b 100%)',
          boxShadow:'0 0 60px rgba(34,211,238,.4)', animation:'breathe 4s ease-in-out infinite' }}/>
      </div>

      <div style={{ fontFamily:'var(--mono)', fontSize:12, color:'var(--cyan)', letterSpacing:'0.12em', marginBottom:14 }}>
        TECHFEST 2026-27 · ST-10 · AI + HUMAN-MACHINE INTERACTION
      </div>
      <h1 style={{ fontSize:'clamp(32px,6vw,56px)', fontWeight:700, lineHeight:1.15, marginBottom:16, maxWidth:680 }}>
        Mission Operations<br/>
        <span style={{ color:'var(--cyan)' }}>Copilot</span> with Evidence-<br/>
        Grounded Decisions
      </h1>
      <p style={{ color:'var(--muted)', fontSize:17, maxWidth:520, marginBottom:36, lineHeight:1.65 }}>
        An operator assistant that queries mission logs, telemetry summaries,
        procedures and incident history — answering only from evidence,
        never from guesses.
      </p>

      <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginBottom:56 }}>
        <Button size="lg" onClick={() => nav('/register')}>Get Started</Button>
        <Button size="lg" variant="ghost" onClick={() => nav('/login')}>Sign In</Button>
      </div>

      {/* Feature chips */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', maxWidth:620 }}>
        {['Evidence-first answers','OBSERVED vs RECOMMENDED','Citation verifier','Auditable timeline','Advisory only — never commands'].map(f => (
          <span key={f} style={{
            background:'var(--bg2)', border:'1px solid var(--line)',
            borderRadius:99, padding:'6px 14px', fontSize:13
          }}>{f}</span>
        ))}
      </div>
    </div>
  )
}