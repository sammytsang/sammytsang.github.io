import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { EASE_OUT } from '../../lib/motion'

/** A lean, image-free card for the projects that aren't in the spotlight set — no
    reserved image space, since there's nothing to show, just the text, styled to
    match the rounded card system used everywhere else. */
export function CompactProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const plate = String(index + 1).padStart(2, '0')

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      aria-haspopup="dialog"
      className="card-surface card-surface-hover group flex h-full flex-col p-5 text-left"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10.5px] tabular-nums text-[var(--color-ink-faint)]">{plate}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-ink-faint)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <span className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">
        {project.eyebrow}
      </span>
      <h3 className="mt-1.5 text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">{project.summary}</p>
      <span className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-faint)] opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-[var(--color-accent)]">
        Read more
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.button>
  )
}
