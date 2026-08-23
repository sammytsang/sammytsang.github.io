import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { useActiveSection } from '../../hooks/useActiveSection'
import { profile } from '../../data/profile'
import { EASE_OUT } from '../../lib/motion'

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'background', label: 'Background' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

function NavLink({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick?: () => void }) {
  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className="relative px-0.5 py-1.5 text-[13px] tracking-wide text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)] data-[active=true]:text-[var(--color-ink)]"
      data-active={active}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-accent)]"
          transition={{ duration: 0.3, ease: EASE_OUT }}
        />
      )}
    </a>
  )
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(['hero', ...NAV_ITEMS.map((i) => i.id)])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)]/60 bg-[var(--color-bg)]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#hero"
          className="text-[14px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]"
        >
          {profile.name}
          <span className="text-[var(--color-accent)]">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} id={item.id} label={item.label} active={active === item.id} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.cvPath}
            download={profile.cvFilename}
            className="hidden rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:inline-block"
          >
            Download CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg)] md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-1 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={profile.cvPath}
                download={profile.cvFilename}
                className="mt-1 rounded px-1 py-2 text-sm font-medium text-[var(--color-accent)]"
              >
                Download CV
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
