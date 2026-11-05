import { useEffect, useRef, useState } from 'react'
import { days } from '../data/retreat.js'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'

function DayCard({ d, prefix = 'd' }) {
  const [open, setOpen] = useState(false)
  const panelId = `${prefix}-day-${d.day}-schedule`
  return (
    <article className={`day-card ${d.gold ? 'gold' : ''}`}>
      <div className="day-num">Day {d.day}</div>
      <p style={{ fontSize: '.8rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#B08D4A', fontWeight: 800, margin: 0 }}>{d.stop}</p>
      <h3>{d.title}</h3>
      <p style={{ color: '#5c6657' }}>{d.blurb}</p>
      <ul>{d.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
      <button className="acc-btn" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
        {open ? 'Hide full schedule' : 'See full day schedule'} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <table className="schedule" id={panelId}>
          <tbody>
            {d.schedule.map(([time, item]) => (
              <tr key={time + item}><td>{time}</td><td>{item}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </article>
  )
}

// Desktop: horizontal route map — a river line that fills as you scroll.
// Mobile: the same days as a vertical route timeline. Both are keyboard
// reachable: the stop pins are buttons that focus the matching day card.
export default function Journey() {
  const mapRef = useRef(null)
  const [fill, setFill] = useState(0)
  const cardRefs = useRef({})
  useEffect(() => {
    const onScroll = () => {
      const el = mapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height + window.innerHeight
      const seen = window.innerHeight - r.top
      setFill(Math.max(0, Math.min(1, seen / total)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const PATH_LEN = 1000
  const stops = [
    { x: 70, y: 62, day: 1 }, { x: 300, y: 34, day: 2 }, { x: 560, y: 66, day: 3 }, { x: 800, y: 36, day: 4 },
  ]
  const focusDay = (day) => cardRefs.current[day]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  return (
    <section id="journey" className="journey sec-ivory">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Your 4-day journey</p>
          <h2>Follow the river, one day at a time</h2>
          <p className="lede">Like a plotted trip, each day is a stop on the route — arrival, clearing, the river, and the return home. Expand any day for its full schedule.</p>
        </Reveal>
        <div className="route-map" ref={mapRef} aria-hidden="true">
          <svg viewBox="0 0 880 110">
            <path className="route-track" d="M20 70 C 140 20, 240 95, 360 55 S 600 25, 700 60 S 840 45, 860 50" />
            <path className="route-fill" d="M20 70 C 140 20, 240 95, 360 55 S 600 25, 700 60 S 840 45, 860 50" strokeDasharray={PATH_LEN} strokeDashoffset={PATH_LEN * (1 - fill)} />
            {stops.map((s) => (
              <g key={s.day} className={`route-stop ${s.day === 3 ? 'gold' : ''}`} role="button" tabIndex={0}
                onClick={() => focusDay(s.day)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focusDay(s.day) } }}>
                <circle cx={s.x} cy={s.y} r="17" />
                <text x={s.x} y={s.y + 5}>{s.day}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="stop-grid">
          {days.map((d) => (
            <div key={d.day} ref={(el) => { cardRefs.current[d.day] = el }} tabIndex={-1}><Tilt><DayCard d={d} prefix="d" /></Tilt></div>
          ))}
        </div>
        <div className="vroute">
          {days.map((d) => <DayCard key={d.day} d={d} prefix="m" />)}
        </div>
        <p className="note">This is a sample schedule. It may adapt to venue, season, temple timings and river conditions — and always to how the group is feeling.</p>
      </div>
    </section>
  )
}
