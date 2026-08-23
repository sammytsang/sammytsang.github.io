import { forwardRef, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
}

// A left-to-right clip-path sweep combined with a quick blur-to-focus pull,
// rather than a plain fade/rise — reads more like an instrument calibrating
// onto a reading than a generic "fade up" scroll effect. The global
// prefers-reduced-motion rule in index.css already zeroes transition/animation
// durations, so this degrades to an instant, unclipped, unblurred appearance.
const item = {
  hidden: { opacity: 0, y: 12, clipPath: 'inset(0 100% 0 0)', filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0 0% 0 0)',
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

/** Wraps a section so its RevealItem children sweep/focus in with a quick stagger, once, on scroll. */
export function RevealGroup({
  children,
  className,
  as: Component = motion.div,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  as?: typeof motion.div
  amount?: number
}) {
  return (
    <Component variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount }} className={className}>
      {children}
    </Component>
  )
}

export const RevealItem = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(function RevealItem(
  { children, className, ...rest },
  ref,
) {
  return (
    <motion.div ref={ref} variants={item} className={className} {...rest}>
      {children}
    </motion.div>
  )
})
