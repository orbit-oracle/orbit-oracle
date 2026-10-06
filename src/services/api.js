import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

// Attach JWT token to every request automatically
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('oo_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

// If any request returns 401, clear the stale session and redirect to login
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('oo_token')
      localStorage.removeItem('oo_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login:          data => api.post('/auth/login', data),
  register:       data => api.post('/auth/register', data),
  me:             ()   => api.get('/auth/me'),
  changePassword: data => api.post('/auth/change-password', data),
}

export const copilotAPI = {
  ask:      data => api.post('/copilot/ask', data),
  feedback: data => api.post('/copilot/feedback', data),
  source:   id   => api.get(`/sources/${id}`),
}

export const auditAPI = {
  log: () => api.get('/audit/log'),
}

export default api