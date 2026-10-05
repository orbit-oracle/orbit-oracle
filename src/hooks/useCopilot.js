import { useState, useCallback, useRef } from 'react'

// Sample demo data — replace body of askCopilot with real API call
const DEMO_RESPONSES = {
  bat: {
    conf: 91,
    title: 'Most likely cause: solar array produced less current, voltage dipped a minute later.',
    obs: [
      { text: 'Bus voltage fell from 28.1 V to 26.4 V at 14:32 UTC.', cites: ['T-17'],
        sources: [{ id:'T-17', type:'telemetry', time:'14:32 UTC', title:'Bus voltage summary', excerpt:'28.1 V at 14:30, 26.4 V at 14:32 UTC (nominal 27.5–28.5 V).' }] },
      { text: 'Solar array current dropped at 14:31 UTC, one minute earlier.', cites: ['LOG-4521'],
        sources: [{ id:'LOG-4521', type:'log', time:'14:31 UTC', title:'Array current event', excerpt:'Solar array current below threshold on panel string B.' }] },
    ],
    rec: [
      { text: 'Check solar array pointing and sun sensor first.', cites: ['EPS-07'],
        sources: [{ id:'EPS-07', type:'procedure', time:'—', title:'EPS-07 Low bus voltage', excerpt:'Step 1 check array pointing. Step 2 check sun sensor. Step 3 shed non-critical loads.' }] },
    ],
    insights: [
      'Array current changed before voltage — array is the likely trigger.',
      '82% similarity match with incident INC-2024-09.',
      'No thermal anomaly found in the same window.',
    ],
    timeline: [
      { time: '14:31', event: 'Array current drops',     source: 'LOG-4521' },
      { time: '14:32', event: 'Bus voltage dips',        source: 'T-17'     },
      { time: '14:35', event: 'Alert raised',            source: 'LOG-4533' },
      { time: '14:40', event: 'Procedure EPS-07 started',source: 'EPS-07'   },
    ],
  },
  none: {
    conf: 12,
    title: 'Insufficient evidence to answer this reliably.',
    obs: [{ text: 'No log, telemetry, procedure or incident item matched this question closely.', cites: [] }],
    rec: [{ text: 'Try a subsystem name, a time window or an alert code, for example: battery voltage at 14:32 UTC.', cites: [] }],
    insights: ['Nothing was invented. When evidence is missing, the copilot says so.'],
    timeline: [],
  },
}

const pickDemo = q =>
  /batter|volt|power|eps|bus|solar/i.test(q) ? 'bat' : 'none'

export function useCopilot() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const abortRef                = useRef(null)

  const askCopilot = useCallback(async (question) => {
    if (!question.trim() || loading) return

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: question }])
    setLoading(true)
    setError(null)

    try {
      // ----- REAL API CALL (uncomment when backend is ready) -----
      // abortRef.current = new AbortController()
      // const res = await fetch('/api/copilot/ask', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('oo_token')}`
      //   },
      //   body: JSON.stringify({ question }),
      //   signal: abortRef.current.signal
      // })
      // if (!res.ok) throw new Error(`Server error ${res.status}`)
      // const data = await res.json()
      // -----------------------------------------------------------

      // Demo delay + response
      await new Promise(r => setTimeout(r, 3200))
      const data = DEMO_RESPONSES[pickDemo(question)]

      setMessages(prev => [...prev, { role: 'ai', content: question, data }])
    } catch (e) {
      if (e.name === 'AbortError') return
      setError('Could not reach the copilot. Check your connection and try again.')
      setMessages(prev => [...prev, {
        role: 'ai',
        content: question,
        data: {
          conf: 0,
          title: 'Connection error. Could not retrieve evidence.',
          obs: [{ text: 'The server did not respond.', cites: [] }],
          rec: [{ text: 'Check your connection and try again.', cites: [] }],
          insights: [],
          timeline: [],
        }
      }])
    } finally {
      setLoading(false)
    }
  }, [loading])

  const cancelRequest = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return {
    messages,
    loading,
    error,
    askCopilot,
    cancelRequest,
    clearMessages,
  }
}