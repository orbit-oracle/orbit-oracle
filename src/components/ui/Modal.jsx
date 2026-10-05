import { useEffect } from 'react'
import Button from './Button'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(4px)'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg2)', border: '1px solid var(--line)',
        borderRadius: 18, padding: 28, minWidth: 360, maxWidth: 520,
        width: '90vw', animation: 'fadeUp 0.25s ease',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18 }}>
          <span style={{ fontWeight: 700, fontSize: 17 }}>{title}</span>
          <button onClick={onClose} style={{
            background:'none', border:'none', color:'var(--muted)',
            fontSize: 20, lineHeight: 1, cursor:'pointer'
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}