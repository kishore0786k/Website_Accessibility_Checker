import IssueCard from './IssueCard'

const filters = ['All', 'Critical', 'Warning', 'Info']

const IssueList = ({
  issues,
  selectedIssue,
  onSelectIssue,
  search,
  onSearchChange,
  severityFilter,
  onSeverityFilterChange,
}) => {
  const query = search.trim().toLowerCase()
  const visibleIssues = issues.filter((issue) => {
    const matchesSeverity = severityFilter === 'All' || issue.severity === severityFilter
    const searchable = `${issue.problem} ${issue.detail} ${issue.fix}`.toLowerCase()
    return matchesSeverity && (!query || searchable.includes(query))
  })

  return (
    <section className="panel results-panel" aria-labelledby="results-heading">
      <div className="panel-heading">
        <div>
          <span className="section-label">Results Dashboard</span>
          <h2 id="results-heading">Issues found</h2>
        </div>
        <span className="result-count">{visibleIssues.length} shown</span>
      </div>

      <div className="results-controls">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search issues"
          aria-label="Search issues"
        />
        <div className="segmented-control" aria-label="Filter by severity">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={severityFilter === filter ? 'active' : ''}
              onClick={() => onSeverityFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="issue-list">
        {visibleIssues.length ? (
          visibleIssues.map((issue) => (
            <IssueCard
              issue={issue}
              key={issue.id}
              selected={selectedIssue?.id === issue.id}
              onSelect={onSelectIssue}
            />
          ))
        ) : (
          <div className="empty-state">No issues match the current filters.</div>
        )}
      </div>
    </section>
  )
}

export default IssueList

