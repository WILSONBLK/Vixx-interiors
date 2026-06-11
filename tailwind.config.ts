import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C49A2E',
          light:   '#D4AF37',
          pale:    '#E8C56D',
          dark:    '#8B6914',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost:      ['var(--font-jost)', 'system-ui', 'sans-serif'],
        sans:      ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow':     '0 18px 45px rgba(196, 154, 46, 0.18)',
        'gold-sm':  '0 4px 20px rgba(196, 154, 46, 0.15)',
        'gold-md':  '0 8px 32px rgba(196, 154, 46, 0.28)',
        'gold-lg':  '0 16px 56px rgba(196, 154, 46, 0.35)',
        'dark-sm':  '0 2px 8px rgba(0,0,0,0.40)',
        'dark-md':  '0 4px 16px rgba(0,0,0,0.50)',
        'dark-lg':  '0 8px 32px rgba(0,0,0,0.60)',
        'dark-xl':  '0 16px 48px rgba(0,0,0,0.70)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, transparent, #C49A2E, transparent)',
        'gold-radial':   'radial-gradient(ellipse at center, rgba(196,154,46,0.12) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(135deg, #020617 0%, #0F172A 50%, #020617 100%)',
      },
      keyframes: {
        'hex-rotate': {
          '0%':   { transform: 'rotate(0deg)'   },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0'  },
        },
        'ping-slow': {
          '0%, 100%': { transform: 'scale(1)',   opacity: '0.2' },
          '50%':      { transform: 'scale(1.4)', opacity: '0'   },
        },
      },
      animation: {
        'hex-rotate': 'hex-rotate 24s linear infinite',
        'fade-in':    'fade-in 0.6s ease-out forwards',
        'fade-up':    'fade-up 0.6s ease-out forwards',
        'shimmer':    'shimmer 2.4s linear infinite',
        'ping-slow':  'ping-slow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
