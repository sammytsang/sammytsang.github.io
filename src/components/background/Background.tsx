import { RevealGroup, RevealItem } from '../common/Reveal'
import { SectionEyebrow } from '../common/SectionEyebrow'
import { useSpotlight } from '../../hooks/useSpotlight'
import { education } from '../../data/profile'

function EducationCard({ entry }: { entry: (typeof education)[number] }) {
  const spotlight = useSpotlight<HTMLDivElement>()
  return (
    <RevealItem
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight-card card-surface card-surface-hover grid grid-cols-1 gap-1.5 p-6 sm:grid-cols-[160px_1fr] sm:gap-8"
    >
      <div className="font-mono text-[12px] text-[var(--color-ink-faint)]">{entry.period}</div>
      <div>
        <h3 className="text-[1.02rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">{entry.title}</h3>
        <p className="mt-0.5 text-[13.5px] text-[var(--color-ink-soft)]">{entry.org}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-ink-faint)]">{entry.detail}</p>
      </div>
    </RevealItem>
  )
}

export function Background() {
  return (
    <section id="background" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup>
          <RevealItem>
            <SectionEyebrow index="03" label="Background" />
          </RevealItem>

          <div className="mt-8 flex flex-col gap-3">
            {education.map((entry) => (
              <EducationCard key={entry.title} entry={entry} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
