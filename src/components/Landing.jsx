import '../styles/Landing.css'

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <div className="landing-bg">
        <div className="orb orb1"/>
        <div className="orb orb2"/>
        <div className="orb orb3"/>
      </div>

      <div className="landing-content">
        <div className="landing-badge">✦ AI-Powered Tech Advisor</div>

        <h1 className="landing-title">
          Find your perfect
          <span className="gradient-word"> device</span>
          <br/>with AI
        </h1>

        <p className="landing-desc">
          Tell us what you need. We'll find the best phones and laptops
          that match your lifestyle, budget, and preferences.
        </p>

        <div className="landing-features">
          <div className="feature-pill">📱 Phones</div>
          <div className="feature-pill">💻 Laptops</div>
          <div className="feature-pill">🤖 Real AI</div>
          <div className="feature-pill">⚡ Instant results</div>
        </div>

        <button className="start-btn" onClick={onStart}>
          <span>Find my device</span>
          <span className="start-arrow">→</span>
        </button>

        <p className="landing-hint">No sign up needed · Completely free</p>
      </div>
    </div>
  )
}