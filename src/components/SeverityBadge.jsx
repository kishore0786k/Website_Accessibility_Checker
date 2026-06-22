const SeverityBadge = ({ severity }) => (
  <span className={`severity-badge ${severity.toLowerCase()}`}>{severity}</span>
)

export default SeverityBadge

