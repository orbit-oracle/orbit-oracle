// Placeholder data. Later, replace each array with an API call in services/api.js
// and keep the same object shape so the components don't need to change.

// Maps a status word to one of your Badge colours (cyan | amber | green | red | muted)
export const SEV_COLOR = {
  critical: 'red', warning: 'amber', info: 'cyan',
  nominal: 'green', resolved: 'green', active: 'red',
}

// Always show UTC, as your paper requires (section 6.2)
export const fmtUTC = iso =>
  new Date(iso).toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

export const anomalies = [
  { id: 'ANM-014', title: 'Battery bus voltage drop',       subsystem: 'EPS',     severity: 'critical', status: 'active',   time: '2026-10-04T14:32:00Z', evidence: ['LOG-2291', 'T-17', 'EPS-07 step 3'], q: 'Why did the battery bus voltage drop at 14:32 UTC?' },
  { id: 'ANM-013', title: 'Battery pack B running warm',    subsystem: 'Thermal', severity: 'warning',  status: 'active',   time: '2026-10-04T09:20:00Z', evidence: ['LOG-2203', 'T-22'],                  q: 'Why is battery pack B running warm?' },
  { id: 'ANM-012', title: 'Star tracker 1 lost lock',       subsystem: 'ADCS',    severity: 'warning',  status: 'resolved', time: '2026-10-04T03:48:00Z', evidence: ['LOG-2101', 'T-31'],                  q: 'What happened to the star tracker at 03:48 UTC?' },
  { id: 'ANM-011', title: 'Downlink margin below threshold',subsystem: 'Comms',   severity: 'critical', status: 'resolved', time: '2026-09-30T03:41:00Z', evidence: ['LOG-2044', 'INC-2024-09'],           q: 'Why did the downlink margin fall below 3 dB?' },
]

export const knowledgeItems = [
  { id: 'EPS-07',       type: 'Procedure', title: 'Bus undervoltage response',  excerpt: 'Step 3: Confirm battery state of charge and compare against bus voltage telemetry before shedding non-critical loads.' },
  { id: 'INC-2024-09',  type: 'Incident',  title: 'Panel B thermal excursion',  excerpt: 'Temperature rose 14 C in 6 minutes after an attitude change. Resolved by reorienting the array.' },
  { id: 'LOG-2291',     type: 'Log',       title: 'EPS log 14:32 UTC',          excerpt: 'BUS_V fell from 28.1 V to 26.4 V. Load shed flag not set.' },
  { id: 'MAN-COMMS-02', type: 'Manual',    title: 'Downlink margin guide',      excerpt: 'A margin below 3 dB should trigger a check of antenna pointing and transmitter power.' },
]

export const TYPE_COLOR = { Procedure: 'cyan', Incident: 'amber', Log: 'muted', Manual: 'green' }

export const health = [
  { key: 'battery',  label: 'Battery',       value: 82,   unit: '% charge',  status: 'nominal',  trend: [90, 88, 87, 85, 84, 83, 82] },
  { key: 'temp',     label: 'Temperature',   value: 31.1, unit: '°C pack B', status: 'warning',  trend: [27.4, 28.1, 29.6, 31.2, 31.8, 31.5, 31.1] },
  { key: 'comms',    label: 'Communication', value: 4.2,  unit: 'dB margin', status: 'nominal',  trend: [4.8, 4.6, 4.5, 4.4, 4.3, 4.2, 4.2] },
  { key: 'power',    label: 'Power',         value: 26.4, unit: 'V bus',     status: 'critical', trend: [28.2, 28.1, 28.0, 27.6, 26.4, 26.6, 26.9] },
]

export const sources = [
  { key: 'logs',       label: 'Mission logs',        count: 1842, updated: '2026-10-05T06:00:00Z' },
  { key: 'telemetry',  label: 'Telemetry summaries', count: 320,  updated: '2026-10-05T06:00:00Z' },
  { key: 'procedures', label: 'Procedures',          count: 58,   updated: '2026-08-12T00:00:00Z' },
  { key: 'incidents',  label: 'Incident history',    count: 41,   updated: '2026-09-30T00:00:00Z' },
]

export const alerts = [
  { id: 'ALT-031', message: 'Bus voltage below 27.5 V limit',  severity: 'critical', time: '2026-10-04T14:32:00Z', acknowledged: false, q: 'Why did the battery bus voltage drop at 14:32 UTC?' },
  { id: 'ALT-030', message: 'Battery pack B above 30 °C limit', severity: 'warning',  time: '2026-10-04T09:15:00Z', acknowledged: false, q: 'Why is battery pack B running warm?' },
  { id: 'ALT-029', message: 'Downlink margin recovered',        severity: 'info',     time: '2026-09-30T04:10:00Z', acknowledged: true,  q: 'Why did the downlink margin fall below 3 dB?' },
]