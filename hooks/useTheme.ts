'use client'

import { useEffect, useState, useCallback } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'vixx-theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

interface UseThemeReturn {
  theme:       Theme
  isDark:      boolean
  toggleTheme: () => void
  mounted:     boolean
}

export function useTheme(): UseThemeReturn {
  const [theme,   setTheme]   = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // Respect OS preference when no stored value exists
    const resolved: Theme = stored ?? (prefersDark ? 'dark' : 'light')
    setTheme(resolved)
    applyTheme(resolved)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      applyTheme(next)
      return next
    })
  }, [])

  return { theme, isDark: theme === 'dark', toggleTheme, mounted }
}
