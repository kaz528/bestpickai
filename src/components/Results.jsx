import { useState } from 'react'
import '../styles/Results.css'

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

        <div className="feedback-wrap">
          <p className="feedback-title">Were these suggestions accurate?</p>
          <div className="feedback-btns">
            <button onClick={() => alert('Thanks for the feedback! 👍')}>👍 Yes, great!</button>
            <button onClick={() => alert('Sorry about that! We\'ll improve 🙏')}>👎 Not really</button>
          </div>
        </div>
      </div>
    </div>
  )
}