const HISTORY_KEY = 'a11y-dashboard:scan-history:v1'
const THEME_KEY = 'a11y-dashboard:theme:v1'

export const loadHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 12)))
}

export const loadTheme = () => localStorage.getItem(THEME_KEY) || 'dark'

export const saveTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme)
}

