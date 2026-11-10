import { useState } from 'react'
import { itineraryData } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

// Curated atmospheric imagery for each retreat day
const dayVisuals = {
  1: {
    src: 'images/resort/open-air-pavilion.jpg',
    alt: 'Open-air pavilion in nature for opening retreat orientation',
    caption: 'Open-air pavilion setting for the opening orientation circle and grounding breathwork',
    tag: 'ARRIVAL & ORIENTATION',
  },
  2: {
    src: 'images/highlight-nila-river.jpg',
    alt: 'Lush green Kerala scenery for mindful walking and nature connection',
    caption: 'Serene Kerala village and nature landscapes for the guided mindful walking tour',
    tag: 'NATURE & MOVEMENT',
  },
  3: {
    src: 'images/resort/dining-area.jpg',
    alt: 'Forest-view dining room for concluding vegetarian lunch and closing circle',
    caption: 'Forest-canopy dining setting for contemplation and concluding vegetarian lunch',
    tag: 'INTEGRATION & CLOSING',
  },
}

// Approximate phase labels for the flow steps
const phaseLabels = [
  'AFTERNOON',
  'LATE AFTERNOON',
  'EVENING',
  'NIGHT',
  'MORNING',
  'MID-DAY',
  'AFTERNOON',
  'EVENING',
]

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(1)

  const currentDay = itineraryData.days.find((d) => d.day === activeDay) || itineraryData.days[0]
  const currentVisual = dayVisuals[activeDay] || dayVisuals[1]

  return (
    <section className="section-itinerary" id="itinerary" aria-label="Retreat Daily Itinerary">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>RETREAT SCHEDULE &amp; RHYTHM</span>
          </div>
          <h2 className="travel-heading">
            Proposed Retreat <span className="serif-italic">Flow</span>
          </h2>
          <p className="travel-lede">
            An illustrative daily arc balancing mindful practice, cultural discovery and restorative quiet space. Dates and programme duration will be confirmed by the organiser.
          </p>
        </div>

        {/* ── 1. Unified Editorial Briefing Strip (Replaces Clunky Beige Alert Boxes) ── */}
        <div className="itinerary-briefing-strip" role="note" aria-label="Planning & Feasibility Briefing">
          <div className="briefing-col">
            <div className="briefing-tag-row">
              <span className="briefing-pill pill-neutral">DATES PENDING CONFIRMATION</span>
            </div>
            <p className="briefing-text">
              The client-supplied dates (December 17–19 / four-day trip) are under final operational confirmation. The sequence below illustrates the planned daily practices once calendar dates and duration are locked.
            </p>
          </div>

          <div className="briefing-divider" aria-hidden="true" />

          <div className="briefing-col">
            <div className="briefing-tag-row">
              <span className="briefing-pill pill-amber">LOGISTICS &amp; TRAVEL REVIEW</span>
            </div>
            <p className="briefing-text">
              Kottiyoor Temple (Kannur) and Tirunelli Temple (Wayanad) visits, inter-district travel feasibility, and evening cultural performances (flute, Bharatanatyam, Mohiniyattam) are under organiser review prior to booking.
            </p>
          </div>
        </div>

        {/* ── 2. Editorial Day Switcher Navigation ── */}
        <div className="itinerary-day-nav" role="tablist" aria-label="Retreat Days">
          {itineraryData.days.map((item) => {
            const isActive = activeDay === item.day
            return (
              <button
                key={item.day}
                role="tab"
                aria-selected={isActive}
                aria-controls={`day-panel-${item.day}`}
                id={`day-tab-${item.day}`}
                className={`itinerary-nav-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveDay(item.day)
                  track(`itinerary_tab_day_${item.day}`)
                }}
              >
                <span className="nav-tab-number">DAY 0{item.day}</span>
                <span className="nav-tab-label">{item.title.split('&')[0].trim()}</span>
              </button>
            )
          })}
        </div>

        {/* ── 3. Active Day Showcase Spread (Editorial Magazine Layout) ── */}
        <div
          className="itinerary-active-spread"
          id={`day-panel-${currentDay.day}`}
          role="tabpanel"
          aria-labelledby={`day-tab-${currentDay.day}`}
        >
          {/* Left Column: Narrative, Subtitle & Flow Timeline */}
          <div className="spread-narrative-col">
            <div className="spread-header">
              <div className="spread-day-watermark" aria-hidden="true">
                0{currentDay.day}
              </div>
              <div className="spread-title-wrap">
                <span className="spread-timing-badge">{currentDay.timingNote}</span>
                <h3 className="spread-main-title">{currentDay.title}</h3>
                <p className="spread-subtitle">{currentDay.subtitle}</p>
              </div>
            </div>

            <p className="spread-narrative-prose">{currentDay.narrative}</p>

            {/* Vertical Flow Timeline Spine */}
            <div className="spread-timeline-spine">
              <div className="timeline-spine-label">
                <span className="spine-dot" aria-hidden="true" />
                <span>CHRONOLOGICAL DAILY FLOW</span>
              </div>

              <div className="timeline-steps-list">
                {currentDay.highlights.map((point, idx) => {
                  const phase = phaseLabels[idx % phaseLabels.length]
                  return (
                    <div key={idx} className="timeline-step-row">
                      <div className="step-marker-col">
                        <span className="step-circle" aria-hidden="true" />
                        {idx < currentDay.highlights.length - 1 && <span className="step-line" aria-hidden="true" />}
                      </div>
                      <div className="step-content-col">
                        <span className="step-phase-tag">{phase}</span>
                        <p className="step-point-text">{point}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Curated Retreat Imagery & Atmosphere */}
          <div className="spread-visual-col">
            <div className="spread-image-card">
              <img
                src={currentVisual.src}
                alt={currentVisual.alt}
                className="spread-img"
                loading="lazy"
                decoding="async"
              />
              <div className="spread-image-overlay">
                <span className="spread-image-pill">{currentVisual.tag}</span>
                <p className="spread-image-caption">{currentVisual.caption}</p>
              </div>
            </div>

            {/* Day Practices Cluster */}
            <div className="spread-practices-strip">
              <span className="practices-strip-title">Featured Day Inclusions:</span>
              <div className="practices-pills-row">
                {currentDay.highlights.slice(0, 4).map((h, i) => (
                  <span key={i} className="practice-mini-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{h.split('&')[0].trim()}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Proposed Experiences Under Review (Streamlined Minimal Grid) ── */}
        <div className="itinerary-proposed-section">
          <div className="proposed-section-head">
            <div className="travel-eyebrow">
              <LeafMark color="var(--antique-brass)" size={12} />
              <span>LOGISTICS &amp; ARTIST REVIEW</span>
            </div>
            <h3 className="proposed-section-title">
              Temple Excursions &amp; Cultural Arts Under Scheduling Review
            </h3>
            <p className="proposed-section-sub">
              To ensure unhurried comfort, travel feasibility between Kannur and Wayanad, and confirmed artist availability, these proposed experiences are not fixed to specific hours until formally finalised.
            </p>
          </div>

          <div className="proposed-highlights-row">
            {itineraryData.proposedHighlightsUnderReview.map((feat, idx) => (
              <div key={idx} className="proposed-highlight-item">
                <span className="highlight-category">{feat.region || feat.genre}</span>
                <h4 className="highlight-name">{feat.name}</h4>
                <div className="highlight-status-wrap">
                  <span className="status-indicator-dot" aria-hidden="true" />
                  <span className="highlight-status-text">{feat.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
