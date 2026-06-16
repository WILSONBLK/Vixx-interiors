'use client'

import { useEffect } from 'react'

export function ButtonFeedback() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest(
        'a, button, [role="button"]'
      ) as HTMLElement | null
      if (!el) return

      // Remove first so rapid re-clicks restart the animation cleanly
      el.classList.remove('vixx-clicked')
      void el.offsetWidth          // force reflow to reset keyframe
      el.classList.add('vixx-clicked')
      setTimeout(() => el.classList.remove('vixx-clicked'), 480)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
