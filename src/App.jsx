import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CopilotProvider } from './context/CopilotContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/LoginPage'
import RegisterPage   from './pages/RegisterPage'
import DashboardPage  from './pages/DashboardPage'
import CopilotPage    from './pages/CopilotPage'
import TimelinePage   from './pages/TimelinePage'
import AuditLogPage   from './pages/AuditLogPage'
import HistoryPage    from './pages/HistoryPage'
import TelemetryPage  from './pages/TelemetryPage'
import NotFoundPage   from './pages/NotFoundPage'

function AppShell({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 36px', minWidth: 0 }}>
        {children}
      </main>
    </div>
  )
}

function Inner() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected — all inside AppShell */}
      <Route path="/dashboard" element={<ProtectedRoute><AppShell><DashboardPage /></AppShell></ProtectedRoute>} />
      <Route path="/copilot"   element={<ProtectedRoute><AppShell><CopilotPage /></AppShell></ProtectedRoute>} />
      <Route path="/timeline"  element={<ProtectedRoute><AppShell><TimelinePage /></AppShell></ProtectedRoute>} />
      <Route path="/audit"     element={<ProtectedRoute><AppShell><AuditLogPage /></AppShell></ProtectedRoute>} />
      <Route path="/history"   element={<ProtectedRoute><AppShell><HistoryPage /></AppShell></ProtectedRoute>} />
      <Route path="/telemetry" element={<ProtectedRoute><AppShell><TelemetryPage /></AppShell></ProtectedRoute>} />

      {/* ✅ catch-all is always last */}
      <Route path="*" element={<NotFoundPage />} />
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