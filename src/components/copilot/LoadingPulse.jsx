const steps = [
  'Searching mission logs…',
  'Reading telemetry summaries…',
  'Matching procedures and incidents…',
  'Verifying every citation…',
]

import { useState, useEffect } from 'react'

export default function LoadingPulse() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 800)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--line)',
      borderRadius: 16, padding: 24, animation: 'fadeUp 0.35s ease'
    }}>
      {/* Animated orb */}
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
        <div style={{ position:'relative', width:42, height:42, flexShrink:0 }}>
          <div style={{
            position:'absolute', inset:0, borderRadius:'50%',
            border:'1.5px solid var(--cyan)', opacity:.5,
            animation:'spin 2s linear infinite'
          }}/>
          <div style={{
            position:'absolute', inset:6, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 30%,#fff 0,var(--cyan) 30%,#0b3a6b 100%)',
            boxShadow:'0 0 16px var(--cyan-dim)', animation:'breathe 1.2s ease-in-out infinite'
          }}/>
        </div>
        <div>
          <div style={{ fontWeight:700, marginBottom:3 }}>Orbit Oracle is working</div>
          <div style={{ fontSize:13, color:'var(--muted)' }}>
            {steps[step]}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
            <div style={{
              width:16, height:16, borderRadius:'50%', flexShrink:0,
              background: i < step ? 'var(--green)' : i === step ? 'transparent' : 'transparent',
              border: i < step ? 'none' : i === step
                ? '2px solid var(--cyan)' : '2px solid var(--line)',
              borderTopColor: i === step ? 'transparent' : undefined,
              animation: i === step ? 'spin 0.8s linear infinite' : 'none',
              display:'flex', alignItems:'center', justifyContent:'center'
            }}>
              {i < step && <span style={{ fontSize:9, color:'#000' }}>✓</span>}
            </div>
            <span style={{ color: i <= step ? 'var(--text)' : 'var(--muted)' }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Shimmer bars */}
      <div style={{ marginTop:16, display:'flex', flexDirection:'column', gap:8 }}>
        {[90,70,55].map(w => (
          <div key={w} style={{
            height:10, borderRadius:6, width:`${w}%`,
            background:'linear-gradient(90deg,var(--bg3) 25%,var(--line) 50%,var(--bg3) 75%)',
            backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite'
          }}/>
        ))}
      </div>
      <style>{`@keyframes shimmer{to{background-position:-200% 0}}`}</style>
    </div>
  )
}