'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => router.back()}
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
        padding:        '8px 0',
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
