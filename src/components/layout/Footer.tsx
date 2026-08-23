import { profile } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-[13px] text-[var(--color-ink-faint)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {profile.name}. {profile.location} · {profile.availability}.
        </p>
        <a
          href={profile.siteSource}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
        >
          View source
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M17 7H9M17 7v8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  )
}
