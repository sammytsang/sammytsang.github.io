import type { ReactNode } from 'react'

export function DemoFrame({
  title,
  instructions,
  controls,
  children,
}: {
  title: string
  instructions: string
  controls?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      className="rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4 sm:p-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            Live demo
          </span>
          <h4 className="mt-1.5 text-[14.5px] font-medium text-[var(--color-ink)]">{title}</h4>
          <p className="mt-0.5 max-w-md text-[12.5px] leading-snug text-[var(--color-ink-faint)]">{instructions}</p>
        </div>
        {controls}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function DemoFallback({ label }: { label: string }) {
  return (
    <div className="flex h-[260px] animate-pulse items-center justify-center rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] font-mono text-[11px] text-[var(--color-ink-faint)]">
      Loading {label}…
    </div>
  )
}
