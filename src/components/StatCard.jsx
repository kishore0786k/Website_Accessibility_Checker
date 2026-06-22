const StatCard = ({ label, value, tone = 'neutral', helper }) => (
  <div className={`stat-card ${tone}`}>
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{helper}</small>
  </div>
)

export default StatCard

