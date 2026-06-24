'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

const SERVICE_TYPE_MAP: Record<string, string> = {
  residential: 'residential',
  commercial:  'commercial',
  consultation: '',
  sourcing:    '',
  planning:    '',
  management:  '',
}

/* ── Design tokens — theme-responsive (CSS vars switch on .dark class) ────── */
const T = {
  bg:      'var(--surface-base)',
  card:    'var(--surface-raised)',
  cardHi:  'var(--surface-elevated)',
  text:    'var(--text-primary)',
  sub:     'var(--text-secondary)',
  dim:     'var(--text-muted)',
  gold:    'var(--gold)',
  goldL:   'var(--gold-light)',
  goldB:   'var(--gold-border)',
  border:  'var(--border-subtle)',
  borderM: 'var(--border-strong)',
} as const

/* ── Dark-only tokens — for the intro photo overlay (always over a dark image) */
const DARK = {
  bg:   '#0A0908',
  text: '#F0EBE1',
  dim:  'rgba(240,235,225,0.36)',
  gold: '#C49A2E',
} as const

const EASE = [0.22, 1, 0.36, 1] as const

/* ── Types ────────────────────────────────────────────────────────────────── */
interface Answers {
  name:     string
  email:    string
  location: string
  type:     string
  space:    string
  timeline: string
  budget:   string
  style:    string
}

type FieldKey = keyof Answers
type StepKind = 'text' | 'email' | 'textarea' | 'select'

interface Option { value: string; label: string; desc?: string }
interface Step {
  id:           FieldKey
  kind:         StepKind
  question:     string
  subtext:      string
  placeholder?: string
  optional?:    boolean
  options?:     Option[]
}

/* ── Step definitions ─────────────────────────────────────────────────────── */
const STEPS: Step[] = [
  {
    id: 'name', kind: 'text',
    question:    "What is your full name?",
    subtext:     "We'd love to know who we're speaking with.",
    placeholder: "Your full name",
  },
  {
    id: 'email', kind: 'email',
    question:    "What is your email address?",
    subtext:     "We'll use this to follow up personally after your consultation.",
    placeholder: "your@email.com",
  },
  {
    id: 'location', kind: 'text',
    question:    "Where is the project located?",
    subtext:     "City, neighbourhood, or general area is fine.",
    placeholder: "e.g. Lekki Phase 1, Lagos",
  },
  {
    id: 'type', kind: 'select',
    question: "What type of project is this?",
    subtext:  "Choose the option that best describes your space.",
    options: [
      { value: 'residential',  label: 'Residential',  desc: 'Home, apartment, duplex, suite'  },
      { value: 'commercial',   label: 'Commercial',   desc: 'Office, retail, showroom'        },
      { value: 'hospitality',  label: 'Hospitality',  desc: 'Hotel, restaurant, lounge'       },
      { value: 'other',        label: 'Other',        desc: 'Something different or not sure' },
    ],
  },
  {
    id: 'space', kind: 'textarea',
    question:    "Tell us about the space.",
    subtext:     "Describe what you have — and what you want it to become.",
    placeholder: "Three bedrooms, fourth floor. The living area feels closed off and the layout isn't working. We want it to feel open and calm…",
    optional:    true,
  },
  {
    id: 'timeline', kind: 'select',
    question: "When would you like to begin?",
    subtext:  "Even a rough sense helps us prepare.",
    options: [
      { value: 'asap',         label: 'As soon as possible' },
      { value: '1-3-months',   label: 'Within 1–3 months'   },
      { value: '3-6-months',   label: 'Within 3–6 months'   },
      { value: 'exploring',    label: 'Just exploring'       },
    ],
  },
  {
    id: 'budget', kind: 'select',
    question:  "What is your estimated budget range?",
    subtext:   "Optional — only if you're comfortable sharing.",
    optional:  true,
    options: [
      { value: 'below-5m',  label: 'Below ₦5M'        },
      { value: '5-15m',     label: '₦5M – ₦15M'       },
      { value: '15-30m',    label: '₦15M – ₦30M'      },
      { value: '30m-plus',  label: '₦30M and above'    },
      { value: 'skip',      label: 'Prefer not to say' },
    ],
  },
  {
    id: 'style', kind: 'select',
    question: "What style best describes your vision?",
    subtext:  "Trust your instinct — there are no wrong answers.",
    options: [
      { value: 'warm-natural', label: 'Warm & natural',        desc: 'Organic, textured, grounded'   },
      { value: 'contemporary', label: 'Contemporary & minimal', desc: 'Clean, light, uncluttered'     },
      { value: 'bold',         label: 'Bold & expressive',      desc: 'Strong, confident, dramatic'   },
      { value: 'classic',      label: 'Classic & refined',      desc: 'Timeless, structured, elegant' },
    ],
  },
]

const TOTAL = STEPS.length // 8

const EMPTY: Answers = { name:'', email:'', location:'', type:'', space:'', timeline:'', budget:'', style:'' }

/* ══════════════════════════════════════════════════════════════════════════════
   INTRO HERO SCREEN
══════════════════════════════════════════════════════════════════════════════ */
function IntroScreen({ onBegin, onBack }: { onBegin: () => void; onBack: () => void }) {
  const rm = useReducedMotion()

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ minHeight: '100dvh', background: DARK.bg }}
    >
      {/* Background image */}
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={rm ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src="/images/start-project-bg.avif"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlays */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.26)' }} />
      <div
        aria-hidden
        style={{
          position:   'absolute',
          inset:       0,
          background: 'radial-gradient(ellipse 90% 78% at 50% 52%, transparent 44%, rgba(8,8,8,0.16) 100%)',
        }}
      />

      {/* Back to previous page — top left */}
      <button
        onClick={onBack}
        style={{
          position:      'absolute',
          top:            '1.25rem',
          left:           '1.25rem',
          zIndex:         20,
          display:       'flex',
          alignItems:    'center',
          gap:            6,
          color:          DARK.dim,
          fontFamily:    'var(--font-jost)',
          fontSize:      '0.6rem',
          letterSpacing: '0.26em',
          textTransform: 'uppercase',
          background:    'none',
          border:        'none',
          padding:       '0 0.5rem',
          minHeight:     '44px',
          cursor:        'pointer',
          transition:    'color 0.2s',
        }}
        className="hover:text-[#C49A2E]"
      >
        <ArrowLeft size={13} strokeWidth={1.5} />
        Back
      </button>

      {/* Content */}
      <div
        style={{
          position:  'relative',
          zIndex:     10,
          textAlign:  'center',
          padding:    '0 1.5rem',
          maxWidth:  '560px',
          color:      T.text,
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}
        >
          <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(196,154,46,0.65)' }} />
          <span style={{ fontFamily: 'var(--font-jost)', fontSize: '0.6rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: DARK.gold }}>
            VIXX Interiors
          </span>
          <span style={{ display: 'block', width: 24, height: 1, background: 'rgba(196,154,46,0.65)' }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={rm ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.45, ease: EASE }}
          style={{
            fontFamily:  'var(--font-cormorant)',
            fontSize:    'clamp(3rem, 8vw, 6rem)',
            fontWeight:   400,
            lineHeight:   0.95,
            color:        DARK.text,
            textShadow:  '0 4px 28px rgba(8,8,8,0.55)',
            marginBottom: '1.25rem',
          }}
        >
          Start Your{' '}
          <em style={{ fontStyle: 'italic', color: DARK.gold }}>Project</em>
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={rm ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.72, ease: EASE }}
          style={{
            fontFamily:   'var(--font-jost)',
            fontSize:     '0.9rem',
            fontWeight:    600,
            color:        '#FFF5E1',

            letterSpacing: '0.01em',
            lineHeight:    1.7,
            maxWidth:     '36ch',
            margin:       '0 auto 2.5rem',
          }}
        >
          A guided consultation to understand your space and your vision. Two minutes of your time.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
        >
          <motion.button
            onClick={onBegin}
            whileHover={{ scale: 1.04, backgroundColor: T.goldL }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:             10,
              background:      T.gold,
              color:          '#1A1208',
              border:         'none',
              fontFamily:     'var(--font-jost)',
              fontSize:       '0.64rem',
              letterSpacing:  '0.22em',
              textTransform:  'uppercase',
              fontWeight:      500,
              padding:        '0.95rem 2.2rem',
              minHeight:      '44px',
              borderRadius:    2,
              cursor:         'pointer',
            }}
          >
            Begin
            <ArrowRight size={13} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════════ */
export function StartProjectFlow() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const serviceParam = searchParams.get('service') ?? ''
  const preselectedType = SERVICE_TYPE_MAP[serviceParam] ?? ''

  const [phase,       setPhase]       = useState<'intro' | 'flow'>(serviceParam ? 'flow' : 'intro')
  const [stepIdx,     setStepIdx]     = useState(0)
  const [answers,     setAnswers]     = useState<Answers>({ ...EMPTY, type: preselectedType })
  const [dir,         setDir]         = useState<1|-1>(1)
  const [complete,    setComplete]    = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const { isDark, toggleTheme, mounted } = useTheme()

  const step = STEPS[stepIdx]

  /* Submit enquiry when user reaches the thank-you screen */
  useEffect(() => {
    if (!complete) return
    fetch('https://formspree.io/f/xlgygydy', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ ...answers, source: 'start-project' }),
    })
      .then(res => { if (!res.ok) setSubmitError(true) })
      .catch(() => setSubmitError(true))
  }, [complete]) // eslint-disable-line react-hooks/exhaustive-deps

  function set(key: FieldKey, val: string) {
    setAnswers(prev => ({ ...prev, [key]: val }))
  }

  function advance() {
    if (stepIdx < TOTAL - 1) { setDir(1); setStepIdx(i => i + 1) }
    else                      { setDir(1); setComplete(true) }
  }

  function back() {
    if (complete)        { setDir(-1); setComplete(false) }
    else if (stepIdx > 0){ setDir(-1); setStepIdx(i => i - 1) }
  }

  function restart() {
    setDir(-1)
    setStepIdx(0)
    setAnswers(EMPTY)
    setComplete(false)
  }

  const animKey = complete ? 'complete' : step.id

  const INTAKE_CSS = `
    .vixx-intake input::placeholder,
    .vixx-intake textarea::placeholder {
      color: var(--input-placeholder);
      font-family: var(--font-jost);
    }
    .vixx-intake input:focus,
    .vixx-intake textarea:focus { outline: none; }
    .vixx-intake .theme-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 44px; height: 44px; border-radius: 50%;
      border: 1px solid var(--border-strong);
      color: var(--text-muted);
      background: none; cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease;
    }
    .vixx-intake .theme-btn:hover {
      border-color: var(--gold-border);
      color: var(--gold);
    }
  `

  return (
    <>
      <style>{INTAKE_CSS}</style>

      <AnimatePresence mode="wait">
        {phase === 'intro' ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(3px)', scale: 0.99 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <IntroScreen onBegin={() => setPhase('flow')} onBack={() => router.back()} />
          </motion.div>
        ) : (
          <motion.div
            key="flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >

      <div
        className="vixx-intake relative flex flex-col"
        style={{ background: T.bg, minHeight: '100dvh', color: T.text }}
      >
        {/* Ambient glow */}
        <div aria-hidden style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(196,154,46,0.04) 0%, transparent 65%)',
        }} />

        {/* Gold progress line */}
        {!complete && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 1, background: T.border, zIndex: 50 }}>
            <motion.div
              style={{ position: 'absolute', inset: '0 auto 0 0', background: T.gold }}
              animate={{ width: `${((stepIdx + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.65, ease: EASE }}
            />
          </div>
        )}

        {/* ── Top bar ── */}
        <header
          style={{ position: 'relative', zIndex: 20 }}
          className="flex items-center justify-between px-7 pt-8 pb-0 lg:px-14 lg:pt-9"
        >
          {/* Left: back / site link */}
          {stepIdx > 0 || complete ? (
            <motion.button
              onClick={back}
              whileTap={{ scale: 0.96 }}
              style={{ color: T.dim, background: 'none', border: 'none', padding: '0 0.5rem', minHeight: '44px', display: 'flex', alignItems: 'center' }}
              className="gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.6rem', letterSpacing:'0.26em', textTransform:'uppercase' }}>Back</span>
            </motion.button>
          ) : (
            <button
              onClick={() => router.back()}
              style={{ color: T.dim, fontFamily:'var(--font-jost)', fontSize:'0.6rem', letterSpacing:'0.26em', textTransform:'uppercase', background:'none', border:'none', padding:'0 0.5rem', minHeight:'44px', cursor:'pointer', display:'flex', alignItems:'center' }}
              className="gap-1.5 transition-colors duration-200 hover:text-[#C49A2E]"
            >
              <ArrowLeft size={13} strokeWidth={1.5} />
              Back
            </button>
          )}

          {/* Centre: wordmark */}
          <span style={{ color: T.gold, fontFamily:'var(--font-cormorant)', fontSize:'1.05rem', letterSpacing:'0.04em' }}>
            VIXX Interiors
          </span>

          {/* Right: counter / theme toggle / restart */}
          <div className="flex items-center gap-3">
            {!complete ? (
              <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.58rem', letterSpacing:'0.22em', color: T.dim, textTransform:'uppercase' }}>
                {String(stepIdx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
              </span>
            ) : (
              <button
                onClick={restart}
                style={{ color: T.dim, background:'none', border:'none', padding:'0 0.5rem', minHeight:'44px', display:'flex', alignItems:'center' }}
                className="gap-1.5 transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                <RotateCcw size={11} />
                <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase' }}>Start over</span>
              </button>
            )}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="theme-btn"
              >
                {isDark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
              </button>
            )}
          </div>
        </header>

        {/* ── Content ── */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-7 py-16 lg:px-14">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={animKey}
              custom={dir}
              variants={{
                enter:  (d: number) => ({ opacity: 0, y: d > 0 ? 22 : -22, scale: d > 0 ? 1.012 : 0.988, filter: 'blur(5px)' }),
                center:              { opacity: 1, y: 0,                    scale: 1,                      filter: 'blur(0px)' },
                exit:   (d: number) => ({ opacity: 0, y: d > 0 ? -22 : 22, scale: d > 0 ? 0.988 : 1.012, filter: 'blur(5px)' }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.52, ease: EASE }}
              className="w-full max-w-[520px]"
            >
              {!complete ? (
                <>
                  {(step.kind === 'text' || step.kind === 'email') && (
                    <TextStep
                      step={step}
                      value={answers[step.id]}
                      onChange={v => set(step.id, v)}
                      onNext={advance}
                    />
                  )}
                  {step.kind === 'textarea' && (
                    <TextareaStep
                      step={step}
                      value={answers[step.id]}
                      onChange={v => set(step.id, v)}
                      onNext={advance}
                    />
                  )}
                  {step.kind === 'select' && (
                    <SelectStep
                      step={step}
                      onSelect={v => { set(step.id, v); setTimeout(advance, 220) }}
                      onSkip={step.optional ? advance : undefined}
                      initialValue={step.id === 'type' && preselectedType ? preselectedType : undefined}
                    />
                  )}
                </>
              ) : (
                <ThankYouScreen submitError={submitError} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   STEP: TEXT / EMAIL INPUT
══════════════════════════════════════════════════════════════════════════════ */
function usePlatformKey() {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return '↵'
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform) ? '↵' : 'Enter'
  }, [])
}

function TextStep({ step, value, onChange, onNext }: {
  step: Step; value: string; onChange: (v: string) => void; onNext: () => void
}) {
  const ref       = useRef<HTMLInputElement>(null)
  const enterKey  = usePlatformKey()
  const [shk, setShk] = useState(false)
  const [foc, setFoc] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 380)
    return () => clearTimeout(t)
  }, [step.id])

  function tryNext() {
    if (!step.optional && !value.trim()) {
      setShk(true); setTimeout(() => setShk(false), 550)
      return
    }
    if (step.kind === 'email' && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      setShk(true); setTimeout(() => setShk(false), 550)
      return
    }
    onNext()
  }

  return (
    <div>
      <QHeader question={step.question} subtext={step.subtext} />

      <motion.div
        animate={shk ? { x: [0, -9, 9, -9, 9, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: '2.75rem' }}
      >
        <input
          ref={ref}
          type={step.kind === 'email' ? 'email' : 'text'}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') tryNext() }}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          placeholder={step.placeholder}
          autoComplete={step.kind === 'email' ? 'email' : 'off'}
          spellCheck={false}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            borderBottom: `1px solid ${foc ? T.gold : T.borderM}`,
            color: T.text, fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.75rem, 4.5vw, 2.6rem)', fontWeight: 400,
            padding: '0.45rem 0', letterSpacing: '0.01em',
            transition: 'border-color 0.28s ease',
          }}
        />
      </motion.div>

      <div className="flex items-center justify-between">
        <GoldBtn onClick={tryNext}>Continue <ArrowRight size={13} /></GoldBtn>
        <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.68rem', color: T.dim, letterSpacing:'0.1em' }}>
          Press {enterKey}
        </span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   STEP: TEXTAREA
══════════════════════════════════════════════════════════════════════════════ */
function TextareaStep({ step, value, onChange, onNext }: {
  step: Step; value: string; onChange: (v: string) => void; onNext: () => void
}) {
  const ref      = useRef<HTMLTextAreaElement>(null)
  const isMac    = useMemo(() => typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform), [])

  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus(), 380)
    return () => clearTimeout(t)
  }, [step.id])

  return (
    <div>
      <QHeader question={step.question} subtext={step.subtext} />

      <textarea
        ref={ref}
        rows={4}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') onNext() }}
        placeholder={step.placeholder}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          borderBottom: `1px solid ${T.borderM}`,
          color: T.text, fontFamily: 'var(--font-jost)',
          fontSize: '1rem', lineHeight: 1.75,
          padding: '0.5rem 0', resize: 'none', letterSpacing: '0.01em',
          marginBottom: '0.5rem',
        }}
      />

      <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
        <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.68rem', color: T.dim, letterSpacing:'0.1em' }}>
          {isMac ? '⌘ Return' : 'Ctrl + Enter'} to continue
        </span>
      </div>

      <div className="flex items-center gap-5">
        <GoldBtn onClick={onNext}>Continue <ArrowRight size={13} /></GoldBtn>
        {step.optional && (
          <button
            onClick={onNext}
            style={{ fontFamily:'var(--font-jost)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color: T.dim, background:'none', border:'none', padding:'0.75rem 0.5rem', minHeight:'44px', transition:'color 0.2s', cursor:'pointer', display:'inline-flex', alignItems:'center' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = T.text)}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = T.dim)}
          >
            Skip →
          </button>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   STEP: SELECT
══════════════════════════════════════════════════════════════════════════════ */
function SelectStep({ step, onSelect, onSkip, initialValue }: {
  step: Step; onSelect: (v: string) => void; onSkip?: () => void; initialValue?: string
}) {
  const [hov,      setHov]      = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(initialValue ?? null)

  useEffect(() => {
    if (initialValue) {
      const t = setTimeout(() => onSelect(initialValue), 320)
      return () => clearTimeout(t)
    }
  }, [initialValue, onSelect])

  function pick(val: string) {
    setSelected(val)
    setTimeout(() => onSelect(val), 220)
  }

  return (
    <div>
      <QHeader question={step.question} subtext={step.subtext} />

      <div className="flex flex-col gap-2.5">
        {step.options?.map(opt => {
          const isSel = selected === opt.value
          const isHov = hov === opt.value && !selected
          return (
            <motion.button
              key={opt.value}
              onClick={() => !selected && pick(opt.value)}
              onMouseEnter={() => !selected && setHov(opt.value)}
              onMouseLeave={() => setHov(null)}
              whileTap={!selected ? { scale: 0.99 } : {}}
              style={{
                background:   isSel ? T.cardHi : (isHov ? T.cardHi : T.card),
                border:       `1px solid ${isSel ? T.gold : (isHov ? T.goldB : T.border)}`,
                borderRadius: 3, padding: '0.95rem 1.2rem', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: selected ? 'default' : 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
            >
              <div>
                <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.9rem', fontWeight:500, color: T.text, display:'block' }}>
                  {opt.label}
                </span>
                {opt.desc && (
                  <span style={{ fontFamily:'var(--font-jost)', fontSize:'0.72rem', color: T.dim, display:'block', marginTop:3, lineHeight:1.5 }}>
                    {opt.desc}
                  </span>
                )}
              </div>
              <ArrowRight
                size={13}
                style={{ color: T.gold, flexShrink:0, opacity: isSel || isHov ? 1 : 0, transition:'opacity 0.18s' }}
              />
            </motion.button>
          )
        })}
      </div>

      {onSkip && !selected && (
        <button
          onClick={onSkip}
          style={{ marginTop:'0.5rem', fontFamily:'var(--font-jost)', fontSize:'0.62rem', letterSpacing:'0.2em', textTransform:'uppercase', color: T.dim, background:'none', border:'none', padding:'0.75rem 0.5rem', minHeight:'44px', transition:'color 0.2s', display:'flex', alignItems:'center', gap:4, cursor:'pointer' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = T.text)}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = T.dim)}
        >
          Skip this one <ArrowRight size={11} />
        </button>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   FINAL SCREEN — placeholder for AI qualification (Phase 2)
══════════════════════════════════════════════════════════════════════════════ */
const LOAD_MSGS = [
  'Reviewing your brief',
  'Analysing project scope',
  'Assessing timeline and investment',
  'Preparing your project profile',
]

function ThankYouScreen({ submitError }: { submitError: boolean }) {
  const [phase,  setPhase]  = useState<'loading' | 'done'>('loading')
  const [dot,    setDot]    = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const t1 = setInterval(() => setDot(d => (d + 1) % 3), 480)
    const t2 = setInterval(() => setMsgIdx(i => (i + 1) % LOAD_MSGS.length), 1100)
    const t3 = setTimeout(() => setPhase('done'), 3800)
    return () => { clearInterval(t1); clearInterval(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {phase === 'loading' ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ minHeight: '55vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem' }}
        >
          {/* Three-dot pulse */}
          <div style={{ display:'flex', gap:9 }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: dot === i ? 1.55 : 1, background: dot === i ? T.gold : T.borderM }}
                transition={{ duration: 0.32 }}
                style={{ width:7, height:7, borderRadius:'50%', background: T.borderM }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28 }}
              style={{ fontFamily:'var(--font-jost)', fontSize:'0.68rem', letterSpacing:'0.24em', textTransform:'uppercase', color: T.dim }}
            >
              {LOAD_MSGS[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ textAlign: 'center' }}
        >
          {/* Divider mark */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            style={{ width: 32, height: 1, background: T.gold, margin: '0 auto 2.5rem' }}
          />

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.2rem,6vw,3.5rem)', fontWeight:400, color: T.text, lineHeight:1.1, marginBottom:'1.25rem' }}
          >
            Thank you.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            style={{ fontFamily:'var(--font-jost)', fontSize:'0.9rem', color: T.sub, lineHeight:1.8, maxWidth:'28ch', margin:'0 auto 3rem' }}
          >
            We are preparing your project profile.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ fontFamily:'var(--font-jost)', fontSize:'0.62rem', letterSpacing:'0.22em', textTransform:'uppercase', color: T.dim }}
          >
            We will be in touch shortly.
          </motion.p>

          {submitError && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              style={{ fontFamily:'var(--font-jost)', fontSize:'0.78rem', color:'#c0392b', lineHeight:1.7, maxWidth:'32ch', margin:'1.5rem auto 0', textAlign:'center' }}
            >
              There was an issue sending your details. Please reach us directly at{' '}
              <a href="mailto:vixxinteriors@gmail.com" style={{ color: T.gold, textDecoration:'underline' }}>
                vixxinteriors@gmail.com
              </a>{' '}
              or{' '}
              <a href="https://wa.me/2348065672607" target="_blank" rel="noopener noreferrer" style={{ color: T.gold, textDecoration:'underline' }}>
                WhatsApp
              </a>.
            </motion.p>
          )}

          {/* Footer link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            style={{ marginTop:'3.5rem', paddingTop:'2rem', borderTop:`1px solid ${T.border}` }}
          >
            <Link
              href="/"
              style={{ fontFamily:'var(--font-jost)', fontSize:'0.6rem', letterSpacing:'0.22em', textTransform:'uppercase', color: T.dim, textDecoration:'none' }}
              className="transition-colors duration-200 hover:text-[#C49A2E]"
            >
              ← Return to site
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ══════════════════════════════════════════════════════════════════════════════
   SHARED ATOMS
══════════════════════════════════════════════════════════════════════════════ */
function QHeader({ question, subtext }: { question: string; subtext?: string }) {
  return (
    <div style={{ marginBottom:'2.5rem' }}>
      <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,5vw,3.25rem)', fontWeight:400, color: T.text, lineHeight:1.1, marginBottom: subtext ? '0.65rem' : 0 }}>
        {question}
      </h2>
      {subtext && (
        <p style={{ fontFamily:'var(--font-jost)', fontSize:'0.84rem', color: T.sub, lineHeight:1.65 }}>
          {subtext}
        </p>
      )}
    </div>
  )
}

function GoldBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      style={{
        display:'inline-flex', alignItems:'center', gap:8,
        background: T.gold, color:'#1A1208', border:'none',
        fontFamily:'var(--font-jost)', fontSize:'0.64rem',
        letterSpacing:'0.22em', textTransform:'uppercase', fontWeight:500,
        padding:'0.85rem 1.5rem', minHeight:'44px', borderRadius:2, transition:'background 0.25s ease',
        cursor:'pointer',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = T.goldL)}
      onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = T.gold)}
    >
      {children}
    </motion.button>
  )
}
