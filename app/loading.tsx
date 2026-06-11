export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'var(--bg-primary)' }}
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated hex */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="animate-spin"
          style={{ animationDuration: '2s' }}
          aria-hidden="true"
        >
          <polygon
            points="24,4 42,14 42,34 24,44 6,34 6,14"
            stroke="#C49A2E"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
          <polygon
            points="24,10 37,17.5 37,30.5 24,38 11,30.5 11,17.5"
            stroke="#C49A2E"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        </svg>
        <span className="font-jost text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Loading
        </span>
      </div>
    </div>
  )
}
