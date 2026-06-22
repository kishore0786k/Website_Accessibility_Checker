import SeverityBadge from './SeverityBadge'

const IssueCard = ({ issue, selected, onSelect }) => (
  <button
    type="button"
    className={`issue-card ${selected ? 'selected' : ''}`}
    onClick={() => onSelect(issue)}
  >
    <span className="issue-card-top">
      <SeverityBadge severity={issue.severity} />
      <span>{issue.detail}</span>
    </span>
    <strong>{issue.problem}</strong>
    <span>{issue.fix}</span>
  </button>
)

export default IssueCard

