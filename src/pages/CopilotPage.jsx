import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import ChatBox from '../components/copilot/ChatBox'
import MessageCard from '../components/copilot/MessageCard'
import LoadingPulse from '../components/copilot/LoadingPulse'
import SuggestedPrompts from '../components/copilot/SuggestedPrompts'
import OrbitalCore from '../components/copilot/OrbitalCore'

export default function CopilotPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const bottom    = useRef()
  const didInit   = useRef(false)
  const { state } = useLocation()

  const send = useCallback(async (text) => {
    if (!text?.trim() || loading) return
    setError('')
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)

    try {
      const token = localStorage.getItem('oo_token')
      const res = await fetch('/api/copilot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question: text })
      })

      if (res.status === 401) {
        setError('Session expired. Please log in again.')
        setLoading(false)
        return
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || `Server error ${res.status}`)
      }

      const data = await res.json()
      setMessages(m => [...m, { role: 'ai', content: text, data }])
    } catch (e) {
      setError(e.message || 'Could not reach the backend.')
      setMessages(m => [...m, {
        role: 'ai',
        content: text,
        data: {
          title: 'Connection error — could not reach the backend.',
          confidence: 0,
          obs: [{ text: `Error: ${e.message}`, cites: [], sources: [] }],
          rec: [{ text: 'Make sure the backend is running on port 8000.', cites: [], sources: [] }],
          insights: ['Check that uvicorn main:app --reload --port 8000 is running in your backend terminal.'],
          timeline: []
        }
      }])
    } finally {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    if (state?.q && !didInit.current) {
      didInit.current = true
      send(state.q)
    }
  }, [send, state])

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const empty = messages.length === 0 && !loading

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 18,
        paddingBottom: 20, borderBottom: '1px solid var(--line)',
        marginBottom: 24, flexShrink: 0
      }}>
        <OrbitalCore size="md" busy={loading} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontFamily: 'var(--mono)', color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 4 }}>
            ST-10 · MISSION OPERATIONS
          </div>
          <div style={{ fontWeight: 700, fontSize: 20 }}>Orbit Oracle Copilot</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 3 }}>
            Advisory · Evidence-grounded · Never commands spacecraft
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: loading ? 'var(--amber)' : 'var(--green)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: loading ? 'var(--amber)' : 'var(--green)', display: 'inline-block', animation: 'ping 2s infinite' }} />
            {loading ? 'Processing…' : 'Online'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>4 sources indexed</div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          background: 'rgba(248,113,113,0.1)', border: '1px solid var(--red)',
          borderRadius: 10, padding: '10px 16px', marginBottom: 14,
          fontSize: 13, color: 'var(--red)', flexShrink: 0
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Feed */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {empty && (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 0 40px', gap: 20 }}>
              <OrbitalCore size="lg" busy={false} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>What is the spacecraft telling us?</div>
                <div style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 420 }}>
                  Ask in plain English. Evidence is shown for every claim.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Mission logs', 'Telemetry summaries', 'Procedures', 'Incident history'].map(s => (
                  <span key={s} style={{ padding: '4px 12px', borderRadius: 99, border: '1px solid var(--line)', background: 'var(--bg2)', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{s}</span>
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
          Enter to send · Shift+Enter for new line · Advisory only · Always verify sources
        </div>
      </div>
    </div>
  )
}