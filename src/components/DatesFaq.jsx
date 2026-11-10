import { useState } from 'react'
import { site, whatsappLink, isWhatsAppConfigured } from '../config/site.js'
import { faqCategories, faqs } from '../data/faqs.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'
import { LeafMark } from './Logo.jsx'
import { FinalCtaAside } from './Sections.jsx'
import EnquiryForm from './EnquiryForm.jsx'

/**
 * CHAPTER 08 · DATES, RESERVATIONS & ENQUIRY
 * Canonical Availability Status, 4-Step Reservation Journey & Early-Interest Enquiry
 */
export function DatesCard() {
  const r = site.retreat

  return (
    <section
      id="dates"
      className="sec-chapter-08 sec-dates"
      aria-labelledby="chapter-08-heading"
    >
      <div className="wrap">
        {/* Chapter 08 Header Bar */}
        <Reveal>
          <div className="chapter-intro-bar">
            <div className="chapter-eyebrow-wrap">
              <span className="chapter-badge">08</span>
              <span className="chapter-eyebrow">CHAPTER 08 · DATES, RESERVATIONS &amp; ENQUIRY</span>
            </div>
            <span className="chapter-tagline">Availability Status &amp; Early-Interest Register</span>
          </div>

          <div className="chapter-lead-block">
            <h2 id="chapter-08-heading" className="chapter-heading">
              When Stillness Beckons, <em>Begin with an Honest Pause</em>.
            </h2>
            <p className="chapter-sublead">
              We believe trust begins with complete transparency. Retreat dates, verified sanctuary venue, and confirmed pricing will be announced prior to public opening. Joining our early-interest register is non-binding, incurs no fee, and ensures you are notified first.
            </p>
          </div>
        </Reveal>

        {/* 1. Three Canonical Status Pillars */}
        <Reveal>
          <div className="dates-status-pillars-grid">
            {/* Pillar 01: Dates */}
            <div className="dates-status-pillar-card">
              <div className="pillar-header">
                <span className="pillar-eyebrow">RETREAT DATES</span>
                <span className="pillar-badge badge-pending">Announcing Soon</span>
              </div>
              <h3 className="pillar-title">Dates — Announcing Soon</h3>
              <p className="pillar-text">
                Retreat dates are currently being finalised. Confirmed dates will be announced before reservations open.
              </p>
              <div className="pillar-footer">
                <span className="pillar-status-note">Announced prior to reservations</span>
              </div>
            </div>

            {/* Pillar 02: Venue */}
            <div className="dates-status-pillar-card">
              <div className="pillar-header">
                <span className="pillar-eyebrow">SANCTUARY LOCATION</span>
                <span className="pillar-badge badge-neutral">Kerala, India</span>
              </div>
              <h3 className="pillar-title">Venue — Kerala, India</h3>
              <p className="pillar-text">
                The retreat will take place in Kerala, India. The exact venue and accommodation details are yet to be confirmed and will be shared before reservations open.
              </p>
              <div className="pillar-footer">
                <span className="pillar-status-note">Exact property to be confirmed</span>
              </div>
            </div>

            {/* Pillar 03: Pricing */}
            <div className="dates-status-pillar-card">
              <div className="pillar-header">
                <span className="pillar-eyebrow">INVESTMENT &amp; PRICING</span>
                <span className="pillar-badge badge-pending">To Be Announced</span>
              </div>
              <h3 className="pillar-title">Pricing — To Be Announced</h3>
              <p className="pillar-text">
                Confirmed pricing and a clear breakdown of inclusions will be shared before reservations open. No payment is being accepted at this stage.
              </p>
              <div className="pillar-footer">
                <span className="pillar-status-note">Shared prior to reservations</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. Sanctuary Specifications Grid */}
        <Reveal>
          <div className="dates-summary-card">
            <div className="summary-card-header">
              <span className="summary-card-eyebrow">SANCTUARY SPECIFICATIONS</span>
              <h3 className="summary-card-title">{r.name}</h3>
            </div>
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
                <span className="spec-label">Retreat Dates</span>
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
        </Reveal>

        {/* 3. The Four-Step Reservation Journey */}
        <Reveal>
          <div className="reservation-journey-section">
            <div className="journey-section-header">
              <div className="journey-header-kicker">
                <LeafMark color="var(--antique-gold)" size={20} />
                <span className="journey-kicker-text">TRANSPARENT RESERVATION PROCESS</span>
              </div>
              <h3 className="journey-section-title">The Four-Step Reservation Journey</h3>
              <p className="journey-section-sublead">
                To ensure complete peace of mind, reservations follow a clear, staged path. Notice: Steps 2–4 have not yet taken place.
              </p>
            </div>

            <div className="journey-steps-grid">
              {/* Step 01 */}
              <div className="journey-step-card is-pending">
                <div className="step-card-top">
                  <span className="step-num-badge">STEP 01</span>
                  <span className="step-state-badge state-pending">Not Yet Active</span>
                </div>
                <h4 className="step-title">Early-Interest Registration</h4>
                <p className="step-desc">
                  Registration is not yet active while contact configuration and venue arrangements are being finalised. No personal information or payments are collected at this stage.
                </p>
                <div className="step-card-boundary">
                  <span className="boundary-tag">Status:</span> Not yet active while contact configuration is incomplete.
                </div>
              </div>

              {/* Step 02 */}
              <div className="journey-step-card is-upcoming">
                <div className="step-card-top">
                  <span className="step-num-badge">STEP 02</span>
                  <span className="step-state-badge state-upcoming">Upcoming</span>
                </div>
                <h4 className="step-title">Receive Confirmed Details</h4>
                <p className="step-desc">
                  When retreat dates, venue details, and pricing are confirmed, registered participants will receive the complete itinerary and programme details directly.
                </p>
                <div className="step-card-boundary">
                  <span className="boundary-tag">Status:</span> Upcoming.
                </div>
              </div>

              {/* Step 03 */}
              <div className="journey-step-card is-upcoming">
                <div className="step-card-top">
                  <span className="step-num-badge">STEP 03</span>
                  <span className="step-state-badge state-upcoming">Upcoming</span>
                </div>
                <h4 className="step-title">Review Terms &amp; Inclusions</h4>
                <p className="step-desc">
                  Review room arrangements, meal plans, daily rhythm, and clear terms and conditions with unhurried time to decide at your own pace.
                </p>
                <div className="step-card-boundary">
                  <span className="boundary-tag">Status:</span> Upcoming.
                </div>
              </div>

              {/* Step 04 */}
              <div className="journey-step-card is-upcoming">
                <div className="step-card-top">
                  <span className="step-num-badge">STEP 04</span>
                  <span className="step-state-badge state-future">Not Yet Open</span>
                </div>
                <h4 className="step-title">Official Reservations</h4>
                <p className="step-desc">
                  When bookings officially open, formal reservations and accommodation bookings will be accepted through confirmed channels. No payments are accepted prior to this stage.
                </p>
                <div className="step-card-boundary">
                  <span className="boundary-tag">Status:</span> Not yet open.
                </div>
              </div>
            </div>

            <div className="journey-clarity-banner">
              <div className="clarity-banner-icon" aria-hidden="true">
                <LeafMark color="var(--antique-gold)" size={22} />
              </div>
              <p className="clarity-banner-text">
                <strong>Reservation Clarity Commitment:</strong> Joining our early-interest notification list is completely non-binding and does not guarantee a place, reserve a room, or constitute an official booking. It simply ensures you are informed first when confirmed dates, venue, and pricing are announced.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 4. Early-Interest Enquiry Section */}
        <Reveal>
          <div id="enquiry" className="chapter-08-enquiry-anchor" aria-label="Retreat reservation and enquiry">
            <div className="enquiry-editorial-banner">
              <picture>
                <source srcSet="images/final-cta-bg.webp" type="image/webp" />
                <img
                  src="images/final-cta-bg.jpg"
                  alt="Sunrise light filtering through tall Kerala canopy trees"
                  width="1600"
                  height="1066"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="banner-overlay-text">
                <span className="banner-kicker">Rooted in Nature. Connected to Soul.</span>
                <p className="banner-quote">“In the stillness of Kerala, find your rhythm again.”</p>
              </div>
            </div>

            <div className="enquiry-grid-layout">
              <FinalCtaAside />
              <EnquiryForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * CHAPTER 07 · FREQUENTLY ASKED QUESTIONS
 * Verified canonical queries across 6 mindful categories with accessibility controls
 */
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

        {/* Closing Refined Enquiry Banner */}
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
                  href="#dates"
                  className="btn btn-primary enquiry-btn"
                  onClick={() => track('faq_cta_enquiry')}
                >
                  View Dates &amp; Registration Status
                </a>
                {isWhatsAppConfigured && whatsappLink && (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary enquiry-btn"
                    onClick={() => track('faq_cta_whatsapp')}
                  >
                    Message on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Narrative Transition Bridge to Chapter 08: Dates, Reservations & Enquiry */}
        <Reveal>
          <div className="next-chapter-bridge">
            <div className="bridge-inner">
              <div className="bridge-icon">
                <LeafMark color="var(--antique-gold)" size={28} />
              </div>
              <div className="bridge-content">
                <span className="bridge-tag">NEXT CHAPTER</span>
                <p className="bridge-text">
                  Ready to review retreat availability status, the four-step reservation journey, and early-interest registration? Proceed to Chapter 08.
                </p>
                <a
                  href="#dates"
                  className="bridge-link"
                  onClick={() => track('nav_chapter_08_bridge')}
                >
                  <span className="bridge-link-text">Chapter 08 · Dates, Reservations &amp; Enquiry</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
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
