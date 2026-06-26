import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Brand primitives */
        brand: {
          black: 'var(--brand-black)',
          cream: 'var(--brand-cream)',
          white: 'var(--brand-white)',
        },
        /* Semantic surface layers — base → raised → elevated → overlay */
        surface: {
          base:     'var(--surface-base)',
          raised:   'var(--surface-raised)',
          elevated: 'var(--surface-elevated)',
          overlay:  'var(--surface-overlay)',
          /* legacy aliases */
          primary:   'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card:      'var(--bg-card)',
        },
        /* Gold — accent palette */
        gold: {
          DEFAULT: 'var(--gold)',
          light:   'var(--gold-light)',
          pale:    'var(--gold-pale)',
          dark:    'var(--gold-dark)',
        },
        /* Text hierarchy */
        copy: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary:  'var(--text-tertiary)',
          muted:     'var(--text-muted)',
          accent:    'var(--text-on-accent)',
        },
        /* Input tokens */
        input: {
          bg:    'var(--input-bg)',
          text:  'var(--input-text)',
          border:'var(--input-border)',
        },
        /* Status */
        status: {
          error:   'var(--color-error)',
          success: 'var(--color-success)',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        jost:      ['var(--font-jost)', 'system-ui', 'sans-serif'],
        sans:      ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow':     '0 18px 45px var(--gold-border)',
        'gold-sm':  '0 4px 20px var(--gold-border-subtle)',
        'gold-md':  '0 8px 32px var(--gold-border)',
        'gold-lg':  '0 16px 56px var(--gold-line)',
        'dark-sm':  '0 2px 8px rgba(0,0,0,0.40)',
        'dark-md':  '0 4px 16px rgba(0,0,0,0.50)',
        'dark-lg':  '0 8px 32px rgba(0,0,0,0.60)',
        'dark-xl':  '0 16px 48px rgba(0,0,0,0.70)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        'gold-radial':   'radial-gradient(ellipse at center, var(--gold-ghost) 0%, transparent 70%)',
        'dark-gradient': 'linear-gradient(135deg, var(--brand-black) 0%, var(--bg-secondary) 50%, var(--brand-black) 100%)',
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
