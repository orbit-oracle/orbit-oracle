import { useNavigate } from 'react-router-dom'
import {
  Rocket, LayoutDashboard, MessageSquare, Clock, FileText, Activity,
  Satellite, ShieldCheck, Lightbulb, Info, BookOpen,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

/* ----------------------------- content ----------------------------- */

const SECTIONS = [
  { id: 'start',   label: 'Getting started' },
  { id: 'pages',   label: 'Pages explained' },
  { id: 'answers', label: 'Reading answers' },
  { id: 'ask',     label: 'What to ask' },
  { id: 'about',   label: 'About Orbit Oracle' },
]

const STEPS = [
  { t: 'Create an account or sign in',
    d: 'Use Register on the landing page, then sign in. Your name and role appear at the bottom of the left menu.' },
  { t: 'Start on the Dashboard',
    d: 'Check the status banner, the AI-detected insights, and the Mission Operations panels (anomalies, alerts, spacecraft health, data sources and knowledge search).' },
  { t: 'Ask the Copilot a question',
    d: 'Open Copilot, type a plain-English question or click a suggested prompt. You can also click Investigate on any anomaly, alert or insight and the question is sent for you.' },
  { t: 'Check the evidence',
    d: 'Every statement links to the source it came from. Open the evidence panel and confirm the log line, telemetry value or procedure step yourself.' },
  { t: 'Review the Timeline and Audit Log',
    d: 'Timeline shows the events in time order. Audit Log keeps a record of every question, answer and source, so any session can be reviewed later.' },
]

const PAGES = [
  { icon: LayoutDashboard, name: 'Dashboard', path: '/dashboard',
    what: 'Your overview of the mission.',
    how: ['Read the status banner for Copilot, sources and mode.',
          'Use the filter chips in Anomaly Center to see Active, Resolved or Critical items.',
          'Click Acknowledge on an alert once you have seen it.',
          'Search Mission Knowledge by keyword or by an ID such as EPS-07.',
          'Use the Upload buttons in Data Sources to add a file (max 10 MB).'] },
  { icon: MessageSquare, name: 'Copilot', path: '/copilot',
    what: 'Ask questions and get evidence-backed answers.',
    how: ['Type a question or pick a suggested prompt.',
          'Read the answer: each statement is tagged OBSERVED or RECOMMENDED.',
          'Open the evidence panel to see the exact source for each claim.',
          'If you see "insufficient evidence", rephrase or add a time and subsystem.'] },
  { icon: Clock, name: 'Timeline', path: '/timeline',
    what: 'A time-ordered view of an incident.',
    how: ['Ask the Copilot to build a timeline for an alert.',
          'Each event is linked to its source.',
          'Times are always shown in UTC.'] },
  { icon: FileText, name: 'Audit Log', path: '/audit',
    what: 'The full record of what was asked and answered.',
    how: ['Each row shows the user, question, confidence, number of sources and time.',
          'Use it for reviews and handovers.'] },
  { icon: Activity, name: 'History', path: '/history',
    what: 'Your past Copilot sessions.',
    how: ['Open an earlier session to re-read the answer and its sources.'] },
  { icon: Satellite, name: 'Telemetry', path: '/telemetry',
    what: 'Charts and statistics for individual channels.',
    how: ['Click a channel card (for example T-17 Bus Voltage) to load its chart.',
          'The marked limits show where a value becomes a warning or anomaly.',
          'This page currently shows sample data, not a live feed.'] },
]

const PROMPTS = [
  { group: 'Explain an anomaly', items: [
    'Why did the battery bus voltage drop at 14:32 UTC?',
    'Why is battery pack B running warm?',
    'What happened to the star tracker at 03:48 UTC?',
  ]},
  { group: 'Find the evidence', items: [
    'Which log lines and telemetry support the bus voltage drop?',
    'Show the evidence around the BUS-LOW alert.',
  ]},
  { group: 'Get diagnostic steps', items: [
    'Show EPS-07 procedure steps.',
    'What should I check next for the battery temperature rise?',
  ]},
  { group: 'Build a timeline', items: [
    'Build an incident timeline for the BUS-LOW alert.',
  ]},
  { group: 'Look at past incidents', items: [
    'Have we seen a similar thermal excursion before?',
  ]},
]

const TIPS = [
  'Include a time in UTC, a subsystem (EPS, ADCS, Comms) or an ID (EPS-07, T-17). Specific questions get better evidence.',
  'Ask one thing at a time. Split "why did it happen and what do I do" into two questions.',
  'Treat RECOMMENDED statements as suggestions. You decide what to do.',
  'If the answer says "insufficient evidence", the data does not support an answer. Rephrase, or check that the right data source is uploaded.',
]

const PIPELINE = [
  ['Ask', 'You type a question in plain English.'],
  ['Retrieve', 'The system searches mission logs, telemetry summaries, procedures and incident history.'],
  ['Answer', 'The AI writes an answer using only the retrieved evidence.'],
  ['Verify', 'A checker confirms every citation exists and supports the statement.'],
  ['Record', 'The question, answer and sources are saved to the audit log.'],
]

/* ---------------------------- small pieces ---------------------------- */

const label = { fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.08em' }

function Section({ id, icon: Icon, title, children }) {
  return (
    <section id={id} style={{
      background: 'var(--bg2)', border: '1px solid var(--line)',
      borderRadius: 16, padding: 24, marginBottom: 20, scrollMarginTop: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Icon size={18} color="var(--cyan)" />
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Step({ n, title, children }) {
  return (
    <div style={{ display: 'flex', gap: 14, padding: '12px 0' }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: 'var(--cyan-dim)', border: '1px solid var(--cyan)', color: 'var(--cyan)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
      }}>{n}</div>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2, lineHeight: 1.55 }}>{children}</div>
      </div>
    </div>
  )
}

function Fact({ k, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '8px 0', fontSize: 14, flexWrap: 'wrap' }}>
      <span style={{ ...label, width: 130, flexShrink: 0, paddingTop: 2 }}>{k}</span>
      <span style={{ flex: 1, minWidth: 200, lineHeight: 1.55 }}>{children}</span>
    </div>
  )
}

/* ------------------------------- page ------------------------------- */

export default function ManualPage() {
  const nav = useNavigate()
  const jump = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const ask = q => nav('/copilot', { state: { q } })

  return (
    <div style={{ maxWidth: 940 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ ...label, marginBottom: 8 }}>USER MANUAL</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 }}>How to use Orbit Oracle</h1>
          <Button onClick={() => nav('/copilot')}>Open Copilot →</Button>
        </div>
        <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 14 }}>
          A short guide to operating the website, asking the Copilot good questions, and understanding what Orbit Oracle is.
        </p>
      </div>

      {/* Jump links */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => jump(s.id)} style={{
            padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600,
            fontFamily: 'var(--mono)', background: 'transparent',
            border: '1px solid var(--line)', color: 'var(--muted)', transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'var(--cyan)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--line)' }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* 1. Getting started */}
      <Section id="start" icon={Rocket} title="Getting started">
        {STEPS.map((s, i) => <Step key={s.t} n={i + 1} title={s.t}>{s.d}</Step>)}
      </Section>

      {/* 2. Pages explained */}
      <Section id="pages" icon={BookOpen} title="Pages explained">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12 }}>
          {PAGES.map(({ icon: Icon, name, path, what, how }) => (
            <div key={name} style={{
              background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 14,
              padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={16} color="var(--cyan)" />
                <span style={{ fontWeight: 700, fontSize: 14 }}>{name}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{what}</div>
              <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, flex: 1 }}>
                {how.map(h => <li key={h}>{h}</li>)}
              </ul>
              <button onClick={() => nav(path)} style={{
                alignSelf: 'flex-start', background: 'none', border: 'none',
                color: 'var(--cyan)', fontSize: 13, fontWeight: 600, padding: 0,
              }}>
                Open {name} →
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Reading answers */}
      <Section id="answers" icon={ShieldCheck} title="Reading a Copilot answer">
        <Fact k="OBSERVED">
          <span className="tag-obs">OBSERVED</span>{' '}
          A fact that is directly supported by a log line, telemetry value or document you can open.
        </Fact>
        <Fact k="RECOMMENDED">
          <span className="tag-rec">RECOMMENDED</span>{' '}
          A suggestion, such as a next check. It is advice, not a fact.
        </Fact>
        <Fact k="CITATIONS">Each statement links to its source. Click one to see the original text.</Fact>
        <Fact k="CONFIDENCE">
          <span style={{ display: 'inline-flex', gap: 6, flexWrap: 'wrap' }}>
            <Badge color="green">80%+ high</Badge>
            <Badge color="amber">50-79% medium</Badge>
            <Badge color="red">under 50% low</Badge>
          </span>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 6 }}>
            Lower confidence means weaker evidence. Verify before acting.
          </div>
        </Fact>
        <Fact k="NO EVIDENCE">
          If the data does not support an answer, the Copilot says <b>insufficient evidence</b> instead of guessing.
        </Fact>
      </Section>

      {/* 4. What to ask */}
      <Section id="ask" icon={MessageSquare} title="What to ask the Copilot">
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Click any question to send it to the Copilot.
        </p>
        {PROMPTS.map(g => (
          <div key={g.group} style={{ marginBottom: 16 }}>
            <div style={{ ...label, marginBottom: 8 }}>{g.group.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.items.map(q => (
                <button key={q} onClick={() => ask(q)} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  textAlign: 'left', padding: '10px 14px', borderRadius: 12, fontSize: 14,
                  background: 'var(--bg3)', border: '1px solid var(--line)', color: 'var(--text)',
                  transition: 'border-color 0.18s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}>
                  <span>{q}</span>
                  <span style={{ color: 'var(--cyan)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>Try it →</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          background: 'var(--amber-dim)', border: '1px solid var(--amber)',
          borderRadius: 14, padding: 16, marginTop: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: 'var(--amber)', fontWeight: 700, fontSize: 14 }}>
            <Lightbulb size={16} /> Tips for better answers
          </div>
          <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.65 }}>
            {TIPS.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </Section>

      {/* 5. About */}
      <Section id="about" icon={Info} title="About Orbit Oracle">
        <p style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 14 }}>
          Orbit Oracle is a mission operations copilot. It helps operators diagnose spacecraft anomalies
          by reading mission logs, telemetry summaries, procedures and past incidents, then answering
          only from that evidence. Every statement is labelled as an observed fact or a recommendation,
          and everything is recorded in an audit trail.
        </p>

        <Fact k="PROJECT">Orbit Oracle · Problem statement ST-10 · TECHFEST 2026-27</Fact>
        <Fact k="TEAM">Sneha Dhonde and Aditya Kadage (Team Orbit Oracle)</Fact>
        <Fact k="MODE"><Badge color="amber">Advisory only</Badge> The Copilot never sends commands to a spacecraft. A human operator decides every action.</Fact>
        <Fact k="DATA"><Badge color="muted">Sample data</Badge> This prototype uses sample data. Telemetry is not a live feed, and it has not been validated on real flight data.</Fact>

        <div style={{ ...label, margin: '18px 0 10px' }}>HOW IT WORKS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 10 }}>
          {PIPELINE.map(([name, text], i) => (
            <div key={name} style={{
              background: 'var(--bg3)', border: '1px solid var(--line)', borderRadius: 14, padding: 14,
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>
                {i + 1}. {name.toUpperCase()}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 6, lineHeight: 1.5 }}>{text}</div>
            </div>
          ))}
        </div>

        <div style={{ ...label, margin: '18px 0 10px' }}>OUR PRINCIPLES</div>
        <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>
          <li><b>Evidence first:</b> no source, no answer.</li>
          <li><b>Facts and advice are separate:</b> OBSERVED and RECOMMENDED are never mixed.</li>
          <li><b>Verify, do not trust:</b> citations are checked before they are shown.</li>
          <li><b>Everything is recorded:</b> any answer can be replayed from the audit log.</li>
          <li><b>Advisory only:</b> humans stay in control.</li>
        </ul>

        <div style={{ ...label, margin: '18px 0 10px' }}>BUILT WITH</div>
        <Fact k="FRONTEND">React, Vite, React Router, Recharts, Framer Motion, Axios, Lucide icons</Fact>
        <Fact k="BACKEND (PLANNED)">Python FastAPI, ChromaDB with sentence-transformers for retrieval, Gemini or Groq for the AI model, Supabase Postgres for storage</Fact>
      </Section>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)', padding: '8px 0 24px' }}>
        Advisory only. Verify against sources.
      </p>
    </div>
  )
}