import SeverityBadge from './SeverityBadge'

const LearningPanel = ({ issue, passed }) => (
  <section className="panel learning-panel" id="learning" aria-labelledby="learning-heading">
    <div className="panel-heading">
      <div>
        <span className="section-label">Learning</span>
        <h2 id="learning-heading">{issue ? issue.problem : 'Passed checks'}</h2>
      </div>
      {issue ? <SeverityBadge severity={issue.severity} /> : null}
    </div>

    {issue ? (
      <div className="learning-content">
        <p>{issue.explanation}</p>
        <div>
          <h3>Why it matters</h3>
          <p>{issue.why}</p>
        </div>
        <div>
          <h3>Recommended fix</h3>
          <p>{issue.fix}</p>
        </div>
        <div className="code-pair">
          <div>
            <span>Bad code</span>
            <pre>{issue.badCode}</pre>
          </div>
          <div>
            <span>Corrected code</span>
            <pre>{issue.goodCode}</pre>
          </div>
        </div>
      </div>
    ) : (
      <div className="passed-list">
        {passed.map((check) => (
          <span key={check.id}>{check.label}</span>
        ))}
      </div>
    )}
  </section>
)

export default LearningPanel

