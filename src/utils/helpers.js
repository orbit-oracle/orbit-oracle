export const fmtTime = iso => new Date(iso).toLocaleTimeString([], {
  hour: '2-digit', minute: '2-digit'
})

export const fmtDate = iso => new Date(iso).toLocaleDateString([], {
  day: '2-digit', month: 'short', year: 'numeric'
})

export const confColor = c =>
  c >= 80 ? 'var(--green)' : c >= 50 ? 'var(--amber)' : 'var(--red)'

export const confLabel = c =>
  c >= 80 ? 'High' : c >= 50 ? 'Medium' : 'Low'

export const downloadBlob = (blob, name) => {
  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href = url; a.download = name; a.click()
  URL.revokeObjectURL(url)
}