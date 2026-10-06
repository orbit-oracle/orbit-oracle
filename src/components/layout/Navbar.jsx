import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, MessageSquare, Clock, FileText,
  LogOut, Activity, BookOpen, Satellite, X, ChevronRight
} from 'lucide-react'

const nav = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/copilot',   icon: MessageSquare,   label: 'Copilot'   },
  { path: '/timeline',  icon: Clock,           label: 'Timeline'  },
  { path: '/audit',     icon: FileText,        label: 'Audit Log' },
  { path: '/history',   icon: Activity,        label: 'History'   },
  { path: '/telemetry', icon: Satellite,       label: 'Telemetry' },
]

const linkStyle = on => ({
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '10px 14px', borderRadius: 10, border: 'none',
  background: on ? 'var(--cyan-dim)' : 'transparent',
  color: on ? 'var(--cyan)' : 'var(--muted)',
  fontWeight: on ? 600 : 400, fontSize: 14,
  transition: 'all 0.18s', textAlign: 'left', width: '100%',
  borderLeft: on ? '2px solid var(--cyan)' : '2px solid transparent',
})

const initials = name =>
  (name || '?').split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

export default function Navbar({ open = false, onClose = () => {} }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Go to a page, then close the drawer (does nothing visible on desktop)
  const go = path => { navigate(path); onClose() }

  return (
    <nav
      id="app-nav"
      aria-label="Main navigation"
      className={`app-nav${open ? ' open' : ''}`}
      style={{
        background: 'var(--bg2)', borderRight: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', padding: '20px 12px', gap: 4,
      }}
    >
      {/* Brand + close button (close button only shows on mobile) */}
      <div style={{ padding: '8px 12px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 40%, #0b3a6b 100%)',
          boxShadow: '0 0 18px var(--cyan-dim)', flexShrink: 0
        }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Orbit Oracle</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>ST-10</div>
        </div>
        <button className="nav-close" onClick={onClose} aria-label="Close menu" style={{
          width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg3)', border: '1px solid var(--line)', color: 'var(--muted)',
        }}>
          <X size={17} />
        </button>
      </div>

      {/* Links */}
      {nav.map(({ path, icon: Icon, label }) => (
        <button key={path} onClick={() => go(path)} style={linkStyle(pathname === path)}>
          <Icon size={17} />
          {label}
        </button>
      ))}

      {/* Bottom */}
      <div style={{ marginTop: 'auto', paddingTop: 16 }}>
        {/* User card, now opens the profile */}
        <button onClick={() => go('/profile')} aria-label="Open your profile" style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
          padding: '10px 12px', borderRadius: 10, marginBottom: 8, color: 'var(--text)',
          background: 'var(--bg3)', transition: 'border-color 0.18s',
          border: `1px solid ${pathname === '/profile' ? 'var(--cyan)' : 'var(--line)'}`,
        }}>
          <div aria-hidden="true" style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 40%, #0b3a6b 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#03050b',
          }}>{initials(user?.name)}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{user?.role || 'Operator'}</div>
          </div>
          <ChevronRight size={15} color="var(--muted)" />
        </button>

        <button onClick={() => go('/manual')} style={{ ...linkStyle(pathname === '/manual'), marginBottom: 4 }}>
          <BookOpen size={17} />
          User Manual
        </button>

        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 14px', borderRadius: 10, border: 'none',
          background: 'transparent', color: 'var(--red)',
          fontSize: 14, cursor: 'pointer', width: '100%',
          transition: 'background 0.18s',
        }}>
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </nav>
  )
}