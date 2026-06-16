'use client'

import { useEffect, useState } from 'react'

const PARTICLES = [
  // row 0
  { left:  '5%', top:  '7%', size: 2, delay:    0 },
  { left: '12%', top:  '7%', size: 3, delay:   80 },
  { left: '27%', top:  '7%', size: 2, delay:  160 },
  { left: '34%', top:  '7%', size: 4, delay:  240 },
  { left: '49%', top:  '7%', size: 2, delay:  320 },
  { left: '54%', top:  '7%', size: 3, delay:  400 },
  { left: '68%', top:  '7%', size: 2, delay:  480 },
  { left: '75%', top:  '7%', size: 2, delay:  560 },
  { left: '90%', top:  '7%', size: 3, delay:  640 },
  { left: '94%', top:  '7%', size: 4, delay:  720 },
  // row 1
  { left:  '5%', top: '32%', size: 2, delay:  800 },
  { left: '12%', top: '32%', size: 3, delay:  880 },
  { left: '27%', top: '32%', size: 2, delay:  960 },
  { left: '34%', top: '32%', size: 4, delay: 1040 },
  { left: '49%', top: '32%', size: 2, delay: 1120 },
  { left: '54%', top: '32%', size: 3, delay: 1200 },
  { left: '68%', top: '32%', size: 2, delay: 1280 },
  { left: '75%', top: '32%', size: 2, delay: 1360 },
  { left: '90%', top: '32%', size: 3, delay: 1440 },
  { left: '94%', top: '32%', size: 4, delay: 1520 },
  // row 2
  { left:  '5%', top: '50%', size: 2, delay: 1600 },
  { left: '12%', top: '50%', size: 3, delay: 1680 },
  { left: '27%', top: '50%', size: 2, delay: 1760 },
  { left: '34%', top: '50%', size: 4, delay: 1840 },
  { left: '49%', top: '50%', size: 2, delay: 1920 },
  { left: '54%', top: '50%', size: 3, delay: 2000 },
  { left: '68%', top: '50%', size: 2, delay: 2080 },
  { left: '75%', top: '50%', size: 2, delay: 2160 },
  { left: '90%', top: '50%', size: 3, delay: 2240 },
  { left: '94%', top: '50%', size: 4, delay: 2320 },
  // row 3
  { left:  '5%', top: '71%', size: 2, delay: 2400 },
  { left: '12%', top: '71%', size: 3, delay: 2480 },
  { left: '27%', top: '71%', size: 2, delay: 2560 },
  { left: '34%', top: '71%', size: 4, delay: 2640 },
  { left: '49%', top: '71%', size: 2, delay: 2720 },
  { left: '54%', top: '71%', size: 3, delay: 2800 },
  { left: '68%', top: '71%', size: 2, delay: 2880 },
  { left: '75%', top: '71%', size: 2, delay: 2960 },
  { left: '90%', top: '71%', size: 3, delay: 3040 },
  { left: '94%', top: '71%', size: 4, delay: 3120 },
  // row 4
  { left:  '5%', top: '87%', size: 2, delay: 3200 },
  { left: '12%', top: '87%', size: 3, delay: 3280 },
  { left: '27%', top: '87%', size: 2, delay: 3360 },
  { left: '34%', top: '87%', size: 4, delay: 3440 },
  { left: '49%', top: '87%', size: 2, delay: 3520 },
  { left: '54%', top: '87%', size: 3, delay: 3600 },
  { left: '68%', top: '87%', size: 2, delay: 3680 },
  { left: '75%', top: '87%', size: 2, delay: 3760 },
  { left: '90%', top: '87%', size: 3, delay: 3840 },
  { left: '94%', top: '87%', size: 4, delay: 3920 },
]

export function FloatingParticles() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left:                   p.left,
            top:                    p.top,
            width:                  `${p.size}px`,
            height:                 `${p.size}px`,
            background:             'rgba(196,154,46,0.65)',
            animationName:          'fpFloat',
            animationDuration:      '2200ms',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationFillMode:      'both',
            animationDelay:         `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}
