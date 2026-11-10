import { useState } from 'react'
import { site } from '../config/site.js'
import { faqs } from '../data/faqs.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'

export function DatesCard() {
  const r = site.retreat
  return (
    <section className="sec-dates" aria-label="Retreat dates and enquiry details">
      <div className="wrap">
        <Reveal>
          <div className="dates-editorial-box">
            <div className="dates-main-info">
              <span className="eyebrow">Sanctuary Dates &amp; Access</span>
              <h2 className="dates-title">{r.name}</h2>
              <p className="dates-desc">
                Reservations are limited to ensure an intimate, unhurried group environment. Register on our priority guest list to receive confirmed dates and accommodation options prior to public opening.
              </p>

              <div className="dates-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Duration</span>
                  <span className="spec-value">{r.duration}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Location</span>
                  <span className="spec-value">{r.venue}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Dates</span>
                  <span className="spec-value spec-highlight">{r.dates}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Investment</span>
                  <span className="spec-value">{r.price}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Check-In</span>
                  <span className="spec-value">{r.checkIn}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Check-Out</span>
                  <span className="spec-value">{r.checkOut}</span>
                </div>
              </div>
            </div>

            <div className="dates-cta-side">
              <div className="cta-side-inner">
                <span className="priority-badge">Early Interest Priority</span>
                <p className="cta-side-text">
                  Joining our early-interest list is non-binding and incurs no fee. It simply guarantees you receive the invitation before public release.
                </p>
                <a
                  className="btn btn-gold btn-dates-cta"
                  href="#enquiry"
                  onClick={() => track('cta_dates_card')}
                >
                  Reserve Your Interest
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="sec-ivory sec-faq">
      {/* Anchor alias for #faqs compatibility */}
      <span id="faqs" className="section-anchor-alias" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial text-center">
            <p className="eyebrow">Clear &amp; Gentle Guidance</p>
            <h2>Frequently Asked Questions</h2>
            <p className="lede" style={{ margin: '0 auto' }}>
              Everything you need to know about preparing for your time with us in Kerala.
            </p>
          </div>
        </Reveal>

        <div className="faq-container">
          {faqs.map((f, i) => {
            const isOpen = open === i
            const panelId = `faq-answer-${i}`
            const buttonId = `faq-button-${i}`

            return (
              <div className={`faq-row ${isOpen ? 'active' : ''}`} key={f.q}>
                <button
                  id={buttonId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="faq-q-text">{f.q}</span>
                  <span className="faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="faq-answer-panel">
                    <p className="faq-a-text">{f.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Renders nothing when testimonials array is empty — preserves genuine integrity.
export function Testimonials() {
  if (!site.testimonials || !site.testimonials.length) return null

  return (
    <section className="sec-testimonials" aria-label="What participants say">
      <div className="wrap">
        <div className="section-head-editorial">
          <p className="eyebrow">Participant Reflections</p>
          <h2>Voices from the Retreat</h2>
        </div>
        <div className="testimonials-grid">
          {site.testimonials.map((t) => (
            <blockquote key={t.name} className="testimonial-card">
              <p className="testimonial-quote">“{t.quote}”</p>
              <cite className="testimonial-author">— {t.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
