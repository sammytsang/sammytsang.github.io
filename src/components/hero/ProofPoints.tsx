import { RevealGroup, RevealItem } from '../common/Reveal'
import { highlights } from '../../data/profile'

export function ProofPoints() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-6 border-t border-[var(--color-line)] pt-7 sm:grid-cols-3 sm:gap-8">
      {highlights.map((item) => (
        <RevealItem key={item.title}>
          <p className="text-[13.5px] font-medium uppercase tracking-[0.05em] text-[var(--color-accent)]">{item.title}</p>
          <p className="mt-2 max-w-[30ch] text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">{item.body}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
