import { useState } from 'react'
import { itineraryData } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import ImageSlot from './ImageSlot.jsx'
import { track } from '../lib/analytics.js'

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <section className="section-itinerary" id="itinerary" aria-label="Retreat Daily Itinerary">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>DAILY FLOW &amp; RHYTHM</span>
          </div>
          <h2 className="travel-heading">
            Your Retreat <span className="serif-italic">Journey</span>
          </h2>
          <p className="travel-lede">
            An unhurried daily arc balancing mindful practice, cultural discovery and restorative quiet space. Designed to let you unwind at your natural tempo.
          </p>
        </div>

        {/* Transparent Calendar Disclosure Banner */}
        <div className="schedule-disclosure-box" role="note" aria-label="Dates Notice">
          <div className="disclosure-icon" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--antique-brass)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="disclosure-text">
            <strong>Retreat Schedule Notice:</strong>{' '}
            {itineraryData.dateNotice}
          </div>
        </div>

        {/* Day Selector Tabs (for quick mobile & desktop navigation) */}
        <div className="itinerary-tabs" role="tablist" aria-label="Retreat Days">
          {itineraryData.days.map((item) => (
            <button
              key={item.day}
              role="tab"
              aria-selected={activeDay === item.day}
              aria-controls={`day-panel-${item.day}`}
              id={`day-tab-${item.day}`}
              className={`itinerary-tab-btn ${activeDay === item.day ? 'active' : ''}`}
              onClick={() => {
                setActiveDay(item.day)
                track(`itinerary_tab_day_${item.day}`)
              }}
            >
              <span className="tab-day-num">DAY 0{item.day}</span>
              <span className="tab-day-title">{item.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="itinerary-timeline-container">
          {itineraryData.days.map((dayItem) => {
            const isSelected = activeDay === dayItem.day
            return (
              <article
                key={dayItem.day}
                id={`day-panel-${dayItem.day}`}
                role="tabpanel"
                aria-labelledby={`day-tab-${dayItem.day}`}
                className={`itinerary-day-card ${isSelected ? 'is-selected' : 'is-dimmed'}`}
              >
                <div className="day-card-header">
                  <div className="day-badge-col">
                    <span className="day-pill">DAY 0{dayItem.day}</span>
                    <span className="day-timing">{dayItem.timingNote}</span>
                  </div>
                  <div className="day-title-col">
                    <h3 className="day-main-title">{dayItem.title}</h3>
                    <p className="day-subtitle">{dayItem.subtitle}</p>
                  </div>
                </div>

                <div className="day-card-body">
                  <p className="day-narrative">{dayItem.narrative}</p>

                  <div className="day-schedule-block">
                    <h4 className="schedule-block-heading">
                      <span>Daily Flow &amp; Highlights</span>
                    </h4>
                    <ul className="day-schedule-list">
                      {dayItem.highlights.map((point, idx) => (
                        <li key={idx} className="day-schedule-item">
                          <span className="schedule-bullet" aria-hidden="true">
                            <span className="bullet-dot" />
                          </span>
                          <span className="schedule-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Visual Breathing Room Image Strip */}
        <div className="itinerary-visual-banner">
          <div className="visual-banner-image">
            <ImageSlot name="highlight-nila-river" className="itinerary-river-slot" />
          </div>
          <div className="visual-banner-caption">
            <h4 className="caption-title">Still Waters, Ancient Palms &amp; Quiet Footpaths</h4>
            <p className="caption-text">
              Every day offers unscheduled windows for personal journaling, quiet contemplation beside Kerala greenery, or resting without hurry.
            </p>
            <a
              className="btn btn-travel-secondary"
              href="#stay-travel"
              onClick={() => track('cta_view_stay_travel')}
            >
              <span>Explore Stay &amp; Food Details</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
