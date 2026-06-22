const Icon = ({ children, className = '' }) => (
  <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    {children}
  </svg>
)

export const ShieldIcon = () => (
  <Icon>
    <path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 9.8 4.1-1.4 7-5.4 7-9.8V6l-7-3Z" />
    <path d="m9 12 2 2 4-5" />
  </Icon>
)

export const ScanIcon = () => (
  <Icon>
    <path d="M4 7V5a1 1 0 0 1 1-1h2" />
    <path d="M17 4h2a1 1 0 0 1 1 1v2" />
    <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
    <path d="M7 20H5a1 1 0 0 1-1-1v-2" />
    <path d="M7 12h10" />
    <path d="M12 7v10" />
  </Icon>
)

export const HistoryIcon = () => (
  <Icon>
    <path d="M4 12a8 8 0 1 0 2.3-5.7" />
    <path d="M4 5v5h5" />
    <path d="M12 8v5l3 2" />
  </Icon>
)

export const LearnIcon = () => (
  <Icon>
    <path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4V4Z" />
    <path d="M9 8h6" />
    <path d="M9 12h5" />
  </Icon>
)

export const ExportIcon = () => (
  <Icon>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </Icon>
)

export const SunIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.9 4.9 1.4 1.4" />
    <path d="m17.7 17.7 1.4 1.4" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m4.9 19.1 1.4-1.4" />
    <path d="m17.7 6.3 1.4-1.4" />
  </Icon>
)

export const MoonIcon = () => (
  <Icon>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
  </Icon>
)

