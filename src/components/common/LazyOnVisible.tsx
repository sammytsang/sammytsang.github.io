import type { ComponentType } from 'react'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'

interface LazyOnVisibleProps {
  loader: () => Promise<{ default: ComponentType<Record<string, never>> }>
  fallback: React.ReactNode
  rootMargin?: string
  className?: string
}

/**
 * Mounts nothing (beyond a lightweight placeholder) until the wrapper
 * scrolls near the viewport, then dynamically imports and renders the real
 * component. Keeps heavy demo bundles (canvas/WebGL/chart code) out of the
 * initial JS payload entirely.
 */
export function LazyOnVisible({ loader, fallback, rootMargin = '300px', className }: LazyOnVisibleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [Comp] = useState(() => lazy(loader))

  useEffect(() => {
    if (visible) return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <Suspense fallback={fallback}>
          <Comp />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
