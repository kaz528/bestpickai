import '../styles/Header.css'

export default function Header({ device, setDevice, onHome }) {
  return (
    <header className="header">
      <div className="header-inner">

        <div className="logo" onClick={onHome} style={{cursor:'pointer'}}>
          <span className="logo-icon">◈</span>
          <span className="logo-text">BestPick<span className="logo-ai">AI</span></span>
        </div>

        <div className="device-tabs">
          <button
            className={`tab ${device === 'phone' ? 'active' : ''}`}
            onClick={() => setDevice('phone')}
          >
            📱 Phones
          </button>
          <button
            className={`tab ${device === 'laptop' ? 'active' : ''}`}
            onClick={() => setDevice('laptop')}
          >
            💻 Laptops
          </button>
        </div>

        <div className="tagline">AI-powered picks</div>

      </div>
    </header>
  )
}