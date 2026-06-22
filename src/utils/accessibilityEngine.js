const POOR_LINK_TEXT = new Set([
  'click here',
  'here',
  'learn more',
  'read more',
  'more',
  'link',
  'this',
  'go',
])

const ISSUE_DETAILS = {
  imageAlt: {
    problem: 'Missing image alt text',
    why: 'Screen reader users need meaningful alternatives for informative images.',
    fix: 'Add concise alt text that describes the image purpose, or use alt="" for decorative images.',
    explanation:
      'Alt text gives non-visual users the same context sighted users get from images. Decorative images should still include an empty alt attribute so assistive tech can skip them.',
    badCode: '<img src="/chart.png">',
    goodCode: '<img src="/chart.png" alt="Revenue chart trending upward">',
  },
  formLabel: {
    problem: 'Form control has no label',
    why: 'Labels tell assistive technology what information belongs in each field.',
    fix: 'Connect a visible label with for/id, wrap the control in a label, or add an aria-label for compact controls.',
    explanation:
      'Placeholders disappear after typing and are not a reliable accessible name. A persistent label makes forms easier to scan and complete.',
    badCode: '<input type="email" placeholder="Email">',
    goodCode: '<label for="email">Email</label>\n<input id="email" type="email">',
  },
  emptyButton: {
    problem: 'Button has no accessible name',
    why: 'Unnamed buttons are announced only as "button", leaving users unsure what action will happen.',
    fix: 'Add visible button text or an aria-label for icon-only buttons.',
    explanation:
      'Every interactive control needs a clear accessible name. Icon-only controls are fine when their purpose is exposed through aria-label.',
    badCode: '<button><svg></svg></button>',
    goodCode: '<button aria-label="Open settings"><svg></svg></button>',
  },
  headingHierarchy: {
    problem: 'Heading hierarchy is inconsistent',
    why: 'Headings create the outline screen reader and keyboard users rely on to navigate a page.',
    fix: 'Start with one h1 and avoid skipping heading levels.',
    explanation:
      'Headings should describe page structure, not visual size. Use CSS for styling and keep the semantic levels in order.',
    badCode: '<h1>Dashboard</h1>\n<h4>Revenue</h4>',
    goodCode: '<h1>Dashboard</h1>\n<h2>Revenue</h2>',
  },
  linkText: {
    problem: 'Link text is not descriptive',
    why: 'Screen reader users often navigate by link list, where "click here" has no context.',
    fix: 'Write link text that explains the destination or action.',
    explanation:
      'Descriptive links help everyone scan faster. The link should make sense even when read outside the surrounding sentence.',
    badCode: '<a href="/docs">click here</a>',
    goodCode: '<a href="/docs">Read the accessibility documentation</a>',
  },
  pageTitle: {
    problem: 'Page title is missing',
    why: 'The title identifies the page in browser tabs, bookmarks, and assistive technology.',
    fix: 'Add a concise, unique title element in the document head.',
    explanation:
      'A clear title is the first piece of context many users receive when a page loads or when switching tabs.',
    badCode: '<head></head>',
    goodCode: '<head>\n  <title>Account settings</title>\n</head>',
  },
  lang: {
    problem: 'HTML lang attribute is missing',
    why: 'The lang attribute helps screen readers choose the correct pronunciation rules.',
    fix: 'Set the primary page language on the html element.',
    explanation:
      'Language metadata improves pronunciation, translation, spell checking, and browser accessibility features.',
    badCode: '<html>',
    goodCode: '<html lang="en">',
  },
  duplicateId: {
    problem: 'Duplicate ID found',
    why: 'IDs must be unique so labels, anchors, and ARIA relationships target the right element.',
    fix: 'Rename repeated IDs and update any label or aria references.',
    explanation:
      'Duplicate IDs can send assistive technology to the wrong element and break form label relationships.',
    badCode: '<input id="email">\n<input id="email">',
    goodCode: '<input id="work-email">\n<input id="billing-email">',
  },
  ariaLabel: {
    problem: 'Interactive element needs an accessible name',
    why: 'Assistive technology exposes controls by their accessible name, not by visual icon alone.',
    fix: 'Add visible text, aria-label, or a valid aria-labelledby reference.',
    explanation:
      'ARIA labels are most useful for compact controls, disclosure buttons, and icon-only actions where visible text would be redundant.',
    badCode: '<div role="button">★</div>',
    goodCode: '<div role="button" aria-label="Save item">★</div>',
  },
  contrast: {
    problem: 'Potential low color contrast',
    why: 'Low contrast text is difficult to read for users with low vision or in bright environments.',
    fix: 'Increase the difference between text and background colors to at least 4.5:1 for normal text.',
    explanation:
      'This scanner checks inline color/background pairs. Treat warnings as prompts to verify the exact rendered contrast.',
    badCode: '<p style="color:#94a3b8;background:#cbd5e1">Status</p>',
    goodCode: '<p style="color:#0f172a;background:#f8fafc">Status</p>',
  },
}

const RULES = [
  'imageAlt',
  'formLabel',
  'emptyButton',
  'headingHierarchy',
  'linkText',
  'pageTitle',
  'lang',
  'duplicateId',
  'ariaLabel',
  'contrast',
]

const severityPenalty = {
  Critical: 8,
  Warning: 4,
  Info: 1,
}

let issueSequence = 0

const createIssue = (ruleId, severity, detail = '') => ({
  id: `${ruleId}-${issueSequence++}`,
  ruleId,
  severity,
  detail,
  ...ISSUE_DETAILS[ruleId],
})

const hasAccessibleName = (element, doc) => {
  const text = (element.textContent || '').replace(/\s+/g, ' ').trim()
  if (text && text !== '★' && text !== '☆' && text !== '⚙') {
    return true
  }

  const ariaLabel = element.getAttribute('aria-label')
  if (ariaLabel && ariaLabel.trim()) {
    return true
  }

  const labelledBy = element.getAttribute('aria-labelledby')
  if (labelledBy) {
    return labelledBy
      .split(/\s+/)
      .some((id) => doc.getElementById(id)?.textContent?.trim())
  }

  const title = element.getAttribute('title')
  return Boolean(title && title.trim())
}

const hasFormLabel = (element, doc) => {
  if (hasAccessibleName(element, doc)) {
    return true
  }

  const id = element.getAttribute('id')
  if (id && doc.querySelector(`label[for="${CSS.escape(id)}"]`)) {
    return true
  }

  return Boolean(element.closest('label'))
}

const parseColor = (value) => {
  if (!value) return null
  const color = value.trim().toLowerCase()
  const named = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    green: '#008000',
    blue: '#0000ff',
    gray: '#808080',
    grey: '#808080',
  }
  const normalized = named[color] || color

  if (/^#[0-9a-f]{3}$/i.test(normalized)) {
    return normalized
      .slice(1)
      .split('')
      .map((part) => parseInt(part + part, 16))
  }

  if (/^#[0-9a-f]{6}$/i.test(normalized)) {
    return [
      parseInt(normalized.slice(1, 3), 16),
      parseInt(normalized.slice(3, 5), 16),
      parseInt(normalized.slice(5, 7), 16),
    ]
  }

  const rgb = normalized.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : null
}

const luminance = ([red, green, blue]) => {
  const channel = [red, green, blue].map((value) => {
    const normalized = value / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2]
}

const contrastRatio = (foreground, background) => {
  const light = Math.max(luminance(foreground), luminance(background))
  const dark = Math.min(luminance(foreground), luminance(background))
  return (light + 0.05) / (dark + 0.05)
}

const getInlineColor = (element, property) => {
  const style = element.getAttribute('style') || ''
  const pattern = new RegExp(`${property}\\s*:\\s*([^;]+)`, 'i')
  const match = style.match(pattern)
  return match?.[1]?.trim() || null
}

const tagLabel = (element) => {
  const id = element.getAttribute('id')
  const tag = element.tagName.toLowerCase()
  return id ? `<${tag} id="${id}">` : `<${tag}>`
}

export const analyzeAccessibility = (input) => {
  issueSequence = 0
  const parser = new DOMParser()
  const doc = parser.parseFromString(input || '', 'text/html')
  const issues = []

  doc.querySelectorAll('img').forEach((img, index) => {
    if (!img.hasAttribute('alt')) {
      issues.push(createIssue('imageAlt', 'Critical', `Image ${index + 1} is missing an alt attribute.`))
    } else if (!img.getAttribute('alt')?.trim()) {
      issues.push(createIssue('imageAlt', 'Info', `Image ${index + 1} has empty alt text. Confirm it is decorative.`))
    }
  })

  doc.querySelectorAll('input, select, textarea').forEach((control) => {
    const type = control.getAttribute('type')?.toLowerCase()
    if (['hidden', 'button', 'submit', 'reset'].includes(type)) return
    if (!hasFormLabel(control, doc)) {
      issues.push(createIssue('formLabel', 'Critical', `${tagLabel(control)} does not have a persistent label.`))
    }
  })

  doc.querySelectorAll('button, [role="button"]').forEach((button) => {
    if (!hasAccessibleName(button, doc)) {
      issues.push(createIssue('emptyButton', 'Critical', `${tagLabel(button)} is announced without a useful name.`))
    }
  })

  const headings = [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')]
  if (!headings.some((heading) => heading.tagName.toLowerCase() === 'h1')) {
    issues.push(createIssue('headingHierarchy', 'Warning', 'The page has no h1 heading.'))
  }

  const h1Count = headings.filter((heading) => heading.tagName.toLowerCase() === 'h1').length
  if (h1Count > 1) {
    issues.push(createIssue('headingHierarchy', 'Info', `The page has ${h1Count} h1 headings. Confirm this is intentional.`))
  }

  headings.reduce((previousLevel, heading) => {
    const level = Number(heading.tagName.slice(1))
    if (previousLevel && level - previousLevel > 1) {
      issues.push(createIssue('headingHierarchy', 'Warning', `${heading.tagName.toLowerCase()} follows h${previousLevel}, skipping a level.`))
    }
    return level
  }, 0)

  doc.querySelectorAll('a[href]').forEach((link) => {
    const text = (link.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase()
    if (POOR_LINK_TEXT.has(text)) {
      issues.push(createIssue('linkText', 'Warning', `"${link.textContent.trim()}" does not describe the destination.`))
    }
  })

  const title = doc.querySelector('title')?.textContent?.trim()
  if (!title) {
    issues.push(createIssue('pageTitle', 'Critical', 'The document head does not include a useful title.'))
  }

  const lang = doc.documentElement.getAttribute('lang')
  if (!lang?.trim()) {
    issues.push(createIssue('lang', 'Critical', 'The html element does not declare a language.'))
  }

  const ids = new Map()
  doc.querySelectorAll('[id]').forEach((element) => {
    const id = element.getAttribute('id')
    ids.set(id, (ids.get(id) || 0) + 1)
  })
  ids.forEach((count, id) => {
    if (count > 1) {
      issues.push(createIssue('duplicateId', 'Critical', `The ID "${id}" appears ${count} times.`))
    }
  })

  doc.querySelectorAll('[role], [aria-haspopup], [aria-expanded]').forEach((element) => {
    const role = element.getAttribute('role')
    const isNamedRole = ['button', 'link', 'img', 'menuitem', 'switch', 'tab'].includes(role)
    if ((isNamedRole || element.hasAttribute('aria-haspopup')) && !hasAccessibleName(element, doc)) {
      issues.push(createIssue('ariaLabel', 'Warning', `${tagLabel(element)} needs an accessible name.`))
    }
  })

  doc.querySelectorAll('[style]').forEach((element) => {
    const color = parseColor(getInlineColor(element, 'color'))
    const background = parseColor(getInlineColor(element, 'background-color') || getInlineColor(element, 'background'))
    if (color && background) {
      const ratio = contrastRatio(color, background)
      if (ratio < 4.5) {
        issues.push(createIssue('contrast', 'Warning', `${tagLabel(element)} has an estimated contrast ratio of ${ratio.toFixed(2)}:1.`))
      }
    }
  })

  const ruleIdsWithIssues = new Set(issues.map((issue) => issue.ruleId))
  const passed = RULES.filter((ruleId) => !ruleIdsWithIssues.has(ruleId)).map((ruleId) => ({
    id: ruleId,
    label: ISSUE_DETAILS[ruleId].problem,
  }))
  const deductions = issues.reduce((total, issue) => total + severityPenalty[issue.severity], 0)
  const score = Math.max(0, Math.round(100 - deductions))

  return {
    score,
    issues,
    passed,
    stats: {
      critical: issues.filter((issue) => issue.severity === 'Critical').length,
      warnings: issues.filter((issue) => issue.severity === 'Warning').length,
      info: issues.filter((issue) => issue.severity === 'Info').length,
      totalIssues: issues.length,
      passedChecks: passed.length,
    },
  }
}
