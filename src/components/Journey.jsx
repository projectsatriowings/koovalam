import { useState } from 'react'
import { days } from '../data/retreat.js'
import Reveal from './Reveal.jsx'
import ImageSlot from './ImageSlot.jsx'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

/**
 * Editorial contextual details for each day's visual study & disclosure.
 * Strictly adheres to canonical retreat documentation.
 */
const DAY_METADATA = {
  1: {
    milestoneTag: 'MILESTONE 01 · THE ARRIVAL',
    pillar: 'SETTLING & EMBODIED PRESENCE',
    narrative:
      'Arriving at Koovalam is a conscious transition from the velocity of travel to the stillness of nature. After check-in from 2:00 PM and a refreshing welcome drink, the retreat opens with a quiet circle to set personal intentions. Gentle movement, foundational breathwork, and evening Yoga Nidra prepare the nervous system for deep, undisturbed rest.',
    quote: 'Check-in opens at 2:00 PM. No hurry, no demands — your first practice is simply giving yourself permission to stop.',
    imageName: 'included-stay',
    imageBadge: 'SERENE ARRIVAL COURTYARD',
    captionPill: 'REPRESENTATIVE KERALA RETREAT SETTING',
    captionText:
      'Representative imagery. The retreat will be hosted in Kerala, India (exact venue to be confirmed). Check-in opens from 2:00 PM to unpack, breathe, and begin in an unhurried, peaceful atmosphere.',
  },
  2: {
    milestoneTag: 'MILESTONE 02 · THE CLEARING',
    pillar: 'BODY, BREATH & INNER OBSERVATION',
    narrative:
      'A complete day immersed in stillness and conscious movement. Day 02 begins with silent morning sitting and grounding classical yoga, moves into cognitive mindfulness and guided reflective journaling, and flows into an afternoon nature walk and self-compassion meditation before evening rest.',
    quote: 'A dedicated full day to listen inwardly — moving through morning quiet, conscious breath, and self-compassion.',
    imageName: 'practice-nature-culture',
    imageBadge: 'SENSORY NATURE GROUNDING',
    captionPill: 'MINDFUL SENSORY WALKING',
    captionText:
      'Representative Kerala nature study · Dedicated afternoon walks for sensory grounding and mindful observation under the canopy of indigenous greenery.',
  },
  3: {
    milestoneTag: 'MILESTONE 03 · THE RIVER',
    pillar: 'CULTURE, SACRED WATERS & GRATITUDE',
    narrative:
      'Day 03 expands the retreat from the inner sanctuary outward into the cultural landscape of Kerala. Following gentle morning yoga and pranayama, participants visit a historic temple to experience early-morning serenity, stone courtyards, and centuries of contemplative quiet. In the afternoon, a mindful Nila River boat safari invites quiet drifting at golden hour, concluding with an evening reflection circle on gratitude and personal insight.',
    quote: 'Stepping gently into centuries of stone stillness in the morning, drifting along golden river waters in the afternoon.',
    captionPill: 'HERITAGE & RIVER IMMERSION STUDY',
    captionText:
      'Representative imagery. The confirmed retreat location is Kerala, India (exact venue to be confirmed) and is not located beside the river. The morning temple visit and afternoon Nila River boat safari are off-site experiences subject to local customs, temple timings, weather, and safe operating conditions, and are not guaranteed.',
  },
  4: {
    milestoneTag: 'MILESTONE 04 · THE RETURN',
    pillar: 'INTEGRATION & SUSTAINABLE DAILY RHYTHM',
    narrative:
      'A retreat is only as valuable as what you are able to sustain when you return home. Day 04 is dedicated to closing with clarity and calm. Following morning meditation and gentle yoga, an integration workshop helps you translate insights into a realistic, compassionate 15-minute home routine. The retreat concludes with a closing sharing circle, farewell lunch, and departure around 12:00 PM.',
    quote: 'A retreat is only as valuable as what you carry home. Gather what helped, and weave a gentle rhythm into daily life.',
    imageName: 'practice-reflection',
    imageBadge: 'PERSONAL INTEGRATION',
    captionPill: 'TAKE-HOME INTEGRATION',
    captionText:
      'Representative retreat study · Developing an unhurried, realistic self-care routine that easily translates from the retreat back into everyday living.',
  },
}

/**
 * Accessible Collapsible Schedule Drawer
 */
function DayScheduleDrawer({ day, schedule }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = `day-${day}-schedule-panel`
  const toggleId = `day-${day}-schedule-toggle`

  return (
    <div className="folio-schedule-wrapper">
      <button
        id={toggleId}
        type="button"
        className="folio-schedule-toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => {
          const next = !isOpen
          setIsOpen(next)
          track('journey_schedule_toggle', { day, open: next })
        }}
      >
        <span className="toggle-label-wrap">
          <span className="toggle-indicator-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
          <span className="toggle-text">
            {isOpen
              ? `Hide Day 0${day} Sample Timetable`
              : `View Day 0${day} Sample Timetable (${schedule.length} Sessions)`}
          </span>
        </span>
        <span className="toggle-badge" aria-hidden="true">
          {isOpen ? 'CLOSE SCHEDULE' : 'EXPAND SESSIONS'}
        </span>
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="folio-schedule-panel"
          role="region"
          aria-labelledby={toggleId}
        >
          <div className="schedule-panel-inner">
            <p className="schedule-guidance">
              * Sample timetable · Sessions are gentle and paced unhurriedly. Timings may adjust slightly to seasonal daylight, weather, and venue arrangements.
            </p>
            <div className="schedule-table-wrap">
              <table className="folio-schedule-table">
                <thead>
                  <tr>
                    <th scope="col" className="col-time">Time</th>
                    <th scope="col" className="col-activity">Session &amp; Practice</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map(([time, item]) => (
                    <tr key={time + item}>
                      <td className="time-cell">{time}</td>
                      <td className="activity-cell">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Single Day Folio Component
 */
function DayFolio({ d }) {
  const meta = DAY_METADATA[d.day] || {}
  const isSignature = Boolean(d.gold)
  const isReverse = d.day % 2 === 0

  return (
    <article
      id={`day-folio-${d.day}`}
      className={`day-folio ${isSignature ? 'day-folio-signature' : ''} ${
        isReverse ? 'day-folio-reverse' : ''
      }`}
    >
      {isSignature && (
        <div className="signature-crown-banner">
          <div className="crown-badge">
            <span className="crown-sparkle" aria-hidden="true">✦</span>
            <span>SIGNATURE RETREAT EXPERIENCE · DAY 03 IMMERSION</span>
          </div>
          <span className="crown-subtitle">TEMPLE SERENITY &amp; NILA RIVER DRIFT</span>
        </div>
      )}

      <div className="day-folio-header-strip">
        <div className="folio-milestone-pill">
          <span className="folio-day-digit">DAY 0{d.day}</span>
          <span className="folio-sep" aria-hidden="true">·</span>
          <span className="folio-milestone-title">{d.stop.toUpperCase()}</span>
        </div>
        <div className="folio-pillar-tag">
          <span>{meta.pillar}</span>
        </div>
      </div>

      <div className="day-folio-grid">
        {/* Narrative & Schedule Column */}
        <div className="day-folio-content">
          <h3 className="day-folio-title">{d.title}</h3>
          <p className="day-folio-epigraph">“{d.blurb}”</p>

          <p className="day-folio-narrative">{meta.narrative}</p>

          {/* Highlights Box */}
          <div className="day-highlights-card">
            <span className="highlights-card-kicker">KEY DAILY MILESTONES</span>
            <ul className="day-highlights-checklist">
              {d.highlights.map((h) => (
                <li key={h}>
                  <span className="highlight-leaf-marker" aria-hidden="true">✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule Drawer */}
          <DayScheduleDrawer day={d.day} schedule={d.schedule} />
        </div>

        {/* Visual Study & Atmosphere Column */}
        <div className="day-folio-visual">
          {d.day === 3 ? (
            /* Day 3 Dual Excursion Media Frame */
            <div className="day-dual-media-frame">
              <div className="dual-media-item">
                <div className="media-aspect-wrapper">
                  <ImageSlot name="highlight-temple" />
                </div>
                <span className="dual-media-tag">01 · MORNING TEMPLE QUIET</span>
              </div>
              <div className="dual-media-item">
                <div className="media-aspect-wrapper">
                  <ImageSlot name="highlight-nila-river" />
                </div>
                <span className="dual-media-tag">02 · AFTERNOON RIVER SAFARI</span>
              </div>
            </div>
          ) : (
            /* Single Image Media Frame */
            <div className="day-single-media-frame">
              <div className="media-aspect-wrapper">
                <ImageSlot name={meta.imageName} />
              </div>
              <div className="media-overlay-badge" aria-hidden="true">
                <span>{meta.imageBadge}</span>
              </div>
            </div>
          )}

          {/* Botanical Caption & Disclosure */}
          <div className="day-media-caption">
            <span className="caption-pill">{meta.captionPill}</span>
            <p className="caption-text">{meta.captionText}</p>
          </div>

          {/* Poetic Day Quote */}
          <blockquote className="day-folio-quote">
            <p>{meta.quote}</p>
          </blockquote>
        </div>
      </div>
    </article>
  )
}

/**
 * Chapter 04: The 4-Day Journey Component
 */
export default function Journey() {
  return (
    <section id="journey" className="sec-ivory sec-journey" aria-labelledby="journey-heading">
      <div className="wrap">
        {/* Chapter 04 Section Header */}
        <Reveal>
          <div className="chapter-intro-bar">
            <div className="chapter-eyebrow-wrap">
              <span className="chapter-badge">04</span>
              <span className="chapter-eyebrow">CHAPTER 04 · THE FOUR-DAY JOURNEY</span>
            </div>
            <span className="chapter-tagline">4 Days · 3 Nights · Kerala, India</span>
          </div>

          <div className="chapter-lead-block">
            <h2 id="journey-heading" className="chapter-heading">
              An Unhurried Arc of Rest, Stillness &amp; <em>Return</em>.
            </h2>
            <p className="chapter-sublead">
              A mindful retreat is not a rigid timetable or an exhausting checklist of activities. It is a thoughtfully paced progression designed to create space — beginning with the quiet arrival of setting down daily burdens, deepening into breath and inner awareness, opening into ancient temple quiet and river stillness, and closing with practical grounding to carry home.
            </p>
          </div>
        </Reveal>

        {/* 4-Stage Journey Milestones Rail */}
        <Reveal>
          <div className="journey-milestones-rail" role="region" aria-label="Retreat 4-Day Milestone Progression">
            <div className="milestones-track">
              <a href="#day-folio-1" className="milestone-node">
                <span className="milestone-step">DAY 01</span>
                <h3 className="milestone-name">The Arrival</h3>
                <p className="milestone-theme">Settling &amp; Grounding</p>
              </a>
              <a href="#day-folio-2" className="milestone-node">
                <span className="milestone-step">DAY 02</span>
                <h3 className="milestone-name">The Clearing</h3>
                <p className="milestone-theme">Breath &amp; Awareness</p>
              </a>
              <a href="#day-folio-3" className="milestone-node milestone-signature">
                <span className="milestone-step">DAY 03 · SIGNATURE</span>
                <h3 className="milestone-name">The River</h3>
                <p className="milestone-theme">Temple &amp; River Drift</p>
              </a>
              <a href="#day-folio-4" className="milestone-node">
                <span className="milestone-step">DAY 04</span>
                <h3 className="milestone-name">The Return</h3>
                <p className="milestone-theme">Home Integration</p>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Sequential 4-Day Daily Folios */}
        <div className="journey-chronicle">
          {days.map((d) => (
            <Reveal key={d.day}>
              <DayFolio d={d} />
            </Reveal>
          ))}
        </div>

        {/* Authentic Schedule Disclaimer & Voluntary Participation Ethos */}
        <Reveal>
          <div className="journey-ethos-banner">
            <div className="ethos-banner-icon" aria-hidden="true">
              <LeafMark color="var(--antique-gold)" size={34} />
            </div>
            <div className="ethos-banner-content">
              <span className="ethos-banner-kicker">A LIVING RHYTHM, NOT A RIGID TIMETABLE</span>
              <h3 className="ethos-banner-title">Gentle, Non-Dogmatic &amp; 100% Voluntary</h3>
              <p className="ethos-banner-text">
                This schedule reflects the authentic four-day arc of our retreat programme. The retreat is held in Kerala, India (exact venue to be confirmed). In keeping with our mindful philosophy, outdoor walks and the off-site Nila River boat safari adapt organically to weather, temple timings, and safe operating conditions, and are not guaranteed. Every session is an invitation: if you need to sleep in, take a solitary walk, or rest in your room, you are always supported in doing so. Practices are designed for general relaxation and well-being; they are non-dogmatic and are not clinical or medical treatments.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Narrative Bridge to Chapter 05 */}
        <Reveal>
          <div className="next-chapter-bridge">
            <div className="bridge-inner">
              <div className="bridge-icon">
                <LeafMark color="var(--antique-gold)" size={28} />
              </div>
              <div className="bridge-content">
                <span className="bridge-tag">NEXT CHAPTER</span>
                <p className="bridge-text">
                  Explore everything provided throughout your four-day stay — accommodations, nourishing vegetarian dining, and mindful facilitation.
                </p>
                <a
                  href="#included"
                  className="bridge-link"
                  onClick={() => track('nav_chapter_05_bridge')}
                >
                  <span className="bridge-link-text">Chapter 05 · What Is Included</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
