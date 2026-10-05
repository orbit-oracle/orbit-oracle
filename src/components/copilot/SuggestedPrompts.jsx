const prompts = [
  'Why did the battery bus voltage drop at 14:32 UTC?',
  'Why is battery pack B running warm?',
  'What happened to the star tracker at 03:48 UTC?',
  'Build an incident timeline for the last BUS-LOW alert',
  'Show procedures for EPS anomaly response',
  'Find similar past incidents for power subsystem',
]

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--muted)',
          marginBottom: 12,
          fontFamily: 'var(--mono)',
          letterSpacing: '0.05em',
        }}
      >
        SUGGESTED INVESTIGATIONS
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            style={{
              background: 'var(--bg2)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: '9px 14px',
              fontSize: 13,
              color: 'var(--text)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.18s',
              lineHeight: 1.4,
              fontFamily: 'var(--font)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cyan)'
              e.currentTarget.style.background = 'var(--cyan-dim)'
              e.currentTarget.style.color = 'var(--cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)'
              e.currentTarget.style.background = 'var(--bg2)'
              e.currentTarget.style.color = 'var(--text)'
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}