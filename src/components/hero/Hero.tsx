import { motion } from 'framer-motion'
import { ProofPoints } from './ProofPoints'
import { Magnetic } from '../common/Magnetic'
import { profile } from '../../data/profile'
import { EASE_OUT } from '../../lib/motion'

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-14">
      {/* Gradient-mesh backdrop: two large, softly blurred, slow-drifting blobs —
          cyan + violet — read as atmosphere behind the whole hero rather than a
          hard-edged shape. This is the "technology" backdrop in place of the old
          full-bleed WebGL scene: purely CSS, so it can't misbehave. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="tech-grid absolute inset-0" />
        <div
          className="mesh-glow mesh-drift-a h-[32rem] w-[32rem] bg-[var(--color-accent)] opacity-40 -left-40 -top-32"
        />
        <div
          className="mesh-glow mesh-drift-b h-[28rem] w-[28rem] bg-[var(--color-accent-2)] opacity-30 right-[-6rem] top-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="pill-badge px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--color-ink-soft)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            {profile.qualification}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE_OUT }}
            className="mt-6 text-balance text-[3.1rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--color-ink)] sm:text-[4.2rem] lg:text-[4.6rem]"
          >
            Sam Tsang
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: EASE_OUT }}
            className="mt-3 text-[1.2rem] font-medium tracking-[-0.01em] text-[var(--color-ink-soft)] sm:text-[1.35rem]"
          >
            {profile.role}, MSc UCL
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: EASE_OUT }}
            className="mt-5 max-w-lg text-balance text-[16px] leading-relaxed text-[var(--color-ink-soft)]"
          >
            {profile.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: EASE_OUT }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[13.5px] font-medium text-[var(--color-accent-ink)] shadow-[0_8px_24px_-8px_var(--color-accent)] transition-shadow hover:shadow-[0_10px_30px_-6px_var(--color-accent)]"
              >
                See the work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4v16M6 14l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cvPath}
                download={profile.cvFilename}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-5 py-2.5 text-[13.5px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Download CV
              </a>
            </Magnetic>
          </motion.div>

          <div className="mt-14">
            <ProofPoints />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
            <img
              src="img/hand_rig.webp"
              alt="Prosthetic hand mounted on an aluminium frame, with control code on the monitor behind"
              className="tech-photo h-[420px] w-full object-cover sm:h-[480px] lg:h-[560px]"
            />
            <div className="tech-photo-tint" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="hero-scan-sweep" aria-hidden="true" />
          </div>
          <div
            className="hero-glow-pulse pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[var(--color-accent)] opacity-60 blur-2xl"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  )
}
