export default function SectionCard({ icon: Icon, title, right, wide = false, children }) {
  return (
    <section style={{
      background: 'var(--bg2)', border: '1px solid var(--line)',
      borderRadius: 16, padding: 20, minWidth: 0,
      gridColumn: wide ? '1 / -1' : undefined,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', gap: 12, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon size={18} color="var(--cyan)" />
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{title}</h2>
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}