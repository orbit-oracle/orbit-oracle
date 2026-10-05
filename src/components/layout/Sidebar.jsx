import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, MessageSquare, Clock,
  FileText, Activity, LogOut, ChevronRight,
  Satellite, Settings, HelpCircle
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard',   sub: 'Overview'       },
  { path: '/copilot',   icon: MessageSquare,   label: 'Copilot',     sub: 'Ask & Diagnose' },
  { path: '/timeline',  icon: Clock,           label: 'Timeline',    sub: 'Incident View'  },
  { path: '/audit',     icon: FileText,        label: 'Audit Log',   sub: 'Full Record'    },
  { path: '/history',   icon: Activity,        label: 'History',     sub: 'Past Sessions'  },
  { path: '/telemetry', icon: Activity, label: 'Telemetry', sub: 'Summaries & Charts' },
]

const BOTTOM = [
  { icon: Settings,    label: 'Settings'  },
  { icon: HelpCircle,  label: 'Help'      },
]

const ORB_ANIM = `
  @keyframes orb-breathe { 0%,100% { transform:scale(1); } 50% { transform:scale(1.07); } }
  @keyframes orb-ring    { to { transform: rotate(360deg); } }
`

export default function Sidebar({ collapsed = false }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [hovered, setHovered] = useState(null)

  const W = collapsed ? 72 : 228

  return (
    <>
      <style>{ORB_ANIM}</style>
      <aside style={{
        width: W, minHeight: '100vh', flexShrink: 0,
        background: 'var(--bg2)', borderRight: '1px solid var(--line)',
        display: 'flex', flexDirection: 'column', padding: '18px 10px',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 200,
        transition: 'width 0.25s ease', overflow: 'hidden'
      }}>

        {/* Brand */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: collapsed ? '6px' : '6px 8px',
          marginBottom: 22, justifyContent: collapsed ? 'center' : 'flex-start'
        }}>
          <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1.5px solid var(--cyan)', opacity: 0.5,
              animation: 'orb-ring 18s linear infinite'
            }} />
            <div style={{
              position: 'absolute', inset: 6, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 30%, #0b3a6b 100%)',
              boxShadow: '0 0 16px rgba(34,211,238,0.4)',
              animation: 'orb-breathe 4s ease-in-out infinite'
            }} />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                Orbit Oracle
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                ST-10 · TECHFEST 2026-27
              </div>
            </div>
          )}
        </div>

        {/* Section label */}
        {!collapsed && (
          <div style={{
            fontSize: 10, fontWeight: 700, color: 'var(--muted)',
            fontFamily: 'var(--mono)', letterSpacing: '0.1em',
            padding: '0 10px', marginBottom: 8
          }}>NAVIGATION</div>
        )}

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          {NAV.map(({ path, icon: Icon, label, sub }) => {
            const on = pathname === path
            const hov = hovered === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
                title={collapsed ? label : undefined}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? '11px 0' : '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 11, border: 'none',
                  background: on
                    ? 'var(--cyan-dim)'
                    : hov ? 'var(--bg3)' : 'transparent',
                  borderLeft: on ? '2px solid var(--cyan)' : '2px solid transparent',
                  color: on ? 'var(--cyan)' : hov ? 'var(--text)' : 'var(--muted)',
                  cursor: 'pointer', width: '100%',
                  transition: 'all 0.18s', overflow: 'hidden'
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && (
                  <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: on ? 700 : 500, lineHeight: 1.2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.2 }}>
                      {sub}
                    </div>
                  </div>
                )}
                {!collapsed && on && (
                  <ChevronRight size={14} style={{ flexShrink: 0 }} />
                )}
              </button>
            )
          })}

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--line)', margin: '10px 4px' }} />

          {/* Bottom nav */}
          {BOTTOM.map(({ icon: Icon, label }) => (
            <button key={label}
              title={collapsed ? label : undefined}
              style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? 0 : 10,
                padding: collapsed ? '11px 0' : '10px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 11, border: 'none',
                background: 'transparent', color: 'var(--muted)',
                cursor: 'pointer', width: '100%', fontSize: 14,
                transition: 'color 0.18s', fontFamily: 'var(--font)'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              <Icon size={17} style={{ flexShrink: 0 }} />
              {!collapsed && label}
            </button>
          ))}
        </div>

        {/* User card */}
        <div style={{
          borderTop: '1px solid var(--line)', paddingTop: 12, marginTop: 4
        }}>
          {!collapsed && (
            <div style={{
              background: 'var(--bg3)', border: '1px solid var(--line)',
              borderRadius: 11, padding: '10px 12px', marginBottom: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--cyan), var(--bg3))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, color: '#03050b', flexShrink: 0
                }}>
                  {user?.name?.[0]?.toUpperCase() || 'O'}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user?.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {user?.role || 'Operator'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            title={collapsed ? 'Sign out' : undefined}
            style={{
              display: 'flex', alignItems: 'center',
              gap: collapsed ? 0 : 8,
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '11px 0' : '9px 12px',
              borderRadius: 11, border: 'none',
              background: 'transparent', color: 'var(--red)',
              fontSize: 14, cursor: 'pointer', width: '100%',
              transition: 'background 0.18s', fontFamily: 'var(--font)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>
    </>
  )
}