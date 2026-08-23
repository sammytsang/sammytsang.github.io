import { RevealGroup, RevealItem } from '../common/Reveal'
import { SectionEyebrow } from '../common/SectionEyebrow'
import { skills } from '../../data/profile'
import { useSpotlight } from '../../hooks/useSpotlight'

function SkillCard({ group, items }: { group: string; items: string[] }) {
  const spotlight = useSpotlight<HTMLDivElement>()
  return (
    <RevealItem
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight-card card-surface card-surface-hover p-5"
    >
      <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">{group}</h3>
      <ul className="mt-3.5 flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[12px] leading-none text-[var(--color-ink-soft)]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </RevealItem>
  )
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup>
          <RevealItem>
            <SectionEyebrow index="04" label="Skills" />
            <h2 className="mt-4 max-w-xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2.4rem]">
              What I actually work with
            </h2>
          </RevealItem>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(skills).map(([group, items]) => (
              <SkillCard key={group} group={group} items={items} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
