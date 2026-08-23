import { motion } from 'framer-motion'
import type { Project } from '../../data/projects'
import { LazyOnVisible } from '../common/LazyOnVisible'
import { DemoFallback } from '../demos/DemoFrame'
import { demoLoaders } from '../demos/registry'
import { EASE_OUT } from '../../lib/motion'
import { useSpotlight } from '../../hooks/useSpotlight'

const MAX_STRIP_THUMBS = 3

export function ProjectCard({
  project,
  index,
  onOpen,
  large = false,
}: {
  project: Project
  index: number
  onOpen: () => void
  /** Gives this card the full-width, higher-visual-weight treatment reserved for spotlight projects. */
  large?: boolean
}) {
  const cover = project.images?.[0]
  const strip = project.images?.slice(1, 1 + MAX_STRIP_THUMBS) ?? []
  const hiddenCount = Math.max(0, (project.images?.length ?? 0) - 1 - MAX_STRIP_THUMBS)
  const plate = String(index + 1).padStart(2, '0')
  const spotlight = useSpotlight<HTMLElement>()

  return (
    <motion.article
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: EASE_OUT }}
      className={`spotlight-card card-surface card-surface-hover group relative flex flex-col overflow-hidden ${
        large ? 'sm:col-span-2' : ''
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col text-left"
        aria-haspopup="dialog"
      >
        {cover ? (
          <div className={`relative w-full overflow-hidden bg-[var(--color-panel-raised)] ${large ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
            <img
              src={cover.src}
              alt={cover.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] tabular-nums text-white/80 backdrop-blur-md">
              {plate}
            </span>
            <div className="absolute bottom-0 left-0 flex flex-wrap gap-1.5 p-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/45 px-2.5 py-1 text-[10.5px] font-medium text-white backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.demo && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10.5px] font-semibold text-[var(--color-accent-ink)] shadow-[0_4px_16px_-4px_var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                Live demo
              </span>
            )}
          </div>
        ) : (
          // No photo for this project — no reserved image space, just the tags and
          // plate number inline in the header instead of a large empty box.
          <div className="flex items-center justify-between gap-2 px-5 pb-0 pt-5">
            <span className="font-mono text-[10px] tabular-nums text-[var(--color-ink-faint)]">{plate}</span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5 text-[10.5px] font-medium text-[var(--color-ink-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {strip.length > 0 && (
          <div className="grid gap-1 p-1" style={{ gridTemplateColumns: `repeat(${strip.length}, minmax(0, 1fr))` }}>
            {strip.map((img, i) => (
              // Fixed height rather than aspect-square: a "large" (2-col) card's strip
              // items are much wider than a normal card's, and aspect-square on a very
              // wide single-column strip would blow up into a near-full-height second
              // image instead of a modest filmstrip thumbnail.
              <div
                key={img.src}
                className="relative h-24 overflow-hidden rounded-xl bg-[var(--color-panel-raised)] sm:h-32"
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
                {i === strip.length - 1 && hiddenCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-[11px] font-medium text-white">
                    +{hiddenCount} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-accent)]">
            {project.eyebrow}
          </span>
          <h3 className="mt-2 text-[1.1rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">
            {project.title}
          </h3>

          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">{project.summary}</p>
            </div>
          </div>

          <span className="mt-auto flex items-center gap-1.5 pt-4 text-[12.5px] font-medium text-[var(--color-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Read the full write-up
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      {project.demo && (
        <div className="mx-4 mb-4 rounded-2xl border border-[var(--color-line-soft)] bg-[var(--color-panel-raised)] p-4 sm:p-5">
          <LazyOnVisible
            loader={demoLoaders[project.demo]}
            fallback={<DemoFallback label={project.demoLabel ?? 'demo'} />}
          />
        </div>
      )}
    </motion.article>
  )
}
