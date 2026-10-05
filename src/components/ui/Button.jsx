export default function Button({
  children, onClick, variant = 'primary', size = 'md',
  disabled = false, full = false, style = {}
}) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: 8, fontWeight: 600, borderRadius: 12, border: 'none',
    transition: 'all 0.2s', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1, width: full ? '100%' : undefined,
    fontFamily: 'var(--font)',
  }
  const sizes = {
    sm: { padding: '6px 14px', fontSize: 13 },
    md: { padding: '10px 20px', fontSize: 15 },
    lg: { padding: '13px 28px', fontSize: 16 },
  }
  const variants = {
    primary:  { background: 'var(--cyan)', color: '#03050b' },
    secondary:{ background: 'var(--bg3)', color: 'var(--text)', border: '1px solid var(--line)' },
    ghost:    { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--line)' },
    danger:   { background: 'rgba(248,113,113,0.15)', color: 'var(--red)', border: '1px solid var(--red)' },
    amber:    { background: 'var(--amber)', color: '#03050b' },
  }
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
    >
      {children}
    </button>
  )
}