export const downloadReport = (result) => {
  if (!result) return

  const lines = [
    'Website Accessibility Checker Report',
    `Generated: ${new Date().toLocaleString()}`,
    `Overall score: ${result.score}/100`,
    `Critical issues: ${result.stats.critical}`,
    `Warnings: ${result.stats.warnings}`,
    `Info: ${result.stats.info}`,
    `Passed checks: ${result.stats.passedChecks}`,
    '',
    'Issues',
    ...result.issues.flatMap((issue, index) => [
      `${index + 1}. [${issue.severity}] ${issue.problem}`,
      `   Detail: ${issue.detail}`,
      `   Why it matters: ${issue.why}`,
      `   Recommended fix: ${issue.fix}`,
      '',
    ]),
    'Passed Checks',
    ...result.passed.map((check) => `- ${check.label}`),
  ]

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `accessibility-report-${Date.now()}.txt`
  anchor.click()
  URL.revokeObjectURL(url)
}

