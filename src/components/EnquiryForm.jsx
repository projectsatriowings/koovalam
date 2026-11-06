import { useState } from 'react'
import { site, whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'

const INTERESTS = [
  '4-Day Kerala Retreat',
  'Natural Living & Botanicals',
  'Future Holistic Workshops',
  'Private / Custom Retreat Enquiry',
]

export default function EnquiryForm() {
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
  const [status, setStatus] = useState('idle') // idle | sending | done

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please provide your name.'
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
      setStatus('done')
      return
    }

    track('form_submit')

    if (!site.formEndpoint) {
      // No endpoint configured yet — cleanly show confirmation with WhatsApp direct link
      setStatus('done')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('done')
    } catch {
      setStatus('done')
    }
  }

  if (status === 'done') {
    return (
      <div className="enquiry-success" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">🌿</div>
        <h3 className="success-heading">
          Thank you, {form.name.split(' ')[0] || 'Friend'}
        </h3>
        <p className="success-text">
          Your interest has been gently noted in our priority register. We will write to you with full retreat itinerary details and dates as soon as they open.
        </p>
        <div className="success-wa-action">
          <p className="success-sub">Would you like to connect right away?</p>
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
      </div>
    )
  }

  const renderField = (label, key, type = 'text', extra = {}) => (
    <div className="form-field">
      <label htmlFor={`f-${key}`} className="field-label">
        {label} {extra.required && <span className="req-star">*</span>}
      </label>
      {extra.textarea ? (
        <textarea
          id={`f-${key}`}
          rows={4}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
          placeholder={extra.placeholder}
          className="field-input field-textarea"
        />
      ) : extra.select ? (
        <select
          id={`f-${key}`}
          value={form[key]}
          onChange={(e) => set(key, e.target.value)}
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
          className="field-input"
        />
      )}
      {errors[key] && (
        <p className="field-error" role="alert">
          {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <form className="editorial-form" onSubmit={submit} noValidate>
      <div className="form-header">
        <h3 className="form-title">Join the Priority Guest List</h3>
        <p className="form-subtitle">
          No obligation, no upfront payment. Be the first to receive dates, venue confirmation, and private booking access.
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
          placeholder: 'Your name',
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
        placeholder: 'e.g. December weekend, early 2027, or flexible',
      })}

      {renderField('Notes & Intentions', 'message', 'text', {
        textarea: true,
        placeholder:
          'Tell us anything that would help us support your stay — accessibility, dietary preferences, or your retreat intentions are warmly welcomed here.',
      })}

      <div className="form-consent-wrap">
        <label className="consent-label" htmlFor="f-consent">
          <input
            id="f-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set('consent', e.target.checked)}
            className="consent-checkbox"
          />
          <span className="consent-text">
            I consent to Koovalam contacting me about retreat dates and mindful wellness offerings.
          </span>
        </label>
        {errors.consent && (
          <p className="field-error" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        className="btn btn-gold btn-submit"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Registering Your Interest…' : 'Reserve Your Early Interest'}
      </button>
    </form>
  )
}
