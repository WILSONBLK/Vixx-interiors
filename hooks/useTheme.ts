'use client'

import { useEffect, useState } from 'react'

interface UseThemeReturn {
  isDark:  boolean
  mounted: boolean
}

export function useTheme(): UseThemeReturn {
  const [isDark,  setIsDark]  = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    setMounted(true)

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return { isDark, mounted }
}
