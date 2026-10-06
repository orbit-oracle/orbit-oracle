import RegisterForm from '../components/auth/RegisterForm'

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <RegisterForm />
    </div>
  )
}