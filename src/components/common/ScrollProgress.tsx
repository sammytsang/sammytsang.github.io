import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin fixed progress bar at the very top of the viewport, tracking scroll through the whole page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.2 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-[var(--color-accent)]"
      style={{ scaleX }}
    />
  )
}
