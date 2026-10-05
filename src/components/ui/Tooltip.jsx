import { useState } from 'react'

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
          transform: 'translateX(-50%)', background: 'var(--bg3)',
          border: '1px solid var(--line)', color: 'var(--text)',
          padding: '5px 10px', borderRadius: 8, fontSize: 12,
          whiteSpace: 'nowrap', zIndex: 999, pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          {text}
        </span>
      )}
    </span>
  )
}