import { TAGS, type Tag } from '../../data/projects'

export function TagFilter({
  active,
  onToggle,
  onClear,
}: {
  active: Set<Tag>
  onToggle: (tag: Tag) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
      <button
        type="button"
        onClick={onClear}
        aria-pressed={active.size === 0}
        className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
          active.size === 0
            ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
            : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]'
        }`}
      >
        All
      </button>
      {TAGS.map((tag) => {
        const isActive = active.has(tag)
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            aria-pressed={isActive}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
              isActive
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-ink)]'
                : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
