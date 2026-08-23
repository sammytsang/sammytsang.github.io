import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TagFilter } from './TagFilter'
import { ProjectCard } from './ProjectCard'
import { CompactProjectRow } from './CompactProjectRow'
import { ProjectDetail } from './ProjectDetail'
import { RevealItem, RevealGroup } from '../common/Reveal'
import { SectionEyebrow } from '../common/SectionEyebrow'
import { projects, type Tag } from '../../data/projects'

// Plate numbers are based on each project's fixed position in the full list, not
// its position in the filtered/regrouped view — so "03" always means the same
// project, whichever tags are active or which group it's rendered in.
const plateIndex = new Map(projects.map((p, i) => [p.id, i]))

export function ProjectsGrid() {
  const [active, setActive] = useState<Set<Tag>>(new Set())
  const [openId, setOpenId] = useState<string | null>(null)

  function toggleTag(tag: Tag) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const filtered = useMemo(() => {
    if (active.size === 0) return projects
    return projects.filter((p) => p.tags.some((t) => active.has(t)))
  }, [active])

  const featured = filtered.filter((p) => p.featured)
  const rest = filtered.filter((p) => !p.featured)

  const openProject = openId ? projects.find((p) => p.id === openId) ?? null : null

  return (
    <section id="work" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup>
          <RevealItem>
            <SectionEyebrow index="01" label="Selected work" />
            <h2 className="mt-4 max-w-xl text-balance text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2.4rem]">
              Four builds I'd put in front of anyone, plus the analysis work behind them
            </h2>
          </RevealItem>

          <RevealItem className="mt-8">
            <TagFilter active={active} onToggle={toggleTag} onClear={() => setActive(new Set())} />
          </RevealItem>
        </RevealGroup>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={plateIndex.get(project.id) ?? 0}
                onOpen={() => setOpenId(project.id)}
                large={Boolean(project.demo) || project.id === 'vision-prosthetic-hand'}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {rest.length > 0 && (
          <RevealGroup className="mt-14">
            <RevealItem>
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-faint)]">
                More work
              </span>
            </RevealItem>
            <motion.div layout className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {rest.map((project) => (
                  <CompactProjectRow
                    key={project.id}
                    project={project}
                    index={plateIndex.get(project.id) ?? 0}
                    onOpen={() => setOpenId(project.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </RevealGroup>
        )}
      </div>

      <AnimatePresence>
        {openProject && <ProjectDetail project={openProject} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  )
}
