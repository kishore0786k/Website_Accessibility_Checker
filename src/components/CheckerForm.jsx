const CheckerForm = ({
  html,
  onHtmlChange,
  onAnalyze,
  samples,
  selectedSample,
  onSampleChange,
}) => (
  <section className="panel checker-panel" id="checker" aria-labelledby="checker-heading">
    <div className="panel-heading">
      <div>
        <span className="section-label">New Scan</span>
        <h2 id="checker-heading">Paste HTML or webpage content</h2>
      </div>
      <select value={selectedSample} onChange={(event) => onSampleChange(event.target.value)}>
        <option value="">Load sample websites</option>
        {samples.map((sample) => (
          <option value={sample.id} key={sample.id}>
            {sample.name}
          </option>
        ))}
      </select>
    </div>

    <textarea
      value={html}
      onChange={(event) => onHtmlChange(event.target.value)}
      spellCheck="false"
      aria-label="HTML or webpage content to analyze"
      placeholder="<html lang='en'>..."
    />

    <div className="checker-footer">
      <p>{html.length.toLocaleString()} characters ready for analysis</p>
      <button type="button" className="button primary" onClick={onAnalyze}>
        Analyze Accessibility
      </button>
    </div>
  </section>
)

export default CheckerForm

