import { useState } from 'react'
import { days } from '../data/retreat.js'
import Reveal from './Reveal.jsx'

function DayCard({ d }) {
  const [open, setOpen] = useState(false)
  const panelId = `day-${d.day}-schedule`

  return (
    <article className={`editorial-day-card ${d.gold ? 'day-featured' : ''}`}>
      <div className="day-card-header">
        <div className="day-num-badge">
          <span className="day-prefix">Day</span>
          <span className="day-digit">0{d.day}</span>
        </div>
        <div className="day-title-wrap">
          <span className="day-milestone">{d.stop}</span>
          <h3 className="day-heading">{d.title}</h3>
        </div>
        {d.gold && (
          <span className="day-gold-pill">✦ Temple &amp; River Immersion</span>
        )}
      </div>

      <p className="day-blurb">{d.blurb}</p>

      <div className="day-highlights-box">
        <h4 className="highlights-title">Day Highlights</h4>
        <ul className="day-highlights-list">
          {d.highlights.map((h) => (
            <li key={h}>
              <span className="highlight-bullet" aria-hidden="true">•</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="day-schedule-toggle-wrap">
        <button
          className="day-accordion-btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? 'Hide Full Day Schedule' : 'View Full Day Schedule'}</span>
          <span className="accordion-indicator" aria-hidden="true">
            {open ? '−' : '+'}
          </span>
        </button>

        {open && (
          <div className="schedule-panel" id={panelId}>
            <table className="schedule-table">
              <tbody>
                {d.schedule.map(([time, item]) => (
                  <tr key={time + item}>
                    <td className="schedule-time">{time}</td>
                    <td className="schedule-activity">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </article>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="sec-ivory sec-journey">
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial">
            <p className="eyebrow">The 4-Day Itinerary</p>
            <h2>Follow the gentle flow, day by day</h2>
            <p className="lede">
              Each day unfolds as a conscious progression — from arrival and sensory clearing, to temple quiet, river air, and integration for daily life.
            </p>
          </div>
        </Reveal>

        <div className="itinerary-grid">
          {days.map((d) => (
            <Reveal key={d.day}>
              <DayCard d={d} />
            </Reveal>
          ))}
        </div>

        <div className="itinerary-footer-note">
          <p className="sample-disclaimer">
            * Note: This is an authentic sample schedule. Timings and outdoor activities may adapt gently to venue requirements, seasonal weather, river conditions, and the collective rhythm of participants.
          </p>
        </div>
      </div>
    </section>
  )
}
