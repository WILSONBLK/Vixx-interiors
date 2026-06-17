'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Next.js App Router sets __NA: true in history.state for every client-side
// (soft) navigation. If it's absent, the user arrived via hard navigation
// (typed URL, external link, page refresh) — router.back() would exit the site.
function hasSiteHistory(): boolean {
  try { return !!window.history.state?.__NA } catch { return false }
}

export function BackButton({ fallbackHref = '/' }: { fallbackHref?: string }) {
  const router = useRouter()
  const [visible,    setVisible]    = useState(true)
  const [canGoBack,  setCanGoBack]  = useState(false)

  useEffect(() => {
    setCanGoBack(hasSiteHistory())

    const onScroll = () => setVisible(window.scrollY < 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => {
        if (canGoBack) {
          router.back()
        } else {
          router.push(fallbackHref)
        }
      }}
      aria-label="Go back"
      className="group"
      style={{
        position:       'fixed',
        top:            'calc(var(--nav-height) + 14px)',
        left:           '24px',
        zIndex:         39,
        display:        'flex',
        alignItems:     'center',
        gap:            '6px',
        background:     'none',
        border:         'none',
        padding:        '8px 12px 8px 0',
        minWidth:       '44px',
        minHeight:      '44px',
        cursor:         'pointer',
        color:          'var(--text-secondary)',
        fontFamily:     'var(--font-jost)',
        fontSize:       '0.6rem',
        letterSpacing:  '0.26em',
        textTransform:  'uppercase' as const,
        opacity:        visible ? 1 : 0,
        pointerEvents:  visible ? 'auto' : 'none',
        transition:     'opacity 0.35s ease, color 0.2s ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
    >
      <ArrowLeft size={13} strokeWidth={1.5} />
      Back
    </button>
  )
}
