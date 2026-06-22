const TrendChart = ({ history }) => {
  const points = history.slice(0, 8).reverse()
  const max = 100
  const width = 280
  const height = 96
  const step = points.length > 1 ? width / (points.length - 1) : width
  const coordinates = points.map((scan, index) => ({
    x: index * step,
    y: height - (scan.score / max) * height,
    score: scan.score,
  }))
  const path = coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return (
    <section className="panel trend-panel" aria-labelledby="trend-heading">
      <div className="panel-heading">
        <div>
          <span className="section-label">Score Trend</span>
          <h2 id="trend-heading">Last scans</h2>
        </div>
      </div>
      {points.length ? (
        <svg className="trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Accessibility score trend">
          <path className="trend-grid" d="M0 24H280M0 48H280M0 72H280" />
          <path className="trend-line" d={path} />
          {coordinates.map((point) => (
            <circle key={`${point.x}-${point.score}`} cx={point.x} cy={point.y} r="4" />
          ))}
        </svg>
      ) : (
        <div className="empty-state compact">Run scans to build a score trend.</div>
      )}
    </section>
  )
}

export default TrendChart

