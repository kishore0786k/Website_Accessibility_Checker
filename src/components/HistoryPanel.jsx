const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

const HistoryPanel = ({ history, onDelete, onClear }) => (
  <section className="panel history-panel" id="history" aria-labelledby="history-heading">
    <div className="panel-heading">
      <div>
        <span className="section-label">History</span>
        <h2 id="history-heading">Recent scans</h2>
      </div>
      <button type="button" className="text-button" onClick={onClear} disabled={!history.length}>
        Clear history
      </button>
    </div>

    <div className="history-list">
      {history.length ? (
        history.map((scan) => (
          <div className="history-row" key={scan.id}>
            <div>
              <strong>{scan.score}/100</strong>
              <span>{formatDate(scan.date)}</span>
            </div>
            <div>
              <span>{scan.issueCount} issues</span>
              <button
                type="button"
                className="icon-button danger"
                onClick={() => onDelete(scan.id)}
                aria-label={`Delete scan from ${formatDate(scan.date)}`}
                title="Delete scan"
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M6 7l1 14h10l1-14" />
                  <path d="M9 7V4h6v3" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state compact">No scans saved yet.</div>
      )}
    </div>
  </section>
)

export default HistoryPanel

