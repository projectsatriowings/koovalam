import { useState } from 'react'
import {
  site,
  whatsappLink,
  isContactConfigured,
  isWhatsAppConfigured,
  isEmailConfigured,
  isFormConfigured,
} from '../config/site.js'
import { track } from '../lib/analytics.js'
import { LeafMark } from './Logo.jsx'

const INTERESTS = [
  '4-Day Kerala Retreat',
  'Natural Living & Botanicals',
  'Future Holistic Workshops',
  'Private / Custom Retreat Enquiry',
]

export default function EnquiryForm() {
  // If contact channels and form endpoint are not yet configured,
  // display the honest Launch Notice instead of collecting personal info.
  if (!isContactConfigured) {
    return (
      <div
        className="enquiry-launch-notice"
        role="region"
        aria-label="Early-Interest Registration Launch Notice"
      >
        <div className="launch-notice-header">
          <div className="launch-notice-icon" aria-hidden="true">
            <LeafMark color="var(--antique-gold)" size={28} />
          </div>
          <div className="launch-notice-eyebrow-wrap">
            <span className="launch-status-pill">Registration In Preparation</span>
            <span className="launch-eyebrow">STAGE 01 · EARLY-INTEREST NOTICE</span>
          </div>
        </div>

        <h3 className="launch-notice-heading">
          Early-Interest Registration Opens Soon
        </h3>

        <p className="launch-notice-lead">
          We are currently finalising retreat dates, venue arrangements, and official communication channels for the Koovalam 4-day retreat in Kerala, India.
        </p>

        <p className="launch-notice-desc">
          To maintain absolute privacy and trust, we do not collect personal contact information through our website until verified submission endpoints and official communication channels are live.
        </p>

        <div className="launch-prep-checklist">
          <h4 className="checklist-title">Currently Being Finalised</h4>
          <ul className="checklist-items">
            <li className="checklist-item">
              <span className="checklist-bullet" aria-hidden="true">○</span>
              <div>
                <strong>Retreat Dates:</strong> Confirmed calendar dates will be announced before reservations open.
              </div>
            </li>
            <li className="checklist-item">
              <span className="checklist-bullet" aria-hidden="true">○</span>
              <div>
                <strong>Sanctuary Venue:</strong> Exact Kerala property and accommodation details will be shared prior to booking.
              </div>
            </li>
            <li className="checklist-item">
              <span className="checklist-bullet" aria-hidden="true">○</span>
              <div>
                <strong>Investment &amp; Inclusions:</strong> Confirmed pricing and a clear breakdown of inclusions will be published upfront.
              </div>
            </li>
            <li className="checklist-item">
              <span className="checklist-bullet" aria-hidden="true">○</span>
              <div>
                <strong>Official Channels:</strong> Direct enquiry contacts will be published upon launch.
              </div>
            </li>
          </ul>
        </div>

        <div className="launch-reassurance-box">
          <span className="reassurance-icon" aria-hidden="true">✦</span>
          <p className="reassurance-text">
            <strong>Peace of Mind Commitment:</strong> When registration opens, early-interest sign-up will be completely non-binding, will require zero payment or deposit, and will ensure you receive verified retreat details first before public reservations open.
          </p>
        </div>

        <div className="launch-notice-footer">
          <span className="launch-footnote">
            Notice: No personal data or payments are being collected at this time. Please revisit this page for the official launch announcement.
          </span>
        </div>
      </div>
    )
  }

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '4-Day Kerala Retreat',
    timing: '',
    message: '',
    consent: false,
    website: '', // honeypot
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | unwired | error

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please provide your full name.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!form.consent) {
      errs.consent = 'Please confirm consent so we may send you retreat details.'
    }
    setErrors(errs)
    if (Object.keys(errs).length) return

    if (form.website) {
      // Honeypot caught spam bot
      setStatus('unwired')
      return
    }

    track('form_submit')

    // If no verified endpoint is configured in site.js, provide honest feedback
    // and genuine direct contact actions instead of simulating a false backend success.
    if (!site.formEndpoint) {
      setStatus('unwired')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submission endpoint responded with an error')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  // Pre-formatted messages for verified contact channels
  const prefilledWaMessage = `Namaskaram Koovalam, I would like to register early interest for the 4-Day Kerala Retreat:
• Name: ${form.name}
• Email: ${form.email}${form.phone ? `\n• Phone: ${form.phone}` : ''}
• Interest: ${form.interest || '4-Day Kerala Retreat'}${form.timing ? `\n• Preferred Timing: ${form.timing}` : ''}${form.message ? `\n• Notes: ${form.message}` : ''}

Please notify me when dates, venue, and pricing are confirmed.`

  const prefilledWhatsAppUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(prefilledWaMessage)}`

  const prefilledEmailSubject = `Koovalam Early Interest: ${form.name || 'Retreat Enquiry'}`
  const prefilledEmailBody = `Namaskaram Koovalam,\n\nI would like to register early interest for the upcoming Kerala retreat.\n\n• Name: ${form.name}\n• Email: ${form.email}\n• Phone: ${form.phone || 'Not provided'}\n• Primary Interest: ${form.interest || '4-Day Kerala Retreat'}\n• Preferred Timing: ${form.timing || 'Flexible'}\n• Notes / Intentions: ${form.message || 'None'}\n\nPlease notify me when dates, venue, and pricing are announced before public reservations open.\n\nWarm regards,\n${form.name}`

  const prefilledMailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(prefilledEmailSubject)}&body=${encodeURIComponent(prefilledEmailBody)}`

  // Honest notice state when site.formEndpoint is not yet configured
  if (status === 'unwired') {
    return (
      <div className="enquiry-unwired-card" role="status" aria-live="polite">
        <div className="unwired-header">
          <LeafMark color="var(--antique-gold)" size={26} />
          <h3 className="unwired-title">Thank You, {form.name.split(' ')[0] || 'Friend'}</h3>
        </div>

        <div className="unwired-notice-box">
          <span className="notice-pill">Launch Configuration Notice</span>
          <p className="notice-text">
            Automated online form dispatch is currently awaiting live launch configuration (no endpoint is configured in site settings yet).
          </p>
          <p className="notice-sub">
            To ensure your details are received directly by the Koovalam team without delay, please connect with us via our verified channels below — your details will be prefilled:
          </p>
        </div>

        <div className="unwired-actions">
          {isWhatsAppConfigured && (
            <a
              className="btn btn-gold btn-unwired-action"
              href={prefilledWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('enquiry_unwired_whatsapp_click')}
            >
              Send Details via WhatsApp
            </a>
          )}
          {isEmailConfigured && (
            <a
              className="btn btn-secondary btn-unwired-action"
              href={prefilledMailtoUrl}
              onClick={() => track('enquiry_unwired_email_click')}
            >
              Send Details via Email
            </a>
          )}
        </div>

        <div className="unwired-footer">
          <button
            type="button"
            className="unwired-back-btn"
            onClick={() => setStatus('idle')}
          >
            ← Return to edit form details
          </button>
          <p className="unwired-admin-note">
            <strong>Operator Notice:</strong> Configure <code>site.formEndpoint</code> in <code>src/config/site.js</code> to enable automated server-side submissions.
          </p>
        </div>
      </div>
    )
  }

  // Error state if remote endpoint fails
  if (status === 'error') {
    return (
      <div className="enquiry-unwired-card enquiry-error-card" role="alert">
        <div className="unwired-header">
          <LeafMark color="var(--earth-brown)" size={26} />
          <h3 className="unwired-title">Connection Notice</h3>
        </div>
        <p className="notice-text">
          We were unable to submit your details automatically through the form endpoint. Please connect with us directly so we may record your early interest.
        </p>
        <div className="unwired-actions">
          {isWhatsAppConfigured && (
            <a
              className="btn btn-gold btn-unwired-action"
              href={prefilledWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
            >
              Message on WhatsApp
            </a>
          )}
          {isEmailConfigured && (
            <a
              className="btn btn-secondary btn-unwired-action"
              href={prefilledMailtoUrl}
            >
              Send via Email
            </a>
          )}
        </div>
        <div className="unwired-footer">
          <button
            type="button"
            className="unwired-back-btn"
            onClick={() => setStatus('idle')}
          >
            ← Try again
          </button>
        </div>
      </div>
    )
  }

  // Genuine success state (only active when site.formEndpoint is configured and responds successfully)
  if (status === 'done') {
    return (
      <div className="enquiry-success" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">
          <LeafMark color="var(--antique-gold)" size={32} />
        </div>
        <h3 className="success-heading">
          Thank you, {form.name.split(' ')[0] || 'Friend'}
        </h3>
        <p className="success-text">
          Your early interest has been recorded in our notification register. We will write to you with verified retreat dates, venue details, and pricing prior to public opening.
        </p>
        <p className="success-clarity-note">
          Notice: Registration is non-binding and does not constitute a confirmed reservation or guarantee a place.
        </p>
        {isWhatsAppConfigured && whatsappLink && (
          <div className="success-wa-action">
            <p className="success-sub">Have immediate questions about the retreat?</p>
            <a
              className="btn btn-gold"
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('whatsapp_click_after_form')}
            >
              Chat with Us on WhatsApp
            </a>
          </div>
        )}
      </div>
    )
  }

  const renderField = (label, key, type = 'text', extra = {}) => (
    <div className="form-field">
      <label htmlFor={`f-${key}`} className="field-label">
        {label} {extra.required && <span className="req-star" aria-hidden="true">*</span>}
      </label>
      {extra.textarea ? (
        <textarea
          id={`f-${key}`}
          rows={4}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          placeholder={extra.placeholder}
          aria-required={extra.required ? 'true' : 'false'}
          aria-invalid={errors[key] ? 'true' : 'false'}
          aria-describedby={errors[key] ? `err-${key}` : undefined}
          className="field-input field-textarea"
        />
      ) : extra.select ? (
        <select
          id={`f-${key}`}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          aria-required={extra.required ? 'true' : 'false'}
          className="field-input field-select"
        >
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`f-${key}`}
          type={type}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          placeholder={extra.placeholder}
          autoComplete={extra.autoComplete}
          aria-required={extra.required ? 'true' : 'false'}
          aria-invalid={errors[key] ? 'true' : 'false'}
          aria-describedby={errors[key] ? `err-${key}` : undefined}
          className="field-input"
        />
      )}
      {errors[key] && (
        <p id={`err-${key}`} className="field-error" role="alert">
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <form className="editorial-form" onSubmit={submit} noValidate aria-label="Early-interest retreat registration form">
      <div className="form-header">
        <h3 className="form-title">Register Your Early Interest</h3>
        <p className="form-subtitle">
          Registration is 100% non-binding and requires no payment. Be the first to receive verified dates, venue confirmation, and pricing before reservations open.
        </p>
      </div>

      {/* Honeypot field for spam prevention */}
      <input
        className="honeypot-input"
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(e) => set('website', e.target.value)}
      />

      <div className="form-row">
        {renderField('Full Name', 'name', 'text', {
          required: true,
          placeholder: 'Your full name',
          autoComplete: 'name',
        })}
        {renderField('Email Address', 'email', 'email', {
          required: true,
          placeholder: 'your.email@example.com',
          autoComplete: 'email',
        })}
      </div>

      <div className="form-row">
        {renderField('Phone / WhatsApp', 'phone', 'tel', {
          placeholder: '+91 / Country code and number',
          autoComplete: 'tel',
        })}
        {renderField('Primary Interest', 'interest', 'text', { select: true })}
      </div>

      {renderField('Preferred Travel Timing', 'timing', 'text', {
        placeholder: 'e.g. Winter weekend, early 2027, or flexible',
      })}

      {renderField('Notes & Health / Dietary Intentions', 'message', 'text', {
        textarea: true,
        placeholder:
          'Tell us anything that would help us support your stay — accessibility requirements, dietary preferences, or retreat intentions are warmly welcomed.',
      })}

      <div className="form-consent-wrap">
        <label className="consent-label" htmlFor="f-consent">
          <input
            id="f-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? 'err-consent' : undefined}
            className="consent-checkbox"
          />
          <span className="consent-text">
            I consent to Koovalam contacting me about retreat dates and mindful wellness offerings.
          </span>
        </label>
        {errors.consent && (
          <p id="err-consent" className="field-error" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="form-privacy-note">
        <span className="privacy-lock" aria-hidden="true">🔒</span>
        <span className="privacy-note-text">
          <strong>Privacy Notice:</strong> We collect your name and email solely to notify you when retreat dates, venue, and pricing are announced. We do not sell or share personal data.
        </span>
      </div>

      <button
        className="btn btn-gold btn-submit"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Registering Your Interest…' : 'Register Early Interest'}
      </button>

      <p className="form-footnote">
        Non-binding registration · Zero upfront payment · Joining does not guarantee a place or constitute a confirmed reservation.
      </p>
    </form>
  )
}
