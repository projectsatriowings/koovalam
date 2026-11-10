import { useState } from 'react'
import { site, whatsappLink } from '../config/site.js'
import { faqCategories, faqs } from '../data/faqs.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'
import { LeafMark } from './Logo.jsx'

export function DatesCard() {
  const r = site.retreat
  return (
    <section id="dates" className="sec-dates" aria-label="Retreat dates and enquiry details">
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
                <span className="priority-badge">Early Interest Notification</span>
                <p className="cta-side-text">
                  Joining our early-interest list is non-binding and incurs no fee. It simply means we will notify you first when dates, venue, and price are confirmed.
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
  const [activeCategory, setActiveCategory] = useState('all')
  // Initialize with the first question open: 'location-0'
  const [openItems, setOpenItems] = useState({ 'location-0': true })

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    track('faq_toggle_question', { key })
  }

  const expandAll = () => {
    const all = {}
    faqCategories.forEach((cat) => {
      cat.questions.forEach((_, qIdx) => {
        all[`${cat.id}-${qIdx}`] = true
      })
    })
    setOpenItems(all)
    track('faq_expand_all')
  }

  const collapseAll = () => {
    setOpenItems({})
    track('faq_collapse_all')
  }

  const filteredCategories =
    activeCategory === 'all'
      ? faqCategories
      : faqCategories.filter((cat) => cat.id === activeCategory)

  const totalQuestions = faqs.length

  return (
    <section
      id="faq"
      className="sec-ivory sec-faq"
      aria-labelledby="faq-heading"
    >
      {/* Anchor alias for #faqs compatibility */}
      <span id="faqs" className="section-anchor-alias" aria-hidden="true" />
      <div className="wrap">
        {/* Chapter 07 Header Bar */}
        <Reveal>
          <div className="chapter-intro-bar">
            <div className="chapter-eyebrow-wrap">
              <span className="chapter-badge">07</span>
              <span className="chapter-eyebrow">CHAPTER 07 · FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <span className="chapter-tagline">Clarity, Preparation &amp; Mindful Guidance</span>
          </div>

          <div className="chapter-lead-block">
            <h2 id="faq-heading" className="chapter-heading">
              Everything You Need to Know <em>Before You Arrive</em>.
            </h2>
            <p className="chapter-sublead">
              An unhurried retreat begins with complete peace of mind. Below, we address every practical question regarding the retreat location, daily rhythm, accommodations, dietary care, and reservation process.
            </p>
          </div>
        </Reveal>

        {/* Category Navigation Filter Pills & Quick Actions */}
        <Reveal>
          <div className="faq-controls-bar">
            <div
              className="faq-filter-pills"
              role="group"
              aria-label="Filter FAQ questions by topic"
            >
              <button
                type="button"
                id="faq-filter-all"
                aria-pressed={activeCategory === 'all'}
                className={`faq-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('all')
                  track('faq_filter_category', { category: 'all' })
                }}
              >
                All Questions <span className="pill-count">({totalQuestions})</span>
              </button>
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  id={`faq-filter-${cat.id}`}
                  aria-pressed={activeCategory === cat.id}
                  className={`faq-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    track('faq_filter_category', { category: cat.id })
                  }}
                >
                  <span className="pill-num">{cat.number}</span> {cat.title}
                </button>
              ))}
            </div>

            <div className="faq-expand-actions">
              <button
                type="button"
                className="faq-action-link"
                onClick={expandAll}
                aria-label="Expand all FAQ questions"
              >
                Expand all
              </button>
              <span className="action-divider" aria-hidden="true">·</span>
              <button
                type="button"
                className="faq-action-link"
                onClick={collapseAll}
                aria-label="Collapse all FAQ questions"
              >
                Collapse all
              </button>
            </div>
          </div>
        </Reveal>

        {/* Categorized FAQ Accordion Groups */}
        <div id="faq-panels" className="faq-groups-wrap">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="faq-category-section">
              <div className="faq-category-header">
                <div className="category-meta">
                  <span className="category-badge">{cat.number}</span>
                  <div>
                    <h3 className="category-title">{cat.title}</h3>
                    <p className="category-tagline">{cat.tagline}</p>
                  </div>
                </div>
              </div>

              <div className="faq-accordion-list">
                {cat.questions.map((item, qIdx) => {
                  const itemKey = `${cat.id}-${qIdx}`
                  const isOpen = !!openItems[itemKey]
                  const buttonId = `faq-btn-${itemKey}`
                  const panelId = `faq-panel-${itemKey}`

                  return (
                    <div
                      key={item.q}
                      className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                    >
                      <button
                        id={buttonId}
                        type="button"
                        className="faq-accordion-btn"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(itemKey)}
                      >
                        <span className="faq-q-text">{item.q}</span>
                        <span className="faq-icon-wrap" aria-hidden="true">
                          <svg
                            className={`faq-arrow-icon ${isOpen ? 'rotate' : ''}`}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="faq-panel-content"
                        >
                          <p className="faq-a-text">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Closing Refined Enquiry Section */}
        <Reveal>
          <div className="faq-enquiry-banner">
            <div className="enquiry-banner-inner">
              <div className="enquiry-banner-kicker">
                <LeafMark color="var(--antique-gold)" size={20} />
                <span className="enquiry-kicker-text">STILL HAVE A QUESTION?</span>
              </div>
              <h3 className="enquiry-banner-title">
                We Are Here to Help You Prepare
              </h3>
              <p className="enquiry-banner-text">
                Whether you have accessibility questions, personal health considerations, or would like to be notified as soon as retreat dates and pricing are announced, we are warmly available to guide you.
              </p>
              <div className="enquiry-banner-actions">
                <a
                  href="#enquiry"
                  className="btn btn-primary enquiry-btn"
                  onClick={() => track('faq_cta_enquiry')}
                >
                  Register Early Interest
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary enquiry-btn"
                  onClick={() => track('faq_cta_whatsapp')}
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
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
