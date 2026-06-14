'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { MagneticElement } from '@/components/ui/MagneticElement'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

interface CTAProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}

interface SectionCTAProps extends CTAProps {
  delay?: number
}

const GLOW_ANIMATE = {
  boxShadow: [
    '0 0 0px  0px rgba(196,154,46,0.00)',
    '0 0 28px 8px rgba(196,154,46,0.32)',
    '0 0 0px  0px rgba(196,154,46,0.00)',
  ],
}
const GLOW_TRANSITION = {
  duration:    2.6,
  repeat:      Infinity,
  ease:        'easeInOut' as const,
  repeatDelay: 1.2,
}

const LINK_CLASS =
  'inline-flex items-center gap-3 rounded-full font-jost text-[0.65rem] ' +
  'font-medium tracking-[0.22em] uppercase transition-all duration-500 ' +
  'hover:scale-[1.05] hover:brightness-110 active:scale-[0.97]'

function CTAButton({ href, label, variant = 'primary' }: CTAProps) {
  const isPrimary = variant === 'primary'

  const style = isPrimary
    ? { background: 'var(--gold)', color: 'var(--text-on-accent)', padding: '0.9rem 2rem' }
    : { border: '1px solid rgba(196,154,46,0.50)', color: 'var(--gold-text)', padding: '0.9rem 2rem' }

  const content = (
    <>
      {label}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
      </motion.span>
    </>
  )

  return (
    <MagneticElement>
      <motion.div
        style={{ borderRadius: '9999px', display: 'inline-flex' }}
        animate={isPrimary ? GLOW_ANIMATE : {}}
        transition={isPrimary ? GLOW_TRANSITION : {}}
      >
        {href.startsWith('#') ? (
          <a href={href} className={LINK_CLASS} style={style}>{content}</a>
        ) : (
          <Link href={href} className={LINK_CLASS} style={style}>{content}</Link>
        )}
      </motion.div>
    </MagneticElement>
  )
}

/** Raw button — for use inside flex containers (e.g. final CTA section) */
export function SectionCTAButton(props: CTAProps) {
  return <CTAButton {...props} />
}

/** Centered section CTA with scroll-reveal — floating journey transition between sections */
export function SectionCTA({ href, label, variant = 'primary', delay = 0 }: SectionCTAProps) {
  return (
    <ScrollReveal delay={delay} variant="fadeUp">
      <div className="flex justify-center pt-12 lg:pt-16">
        <CTAButton href={href} label={label} variant={variant} />
      </div>
    </ScrollReveal>
  )
}
