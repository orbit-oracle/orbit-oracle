import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('oo_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const authAPI = {
  login:    data => api.post('/auth/login', data),
  register: data => api.post('/auth/register', data),
  me:       ()   => api.get('/auth/me'),
  changePassword: data => api.post('/auth/change-password', data), 
}

export const copilotAPI = {
  ask:       data => api.post('/copilot/ask', data),
  history:   ()   => api.get('/copilot/history'),
  sources:   id   => api.get(`/copilot/sources/${id}`),
  export:    id   => api.get(`/copilot/export/${id}`, { responseType: 'blob' }),
  feedback:  data => api.post('/copilot/feedback', data),
}

export const auditAPI = {
  log:    () => api.get('/audit/log'),
  export: () => api.get('/audit/export', { responseType: 'blob' }),
}

export default api