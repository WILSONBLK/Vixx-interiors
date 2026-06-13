'use client'

import { SOCIAL_LINKS } from '@/lib/data'
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'

function BarIcon({ id, size = 18 }: { id: string; size?: number }) {
  if (id === 'instagram') return <InstagramIcon size={size} />
  if (id === 'tiktok')    return <TikTokIcon size={size} />
  if (id === 'whatsapp')  return <WhatsAppIcon size={size} />
  return null
}

/*
 * SocialBar — fixed bottom strip, persistent across every page.
 *
 * z-30 is intentional: sits below the navbar (z-50) and mobile
 * menu overlay (z-40) so those cover it when active, but the bar
 * is always visible otherwise.
 *
 * Body padding-bottom (set via CSS var --social-bar-height in
 * globals.css) ensures page content is never hidden behind the bar.
 */
export function SocialBar() {
  return (
    <nav
      aria-label="Follow VIXX Interiors on social media"
      className="fixed bottom-0 inset-x-0 z-30 pointer-events-none"
      style={{
        background:           'var(--bg-nav-scrolled)',
        backdropFilter:       'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderTop:            '1px solid var(--border-default)',
        /* push bar content above iPhone home-indicator */
        paddingBottom:        'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Gold hairline at top edge — mirrors navbar treatment */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--gold-line) 50%, transparent 100%)',
          opacity: 0.45,
        }}
      />

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
              /* 48 px touch target on mobile → 44 px on desktop */
              className="social-icon !w-12 !h-12 sm:!w-11 sm:!h-11"
            >
              <BarIcon id={id} size={18} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
