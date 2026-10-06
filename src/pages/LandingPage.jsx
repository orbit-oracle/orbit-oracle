import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    icon: '🛰',
    title: 'Evidence-first answers',
    desc: 'Every response is built strictly from mission logs, telemetry, procedures and incident history. Nothing is invented.',
  },
  {
    icon: '📡',
    title: 'OBSERVED vs RECOMMENDED',
    desc: 'The copilot separates what the data shows from what to check next — so operators never confuse fact with suggestion.',
  },
  {
    icon: '🔗',
    title: 'Citation verifier',
    desc: 'Every claim cites a source ID. Click any citation to read the original excerpt it was drawn from.',
  },
  {
    icon: '⏱',
    title: 'Auto-built timeline',
    desc: 'Events are extracted and sorted by UTC time automatically, giving operators a chronological view of any incident.',
  },
  {
    icon: '📋',
    title: 'Full audit log',
    desc: 'Every question, answer, confidence score and source count is saved. Any session can be replayed for review.',
  },
  {
    icon: '🚫',
    title: 'Advisory only',
    desc: 'Orbit Oracle never issues or suggests spacecraft commands. It is a decision support tool, not an autonomous agent.',
  },
]

const STATS = [
  { value: '100%', label: 'Evidence-grounded', sub: 'No hallucinated answers' },
  { value: '<3s',  label: 'Response time',     sub: 'From question to cited answer' },
  { value: '4',    label: 'Source types',       sub: 'Logs · Telemetry · Procedures · Incidents' },
  { value: '0',    label: 'Unsourced claims',   sub: 'Every statement has a citation' },
]

const DEMO_MSGS = [
  { role: 'user', text: 'Why did the battery bus voltage drop at 14:32 UTC?' },
  { role: 'ai',   text: 'Bus voltage fell from 28.1 V to 26.4 V at 14:32 UTC — one minute after solar array current dropped below threshold on string B.', cites: ['T-17', 'LOG-2291'] },
  { role: 'user', text: 'What procedure applies?' },
  { role: 'ai',   text: 'EPS-07 applies. Step 1: confirm battery state of charge. Step 2: check solar array pointing and sun sensor reading.', cites: ['EPS-07'] },
]

export default function LandingPage() {
  const nav = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 32px', borderBottom: '1px solid var(--line)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(3,5,11,0.85)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 35%, #0b3a6b 100%)',
            boxShadow: '0 0 20px rgba(34,211,238,0.4)',
          }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Orbit Oracle</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => nav('/login')} style={{
            background: 'transparent', border: '1px solid var(--line)',
            borderRadius: 10, padding: '8px 18px', color: 'var(--muted)',
            fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cyan)'; e.currentTarget.style.color = 'var(--cyan)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--muted)' }}>
            Sign In
          </button>
          <button onClick={() => nav('/register')} style={{
            background: 'var(--cyan)', border: 'none',
            borderRadius: 10, padding: '8px 18px', color: '#03050b',
            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--font)',
          }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '92vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 60px', textAlign: 'center', position: 'relative',
      }}>
        {/* background grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />
        {/* glow blob */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Orb */}
          <div style={{ position: 'relative', width: 110, height: 110, margin: '0 auto 36px' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(34,211,238,0.3)', animation: 'spin 18s linear infinite' }} />
            <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', border: '1px dashed rgba(251,191,36,0.25)', animation: 'spin 28s linear infinite reverse' }} />
            <div style={{ position: 'absolute', inset: 18, borderRadius: '50%', border: '1px solid rgba(34,211,238,0.15)', animation: 'spin 12s linear infinite' }} />
            <div style={{
              position: 'absolute', inset: 26, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 30%, #0b3a6b 100%)',
              boxShadow: '0 0 60px rgba(34,211,238,0.5)',
              animation: 'breathe 4s ease-in-out infinite',
            }} />
          </div>

          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: 20 }}>
            TECHFEST 2026-27 · ST-10 · AI + HUMAN-MACHINE INTERACTION
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700,
            lineHeight: 1.1, marginBottom: 22, maxWidth: 740,
            letterSpacing: '-0.02em',
          }}>
            Your spacecraft is talking.<br />
            <span style={{ color: 'var(--cyan)' }}>Orbit Oracle</span> translates.
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            A mission operations copilot that answers only from evidence —
            logs, telemetry, procedures and incident history. No guesses. No hallucinations.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
            <button onClick={() => nav('/register')} style={{
              background: 'var(--cyan)', border: 'none', borderRadius: 12,
              padding: '14px 32px', fontSize: 16, fontWeight: 700,
              color: '#03050b', cursor: 'pointer', fontFamily: 'var(--font)',
              boxShadow: '0 0 40px rgba(34,211,238,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 60px rgba(34,211,238,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(34,211,238,0.3)'}>
              Start investigating →
            </button>
            <button onClick={() => nav('/login')} style={{
              background: 'transparent', border: '1px solid var(--line)',
              borderRadius: 12, padding: '14px 32px', fontSize: 16,
              color: 'var(--text)', cursor: 'pointer', fontFamily: 'var(--font)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
              Sign in
            </button>
          </div>

          {/* Demo chat preview */}
          <div style={{
            maxWidth: 580, margin: '0 auto',
            background: 'var(--bg2)', border: '1px solid var(--line)',
            borderRadius: 18, padding: '20px 24px',
            boxShadow: '0 0 0 1px var(--cyan-dim), 0 32px 80px -20px rgba(34,211,238,0.1)',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', animation: 'ping 2s infinite' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>ORBIT ORACLE · LIVE DEMO PREVIEW</span>
            </div>
            {DEMO_MSGS.map((m, i) => (
              <div key={i} style={{
                marginBottom: 12,
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '85%',
                  background: m.role === 'user' ? 'var(--bg3)' : 'rgba(34,211,238,0.06)',
                  border: `1px solid ${m.role === 'user' ? 'var(--line)' : 'rgba(34,211,238,0.2)'}`,
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  padding: '10px 14px',
                }}>
                  <p style={{ fontSize: 13, lineHeight: 1.55, margin: 0, color: 'var(--text)' }}>{m.text}</p>
                  {m.cites && (
                    <div style={{ display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' }}>
                      {m.cites.map(c => (
                        <span key={c} style={{
                          fontFamily: 'var(--mono)', fontSize: 10, padding: '2px 7px',
                          borderRadius: 5, background: 'var(--cyan-dim)',
                          border: '1px solid var(--cyan)', color: 'var(--cyan)', fontWeight: 700,
                        }}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{
        padding: '60px 24px',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg2)',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {STATS.map(s => (
            <div key={s.value}>
              <div style={{ fontSize: 42, fontWeight: 700, color: 'var(--cyan)', lineHeight: 1, marginBottom: 8 }}>
                {s.value}
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 16 }}>
          HOW IT WORKS
        </div>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, marginBottom: 48, letterSpacing: '-0.01em' }}>
          Ask in plain English. Get evidence.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {[
            { step: '01', title: 'You ask a question', desc: 'Type any question about a subsystem, time window or alert in plain English.' },
            { step: '02', title: 'Evidence is retrieved', desc: 'ChromaDB searches logs, telemetry, procedures and incidents for the most relevant items.' },
            { step: '03', title: 'AI reads only that', desc: 'The AI reads only the retrieved evidence — it has no access to outside knowledge.' },
            { step: '04', title: 'Cited answer returned', desc: 'Every claim in the response links back to the source that supports it.' },
          ].map(s => (
            <div key={s.step} style={{
              background: 'var(--bg2)', border: '1px solid var(--line)',
              borderRadius: 16, padding: '24px 20px', textAlign: 'left',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 700, color: 'var(--cyan)', opacity: 0.4, marginBottom: 14, lineHeight: 1 }}>
                {s.step}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 16 }}>
              CAPABILITIES
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Built for mission operations
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{
                background: 'var(--bg3)', border: '1px solid var(--line)',
                borderRadius: 16, padding: '22px 22px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        borderTop: '1px solid var(--line)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Ready to listen to your spacecraft?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.65 }}>
            Register in seconds. No configuration needed. Start asking questions immediately.
          </p>
          <button onClick={() => nav('/register')} style={{
            background: 'var(--cyan)', border: 'none', borderRadius: 12,
            padding: '16px 40px', fontSize: 17, fontWeight: 700,
            color: '#03050b', cursor: 'pointer', fontFamily: 'var(--font)',
            boxShadow: '0 0 50px rgba(34,211,238,0.35)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 70px rgba(34,211,238,0.55)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.35)'}>
            Create free account →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid var(--line)', padding: '24px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
        fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)',
      }}>
        <span>Orbit Oracle · ST-10 · TechFest 2026-27</span>
        <span>Advisory only · Evidence-grounded · Never commands spacecraft</span>
      </footer>

    </div>
  )
}