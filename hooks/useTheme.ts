'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '@/types'

const STORAGE_KEY = 'vixx-theme'

interface UseThemeReturn {
  theme:    Theme
  toggle:   () => void
  setTheme: (theme: Theme) => void
  mounted:  boolean
  isDark:   boolean
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted]  = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setThemeState(isDark ? 'dark' : 'light')
  }, [])

  const setTheme = useCallback((next: Theme) => {
    const isDark = next === 'dark'

    setThemeState(next)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.setAttribute('data-theme', next)

    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // localStorage unavailable
    }
  }, [])

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setTheme])

  return {
    theme,
    toggle,
    setTheme,
    mounted,
    isDark: theme === 'dark',
  }
}
