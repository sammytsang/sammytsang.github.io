import { RevealGroup, RevealItem } from '../common/Reveal'
import { Magnetic } from '../common/Magnetic'
import { SectionEyebrow } from '../common/SectionEyebrow'
import { useSpotlight } from '../../hooks/useSpotlight'
import { profile } from '../../data/profile'

const links = [
  { label: 'Email', href: `mailto:${profile.email}`, value: profile.email },
  { label: 'LinkedIn', href: profile.linkedin, value: 'in/sam-tsang-65608529a' },
  { label: 'GitHub', href: profile.github, value: 'github.com/sammytsang' },
]

function ContactLink({ label, href, value }: { label: string; href: string; value: string }) {
  const spotlight = useSpotlight<HTMLAnchorElement>()
  return (
    <RevealItem>
      <Magnetic strength={0.15}>
        <a
          ref={spotlight.ref}
          onMouseMove={spotlight.onMouseMove}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className="spotlight-card card-surface card-surface-hover relative block p-5"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">{label}</span>
          <p className="mt-1.5 break-words text-[14px] font-medium text-[var(--color-ink)]">{value}</p>
        </a>
      </Magnetic>
    </RevealItem>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="mesh-glow mesh-drift-a h-[26rem] w-[26rem] bg-[var(--color-accent-2)] opacity-25 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <RevealGroup>
          <RevealItem>
            <SectionEyebrow index="05" label="Contact" />
            <h2 className="mt-4 max-w-xl text-balance text-[1.9rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[2.4rem]">
              {profile.location} · {profile.availability} · {profile.rightToWork}
            </h2>
          </RevealItem>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {links.map((link) => (
              <ContactLink key={link.label} {...link} />
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  )
}
