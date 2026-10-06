import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Search } from 'lucide-react'
import SectionCard from './SectionCard'
import FilterChips from './FilterChips'
import Badge from '../ui/Badge'
import { knowledgeItems, TYPE_COLOR } from '../../data/dashboardData'

const TYPES = ['All', 'Procedure', 'Manual', 'Incident', 'Log']

// Wraps matching text in <mark>. The query is "escaped" first so characters
// like "(" can't break the regular expression.
function highlight(text, query) {
  const q = query.trim()
  if (!q) return text
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.split(new RegExp(`(${safe})`, 'gi')).map((part, i) =>
    part.toLowerCase() === q.toLowerCase()
      ? <mark key={i} style={{ background: 'var(--amber-dim)', color: 'var(--amber)', borderRadius: 3 }}>{part}</mark>
      : part
  )
}

export default function MissionKnowledge() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return knowledgeItems.filter(k =>
      (type === 'All' || k.type === type) &&
      (!q || [k.id, k.title, k.excerpt].some(s => s.toLowerCase().includes(q)))
    )
  }, [query, type])

  return (
    <SectionCard icon={BookOpen} title="Mission Knowledge" wide>
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <Search size={16} color="var(--muted)" style={{ position: 'absolute', left: 14, top: 12 }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search procedures, manuals, incident reports and logs"
          placeholder="Search procedures, manuals, incident reports, logs…  e.g. EPS-07"
          style={{
            width: '100%', padding: '10px 14px 10px 40px', fontSize: 14,
            background: 'var(--bg)', color: 'var(--text)',
            border: '1px solid var(--line)', borderRadius: 12, outline: 'none',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--cyan)')}
          onBlur={e => (e.target.style.borderColor = 'var(--line)')}
        />
      </div>

      <FilterChips options={TYPES} value={type} onChange={setType} />

      {results.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>
          Insufficient evidence: nothing matches. Try an item ID or a broader term.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(300px,100%),1fr))', gap: 12 }}>
          {results.map(k => (
            <div key={k.id} style={{
              background: 'var(--bg3)', border: '1px solid var(--line)',
              borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--cyan)' }}>{k.id}</span>
                <Badge color={TYPE_COLOR[k.type]}>{k.type}</Badge>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{highlight(k.title, query)}</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>
                {highlight(k.excerpt, query)}
              </p>
              <button
                onClick={() => nav('/copilot', { state: { q: `Explain ${k.id}: ${k.title}` } })}
                style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--cyan)', fontSize: 13, fontWeight: 600, padding: 0 }}
              >
                Ask Copilot →
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}