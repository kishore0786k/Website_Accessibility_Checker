import { useEffect, useMemo, useState } from 'react'
import CheckerForm from '../components/CheckerForm'
import Hero from '../components/Hero'
import HistoryPanel from '../components/HistoryPanel'
import IssueList from '../components/IssueList'
import LearningPanel from '../components/LearningPanel'
import Navbar from '../components/Navbar'
import ScoreCard from '../components/ScoreCard'
import StatCard from '../components/StatCard'
import TrendChart from '../components/TrendChart'
import { sampleSites } from '../data/sampleSites'
import { analyzeAccessibility } from '../utils/accessibilityEngine'
import { downloadReport } from '../utils/report'
import { loadHistory, loadTheme, saveHistory, saveTheme } from '../utils/storage'

const firstSample = sampleSites[0]

const Dashboard = () => {
  const [html, setHtml] = useState(firstSample.html)
  const [selectedSample, setSelectedSample] = useState(firstSample.id)
  const [result, setResult] = useState(() => analyzeAccessibility(firstSample.html))
  const [history, setHistory] = useState(() => loadHistory())
  const [theme, setTheme] = useState(() => loadTheme())
  const [selectedIssueId, setSelectedIssueId] = useState(() => result.issues[0]?.id || null)
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState('All')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  const selectedIssue = useMemo(
    () => result.issues.find((issue) => issue.id === selectedIssueId) || result.issues[0] || null,
    [result.issues, selectedIssueId],
  )

  const handleAnalyze = () => {
    const nextResult = analyzeAccessibility(html)
    setResult(nextResult)
    setSelectedIssueId(nextResult.issues[0]?.id || null)
    setSearch('')
    setSeverityFilter('All')

    const scan = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      score: nextResult.score,
      issueCount: nextResult.stats.totalIssues,
    }
    const nextHistory = [scan, ...history].slice(0, 12)
    setHistory(nextHistory)
    saveHistory(nextHistory)
  }

  const handleSampleChange = (sampleId) => {
    setSelectedSample(sampleId)
    const sample = sampleSites.find((item) => item.id === sampleId)
    if (sample) {
      setHtml(sample.html)
    }
  }

  const loadCleanSample = () => {
    const clean = sampleSites.find((sample) => sample.id === 'clean-docs')
    if (!clean) return
    setSelectedSample(clean.id)
    setHtml(clean.html)
    const nextResult = analyzeAccessibility(clean.html)
    setResult(nextResult)
    setSelectedIssueId(nextResult.issues[0]?.id || null)
  }

  const deleteScan = (scanId) => {
    const nextHistory = history.filter((scan) => scan.id !== scanId)
    setHistory(nextHistory)
    saveHistory(nextHistory)
  }

  const clearHistory = () => {
    setHistory([])
    saveHistory([])
  }

  return (
    <div className="app-shell">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        onExport={() => downloadReport(result)}
        canExport={Boolean(result)}
      />

      <main className="dashboard-layout">
        <Hero score={result.score} stats={result.stats} onLoadCleanSample={loadCleanSample} />

        <section className="quick-stats" aria-label="Quick statistics">
          <StatCard label="Critical Issues" value={result.stats.critical} tone="error" helper="Blocker-level fixes" />
          <StatCard label="Warnings" value={result.stats.warnings} tone="warning" helper="Review before release" />
          <StatCard label="Passed Checks" value={result.stats.passedChecks} tone="success" helper="Rules without findings" />
          <StatCard label="Total Issues Found" value={result.stats.totalIssues} helper="Across all checks" />
        </section>

        <div className="workspace-grid">
          <div className="workspace-main">
            <CheckerForm
              html={html}
              onHtmlChange={setHtml}
              onAnalyze={handleAnalyze}
              samples={sampleSites}
              selectedSample={selectedSample}
              onSampleChange={handleSampleChange}
            />
            <IssueList
              issues={result.issues}
              selectedIssue={selectedIssue}
              onSelectIssue={(issue) => setSelectedIssueId(issue.id)}
              search={search}
              onSearchChange={setSearch}
              severityFilter={severityFilter}
              onSeverityFilterChange={setSeverityFilter}
            />
          </div>

          <aside className="workspace-side" aria-label="Scan insights">
            <ScoreCard score={result.score} stats={result.stats} />
            <LearningPanel issue={selectedIssue} passed={result.passed} />
            <TrendChart history={history} />
            <HistoryPanel history={history} onDelete={deleteScan} onClear={clearHistory} />
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

