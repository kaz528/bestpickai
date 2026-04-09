import { useState } from 'react'
import '../styles/Results.css'
import { useState } from 'react'
import supabase from '../supabase'

export default function Results({ results, compareList, toggleCompare, setSelectedItem, setView, budget, setBudget, startNewSearch }) {
  const [sort, setSort] = useState('match')

  const sorted = [...results].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price
    if (sort === 'price_desc') return b.price - a.price
    return b.match - a.match
  })

  const openDetail = (item) => {
    setSelectedItem(item)
    setView('detail')
  }

  const inCompare = (item) => compareList.find(i => i.id === item.id)

  return (
    <div className="results-page">
      <div className="results-inner">
        <div className="results-top">
          <div>
            <h2 className="results-title">{results.length} picks for you</h2>
            <p className="results-sub">Click a card to see full details</p>
          </div>
          <div className="results-controls">
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="match">Best match</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
            <button className="back-btn" onClick={startNewSearch}>← New search</button>
          </div>

        </div>

        {compareList.length >= 2 && (
          <div className="compare-bar">
            <span>🔍 {compareList.length} selected for compare</span>
            <button onClick={() => setView('compare')}>Compare now →</button>
          </div>
        )}

        <div className="cards-grid">
          {sorted.map(item => (
            <div key={item.id} className={`device-card ${inCompare(item) ? 'in-compare' : ''}`}>
              <div className="card-top" onClick={() => openDetail(item)}>
                <div className="card-emoji">{item.emoji}</div>
                <div className="match-pill" style={{
                  background: item.match >= 90 ? 'rgba(0,229,160,0.15)' : item.match >= 75 ? 'rgba(108,99,255,0.15)' : 'rgba(255,179,71,0.15)',
                  color: item.match >= 90 ? '#00e5a0' : item.match >= 75 ? '#6c63ff' : '#ffb347'
                }}>
                  {item.match}% match
                </div>
              </div>
              <div className="card-body" onClick={() => openDetail(item)}>
                <div className="card-name">{item.name}</div>
                <div className="card-price">${item.price}</div>
                <div className="match-bar-wrap">
                  <div className="match-bar">
                    <div className="match-fill" style={{
                      width: item.match + '%',
                      background: item.match >= 90 ? '#00e5a0' : item.match >= 75 ? '#6c63ff' : '#ffb347'
                    }}/>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="detail-btn" onClick={() => openDetail(item)}>View details</button>
                <button
                  className={`compare-btn ${inCompare(item) ? 'active' : ''}`}
                  onClick={() => toggleCompare(item)}
                  disabled={!inCompare(item) && compareList.length >= 3}
                >
                  {inCompare(item) ? '✓ Added' : '+ Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <FeedbackSection device={results[0]?.name} />
      </div>
    </div>
  )
}

function FeedbackSection({ device }) {
  const [thumb, setThumb] = useState(null)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = async () => {
    await supabase.from('feedback').insert({
      thumb,
      comment,
      device_type: device
    })
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="feedback-wrap">
      <p style={{color:'var(--green)', fontSize:'14px'}}>
        ✓ Thanks for your feedback! It helps us improve.
      </p>
    </div>
  )

  return (
    <div className="feedback-wrap">
      <p className="feedback-title">Were these suggestions accurate?</p>
      <div className="feedback-btns">
        <button
          onClick={() => setThumb('up')}
          style={{borderColor: thumb === 'up' ? 'var(--green)' : ''}}
        >
          👍 Yes, great!
        </button>
        <button
          onClick={() => setThumb('down')}
          style={{borderColor: thumb === 'down' ? '#ff6584' : ''}}
        >
          👎 Not really
        </button>
      </div>
      {thumb && (
        <>
          <textarea
            style={{
              width:'100%', marginTop:'12px', padding:'10px 12px',
              background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
              borderRadius:'12px', color:'var(--text)', fontFamily:'inherit',
              fontSize:'13px', resize:'vertical', minHeight:'70px'
            }}
            placeholder="Optional: what was wrong or missing?"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button
            onClick={submit}
            style={{
              marginTop:'8px', padding:'9px 24px',
              background:'linear-gradient(135deg, #945dff, #00d4ff)',
              border:'none', borderRadius:'12px', color:'white',
              fontSize:'13px', fontFamily:'inherit', cursor:'pointer'
            }}
          >
            Submit feedback
          </button>
        </>
      )}
    </div>
  )
}