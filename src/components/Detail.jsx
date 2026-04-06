import '../styles/Detail.css'

export default function Detail({ item, setView, toggleCompare, compareList }) {
  const inCompare = compareList.find(i => i.id === item.id)

  return (
    <div className="detail-page">
      <div className="detail-inner">
        <button className="back-btn" onClick={() => setView('results')}>← Back to results</button>

        <div className="detail-card">
          <div className="detail-hero">
            <div className="detail-emoji">{item.emoji}</div>
            <div className="detail-info">
              <h1 className="detail-name">{item.name}</h1>
              <div className="detail-price">${item.price}</div>
              <div className="match-pill" style={{
                background: item.match >= 90 ? 'rgba(0,229,160,0.15)' : 'rgba(108,99,255,0.15)',
                color: item.match >= 90 ? '#00e5a0' : '#6c63ff'
              }}>
                {item.match}% match for you
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Specs</div>
            <div className="specs-grid">
              {Object.entries(item.specs).map(([k, v]) => (
                <div key={k} className="spec-item">
                  <div className="spec-key">{k}</div>
                  <div className="spec-val">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Why we picked this</div>
            <div className="why-box">
              <span className="why-icon">✓</span>
              {item.why}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Tradeoffs to know</div>
            <div className="tradeoff-box">
              <span className="tradeoff-icon">!</span>
              {item.tradeoff}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-label">Where to buy</div>
            <div className="buy-links">
              {item.links.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" className="buy-btn">
                  {name} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`compare-toggle ${inCompare ? 'active' : ''}`}
              onClick={() => toggleCompare(item)}
              disabled={!inCompare && compareList.length >= 3}
            >
              {inCompare ? '✓ Added to compare' : '+ Add to compare'}
            </button>
            {compareList.length >= 2 && (
              <button className="go-compare" onClick={() => setView('compare')}>
                Compare {compareList.length} devices →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}