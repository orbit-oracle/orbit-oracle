export default function Badge({ children, color = 'cyan' }) {
  const map = {
    cyan:  { bg: 'var(--cyan-dim)',  border: 'var(--cyan)',  text: 'var(--cyan)'  },
    amber: { bg: 'var(--amber-dim)', border: 'var(--amber)', text: 'var(--amber)' },
    green: { bg: 'rgba(52,211,153,.12)', border: 'var(--green)', text: 'var(--green)' },
    red:   { bg: 'rgba(248,113,113,.12)', border: 'var(--red)', text: 'var(--red)' },
    muted: { bg: 'var(--bg3)', border: 'var(--line)', text: 'var(--muted)' },
  }
  const c = map[color] || map.cyan
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 10px', borderRadius: 99,
      border: `1px solid ${c.border}`, background: c.bg,
      color: c.text, fontSize: 11, fontWeight: 700,
      fontFamily: 'var(--mono)', letterSpacing: '0.05em'
    }}>
      {children}
    </span>
  )
}