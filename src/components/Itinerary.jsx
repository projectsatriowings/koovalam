import { useState } from 'react'
import { itineraryData } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

// Curated atmospheric imagery for each retreat day
const dayVisuals = {
  1: {
    src: 'images/resort/open-air-pavilion.jpg',
    alt: 'Open-air pavilion in nature for opening retreat orientation',
    caption: 'Open-air pavilion setting for the opening welcome circle and grounding breathwork',
    tag: 'ARRIVAL & GROUNDING',
  },
  2: {
    src: 'images/resort/hill-platform.jpg',
    alt: 'Lush hillside greenery for sensory nature walk and inner awareness',
    caption: 'Surrounded by greenery for mindfulness practice, guided journaling and sensory grounding walk',
    tag: 'BODY & INNER AWARENESS',
  },
  3: {
    src: 'images/highlight-nila-river.jpg',
    alt: 'Peaceful Nila River waters framed by Kerala palms',
    caption: 'Mindful Nila River boat safari (afternoon sample, subject to weather and safe boat conditions)',
    tag: 'CULTURE & NATURE',
  },
  4: {
    src: 'images/resort/dining-area.jpg',
    alt: 'Forest-view dining room for concluding vegetarian lunch and closing circle',
    caption: 'Forest-canopy dining room for personal integration sharing and concluding lunch',
    tag: 'INTEGRATION & CLOSING',
  },
}

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(1)

  const currentDay =
    itineraryData.days.find((d) => d.day === activeDay) || itineraryData.days[0]
  const currentVisual = dayVisuals[activeDay] || dayVisuals[1]

  return (
    <section className="section-itinerary" id="itinerary" aria-label="Retreat Daily Itinerary">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>DECEMBER 17–20 · 4 DAYS / 3 NIGHTS</span>
          </div>
          <h2 className="travel-heading">
            Suggested Daily <span className="serif-italic">Flow</span>
          </h2>
          <p className="travel-lede">
            A calm sample schedule from morning to night balancing mindful practice, cultural discovery, and restful space. Timings adapt to the venue, season, temple customs and guest comfort.
          </p>
        </div>

        {/* ── 1. Editorial Day Switcher Navigation (4 Days) ── */}
        <div className="itinerary-day-nav" role="tablist" aria-label="Retreat Days">
          {itineraryData.days.map((item) => {
            const isActive = activeDay === item.day
            return (
              <button
                key={item.day}
                type="button"
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
                <span className="nav-tab-label">{item.tabLabel}</span>
              </button>
            )
          })}
        </div>

        {/* ── 3. Active Day Showcase Spread ── */}
        <div
          className="itinerary-active-spread"
          id={`day-panel-${currentDay.day}`}
          role="tabpanel"
          aria-labelledby={`day-tab-${currentDay.day}`}
        >
          {/* Left Column: Narrative, Subtitle & Sample Schedule Timeline */}
          <div className="spread-narrative-col">
            <div className="spread-header">
              <span className="spread-timing-badge">{currentDay.timingNote}</span>
              <div className="spread-header-row">
                <div className="spread-title-wrap">
                  <h3 className="spread-main-title">{currentDay.title}</h3>
                  <p className="spread-subtitle">{currentDay.subtitle}</p>
                </div>
                <div className="spread-day-watermark" aria-hidden="true">
                  0{currentDay.day}
                </div>
              </div>
            </div>

            <p className="spread-narrative-prose">{currentDay.narrative}</p>

            {/* Vertical Daily Flow Timeline */}
            <div className="spread-timeline-spine">
              <div className="timeline-spine-label">
                <span className="spine-dot" aria-hidden="true" />
                <span>SUGGESTED DAILY FLOW</span>
              </div>

              <div className="timeline-steps-list">
                {currentDay.schedule.map((entry, idx) => (
                  <div key={idx} className="timeline-step-row">
                    <div className="step-marker-col">
                      <span className="step-circle" aria-hidden="true" />
                      {idx < currentDay.schedule.length - 1 && (
                        <span className="step-line" aria-hidden="true" />
                      )}
                    </div>
                    <div className="step-content-col">
                      <span className="step-phase-tag">
                        {entry.time} · {entry.phase}
                      </span>
                      <p className="step-point-text">{entry.activity}</p>
                    </div>
                  </div>
                ))}
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
              <span className="practices-strip-title">Day Highlights:</span>
              <div className="practices-pills-row">
                {(currentDay.featuredPills || []).map((pill, i) => (
                  <span key={i} className="practice-mini-pill">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--antique-brass)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Excursions & Cultural Highlights Under Confirmation ── */}
        <div className="itinerary-proposed-section">
          <div className="proposed-section-head">
            <div className="travel-eyebrow">
              <LeafMark color="var(--antique-brass)" size={12} />
              <span>EXCURSIONS &amp; CULTURAL PROGRAMME</span>
            </div>
            <h3 className="proposed-section-title">
              Temple Visits, River Safari &amp; Cultural Evenings Under Review
            </h3>
            <p className="proposed-section-sub">
              Every session is 100% voluntary and adaptable to personal comfort. Temple visits, Nila River boat safari (with licensed operator and life jackets), and cultural performances are finalised prior to booking.
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
