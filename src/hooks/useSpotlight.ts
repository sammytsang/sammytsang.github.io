import { useCallback, useRef } from 'react'

/**
 * Tracks the cursor within an element via CSS custom properties (--spot-x/--spot-y),
 * driving the `.spotlight-card` radial-glow effect in index.css. Pure CSS transition
 * on the receiving end, so this hook only ever writes two style properties per move.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}
