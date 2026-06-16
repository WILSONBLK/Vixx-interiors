'use client'

import { useEffect, useState } from 'react'
import { SOCIAL_LINKS } from '@/lib/data'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'

function BarIcon({ id, size = 18 }: { id: string; size?: number }) {
  if (id === 'instagram') return <InstagramIcon size={size} />
  if (id === 'tiktok')    return <TikTokIcon size={size} />
  if (id === 'whatsapp')  return <WhatsAppIcon size={size} />
  return null
}

export function SocialBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y          = window.scrollY
      const atTop      = y < 60
      const nearBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 80
      const scrollingUp = y < lastY

      setVisible(atTop || nearBottom || scrollingUp)
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Follow VIXX Interiors on social media"
      className="fixed bottom-0 inset-x-0 z-30 pointer-events-none"
      style={{
        paddingBottom:        'env(safe-area-inset-bottom, 0px)',
        transform:            visible ? 'translateY(0)' : 'translateY(110%)',
        opacity:              visible ? 1 : 0,
        transition:           'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease',
        background:           'var(--bg-nav-scrolled)',
        backdropFilter:       'blur(10px) saturate(120%)',
        WebkitBackdropFilter: 'blur(10px) saturate(120%)',
        borderTop:            '1px solid var(--border-subtle)',
      }}
    >
      <ul
        role="list"
        className="flex items-center justify-center gap-3 sm:gap-5"
        style={{ height: 'var(--social-bar-height)', pointerEvents: 'auto' }}
      >
        {SOCIAL_LINKS.map(({ id, label, href }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`VIXX Interiors on ${label}`}
              data-cursor="hover"
              className="social-icon !w-10 !h-10 sm:!w-9 sm:!h-9"
            >
              <BarIcon id={id} size={16} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
