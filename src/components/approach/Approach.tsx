import { RevealGroup, RevealItem } from '../common/Reveal'
import { SectionEyebrow } from '../common/SectionEyebrow'
import { useSpotlight } from '../../hooks/useSpotlight'
import { approachPrinciples } from '../../data/profile'

function PrincipleCard({ title, body }: { title: string; body: string }) {
  const spotlight = useSpotlight<HTMLDivElement>()
  return (
    <RevealItem
      ref={spotlight.ref}
      onMouseMove={spotlight.onMouseMove}
      className="spotlight-card card-surface card-surface-hover p-6"
    >
      <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--color-ink)]">{title}</h3>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">{body}</p>
    </RevealItem>
  )
}

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup>
          <RevealItem>
            <SectionEyebrow index="02" label="How I work" />
            <h2 className="mt-4 max-w-2xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2.4rem]">
              I build things, then I measure them, and I trust the measurement over the assumption.
            </h2>
          </RevealItem>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {approachPrinciples.map((principle) => (
              <PrincipleCard key={principle.title} title={principle.title} body={principle.body} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
