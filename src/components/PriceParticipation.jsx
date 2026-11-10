import { useState } from 'react'
import { investment, compactFaqs } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function PriceParticipation() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
    track(`faq_toggle_${index}`)
  }

  return (
    <section className="section-price-participation" id="price" aria-label="Retreat Pricing and Participation">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>TRANSPARENT PARTICIPATION</span>
          </div>
          <h2 className="travel-heading">
            Your Retreat <span className="serif-italic">Investment</span>
          </h2>
          <p className="travel-lede">
            Honest pricing, all-inclusive retreat essentials, and clear guidance on suitability before you enquire.
          </p>
        </div>

        {/* Top 2-Column Split: Investment Card + Participation & Health Notice Card */}
        <div className="investment-grid">
          {/* Column 1: Pricing & Inclusions */}
          <div className="investment-pricing-card">
            <div className="pricing-card-header">
              <span className="pricing-status-pill">{investment.statusTag}</span>
              <div className="pricing-amount-wrap">
                <span className="pricing-currency">₹</span>
                <span className="pricing-number">9,999</span>
                <span className="pricing-unit">/ {investment.unit}</span>
              </div>
              <p className="pricing-note">{investment.clarityNote}</p>
            </div>

            <div className="pricing-inclusions-block">
              <h3 className="inclusions-title">What is Included in Your Retreat:</h3>
              <ul className="inclusions-list">
                {investment.inclusions.map((inc, i) => (
                  <li key={i} className="inclusion-item">
                    <svg
                      width="16"
                      height="16"
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
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pricing-card-action">
              <a
                className="btn btn-travel-primary btn-full-width"
                href="#enquiry"
                onClick={() => track('cta_enquire_from_price_card')}
              >
                <span>Enquire About This Retreat</span>
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
              <span className="pricing-no-risk">
                Zero upfront payment required · Non-binding enquiry
              </span>
            </div>
          </div>

          {/* Column 2: Participation Guidelines & Prominent Surgery Notice */}
          <div className="participation-details-card">
            {/* Surgery & Health Notice — Critical Trust & Safety Element */}
            <div className="health-advisory-box" role="alert">
              <div className="advisory-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--muted-terracotta)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div className="advisory-text">
                <h3 className="advisory-title">Important Health Notice</h3>
                <p className="advisory-body">{investment.participation.surgeryNotice}</p>
              </div>
            </div>

            <div className="participation-criteria-block">
              <h3 className="criteria-heading">Who Can Attend</h3>
              <div className="criteria-specs">
                <div className="criteria-spec-item">
                  <div className="spec-label">Eligible Age Range</div>
                  <strong className="spec-val">{investment.participation.ageRange}</strong>
                  <p className="spec-sub">
                    Sessions are foundational and adaptable to normal mobility levels.
                  </p>
                </div>

                <div className="criteria-spec-item">
                  <div className="spec-label">Travel Style</div>
                  <strong className="spec-val">Solo Travellers &amp; Couples</strong>
                  <p className="spec-sub">{investment.participation.welcomeNote}</p>
                </div>

                <div className="criteria-spec-item">
                  <div className="spec-label">Adult Retreat Setting</div>
                  <strong className="spec-val">No Separate Family Rate</strong>
                  <p className="spec-sub">{investment.participation.familyNote}</p>
                </div>
              </div>
            </div>

            <div className="reassurance-quote-box">
              <p className="reassurance-quote">
                “Every practice is offered as an open invitation. You are always at liberty to rest, reflect in quiet nature, or participate at your own tempo.”
              </p>
            </div>
          </div>
        </div>

        {/* Compact Essential FAQs (4 items only) */}
        <div className="compact-faq-container">
          <div className="compact-faq-head text-center">
            <h3 className="compact-faq-title">Frequently Asked Questions</h3>
            <p className="compact-faq-sub">Quick answers to key planning questions</p>
          </div>

          <div className="compact-faq-accordion" role="region" aria-label="Frequently Asked Questions">
            {compactFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className={`compact-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="compact-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="compact-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
