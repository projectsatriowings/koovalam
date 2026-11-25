import { useState } from 'react'
import { investment, compactFaqs } from '../data/retreat.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'
import { scrollToEnquiry } from '../lib/scroll.js'

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
            Retreat Investment <br className="hide-mobile" />
            <span className="serif-italic">&amp; Guest Suitability</span>
          </h2>
          <p className="travel-lede">
            Confirmed per-person pricing tiers, planned all-inclusive arrangements, and clear participant guidance before you enquire.
          </p>
        </div>

        {/* ── Main 2-Column Split: Investment Showcase (Left) + Participant & Health Guidelines (Right) ── */}
        <div className="investment-grid">
          {/* Column 1: Pricing & All-Inclusive Inclusions */}
          <div className="investment-pricing-card">
            <div className="pricing-card-top-block">
              <div className="pricing-status-header">
                <span className="pricing-status-pill">{investment.statusTag}</span>
                <span className="pricing-season-tag">Dec 25–28 · Wayanad, Kerala</span>
              </div>

              {/* Dual Occupancy Tiers */}
              <div className="pricing-tiers-row">
                {/* Double Occupancy */}
                <div className="pricing-tier-box double-box">
                  <span className="tier-box-label">Double Occupancy</span>
                  <div className="tier-box-price-wrap">
                    <span className="tier-box-currency">₹</span>
                    <span className="tier-box-num">17,999</span>
                    <span className="tier-box-unit">/ person</span>
                  </div>
                  <span className="tier-box-note">
                    Twin-sharing · 2 guests per room
                  </span>
                </div>

                {/* Single Occupancy */}
                <div className="pricing-tier-box single-box">
                  <span className="tier-box-label label-gold">Single Occupancy</span>
                  <div className="tier-box-price-wrap">
                    <span className="tier-box-currency">₹</span>
                    <span className="tier-box-num">26,999</span>
                    <span className="tier-box-unit">/ person</span>
                  </div>
                  <span className="tier-box-note">
                    Private room for one guest
                  </span>
                </div>
              </div>

              <p className="pricing-intro-note">
                Experience four days of mindful living, connection, and relaxation in the serene landscapes of Wayanad. Clearly stated per person with zero hidden charges.
              </p>

              {/* 10 Inclusions in a Compact 2-Column Grid */}
              <div className="pricing-inclusions-block">
                <div className="inclusions-header-row">
                  <h3 className="inclusions-title">Planned Activities &amp; Arrangements (All Included):</h3>
                  <span className="inclusions-badge">10 Inclusions</span>
                </div>

                <ul className="inclusions-grid-2col-compact">
                  {investment.inclusions.map((inc, i) => (
                    <li key={i}>
                      <svg
                        width="14"
                        height="14"
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
            </div>

            {/* Action Button at Bottom */}
            <div className="pricing-card-action">
              <a
                className="btn btn-travel-primary btn-full-width"
                href="#enquiry"
                onClick={(e) => {
                  track('cta_enquire_from_price_card')
                  scrollToEnquiry(e)
                }}
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
                No payment or deposit required at this stage · Non-binding enquiry
              </span>
            </div>
          </div>

          {/* Column 2: Health Notice, Participant Information, Transit & Reassurance */}
          <div className="participation-details-card">
            {/* 1. Surgery & Health Notice */}
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

            {/* 2. Participant Eligibility Information */}
            <div className="participation-criteria-block">
              <h3 className="criteria-heading">Participant Information</h3>
              <div className="criteria-specs">
                <div className="criteria-spec-item">
                  <div className="spec-label">Stated Intended Age Range</div>
                  <strong className="spec-val">18–60 years</strong>
                  <p className="spec-sub">
                    Subject to final eligibility confirmation. Practices are gentle and foundational.
                  </p>
                </div>

                <div className="criteria-spec-item">
                  <div className="spec-label">Attendance</div>
                  <strong className="spec-val">Couples May Join</strong>
                  <p className="spec-sub">{investment.participation.couplesNote}</p>
                </div>

                <div className="criteria-spec-item">
                  <div className="spec-label">Package Structure</div>
                  <strong className="spec-val">Adult Immersion · No Family Package</strong>
                  <p className="spec-sub">{investment.participation.familyNote}</p>
                </div>
              </div>
            </div>

            {/* 3. Nearest Transit Hubs & Pick-up Arrangement */}
            <div className="participation-transit-block">
              <span className="transit-hub-tag">NEAREST TRANSIT HUBS</span>
              <h4 className="transit-hub-title">Getting to Oxyfarm Resorts</h4>
              <p className="transit-hub-text">
                <strong>Airport:</strong> Kannur (CNN) · <strong>Train:</strong> Thalassery · <strong>Bus:</strong> Mananthavady
              </p>
              <span className="transit-hub-badge">
                Pick-up not included in package · Arranged upon request
              </span>
            </div>

            {/* 4. Voluntary Participation Quote */}
            <div className="reassurance-quote-box">
              <p className="reassurance-quote">
                “All sessions and practices are voluntary. Participants are welcome to engage at their own comfort level or take personal quiet time.”
              </p>
            </div>
          </div>
        </div>

        {/* ── Frequently Asked Questions (Full-Width Accordion) ── */}
        <div className="compact-faq-container">
          <div className="compact-faq-head text-center">
            <h3 className="compact-faq-title">Frequently Asked Questions</h3>
            <p className="compact-faq-sub">Verified answers to practical planning questions</p>
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
