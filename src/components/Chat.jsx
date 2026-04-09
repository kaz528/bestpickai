import { useState, useRef, useEffect } from 'react'
import { getAIRecommendations } from '../gemini'
import { QUESTIONS, DEVICES } from '../devices'
import '../styles/Chat.css'

export default function Chat({ device, budget, setBudget, setResults, setView }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    setMessages([{ role: 'ai', text: QUESTIONS[device][0] }])
    setStep(0)
    setAnswers([])
    setDone(false)
  }, [device])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, loading])

  const send = () => {
    if (!input.trim() || loading || done) return
    const val = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: val }])
    const newAnswers = [...answers, val]
    setAnswers(newAnswers)

    if (step < QUESTIONS[device].length - 1) {
      setLoading(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: QUESTIONS[device][step + 1] }])
        setStep(s => s + 1)
        setLoading(false)
      }, 800)
    } else {
      setLoading(true)
      setDone(true)
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: "Perfect! Analyzing your needs and finding the best matches... ✨" }])
        setTimeout(() => generateResults(newAnswers), 1000)
      }, 800)
    }
  }

  const generateResults = async (ans) => {
    const ranges = {
      '$0 – $300': [0, 300],
      '$0 – $500': [0, 500],
      '$0 – $800': [0, 800],
      '$0 – $1200': [0, 1200],
      '$0 – $1500+': [0, 99999]
    }
    const [min, max] = ranges[budget] || [0, 99999]
    const pool = DEVICES[device].filter(d => d.price >= min && d.price <= max + 150)
    const fallbackPool = pool.length >= 3 ? pool : DEVICES[device].slice(0, 8)
    const finalPool = pool.length >= 3 ? pool : fallbackPool

    try {
      const aiResults = await getAIRecommendations(device, ans, budget, finalPool)
      const scored = aiResults
        .map(r => {
          const found = finalPool.find(d => d.id === r.id)
          return found ? { ...found, match: r.match } : null
        })
        .filter(Boolean)

      let final = scored
      if (final.length < 3) {
        const extras = finalPool
          .filter(d => !final.find(f => f.id === d.id))
          .slice(0, 3 - final.length)
        final = [...final, ...extras]
      }

      setResults(final)
    } catch (err) {
      console.error('Gemini error:', err)
      let fallback = finalPool.filter(d => d.price >= min && d.price <= max)
      if (fallback.length < 3) fallback = finalPool.slice(0, 3)
      setResults(fallback.slice(0, 6))
    }

    setLoading(false)
    setView('results')
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-messages" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.role === 'ai' && <div className="ai-avatar">◈</div>}
              <div className="bubble-text">{m.text}</div>
            </div>
          ))}
          {loading && (
  <div className="bubble ai">
    <div className="ai-avatar">◈</div>
    <div className="bubble-text typing-dots">
      <span/><span/><span/>
    </div>
  </div>
)}
{done && loading && (
  <div className="generating-msg">
    ✨ AI is analyzing your needs and finding the best matches...
  </div>
)}

        <div className="budget-bar">
          <span className="budget-label">Budget</span>
          <div className="budget-ranges">
            {['$0 – $300','$0 – $500','$0 – $800','$0 – $1200','$0 – $1500+'].map(r => (
              <button
                key={r}
                className={`range-btn ${budget === r ? 'active' : ''}`}
                onClick={() => setBudget(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={done ? "Generating results..." : "Type your answer..."}
            disabled={done}
          />
          <button className="send-btn" onClick={send} disabled={done || loading}>
            ↑
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}