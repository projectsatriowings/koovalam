import { useState } from 'react'
import {
  site,
  isContactConfigured,
  isWhatsAppConfigured,
  isFormConfigured,
} from '../config/site.js'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    participants: '1',
    travellingFrom: '',
    dates: 'Dec 17–19 (Provisional)',
    pickupNeeded: 'Yes, please arrange pickup from Kuttipuram',
    accommodation: 'Twin-sharing standard (₹9,999/person)',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Build structured message for WhatsApp or direct submission
  const buildEnquirySummary = () => {
    return [
      `*Koovalam Retreat Enquiry*`,
      `• Name: ${formData.fullName || 'Guest'}`,
      `• Phone/WhatsApp: ${formData.phone || 'Provided'}`,
      `• Participants: ${formData.participants}`,
      `• Travelling From: ${formData.travellingFrom || 'Not specified'}`,
      `• Preferred Dates: ${formData.dates}`,
      `• Kuttipuram Station Pickup: ${formData.pickupNeeded}`,
      `• Accommodation: ${formData.accommodation}`,
      formData.message ? `• Notes/Questions: ${formData.message}` : null,
      `• Food: Pure Vegetarian Confirmed`,
      `• Provisional Fee: ₹9,999 / person`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    track('enquiry_form_submitted')

    if (isFormConfigured) {
      fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          setSubmitting(false)
          setSubmitted(true)
        })
        .catch(() => {
          setSubmitting(false)
          setSubmitted(true)
        })
    } else if (isWhatsAppConfigured) {
      const text = encodeURIComponent(buildEnquirySummary())
      window.open(`https://wa.me/${site.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer')
      setSubmitting(false)
      setSubmitted(true)
    } else {
      // Staging / Demo preview mode
      setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
      }, 400)
    }
  }

  const handleCopyPreview = () => {
    const summary = buildEnquirySummary()
    navigator.clipboard?.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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
            Your Journey Starts <br className="hide-mobile" />
            <span className="serif-italic">With an Enquiry</span>
          </h2>
          <p className="travel-lede">
            Check availability, discuss preferred dates, and speak directly with our retreat organisers. There is no deposit or financial commitment required at this stage.
          </p>
        </div>

        {/* Trust & Reassurance Badges */}
        <div className="enquiry-trust-strip">
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>100% Non-Binding Enquiry</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Zero Advance Payment</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Pure Vegetarian Confirmed</span>
          </div>
          <div className="trust-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--antique-brass)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Direct Organiser Support</span>
          </div>
        </div>

        {/* Main Enquiry Layout */}
        <div className="enquiry-card-container">
          {/* Prominent Surgery & Health Notice */}
          <div className="enquiry-health-notice" role="alert">
            <div className="notice-icon-col" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--muted-terracotta)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="notice-text-col">
              <strong>Important Health Notice:</strong> Participants who have recently undergone surgery should contact the organiser before considering registration. Please mention any mobility or health-related considerations in your enquiry so we can guide you privately and thoughtfully.
            </div>
          </div>

          {submitted ? (
            /* Submission State */
            <div className="enquiry-success-panel" role="status">
              <div className="success-badge-icon" aria-hidden="true">
                <LeafMark color="var(--antique-brass)" size={36} />
              </div>
              <h3 className="success-heading">Thank You for Your Enquiry</h3>
              <p className="success-sub">
                We have received your retreat interest details. A member of our retreat team will review your enquiry and get back to you with confirmed dates and retreat guidelines.
              </p>

              {/* Staging Summary Box */}
              <div className="submission-summary-box">
                <div className="summary-box-head">
                  <span className="summary-title">Your Enquiry Summary</span>
                  <button
                    type="button"
                    onClick={handleCopyPreview}
                    className="btn-copy-preview"
                  >
                    {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
                  </button>
                </div>
                <pre className="summary-pre">{buildEnquirySummary()}</pre>
              </div>

              {!isContactConfigured && (
                <div className="staging-channel-notice">
                  <span className="staging-pill">Organiser Note</span>
                  <p>
                    Live communication channels are currently in staging configuration. To route live enquiries directly to WhatsApp or your CRM, update <code>src/config/site.js</code>.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="btn btn-travel-secondary"
                onClick={() => setSubmitted(false)}
              >
                ← Send Another Enquiry
              </button>
            </div>
          ) : (
            /* Interactive Enquiry Form */
            <form className="enquiry-form-travel" onSubmit={handleSubmit} noValidate>
              <div className="form-grid-2">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Nair"
                    className="form-input"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    WhatsApp / Phone Number <span className="req" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                {/* Number of Participants */}
                <div className="form-group">
                  <label htmlFor="participants" className="form-label">
                    Number of Participants
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1 Person (Solo Traveller)</option>
                    <option value="2">2 People (Couple / Friends)</option>
                    <option value="3">3 People</option>
                    <option value="4+">4+ Group</option>
                  </select>
                </div>

                {/* Travelling From */}
                <div className="form-group">
                  <label htmlFor="travellingFrom" className="form-label">
                    Travelling From (City / State)
                  </label>
                  <input
                    type="text"
                    id="travellingFrom"
                    name="travellingFrom"
                    value={formData.travellingFrom}
                    onChange={handleChange}
                    placeholder="e.g. Bengaluru, Kochi, Mumbai"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                {/* Preferred Dates */}
                <div className="form-group">
                  <label htmlFor="dates" className="form-label">
                    Preferred Dates
                  </label>
                  <select
                    id="dates"
                    name="dates"
                    value={formData.dates}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Dec 17–19 (Provisional)">
                      December 17–19 (Provisional Batch)
                    </option>
                    <option value="Flexible / Next Upcoming Batch">
                      Flexible / Next Upcoming Batch
                    </option>
                    <option value="Interested in 4-Day Option">
                      Interested in 4-Day Extended Option
                    </option>
                  </select>
                </div>

                {/* Kuttipuram Railway Station Pickup */}
                <div className="form-group">
                  <label htmlFor="pickupNeeded" className="form-label">
                    Pickup from Kuttipuram Railway Station?
                  </label>
                  <select
                    id="pickupNeeded"
                    name="pickupNeeded"
                    value={formData.pickupNeeded}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Yes, please arrange pickup from Kuttipuram">
                      Yes, please arrange group pickup
                    </option>
                    <option value="No, arranging own transport">
                      No, I will arrange independent transport
                    </option>
                    <option value="Undecided / need travel guidance">
                      Undecided / need travel guidance
                    </option>
                  </select>
                </div>
              </div>

              {/* Accommodation Preference */}
              <div className="form-group">
                <label htmlFor="accommodation" className="form-label">
                  Accommodation Preference
                </label>
                <select
                  id="accommodation"
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Twin-sharing standard (₹9,999/person)">
                    Twin-Sharing Standard (2 guests/room · Included in ₹9,999 provisional fee)
                  </option>
                  <option value="Enquire about private single occupancy room">
                    Enquire about Private Room (Subject to venue availability)
                  </option>
                </select>
              </div>

              {/* Message / Health Notes */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Questions, Mobility or Health Notes <span className="form-optional">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share any questions about the retreat, dietary requirements, recent surgery, or health considerations..."
                  className="form-textarea"
                />
              </div>

              {/* Reassurance Footer & Submit Button */}
              <div className="form-actions-footer">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-travel-primary btn-submit-large"
                >
                  {submitting ? 'Submitting Enquiry...' : 'Submit Retreat Enquiry'}
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
                </button>

                <p className="form-legal-note">
                  Submitting this form is completely non-binding. We respect your privacy and will never share your contact information.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
