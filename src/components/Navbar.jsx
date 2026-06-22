import ThemeToggle from './ThemeToggle'
import { ExportIcon, HistoryIcon, LearnIcon, ScanIcon, ShieldIcon } from './Icons'

const navItems = [
  { href: '#dashboard', label: 'Dashboard', icon: ShieldIcon },
  { href: '#checker', label: 'Checker', icon: ScanIcon },
  { href: '#learning', label: 'Learning', icon: LearnIcon },
  { href: '#history', label: 'History', icon: HistoryIcon },
]

const Navbar = ({ theme, onToggleTheme, onExport, canExport }) => (
  <header className="navbar">
    <a className="brand" href="#dashboard" aria-label="Website Accessibility Checker home">
      <span className="brand-mark">
        <ShieldIcon />
      </span>
      <span>
        <span className="brand-title">A11yScope</span>
        <span className="brand-subtitle">Accessibility Checker</span>
      </span>
    </a>

    <nav className="nav-links" aria-label="Primary navigation">
      {navItems.map((item) => {
        const ItemIcon = item.icon
        return (
          <a href={item.href} key={item.href}>
            <ItemIcon />
            <span>{item.label}</span>
          </a>
        )
      })}
    </nav>

    <div className="nav-actions">
      <button
        type="button"
        className="button ghost"
        onClick={onExport}
        disabled={!canExport}
      >
        <ExportIcon />
        <span>Export Report</span>
      </button>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </div>
  </header>
)

export default Navbar

