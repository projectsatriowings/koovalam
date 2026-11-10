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
    datesNote: 'Dates to be confirmed by organiser',
    pickupInterest: 'Requested pickup point: Kuttipuram Railway Station',
    accommodation: 'Twin-sharing (two guests per room)',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errors = {}
    if (!formData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.'
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your contact phone or WhatsApp number.'
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errors.phone = 'Please enter a valid phone number with country/area code.'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const buildWhatsAppMessage = () => {
    return [
      `*Koovalam Retreat Enquiry*`,
      `• Name: ${formData.fullName.trim()}`,
      `• Phone: ${formData.phone.trim()}`,
      `• Participants: ${formData.participants}`,
      formData.travellingFrom.trim() ? `• Travelling From: ${formData.travellingFrom.trim()}` : null,
      `• Accommodation: ${formData.accommodation}`,
      `• Requested Pickup Point: Kuttipuram Railway Station`,
      `• Dates: Dates to be confirmed by organiser`,
      `• Pricing: Provisional ₹9,999/person (Subject to confirmation)`,
      formData.notes.trim() ? `• Notes: ${formData.notes.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting || submitted) return

    if (!validate()) return

    setSubmitting(true)
    setErrorMessage('')
    track('enquiry_form_submit_attempt')

    try {
      if (isFormConfigured) {
        const response = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error('Submission failed. Please check your network and try again.')
        }

        setSubmissionResult({
          type: 'api_success',
          title: 'Enquiry Received',
          message: `Thank you, ${formData.fullName}. Your enquiry has been received by our retreat team. We will review your details and respond with confirmed dates and retreat guidelines.`,
        })
        setSubmitted(true)
        track('enquiry_submission_success_endpoint')
      } else if (isWhatsAppConfigured) {
        const text = encodeURIComponent(buildWhatsAppMessage())
        const waUrl = `https://wa.me/${site.whatsappNumber}?text=${text}`
        let opened = false
        try {
          const win = window.open(waUrl, '_blank', 'noopener,noreferrer')
          opened = Boolean(win && !win.closed)
        } catch {
          opened = false
        }

        setSubmissionResult({
          type: opened ? 'whatsapp_opened' : 'whatsapp_blocked',
          waUrl,
          title: opened ? 'WhatsApp Ready to Send' : 'Action Required: Open WhatsApp',
          message: opened
            ? 'WhatsApp has opened with your enquiry details. Please review the message and press Send to complete your enquiry.'
            : 'Your browser prevented WhatsApp from opening automatically. Please use the button below to open WhatsApp with your prefilled enquiry and press Send.',
        })
        setSubmitted(true)
        track('enquiry_submission_whatsapp_handoff')
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while submitting your enquiry. Please try again.')
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
            Retreat Enquiries <br className="hide-mobile" />
            <span className="serif-italic">&amp; Registration</span>
          </h2>
          <p className="travel-lede">
            Reach out with practical questions, register your interest, or discuss retreat suitability directly with our team.
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
              <strong>Important Health Notice:</strong> Participants who have recently undergone surgery should contact the organiser before considering registration. Please discuss any mobility or health-related concerns privately with the organiser upon direct contact. Sensitive personal medical details should not be submitted through public web forms.
            </div>
          </div>

          {/* Condition 1: Contact Channels Unconfigured — Disable data collection & display clear notice */}
          {!isContactConfigured ? (
            <div
              className="enquiry-config-notice"
              role="region"
              aria-label="Contact Configuration Notice"
            >
              <div className="config-notice-header">
                <span className="config-notice-pill">Enquiry Channels In Preparation</span>
                <h3 className="config-notice-title">
                  Online Enquiries Opening Soon
                </h3>
              </div>

              <p className="config-notice-lead">
                Official communication channels, confirmed calendar dates, and retreat venue details are currently being finalised by the organiser for the retreat in Kerala, India.
              </p>

              <p className="config-notice-text">
                To protect guest privacy and prevent unrouted messages, personal information is not collected online until verified organiser submission endpoints or direct WhatsApp channels are active.
              </p>

              <div className="config-checklist-box">
                <h4 className="config-checklist-title">Currently Under Organiser Review:</h4>
                <ul className="config-checklist">
                  <li>
                    <span className="checklist-bullet">○</span>
                    <div>
                      <strong>Confirmed Dates &amp; Duration:</strong> The client-supplied details (December 17–19 / four-day trip) are under final operational confirmation.
                    </div>
                  </li>
                  <li>
                    <span className="checklist-bullet">○</span>
                    <div>
                      <strong>Venue in Kerala:</strong> Exact property and twin-sharing room details will be announced upon finalisation.
                    </div>
                  </li>
                  <li>
                    <span className="checklist-bullet">○</span>
                    <div>
                      <strong>Transport &amp; Package Inclusions:</strong> Provisional fee of ₹9,999/person and pickup logistics from Kuttipuram Railway Station are pending final confirmation.
                    </div>
                  </li>
                  <li>
                    <span className="checklist-bullet">○</span>
                    <div>
                      <strong>Official Communication Channels:</strong> Direct WhatsApp and email contact details will be published upon launch.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="config-footer-status">
                <span className="status-indicator-dot" aria-hidden="true" />
                <span>Enquiry desk status: Staging preview mode. Live submissions activate once <code>src/config/site.js</code> contact channels are configured.</span>
              </div>
            </div>
          ) : submitted ? (
            /* Condition 2: Verified Result State (Differentiating API vs WhatsApp) */
            <div className="enquiry-success-panel" role="status">
              <div className="success-badge-icon" aria-hidden="true">
                <LeafMark color="var(--antique-brass)" size={36} />
              </div>
              <h3 className="success-heading">
                {submissionResult?.title || 'Enquiry Received'}
              </h3>
              <p className="success-sub">
                {submissionResult?.message ||
                  'Your enquiry has been received. Our retreat team will review your details and respond with confirmed dates.'}
              </p>

              {submissionResult?.waUrl && (
                <div className="whatsapp-handoff-action" style={{ marginBottom: '20px' }}>
                  <a
                    href={submissionResult.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-travel-accent"
                  >
                    <span>Open WhatsApp Directly</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              )}

              <button
                type="button"
                className="btn btn-travel-secondary"
                onClick={() => {
                  setSubmitted(false)
                  setSubmissionResult(null)
                  setFormData({
                    fullName: '',
                    phone: '',
                    participants: '1',
                    travellingFrom: '',
                    datesNote: 'Dates to be confirmed by organiser',
                    pickupInterest: 'Requested pickup point: Kuttipuram Railway Station',
                    accommodation: 'Twin-sharing (two guests per room)',
                    notes: '',
                  })
                }}
              >
                ← Submit Another Enquiry
              </button>
            </div>
          ) : (
            /* Condition 3: Active Live Form (Only when real contact channels are configured) */
            <form className="enquiry-form-travel" onSubmit={handleSubmit} noValidate>
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
              </div>

              <div className="form-grid-2">
                {/* Number of Participants */}
                <div className="form-group">
                  <label htmlFor="participants" className="form-label">
                    Participants
                  </label>
                  <select
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People (Couples / Friends)</option>
                    <option value="3+">3+ Small Group</option>
                  </select>
                </div>

                {/* Travelling From */}
                <div className="form-group">
                  <label htmlFor="travellingFrom" className="form-label">
                    Travelling From <span className="form-optional">(City / State)</span>
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
                {/* Dates Note */}
                <div className="form-group">
                  <label htmlFor="datesNote" className="form-label">
                    Programme Dates
                  </label>
                  <input
                    type="text"
                    id="datesNote"
                    name="datesNote"
                    readOnly
                    value="Dates to be confirmed by organiser (Flexible interest)"
                    className="form-input form-input-readonly"
                  />
                </div>

                {/* Pickup interest */}
                <div className="form-group">
                  <label htmlFor="pickupInterest" className="form-label">
                    Arrival Pickup Coordination
                  </label>
                  <select
                    id="pickupInterest"
                    name="pickupInterest"
                    value={formData.pickupInterest}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="Requested pickup point: Kuttipuram Railway Station">
                      Interested in Kuttipuram Railway Station pickup
                    </option>
                    <option value="Will arrange independent travel">
                      Arranging independent travel to venue
                    </option>
                    <option value="Undecided / need arrival guidance">
                      Undecided / require arrival guidance
                    </option>
                  </select>
                </div>
              </div>

              {/* Accommodation */}
              <div className="form-group">
                <label htmlFor="accommodation" className="form-label">
                  Accommodation Standard
                </label>
                <input
                  type="text"
                  id="accommodation"
                  name="accommodation"
                  readOnly
                  value="Twin-sharing accommodation — two guests per room"
                  className="form-input form-input-readonly"
                />
              </div>

              {/* Questions / Non-sensitive notes */}
              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  General Questions or Enquiries <span className="form-optional">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Share general questions about the retreat or schedule. Please discuss any sensitive medical or recent-surgery concerns privately upon direct contact."
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
                  {submitting ? 'Transmitting Enquiry...' : 'Submit Retreat Enquiry'}
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
                  Submitting an enquiry is completely non-binding. We respect your privacy and do not share contact details.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
