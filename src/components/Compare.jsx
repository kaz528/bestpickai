import '../styles/Compare.css'

export default function Compare({ compareList, setView, setSelectedItem }) {
  const allSpecs = [...new Set(compareList.flatMap(d => Object.keys(d.specs)))]

  return (
    <div className="compare-page">
      <div className="compare-inner">
        <div className="compare-top">
          <h2>Comparing {compareList.length} devices</h2>
          <button className="back-btn" onClick={() => setView('results')}>← Back to results</button>
        </div>

        <div className="compare-heroes">
          {compareList.map(item => (
            <div key={item.id} className="compare-hero-card">
              <div className="compare-emoji">{item.emoji}</div>
              <div className="compare-name">{item.name}</div>
              <div className="compare-price">${item.price}</div>
              <div className="match-pill" style={{
                background: item.match >= 90 ? 'rgba(0,229,160,0.15)' : 'rgba(108,99,255,0.15)',
                color: item.match >= 90 ? '#00e5a0' : '#6c63ff'
              }}>
                {item.match}% match
              </div>
              <button
                className="view-detail-btn"
                onClick={() => { setSelectedItem(item); setView('detail') }}
              >
                View full details
              </button>
            </div>
          ))}
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                {compareList.map(d => <th key={d.id}>{d.name}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="why-row">
                <td className="spec-label-cell">Why pick it</td>
                {compareList.map(d => (
                  <td key={d.id} className="why-cell">{d.why}</td>
                ))}
              </tr>
              <tr className="tradeoff-row">
                <td className="spec-label-cell">Tradeoffs</td>
                {compareList.map(d => (
                  <td key={d.id} className="tradeoff-cell">{d.tradeoff}</td>
                ))}
              </tr>
              {allSpecs.map(spec => (
                <tr key={spec}>
                  <td className="spec-label-cell">{spec}</td>
                  {compareList.map(d => (
                    <td key={d.id}>{d.specs[spec] || '—'}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="spec-label-cell">Buy links</td>
                {compareList.map(d => (
                  <td key={d.id}>
                    <div className="compare-buy-links">
                      {d.links.map(([name, url]) => (
                        <a key={name} href={url} target="_blank" rel="noreferrer" className="compare-buy-btn">
                          {name} ↗
                        </a>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}