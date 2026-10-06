export default function FilterChips({ options, value, onChange, counts }) {
  return (
    <div role="group" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
      {options.map(o => {
        const on = value === o
        return (
          <button key={o} aria-pressed={on} onClick={() => onChange(o)} style={{
            padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600,
            fontFamily: 'var(--mono)', transition: 'all 0.18s',
            border: `1px solid ${on ? 'var(--cyan)' : 'var(--line)'}`,
            background: on ? 'var(--cyan-dim)' : 'transparent',
            color: on ? 'var(--cyan)' : 'var(--muted)',
          }}>
            {o}{counts ? ` · ${counts[o]}` : ''}
          </button>
        )
      })}
    </div>
  )
}