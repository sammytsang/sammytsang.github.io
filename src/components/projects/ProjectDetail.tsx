import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { EASE_OUT } from '../../lib/motion'

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    lastFocused.current = document.activeElement
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-start justify-center p-4 sm:p-8">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="relative z-10 w-full max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-panel)] shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] p-5 sm:p-7">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {project.eyebrow}
              </span>
              <h2 id="project-detail-title" className="mt-2 text-xl font-medium leading-snug text-[var(--color-ink)] sm:text-2xl">
                {project.title}
              </h2>
              <p className="mt-1.5 text-[12.5px] text-[var(--color-ink-faint)]">{project.period}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project detail"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-7">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wide text-[var(--color-ink-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              {project.body.map((paragraph, i) => (
                <p key={i} className="text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">
                  {paragraph}
                </p>
              ))}
            </div>

            {project.figures && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.figures.map((fig) => (
                  <div
                    key={fig.label}
                    className="rounded-md border border-[var(--color-line)] px-3 py-2 text-center"
                  >
                    <div className="font-mono text-[13px] text-[var(--color-ink)]">{fig.value}</div>
                    <div className="mt-0.5 text-[10.5px] text-[var(--color-ink-faint)]">{fig.label}</div>
                  </div>
                ))}
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.images.map((img) => (
                  <figure key={img.src}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full rounded-2xl border border-[var(--color-line)] object-cover"
                    />
                    <figcaption className="mt-1.5 text-[12px] italic leading-snug text-[var(--color-ink-faint)]">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {project.demo && (
              <p className="mt-6 rounded-md border border-dashed border-[var(--color-line)] px-4 py-3 text-[13px] text-[var(--color-ink-soft)]">
                This project has a live, interactive demo on its card in the projects grid — close this panel and
                try it directly on the page.
              </p>
            )}

            {project.stack && (
              <p className="mt-6 text-[12.5px] text-[var(--color-ink-faint)]">{project.stack.join(' · ')}</p>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-accent)]"
              >
                View repository
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17 17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
