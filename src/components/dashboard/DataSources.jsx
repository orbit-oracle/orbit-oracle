import { useState, useRef } from 'react'
import { FolderOpen, Upload } from 'lucide-react'
import SectionCard from './SectionCard'
import Button from '../ui/Button'
import { sources as initial, fmtUTC } from '../../data/dashboardData'

const MAX_MB = 10

export default function DataSources() {
  const [sources, setSources] = useState(initial)
  const [msg, setMsg] = useState(null)       // { text, error }
  const inputRef = useRef(null)              // the hidden <input type="file">
  const target = useRef(null)                // which source row asked for the upload

  function pick(key) {
    target.current = key
    inputRef.current.click()
  }

  // The real upload needs your FastAPI backend. For now we validate the file
  // and update the counter so the screen behaves like the final version.
  function onFile(e) {
    const file = e.target.files?.[0]
    e.target.value = '' // lets the same file be chosen twice in a row
    if (!file) return
    if (file.size > MAX_MB * 1024 * 1024) {
      setMsg({ text: `${file.name} is larger than ${MAX_MB} MB. Split it and upload again.`, error: true })
      return
    }
    setSources(prev => prev.map(s =>
      s.key === target.current ? { ...s, count: s.count + 1, updated: new Date().toISOString() } : s
    ))
    setMsg({ text: `${file.name} received. Connect backend upload API to index it.`, error: false })
  }

  return (
    <SectionCard icon={FolderOpen} title="Data Sources">
      <input ref={inputRef} type="file" hidden accept=".txt,.csv,.json,.pdf" onChange={onFile} />

      {sources.map((s, i) => (
        <div key={s.key} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
          padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)',
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
              {s.count.toLocaleString()} items · updated {fmtUTC(s.updated)}
            </div>
          </div>
          <Button size="sm" variant="secondary" onClick={() => pick(s.key)}>
            <Upload size={14} /> Upload
          </Button>
        </div>
      ))}

      <p role="status" style={{
        fontSize: 13, marginTop: 10, minHeight: 20,
        color: msg?.error ? 'var(--red)' : 'var(--green)',
      }}>
        {msg?.text}
      </p>
    </SectionCard>
  )
}