import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ width:40, height:40, border:'3px solid var(--line)',
        borderTopColor:'var(--cyan)', borderRadius:'50%',
        animation:'spin 0.8s linear infinite' }} />
    </div>
  )
  return user ? children : <Navigate to="/login" replace />
}