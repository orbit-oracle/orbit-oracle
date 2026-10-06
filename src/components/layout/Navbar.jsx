import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, MessageSquare, Clock,
  FileText, Activity, LogOut, Radio
} from 'lucide-react'

const nav = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { path: '/copilot',   icon: MessageSquare,   label: 'Copilot'    },
  { path: '/telemetry', icon: Radio,           label: 'Telemetry'  },
  { path: '/timeline',  icon: Clock,           label: 'Timeline'   },
  { path: '/audit',     icon: FileText,        label: 'Audit Log'  },
  { path: '/history',   icon: Activity,        label: 'History'    },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{
      width: 220, background: 'var(--bg2)', borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', padding: '20px 12px',
      gap: 4, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100
    }}>
      {/* Brand */}
      <div style={{ padding: '8px 12px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 40%, #0b3a6b 100%)',
          boxShadow: '0 0 18px rgba(34,211,238,0.3)',
          animation: 'breathe 4s ease-in-out infinite'
        }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Orbit Oracle</div>
          <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>ST-10</div>
        </div>
      </div>

      {/* Links */}
      {nav.map(({ path, icon: Icon, label }) => {
        const on = pathname === path
        return (
          <button key={path} onClick={() => navigate(path)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', borderRadius: 10, border: 'none',
            background: on ? 'var(--cyan-dim)' : 'transparent',
            color: on ? 'var(--cyan)' : 'var(--muted)',
            fontWeight: on ? 600 : 400, fontSize: 14,
            transition: 'all 0.18s', textAlign: 'left', width: '100%',
            borderLeft: on ? '2px solid var(--cyan)' : '2px solid transparent',
            fontFamily: 'var(--font)',
          }}
          onMouseEnter={e => {
            if (!on) {
              e.currentTarget.style.background = 'var(--bg3)'
              e.currentTarget.style.color = 'var(--text)'
            }
          }}
          onMouseLeave={e => {
            if (!on) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--muted)'
            }
          }}
          >
            <Icon size={17} />
            {label}
          </button>
        )
      })}

      {/* Bottom */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          background: 'var(--bg3)', border: '1px solid var(--line)',
          borderRadius: 11, padding: '10px 12px', marginBottom: 8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--cyan), #0b3a6b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, color: '#fff'
            }}>
              {user?.name?.[0]?.toUpperCase() || 'O'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 600,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                {user?.name}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                {user?.role || 'Operator'}
              </div>
            </div>
          </div>
        </div>

        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 14px', borderRadius: 10, border: 'none',
          background: 'transparent', color: 'var(--red)',
          fontSize: 14, cursor: 'pointer', width: '100%',
          transition: 'background 0.18s', fontFamily: 'var(--font)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </nav>
  )
}