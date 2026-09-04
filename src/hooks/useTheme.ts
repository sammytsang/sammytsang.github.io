import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * Theme is dark by default, regardless of system preference. A stored choice
 * in localStorage always wins (handled by the inline script in index.html to
 * avoid a flash — this hook just picks up whatever class is already on
 * <html> and keeps it synced).
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    root.style.colorScheme = theme
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // localStorage unavailable (private mode, etc) — theme still works for this visit
    }
  }, [])

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return { theme, setTheme, toggle }
}
