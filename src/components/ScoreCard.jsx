import { useEffect, useRef, useState } from 'react'

const getScoreTone = (score) => {
  if (score >= 90) return 'success'
  if (score >= 70) return 'warning'
  return 'error'
}

const ScoreCard = ({ score, stats }) => {
  const [displayScore, setDisplayScore] = useState(score)
  const scoreRef = useRef(score)
  const tone = getScoreTone(score)

  useEffect(() => {
    let frame
    const start = scoreRef.current
    const difference = score - start
    const startedAt = performance.now()

    const animate = (time) => {
      const progress = Math.min((time - startedAt) / 550, 1)
      const eased = 1 - (1 - progress) ** 3
      const nextScore = Math.round(start + difference * eased)
      scoreRef.current = nextScore
      setDisplayScore(nextScore)
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [score])

  return (
    <section className="panel score-card" aria-labelledby="score-heading">
      <div className="panel-heading">
        <div>
          <span className="section-label">Accessibility Score</span>
          <h2 id="score-heading">{score >= 90 ? 'Healthy build' : 'Needs attention'}</h2>
        </div>
        <span className={`status-dot ${tone}`} aria-label={`${tone} score`} />
      </div>

      <div className="score-ring" style={{ '--score': displayScore }}>
        <span>{displayScore}</span>
        <small>/100</small>
      </div>

      <div className="severity-grid">
        <div>
          <strong>{stats.critical}</strong>
          <span>Critical</span>
        </div>
        <div>
          <strong>{stats.warnings}</strong>
          <span>Warnings</span>
        </div>
        <div>
          <strong>{stats.passedChecks}</strong>
          <span>Passed</span>
        </div>
      </div>
    </section>
  )
}

export default ScoreCard
