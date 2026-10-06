import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ChatBox from '../components/copilot/ChatBox'
import MessageCard from '../components/copilot/MessageCard'
import LoadingPulse from '../components/copilot/LoadingPulse'
import SuggestedPrompts from '../components/copilot/SuggestedPrompts'
import OrbitalCore from '../components/copilot/OrbitalCore'
import { useCopilot } from '../hooks/useCopilot'

export default function CopilotPage() {
  const { messages, loading, askCopilot } = useCopilot()
  const bottom  = useRef()
  const didInit = useRef(false)
  const { state } = useLocation()

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (state?.q && !didInit.current) {
      didInit.current = true
      askCopilot(state.q)
    }
  }, [askCopilot, state])

  const empty = messages.length === 0 && !loading

  return (
    <div className="copilot-wrap">

      {/* Header */}
      <div className="copilot-head" style={{
        display: 'flex', alignItems: 'center', gap: 18,
        paddingBottom: 20, borderBottom: '1px solid var(--line)',
        marginBottom: 24, flexShrink: 0,
      }}>
        <OrbitalCore size="md" busy={loading} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 4 }}>
            ST-10 · MISSION OPERATIONS
          </div>
          <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.2 }}>Orbit Oracle Copilot</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
            Advisory · Evidence-grounded · Never commands spacecraft
          </div>
        </div>
        <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--green)' }}>
            <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-flex' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--green)', animation: 'ping 2s ease-out infinite', opacity: 0.6 }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
            </span>
            Online
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>4 sources indexed</div>
        </div>
      </div>

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {empty && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0 40px', gap: 20 }}>
              <OrbitalCore size="lg" busy={false} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>What is the spacecraft telling us?</div>
                <div style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 420 }}>
                  Ask in plain English. Orbit Oracle searches logs, telemetry, procedures and incidents — answering only from evidence.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Mission logs', 'Telemetry summaries', 'Procedures', 'Incident history'].map(s => (
                  <span key={s} style={{
                    padding: '4px 12px', borderRadius: 99,
                    border: '1px solid var(--line)', background: 'var(--bg2)',
                    fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <SuggestedPrompts onSelect={askCopilot} />
          </div>
        )}
        {messages.map((m, i) => <MessageCard key={i} msg={m} />)}
        {loading && <LoadingPulse />}
        <div ref={bottom} />
      </div>

      {/* Input */}
      <div style={{ paddingTop: 14, flexShrink: 0 }}>
        <ChatBox onSend={askCopilot} loading={loading} />
        <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>
          Enter to send · Shift+Enter for new line · Always verify sources
        </div>
      </div>
    </div>
  )
}