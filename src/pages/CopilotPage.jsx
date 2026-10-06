import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import ChatBox from '../components/copilot/ChatBox'
import MessageCard from '../components/copilot/MessageCard'
import LoadingPulse from '../components/copilot/LoadingPulse'
import SuggestedPrompts from '../components/copilot/SuggestedPrompts'
import OrbitalCore from '../components/copilot/OrbitalCore'

const DEMO = {
  bat: {
    conf: 91,
    title: 'Most likely cause: solar array produced less current, voltage dipped a minute later.',
    obs: [
      {
        text: 'Bus voltage fell from 28.1 V to 26.4 V at 14:32 UTC.',
        cites: ['T-17'],
        sources: [{ id: 'T-17', type: 'telemetry', time: '14:32 UTC', title: 'Bus voltage summary', excerpt: '28.1 V at 14:30, 26.4 V at 14:32 UTC (nominal 27.5–28.5 V).' }]
      },
      {
        text: 'Solar array current dropped at 14:31 UTC, one minute earlier.',
        cites: ['LOG-4521'],
        sources: [{ id: 'LOG-4521', type: 'log', time: '14:31 UTC', title: 'Array current event', excerpt: 'Solar array current below threshold on panel string B.' }]
      },
    ],
    rec: [
      {
        text: 'Check solar array pointing and sun sensor first.',
        cites: ['EPS-07'],
        sources: [{ id: 'EPS-07', type: 'procedure', time: '—', title: 'EPS-07 Low bus voltage', excerpt: 'Step 1 check array pointing. Step 2 check sun sensor. Step 3 shed non-critical loads.' }]
      },
    ],
    insights: [
      'Array current changed before voltage — array is the likely trigger.',
      '82% similarity match with incident INC-2024-09.',
      'No thermal anomaly found in same window.',
    ],
    timeline: [
      { time: '14:31', event: 'Array current drops',       source: 'LOG-4521' },
      { time: '14:32', event: 'Bus voltage dips',          source: 'T-17'     },
      { time: '14:35', event: 'Alert raised',              source: 'LOG-4533' },
      { time: '14:40', event: 'Procedure EPS-07 started',  source: 'EPS-07'   },
    ],
  },
  none: {
    conf: 12,
    title: 'Insufficient evidence to answer this reliably.',
    obs: [{ text: 'No log, telemetry, procedure or incident item matched this question closely.', cites: [] }],
    rec: [{ text: 'Try a subsystem name, a time window or an alert code — for example: battery voltage at 14:32 UTC.', cites: [] }],
    insights: ['Nothing was invented. When evidence is missing, the copilot says so.'],
    timeline: [],
  },
}

const pick = q =>
  /batter|volt|power|eps|bus|solar/i.test(q) ? 'bat' : 'none'

export default function CopilotPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)
  const bottom    = useRef()
  const didInit   = useRef(false)           // ✅ tracks first-run without effect
  const { state } = useLocation()

  // ✅ useCallback so send is stable across renders
  const send = useCallback(async (text) => {
    if (!text?.trim() || loading) return
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)
    await new Promise(r => setTimeout(r, 3200))
    const data = DEMO[pick(text)]
    setMessages(m => [...m, { role: 'ai', content: text, data }])
    setLoading(false)
  }, [loading])

  // ✅ scroll only — no setState here, no ESLint warning
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // ✅ handle deep-link prompt from InsightCards using a ref guard
  // this runs once; the ref prevents double-firing in React strict mode
  useEffect(() => {
    if (state?.q && !didInit.current) {
      didInit.current = true
      send(state.q)
    }
  }, [send, state])

  const empty = messages.length === 0 && !loading

  return (
    <div className="copilot-wrap">


      {/* Header */}
<div className="copilot-head" style={{
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  paddingBottom: 20,
  borderBottom: '1px solid var(--line)',
  marginBottom: 24,
  flexShrink: 0,
}}>
  <OrbitalCore size="md" busy={loading} />

  <div style={{ flex: 1 }}>
    <div style={{
      fontSize: 12,
      fontFamily: 'var(--mono)',
      color: 'var(--cyan)',
      letterSpacing: '0.1em',
      marginBottom: 4,
    }}>
      ST-10 · MISSION OPERATIONS
    </div>
    <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.2 }}>
      Orbit Oracle Copilot
    </div>
    <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
      Advisory · Evidence-grounded · Never commands spacecraft
    </div>
  </div>

  <div className="hide-mobile" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--green)',
    }}>
      <span style={{
        position: 'relative',
        width: 8,
        height: 8,
        display: 'inline-flex',
      }}>
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'var(--green)',
          animation: 'ping 2s ease-out infinite',
          opacity: 0.6,
        }} />
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--green)',
          display: 'inline-block',
        }} />
      </span>
      Online
    </div>
    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
      4 sources indexed
    </div>
  </div>
</div>
      

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
       {empty && (
  <div style={{ animation: 'fadeUp 0.4s ease' }}>
    {/* Large orbital planet centrepiece */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0 40px',
      gap: 20,
    }}>
      <OrbitalCore size="lg" busy={false} />
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 8,
        }}>
          What is the spacecraft telling us?
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 420 }}>
          Ask in plain English. Orbit Oracle searches logs, telemetry,
          procedures and incidents — answering only from evidence.
        </div>
      </div>

      {/* Live status chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          'Mission logs',
          'Telemetry summaries',
          'Procedures',
          'Incident history',
        ].map(s => (
          <span key={s} style={{
            padding: '4px 12px',
            borderRadius: 99,
            border: '1px solid var(--line)',
            background: 'var(--bg2)',
            fontSize: 12,
            color: 'var(--muted)',
            fontFamily: 'var(--mono)',
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>

    <SuggestedPrompts onSelect={send} />
  </div>
)}
        {messages.map((m, i) => <MessageCard key={i} msg={m} />)}
        {loading && <LoadingPulse />}
        <div ref={bottom} />
      </div>

      {/* Input */}
      <div style={{ paddingTop: 14, flexShrink: 0 }}>
        <ChatBox onSend={send} loading={loading} />
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>
          Enter to send · Shift+Enter for new line · Sample data · Always verify sources
        </div>
      </div>
    </div>
  )
}