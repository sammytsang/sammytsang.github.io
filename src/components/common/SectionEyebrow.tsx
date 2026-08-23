/** Soft pill badge with an index number — reused across every section header. */
export function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="pill-badge px-3.5 py-1.5 text-[12px] font-medium tracking-[0.02em] text-[var(--color-ink-soft)]">
      <span className="font-mono text-[11px] text-[var(--color-accent)]">{index}</span>
      <span className="h-3 w-px bg-[var(--color-line)]" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
