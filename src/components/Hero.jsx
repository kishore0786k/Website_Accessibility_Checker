const Hero = ({ score, stats, onLoadCleanSample }) => (
  <section className="hero-panel" id="dashboard" aria-labelledby="hero-title">
    <div className="hero-copy">
      <h1 id="hero-title">Website Accessibility Checker Dashboard</h1>
      <p>
        Audit pasted HTML, catch common WCAG blockers, and turn every finding
        into a practical fix your team can ship.
      </p>
      <div className="hero-actions">
        <a className="button primary" href="#checker">
          New Scan
        </a>
        <button type="button" className="button secondary" onClick={onLoadCleanSample}>
          Load Clean Sample
        </button>
      </div>
    </div>

    <div className="hero-metrics" aria-label="Current scan summary">
      <div>
        <span className="metric-label">Current score</span>
        <strong>{score}</strong>
      </div>
      <div>
        <span className="metric-label">Issues</span>
        <strong>{stats.totalIssues}</strong>
      </div>
      <div>
        <span className="metric-label">Passed</span>
        <strong>{stats.passedChecks}</strong>
      </div>
    </div>
  </section>
)

export default Hero

