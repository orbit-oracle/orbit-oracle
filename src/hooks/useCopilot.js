import { useState, useCallback, useRef } from 'react'

export function useCopilot() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const abortRef                = useRef(null)

  const askCopilot = useCallback(async (question) => {
    if (!question.trim() || loading) return

    setMessages(prev => [...prev, { role: 'user', content: question }])
    setLoading(true)
    setError(null)

    try {
      abortRef.current = new AbortController()
      const res = await fetch('/api/copilot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('oo_token')}`
        },
        body: JSON.stringify({ question }),
        signal: abortRef.current.signal
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()

      if (data.timeline && data.timeline.length > 0) {
        localStorage.setItem('oo_last_timeline', JSON.stringify(data.timeline))
      }

      setMessages(prev => [...prev, { role: 'ai', content: question, data }])

    }  
    catch (e) {
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

  return { messages, loading, error, askCopilot, cancelRequest, clearMessages }
}