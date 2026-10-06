import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CopilotProvider } from './context/CopilotContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import LandingPage   from './pages/LandingPage'
import LoginPage     from './pages/LoginPage'
import RegisterPage  from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CopilotPage   from './pages/CopilotPage'
import TimelinePage  from './pages/TimelinePage'
import AuditLogPage  from './pages/AuditLogPage'
import HistoryPage   from './pages/HistoryPage'
import NotFoundPage  from './pages/NotFoundPage'
import TelemetryPage from './pages/TelemetryPage'
import ManualPage    from './pages/ManualPage'
import ProfilePage   from './pages/ProfilePage'

function AppShell({ children }) {
  const [navOpen, setNavOpen] = useState(false)
  const nav = useNavigate()
  const { user } = useAuth()
  const close = () => setNavOpen(false)

  // While the drawer is open: Esc closes it, and the page behind cannot scroll.
  useEffect(() => {
    if (!navOpen) return
    const onKey = e => e.key === 'Escape' && setNavOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [navOpen])

  // If the window grows to desktop width while the drawer is open, close it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = e => { if (e.matches) setNavOpen(false) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div className="app-shell">
      {/* Mobile top bar (hidden on desktop by CSS) */}
      <header className="app-topbar">
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open menu" aria-expanded={navOpen} aria-controls="app-nav"
          style={{
            width: 38, height: 38, borderRadius: 10, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg3)', border: '1px solid var(--line)', color: 'var(--text)',
          }}
        >
          <Menu size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
            background: 'radial-gradient(circle at 35% 30%, #fff 0%, var(--cyan) 40%, #0b3a6b 100%)',
          }} />
          <span style={{ fontWeight: 700, fontSize: 15 }}>Orbit Oracle</span>
        </div>
        <button
          onClick={() => nav('/profile')} aria-label="Open your profile"
          style={{
            width: 34, height: 34, borderRadius: '50%', fontSize: 12, fontWeight: 700,
            background: 'var(--cyan-dim)', border: '1px solid var(--cyan)', color: 'var(--cyan)',
          }}
        >
          {(user?.name || '?').split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')}
        </button>
      </header>

      {/* Dark layer behind the drawer; tapping it closes the menu */}
      <div className={`app-backdrop${navOpen ? ' open' : ''}`} onClick={close} aria-hidden="true" />

      <Navbar open={navOpen} onClose={close} />

      <main className="app-main">{children}</main>
    </div>
  )
}

function Inner() {
  const guard = page => <ProtectedRoute><AppShell>{page}</AppShell></ProtectedRoute>
  return (
    <Routes>
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={guard(<DashboardPage />)} />
      <Route path="/copilot"   element={guard(<CopilotPage />)} />
      <Route path="/timeline"  element={guard(<TimelinePage />)} />
      <Route path="/audit"     element={guard(<AuditLogPage />)} />
      <Route path="/history"   element={guard(<HistoryPage />)} />
      <Route path="/telemetry" element={guard(<TelemetryPage />)} />
      <Route path="/manual"    element={guard(<ManualPage />)} />
      <Route path="/profile"   element={guard(<ProfilePage />)} />
      <Route path="*"          element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CopilotProvider>
        <Inner />
      </CopilotProvider>
    </AuthProvider>
  )
}