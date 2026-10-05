export default function OrbitalCore({ size = 'lg', busy = false }) {
  const dim = size === 'lg' ? 132 : size === 'md' ? 64 : 44

  const styles = {
    wrap: {
      position: 'relative',
      width: dim,
      height: dim,
      flexShrink: 0,
    },
    ring1: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      border: '1.5px dotted var(--cyan)',
      opacity: 0.55,
      animation: `oc-spin ${busy ? '2.4s' : '18s'} linear infinite`,
    },
    ring2: {
      position: 'absolute',
      inset: Math.round(dim * 0.11),
      borderRadius: '50%',
      border: '1.5px dashed var(--amber)',
      opacity: 0.45,
      animation: `oc-spin ${busy ? '4s' : '26s'} linear infinite reverse`,
    },
    planet: {
      position: 'absolute',
      inset: Math.round(dim * 0.26),
      borderRadius: '50%',
      background:
        'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 30%, #0b3a6b 100%)',
      boxShadow:
        '0 0 38px rgba(34,211,238,0.35), 0 0 90px rgba(34,211,238,0.12)',
      animation: `oc-breathe ${busy ? '0.9s' : '4s'} ease-in-out infinite`,
    },
    satellite: {
      position: 'absolute',
      width: Math.round(dim * 0.09),
      height: Math.round(dim * 0.09),
      borderRadius: '50%',
      background: 'var(--amber)',
      boxShadow: '0 0 8px var(--amber)',
      top: '50%',
      left: '50%',
      marginTop: -Math.round(dim * 0.045),
      marginLeft: -Math.round(dim * 0.045),
      transformOrigin: `0 ${Math.round(dim * 0.445)}px`,
      animation: `oc-spin ${busy ? '1.2s' : '7s'} linear infinite`,
    },
  }

  return (
    <>
      <style>{`
        @keyframes oc-spin    { to { transform: rotate(360deg); } }
        @keyframes oc-breathe {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 38px rgba(34,211,238,0.35), 0 0 90px rgba(34,211,238,0.12); }
          50%       { transform: scale(1.08); box-shadow: 0 0 55px rgba(34,211,238,0.55), 0 0 110px rgba(34,211,238,0.2); }
        }
      `}</style>
      <div style={styles.wrap}>
        <div style={styles.ring1} />
        <div style={styles.ring2} />
        <div style={styles.planet} />
        {size === 'lg' && <div style={styles.satellite} />}
      </div>
    </>
  )
}