import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { DemoFrame } from './DemoFrame'

// Sourced from the MSc thesis (Section 3.5, Chapter 4.5): the real firmware
// energises exactly one of three solenoid valves at a time, in a strict,
// repeating 1->2->3 sequence (never a static "reveal" that stops once all
// three are open) — that's what drives the three-chamber wavy-cam actuator
// through continuous rotation. Pressure mapping under cycling found 0.16 bar
// lost across the valve stage generally (27% of the 0.60 bar regulated
// supply) — a property of the SMC VT307 valve type used at all three
// positions, not a fault isolated to any one of them. This diagram used to
// single out "Valve B" as the faulty one; that was wrong and has been fixed.
const VALVES = ['a', 'b', 'c'] as const
type ValveId = (typeof VALVES)[number]

const PHASE_MS = 700 // visual pacing only — the real firmware runs this at 60 ms

export default function PneumaticDiagram() {
  const reducedMotion = useReducedMotion()
  const [running, setRunning] = useState(!reducedMotion)
  const [active, setActive] = useState<ValveId>('a')
  const [cyclesDone, setCyclesDone] = useState(reducedMotion ? 1 : 0)
  const [dash, setDash] = useState(0)
  const intervalRef = useRef<number | null>(null)

  function runSequence() {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    setCyclesDone(0)
    setActive('a')
    setRunning(true)
    let i = 0
    intervalRef.current = window.setInterval(() => {
      i += 1
      setActive(VALVES[i % 3])
      if (i % 3 === 0) setCyclesDone((c) => c + 1)
    }, PHASE_MS)
  }

  useEffect(() => {
    if (!reducedMotion) runSequence()
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    let raf = 0
    function tick() {
      setDash((d) => (d + 1.4) % 24)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  const lossShown = cyclesDone >= 1

  return (
    <DemoFrame
      title="Pneumatic valve-stage loss"
      instructions="Exactly one valve fires at a time, in a strict repeating A → B → C rotation — that's what actually drives the actuator. Instrumenting every stage under cycling, not just the output, found 27% of the regulated supply lost at the valve stage itself."
      controls={
        <button
          type="button"
          onClick={runSequence}
          className="rounded-full border border-[var(--color-line)] px-3 py-1 text-[11px] font-medium text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Replay
        </button>
      }
    >
      <svg
        viewBox="0 0 640 220"
        className="h-[220px] w-full rounded-md border border-[var(--color-line-soft)] bg-[var(--color-bg)]"
      >
        {/* compressor -> regulator, always live */}
        <Pipe x1={70} y1={110} x2={190} y2={110} active dash={dash} />
        {/* regulator -> manifold split */}
        <Pipe x1={250} y1={110} x2={330} y2={110} active dash={dash} />
        <Pipe x1={330} y1={110} x2={330} y2={50} active dash={dash} />
        <Pipe x1={330} y1={110} x2={330} y2={170} active dash={dash} />
        {/* valve -> chamber, live only while that valve is the active phase */}
        <Pipe x1={330} y1={50} x2={410} y2={50} active={active === 'a' || !running} dash={dash} highlight={active === 'a'} />
        <Pipe x1={330} y1={110} x2={410} y2={110} active={active === 'b' || !running} dash={dash} highlight={active === 'b'} />
        <Pipe x1={330} y1={170} x2={410} y2={170} active={active === 'c' || !running} dash={dash} highlight={active === 'c'} />
        {/* each chamber pushes the shared wavy-cam / output shaft */}
        <Pipe x1={470} y1={50} x2={520} y2={110} active={active === 'a' || !running} dash={dash} highlight={active === 'a'} />
        <Pipe x1={470} y1={110} x2={520} y2={110} active={active === 'b' || !running} dash={dash} highlight={active === 'b'} />
        <Pipe x1={470} y1={170} x2={520} y2={110} active={active === 'c' || !running} dash={dash} highlight={active === 'c'} />
        <Pipe x1={520} y1={110} x2={580} y2={110} active dash={dash} />

        <StageBox x={20} y={85} w={50} h={50} label="Compressor" on />
        <StageBox x={190} y={85} w={60} h={50} label="Regulator" on />

        <StageBox x={410} y={25} w={60} h={50} label="Valve A" on={active === 'a' || !running} firing={active === 'a'} />
        <StageBox x={410} y={85} w={60} h={50} label="Valve B" on={active === 'b' || !running} firing={active === 'b'} />
        <StageBox x={410} y={145} w={60} h={50} label="Valve C" on={active === 'c' || !running} firing={active === 'c'} />

        <StageBox x={580} y={85} w={50} h={50} label="Shaft" on spinning={running} />

        {lossShown && (
          <g>
            <rect x={355} y={195} width="170" height="20" rx="10" fill="var(--color-accent)" opacity="0.14" />
            <text
              x={440}
              y="209"
              textAnchor="middle"
              fill="var(--color-accent)"
              fontSize="10.5"
              fontWeight={700}
              letterSpacing="0.02em"
            >
              27% LOST AT THE VALVE STAGE
            </text>
          </g>
        )}
      </svg>
    </DemoFrame>
  )
}

function Pipe({
  x1,
  y1,
  x2,
  y2,
  active,
  dash,
  highlight,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  active: boolean
  dash: number
  highlight?: boolean
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={highlight ? 'var(--color-accent)' : active ? 'var(--color-ink-soft)' : 'var(--color-line)'}
      strokeWidth={highlight ? 3 : 2.5}
      strokeDasharray={active ? '6 6' : undefined}
      strokeDashoffset={active ? -dash : undefined}
      strokeLinecap="round"
      style={{ transition: 'stroke 0.3s ease' }}
    />
  )
}

function StageBox({
  x,
  y,
  w,
  h,
  label,
  on,
  firing,
  spinning,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  on: boolean
  /** This valve is the one currently energised in the A -> B -> C rotation. */
  firing?: boolean
  /** The output shaft — spins continuously whenever the sequence is running, since one valve is always live. */
  spinning?: boolean
}) {
  const stroke = firing ? 'var(--color-accent)' : on ? 'var(--color-ink)' : 'var(--color-line)'
  return (
    <g style={{ transition: 'opacity 0.3s ease', opacity: on ? 1 : 0.45 }}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={firing ? 'color-mix(in srgb, var(--color-accent) 10%, transparent)' : 'var(--color-panel)'}
        stroke={stroke}
        strokeWidth={firing ? 2 : 1.4}
      />
      <text x={x + w / 2} y={y + h / 2 - (spinning ? 0 : 6)} textAnchor="middle" className="fill-[var(--color-ink)]" fontSize="9.5" fontWeight={600}>
        {label}
      </text>
      {spinning ? (
        <circle
          cx={x + w / 2}
          cy={y + h / 2 + 12}
          r={5}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.6}
          strokeDasharray="3 3"
          style={{ transformOrigin: `${x + w / 2}px ${y + h / 2 + 12}px`, animation: 'spin 1.2s linear infinite' }}
        />
      ) : (
        <rect x={x + 6} y={y + h - 12} width={w - 12} height={4} rx={2} fill={firing ? 'var(--color-accent)' : 'var(--color-line)'} opacity={on ? 1 : 0} />
      )}
    </g>
  )
}
