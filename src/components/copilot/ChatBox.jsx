import { useState, useRef } from 'react'       //useEffect 
import { Send } from 'lucide-react'

export default function ChatBox({ onSend, loading }) {
  const [text, setText] = useState('')
  const ref = useRef()

  const submit = () => {
    if (!text.trim() || loading) return
    onSend(text.trim())
    setText('')
    ref.current.style.height = 'auto'
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
  }

  const onInput = e => {
    setText(e.target.value)
    ref.current.style.height = 'auto'
    ref.current.style.height = Math.min(ref.current.scrollHeight, 150) + 'px'
  }

  return (
    <div style={{
      display:'flex', gap:10, alignItems:'flex-end',
      background:'var(--bg2)', border:`1px solid ${loading?'var(--line)':'var(--cyan)'}`,
      borderRadius:18, padding:'10px 10px 10px 18px',
      boxShadow: loading ? 'none' : '0 0 30px -8px var(--cyan-dim)',
      transition:'all 0.25s'
    }}>
      <textarea
        ref={ref}
        rows={1}
        value={text}
        onChange={onInput}
        onKeyDown={onKey}
        disabled={loading}
        placeholder="Ask about an anomaly, a subsystem or a time window…"
        style={{
          flex:1, resize:'none', border:'none', outline:'none',
          background:'transparent', color:'var(--text)',
          fontSize:15, lineHeight:1.55, maxHeight:150,
          fontFamily:'var(--font)',
        }}
      />
      <button onClick={submit} disabled={!text.trim() || loading} style={{
        width:42, height:42, borderRadius:12, border:'none',
        background: text.trim() && !loading ? 'var(--cyan)' : 'var(--bg3)',
        color: text.trim() && !loading ? '#03050b' : 'var(--muted)',
        display:'flex', alignItems:'center', justifyContent:'center',
        cursor: text.trim() && !loading ? 'pointer' : 'not-allowed',
        transition:'all 0.2s', flexShrink:0
      }}>
        <Send size={17} />
      </button>
    </div>
  )
}