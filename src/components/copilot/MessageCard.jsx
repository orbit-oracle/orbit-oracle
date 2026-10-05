import { useState } from 'react'
import Badge from '../ui/Badge'
import EvidencePanel from './EvidencePanel'
import TimelineView from './TimelineView'
import { confColor, confLabel } from '../../utils/helpers'

const ring = (c) => {
  const r = 26, circ = 2 * Math.PI * r
  const col = confColor(c)
  return (
    <svg width="64" height="64" style={{ transform:'rotate(-90deg)' }}>
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--line)" strokeWidth="5"/>
      <circle cx="32" cy="32" r={r} fill="none" stroke={col} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${(circ*c/100).toFixed(1)} ${circ.toFixed(1)}`}/>
    </svg>
  )
}

export default function MessageCard({ msg }) {
  const [openSrc, setOpenSrc]   = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (msg.role === 'user') return (
    <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:14 }}>
      <div style={{
        background:'var(--bg3)', border:'1px solid var(--line)',
        borderRadius:'18px 18px 4px 18px', padding:'10px 16px',
        maxWidth:'78%', fontSize:15, lineHeight:1.55
      }}>
        {msg.content}
      </div>
    </div>
  )

  const d = msg.data || {}
  const allSources = [...(d.obs||[]),...(d.rec||[])].flatMap(s => s.sources || [])
  const uniqueSrc = [...new Map(allSources.map(s=>[s.id,s])).values()]

  return (
    <div style={{ marginBottom:22, animation:'fadeUp 0.4s ease' }}>
      {/* Main card */}
      <div style={{
        background:'var(--bg2)', border:'1px solid var(--line)',
        borderRadius:18, padding:22,
        boxShadow:'0 0 0 1px var(--cyan-dim), 0 18px 50px -20px rgba(34,211,238,.15)'
      }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap', marginBottom:16 }}>
          <div style={{ flex:1 }}>
            <h3 style={{ fontSize:17, fontWeight:700, lineHeight:1.35, marginBottom:8 }}>
              {d.title || msg.content}
            </h3>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              <Badge color="cyan">Evidence verified {uniqueSrc.length}/{uniqueSrc.length}</Badge>
              <Badge color="muted">Advisory only</Badge>
            </div>
          </div>
          {d.confidence !== undefined && (
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {ring(d.confidence)}
              <div>
                <div style={{ fontWeight:700, color: confColor(d.confidence) }}>
                  {d.confidence}% · {confLabel(d.confidence)}
                </div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>confidence</div>
              </div>
            </div>
          )}
        </div>

        {/* OBSERVED */}
        {d.obs?.length > 0 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span className="tag-obs">● OBSERVED</span>
              <span style={{ fontSize:13, color:'var(--muted)' }}>What the data shows</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {d.obs.map((item, i) => (
                <div key={i} style={{
                  background:'var(--bg3)', borderLeft:'3px solid var(--cyan)',
                  borderRadius:'0 10px 10px 0', padding:'10px 14px',
                  display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10
                }}>
                  <span style={{ fontSize:14, lineHeight:1.5 }}>{item.text}</span>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap', flexShrink:0 }}>
                    {(item.cites||[]).map(c => (
                      <button key={c} onClick={() => setOpenSrc(true)} style={{
                        fontFamily:'var(--mono)', fontSize:11, padding:'2px 8px',
                        borderRadius:6, border:'1px solid var(--cyan)',
                        background:'var(--cyan-dim)', color:'var(--cyan)',
                        cursor:'pointer', fontWeight:600
                      }}>{c}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECOMMENDED */}
        {d.rec?.length > 0 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <span className="tag-rec">◆ RECOMMENDED</span>
              <span style={{ fontSize:13, color:'var(--muted)' }}>What to check next</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {d.rec.map((item, i) => (
                <div key={i} style={{
                  background:'var(--bg3)', borderLeft:'3px solid var(--amber)',
                  borderRadius:'0 10px 10px 0', padding:'10px 14px',
                  display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10
                }}>
                  <span style={{ fontSize:14, lineHeight:1.5 }}>{item.text}</span>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap', flexShrink:0 }}>
                    {(item.cites||[]).map(c => (
                      <button key={c} onClick={() => setOpenSrc(true)} style={{
                        fontFamily:'var(--mono)', fontSize:11, padding:'2px 8px',
                        borderRadius:6, border:'1px solid var(--amber)',
                        background:'var(--amber-dim)', color:'var(--amber)',
                        cursor:'pointer', fontWeight:600
                      }}>{c}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights */}
        {d.insights?.length > 0 && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--muted)',
              marginBottom:8, fontFamily:'var(--mono)', letterSpacing:'0.05em' }}>
              AI INSIGHTS
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:8 }}>
              {d.insights.map((t,i)=>(
                <div key={i} style={{
                  background:'var(--bg3)', border:'1px solid var(--line)',
                  borderRadius:10, padding:'10px 12px', fontSize:13, lineHeight:1.5
                }}>{t}</div>
              ))}
            </div>
          </div>
        )}

        {/* Evidence panel */}
        {openSrc && (
          <EvidencePanel sources={uniqueSrc} onClose={() => setOpenSrc(false)} />
        )}

        {/* Timeline */}
        {d.timeline?.length > 0 && <TimelineView events={d.timeline} />}

        {/* Footer */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:10, marginTop:16, paddingTop:14,
          borderTop:'1px solid var(--line)', fontSize:13, color:'var(--muted)'
        }}>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => setOpenSrc(v => !v)} style={{
              background:'var(--bg3)', border:'1px solid var(--line)',
              borderRadius:8, padding:'4px 12px', fontSize:13,
              color:'var(--cyan)', cursor:'pointer'
            }}>
              📎 {openSrc ? 'Hide' : 'Show'} Sources
            </button>
          </div>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <span style={{ fontSize:12 }}>Was this helpful?</span>
            {['✓ Useful','✗ Wrong'].map((f, fi) => (
              <button key={f} onClick={() => setFeedback(fi===0?'useful':'wrong')} style={{
                background: feedback===(fi===0?'useful':'wrong') ? (fi===0?'var(--green)':'var(--red)') : 'var(--bg3)',
                border:`1px solid ${fi===0?'var(--green)':'var(--red)'}`,
                borderRadius:8, padding:'3px 10px', fontSize:12,
                color: feedback===(fi===0?'useful':'wrong') ? '#000' : (fi===0?'var(--green)':'var(--red)'),
                cursor:'pointer'
              }}>{f}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}