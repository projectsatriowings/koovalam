import { useState } from 'react'
import { site } from '../config/site.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    participants: '1 Person',
    origin: '',
    pickup: 'Kuttipuram Railway Station (Organiser Pickup Hub)',
    accommodation: 'Twin Sharing (Standard — Two Guests per Room)',
    message: '',
    hp_company: '', // Honeypot spam prevention
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const validate = () => {
    const errors = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).'
    }

    const digits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || digits.length < 8) {
      errors.phone = 'Please enter a valid phone or WhatsApp number (at least 8 digits).'
    }

    if (!formData.participants) {
      errors.participants = 'Please select the number of participants.'
    }

    if (!formData.pickup) {
      errors.pickup = 'Please select your pickup preference.'
    }

    if (!formData.accommodation) {
      errors.accommodation = 'Please select your accommodation preference.'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || submitted) return

    if (!validate()) return

    setSubmitting(true)
    setErrorMessage('')
    track('enquiry_form_submit_attempt')

    try {
      const endpoint = site.formEndpoint || '/api/enquire'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        const errMsg =
          data?.error ||
          "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details."
        throw new Error(errMsg)
      }

      setSubmitted(true)
      track('enquiry_submission_success')
    } catch (err) {
      setErrorMessage(
        err.message ||
          "We couldn't send your enquiry at the moment. Please try again later or contact our team through the available contact details."
      )
      track('enquiry_submission_error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section-enquiry-travel" id="enquiry" aria-label="Enquiry and Registration">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>CONNECT WITH US</span>
          </div>
          <h2 className="travel-heading">
            Retreat Enquiry <br className="hide-mobile" />
            <span className="serif-italic">&amp; Registration</span>
          </h2>
          <p className="travel-lede">
            Reach out with practical questions regarding the retreat, proposed temple visits, cultural evenings, or guest suitability. Our team will review your details and respond with confirmed dates and room availability.
          </p>
        </div>

        {/* Trust & Reassurance Strip */}
        <div className="enquiry-trust-strip">
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>100% Non-Binding Enquiry</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Zero Upfront Payment</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Vegetarian Meals Planned</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Twin-Sharing Accommodation</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="enquiry-card-container">
          {submitted ? (
            /* Verified Success State — Only shown after server/provider confirms acceptance */
            <div className="enquiry-success-panel" role="status">
              <div className="success-badge-icon" aria-hidden="true">
                <LeafMark color="var(--antique-brass)" size={42} />
              </div>
              <h3 className="success-heading">Enquiry Received</h3>
              <p className="success-sub">
                Thank you for your enquiry! Your details have been sent successfully. Our team will contact you shortly.
              </p>
              <button
                type="button"
                className="btn btn-travel-secondary"
                onClick={() => {
                  setSubmitted(false)
                  setErrorMessage('')
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    participants: '1 Person',
                    origin: '',
                    pickup: 'Kuttipuram Railway Station (Organiser Pickup Hub)',
                    accommodation: 'Twin Sharing (Standard — Two Guests per Room)',
                    message: '',
                    hp_company: '',
                  })
                }}
              >
                ← Submit Another Enquiry
              </button>
            </div>
          ) : (
            /* Active Live Form */
            <form className="enquiry-form-travel" onSubmit={handleSubmit} noValidate>
              {/* Server Failure State Banner */}
              {errorMessage && (
                <div className="form-error-banner" role="alert">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users to catch automated bots) */}
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="hp_company">Leave this field blank</label>
                <input
                  type="text"
                  id="hp_company"
                  name="hp_company"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.hp_company}
                  onChange={handleChange}
                />
              </div>

              {/* Grid Row 1: Full Name & Email Address */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Nair"
                    className={`form-input ${validationErrors.fullName ? 'has-error' : ''}`}
                    aria-invalid={Boolean(validationErrors.fullName)}
                    aria-describedby={validationErrors.fullName ? 'fullName-error' : undefined}
                  />
                  {validationErrors.fullName && (
                    <span id="fullName-error" className="field-error-text">
                      {validationErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. priya.nair@example.com"
                    className={`form-input ${validationErrors.email ? 'has-error' : ''}`}
                    aria-invalid={Boolean(validationErrors.email)}
                    aria-describedby={validationErrors.email ? 'email-error' : undefined}
                  />
                  {validationErrors.email && (
                    <span id="email-error" className="field-error-text">
                      {validationErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Grid Row 2: WhatsApp / Phone & Number of Participants */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    WhatsApp / Mobile Number <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`form-input ${validationErrors.phone ? 'has-error' : ''}`}
                    aria-invalid={Boolean(validationErrors.phone)}
                    aria-describedby={validationErrors.phone ? 'phone-error' : undefined}
                  />
                  {validationErrors.phone && (
                    <span id="phone-error" className="field-error-text">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="participants" className="form-label">
                    Number of Participants <span className="req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    required
                    value={formData.participants}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1 Person">1 Person</option>
                    <option value="2 People (Couples / Friends)">2 People (Couples / Friends)</option>
                    <option value="3 People">3 People</option>
                    <option value="4+ Small Group">4+ Small Group</option>
                  </select>
                </div>
              </div>

              {/* Grid Row 3: City / Country of Origin & Pickup Preference */}
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="origin" className="form-label">
                    City / Country of Origin <span className="form-optional">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="origin"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, India or London, UK"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pickup" className="form-label">
                    Pickup Preference <span className="req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="pickup"
                    name="pickup"
                    required
                    value={formData.pickup}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Kuttipuram Railway Station (Organiser Pickup Hub)">
                      Kuttipuram Railway Station (Organiser Pickup Hub)
                    </option>
                    <option value="Other / Independent Travel">
                      Other / Independent Travel
                    </option>
                    <option value="Not Sure / Need Guidance">
                      Not Sure / Need Guidance
                    </option>
                  </select>
                </div>
              </div>

              {/* Accommodation Preference */}
              <div className="form-group">
                <label htmlFor="accommodation" className="form-label">
                  Accommodation Preference <span className="req" aria-hidden="true">*</span>
                </label>
                <select
                  id="accommodation"
                  name="accommodation"
                  required
                  value={formData.accommodation}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Twin Sharing (Standard — Two Guests per Room)">
                    Twin Sharing (Standard — Two Guests per Room)
                  </option>
                  <option value="Need Clarification / Single Room Query">
                    Need Clarification / Single Room Query
                  </option>
                </select>
              </div>

              {/* Message or Questions */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message or Questions <span className="form-optional">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share any general questions regarding retreat schedule, proposed temple visits (Kottiyoor / Tirunelli), or cultural performances. Please discuss sensitive health concerns directly with the organiser."
                  className="form-textarea"
                />
              </div>

              {/* Form Footer & Submit Action */}
              <div className="form-actions-footer">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-travel-primary btn-submit-large"
                >
                  {submitting ? (
                    <>
                      <span className="spinner-inline" aria-hidden="true" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Retreat Enquiry</span>
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
                    </>
                  )}
                </button>

                <p className="form-legal-note">
                  Submitted details are used solely to coordinate retreat availability and respond to your enquiry. We respect your privacy and never share personal information.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
