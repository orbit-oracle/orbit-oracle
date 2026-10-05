import { createContext, useContext, useState } from 'react'

const CopilotContext = createContext(null)

export function CopilotProvider({ children }) {
  const [history, setHistory]     = useState([])
  const [activeId, setActiveId]   = useState(null)
  const [loading, setLoading]     = useState(false)

  const addSession = (session) => {
    setHistory(prev => [session, ...prev])
    setActiveId(session.id)
  }

  const clearHistory = () => { setHistory([]); setActiveId(null) }

  return (
    <CopilotContext.Provider value={{
      history, activeId, setActiveId, loading, setLoading, addSession, clearHistory
    }}>
      {children}
    </CopilotContext.Provider>
  )
}

export const useCopilot = () => useContext(CopilotContext)