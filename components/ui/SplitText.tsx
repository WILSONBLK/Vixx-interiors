'use client'

import { motion } from 'framer-motion'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
  wordDelay?: number
  once?: boolean
}

export function SplitText({
  children,
  className,
  delay = 0,
  wordDelay = 0.055,
  once = true,
}: SplitTextProps) {
  const words = children.split(' ')

  return (
    <span
      aria-label={children}
      className={className}
      style={{ display: 'inline' }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.75,
              delay: delay + i * wordDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {/* Non-breaking space between words except the last */}
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
