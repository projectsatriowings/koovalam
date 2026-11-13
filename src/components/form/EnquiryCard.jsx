import { useState, useRef } from 'react'
import { site, buildWhatsAppLink, isEmailConfigured } from '../../config/site.js'
import { PARTICIPANT_OPTIONS } from '../../data/enquiryOptions.js'
import { track } from '../../lib/analytics.js'
import { LeafMark } from '../Logo.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import ReassurancePanel from './ReassurancePanel.jsx'
import FormField from './FormField.jsx'
import PhoneField, { validatePhoneNumber } from './PhoneField.jsx'
import ParticipantStepper from './ParticipantStepper.jsx'
import SuccessState from './SuccessState.jsx'
import styles from './EnquiryForm.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  participants: PARTICIPANT_OPTIONS[0].value,
  origin: '',
  message: '',
  hp_company: '',
}

/**
 * Shared single-step split enquiry card used both in the bottom #enquiry section
 * and inside the Hero/Header popup modal. Posts directly to /api/enquire so
 * submissions from either entry point email the retreat organiser inbox.
 */
export default function EnquiryCard({
  idPrefix = 'inline',
  isModal = false,
  className = '',
  headingId,
  initialFocusRef,
  id,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [consentChecked, setConsentChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [liveStatus, setLiveStatus] = useState('')

  const cardRef = useRef(null)
  const headingRef = useRef(null)
  const fullNameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const consentRef = useRef(null)

  const assignFullNameRef = (node) => {
    fullNameRef.current = node
    if (initialFocusRef) {
      initialFocusRef.current = node
    }
  }

  const clearFieldError = (field) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }))
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleFieldChange = (name, valueOrUpdater) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        typeof valueOrUpdater === 'function'
          ? valueOrUpdater(prev[name])
          : valueOrUpdater,
    }))
    clearFieldError(name)
  }

  const handleInputChange = (e) => {
    handleFieldChange(e.target.name, e.target.value)
  }

  const getFieldError = (name, overrideConsent) => {
    if (name === 'fullName') {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        return 'Please enter your name so we know how to address you.'
      }
      return ''
    }
    if (name === 'phone') {
      return validatePhoneNumber(formData.phone)
    }
    if (name === 'email') {
      if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
        return "That email doesn't look quite right."
      }
      return ''
    }
    if (name === 'consent') {
      const agreed =
        overrideConsent !== undefined ? overrideConsent : consentChecked
      if (!agreed) {
        return 'Please tick this box so we have your permission to reply.'
      }
      return ''
    }
    return ''
  }

  const handleBlur = (name) => {
    const err = getFieldError(name)
    setValidationErrors((prev) => ({ ...prev, [name]: err }))
  }

  const validateAll = () => {
    const errors = {
      fullName: getFieldError('fullName'),
      phone: getFieldError('phone'),
      email: getFieldError('email'),
      consent: getFieldError('consent'),
    }

    setValidationErrors((prev) => ({ ...prev, ...errors }))

    if (errors.fullName) {
      fullNameRef.current?.focus()
      return false
    }
    if (errors.phone) {
      phoneRef.current?.focus()
      return false
    }
    if (errors.email) {
      emailRef.current?.focus()
      return false
    }
    if (errors.consent) {
      consentRef.current?.focus()
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submitting || submitted) return
    if (!validateAll()) return

    setSubmitting(true)
    setErrorMessage('')
    setLiveStatus('Sending your enquiry…')
    track(isModal ? 'enquiry_modal_submit_attempt' : 'enquiry_form_submit_attempt')

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      participants: formData.participants,
      origin: formData.origin,
      message: formData.message,
      hp_company: formData.hp_company,
    }

    try {
      const endpoint = site.formEndpoint || '/api/enquire'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.success) {
        const errMsg =
          data?.error ||
          'Something went wrong sending your enquiry. Please try again, or message us on WhatsApp.'
        throw new Error(errMsg)
      }

      setSubmitted(true)
      setLiveStatus('Thank you. Your enquiry has been sent.')
      track(isModal ? 'enquiry_modal_submission_success' : 'enquiry_submission_success')
    } catch (err) {
      setErrorMessage(
        err?.message && !err.message.toLowerCase().includes('failed to fetch')
          ? err.message
          : 'Something went wrong sending your enquiry. Please try again, or message us on WhatsApp.'
      )
      setLiveStatus('There was a problem sending your enquiry. You can retry or message us directly.')
      track('enquiry_submission_error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setSubmitting(false)
    setErrorMessage('')
    setValidationErrors({})
    setConsentChecked(false)
    setFormData(INITIAL_FORM_DATA)
    setLiveStatus('Started a new enquiry.')
    requestAnimationFrame(() => {
      fullNameRef.current?.focus() || headingRef.current?.focus()
    })
  }

  const recoveryMessage = [
    `Hi Koovalam team, I'd like to enquire about the retreat:`,
    formData.fullName ? `Name: ${formData.fullName}` : null,
    formData.phone ? `Phone: ${formData.phone}` : null,
    formData.email ? `Email: ${formData.email}` : null,
    `Participants: ${formData.participants}`,
    formData.origin ? `Origin: ${formData.origin}` : null,
    formData.message ? `Message: ${formData.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const errorWhatsAppHref = buildWhatsAppLink(recoveryMessage)

  const errorEmailHref = isEmailConfigured
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `Koovalam Retreat Enquiry — ${formData.fullName || 'Guest'}`
      )}&body=${encodeURIComponent(recoveryMessage)}`
    : null

  const directWhatsAppHref = buildWhatsAppLink()
  const directEmailHref = isEmailConfigured
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        'Koovalam Kerala Retreat — Direct Enquiry'
      )}`
    : null

  const consentId = `${idPrefix}-consent`
  const consentErrorId = `${idPrefix}-consent-error`
  const honeypotId = `${idPrefix}-hp_company`

  const formContent = submitted ? (
    <SuccessState
      formData={formData}
      containerRef={cardRef}
      onReset={handleReset}
      disableAutoScroll={isModal}
    />
  ) : (
    <form
      className={styles.singleForm}
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Honeypot field kept off-screen (not display:none) */}
      <div className={styles.srHoneypot} aria-hidden="true">
        <label htmlFor={honeypotId}>Company website</label>
        <input
          type="text"
          id={honeypotId}
          name="hp_company"
          tabIndex={-1}
          autoComplete="off"
          value={formData.hp_company}
          onChange={handleInputChange}
        />
      </div>

      {!isModal && (
        <>
          <h3
            ref={headingRef}
            id={headingId}
            tabIndex={-1}
            className={styles.stepHeading}
          >
            Send a Retreat Enquiry
          </h3>
          <p className={styles.stepSubtitle}>
            Share your details below — our organiser replies personally with room availability for Dec 17–20.
          </p>
        </>
      )}

              {/* Network / Service Error Recovery Banner */}
              {errorMessage && (
                <div className={styles.errorBanner} role="alert">
                  <div className={styles.errorBannerTop}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0, marginTop: '2px' }}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                  {errorWhatsAppHref ? (
                    <a
                      href={errorWhatsAppHref}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.errorBannerBtn}
                    >
                      Message us on WhatsApp with details
                    </a>
                  ) : errorEmailHref ? (
                    <a href={errorEmailHref} className={styles.errorBannerBtn}>
                      Email your details directly
                    </a>
                  ) : null}
                </div>
              )}

              <div className={styles.fieldsStack}>
                {/* Row 1: Full Name + Phone */}
                <div className={styles.pairRow}>
                  <FormField
                    id={`${idPrefix}-fullName`}
                    label="Full Name"
                    required
                    error={validationErrors.fullName}
                  >
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        ref={assignFullNameRef}
                        type="text"
                        name="fullName"
                        required
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="e.g. Priya"
                        className={`${styles.textInput} ${
                          validationErrors.fullName ? styles.inputHasError : ''
                        }`}
                      />
                    )}
                  </FormField>

                  <PhoneField
                    id={`${idPrefix}-phone`}
                    label="WhatsApp / Mobile Number"
                    value={formData.phone}
                    onChange={(val) => handleFieldChange('phone', val)}
                    onBlur={() => handleBlur('phone')}
                    error={validationErrors.phone}
                    inputRef={phoneRef}
                  />
                </div>

                {/* Row 2: Email + Origin */}
                <div className={styles.pairRow}>
                  <FormField
                    id={`${idPrefix}-email`}
                    label="Email Address"
                    required
                    error={validationErrors.email}
                  >
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        ref={emailRef}
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="e.g. priya@example.com"
                        className={`${styles.textInput} ${
                          validationErrors.email ? styles.inputHasError : ''
                        }`}
                      />
                    )}
                  </FormField>

                  <FormField
                    id={`${idPrefix}-origin`}
                    label="City / Country"
                    optional
                  >
                    {(fieldProps) => (
                      <input
                        {...fieldProps}
                        type="text"
                        name="origin"
                        autoComplete="address-level2"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="e.g. Bengaluru or London"
                        className={styles.textInput}
                      />
                    )}
                  </FormField>
                </div>

                {/* Number of Participants */}
                <ParticipantStepper
                  value={formData.participants}
                  onChange={(val) => handleFieldChange('participants', val)}
                  horizontal
                />

                {/* Optional Message / Questions */}
                <FormField
                  id={`${idPrefix}-message`}
                  label="Message or Questions"
                  optional
                >
                  {(fieldProps) => (
                    <textarea
                      {...fieldProps}
                      name="message"
                      rows={isModal ? 1 : 2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any questions about the retreat, schedule, or travel?"
                      className={styles.textArea}
                    />
                  )}
                </FormField>

                {/* Required Contact Consent (Client-Side Enforced Only) */}
                <div className={styles.consentWrapper}>
                  <label
                    htmlFor={consentId}
                    className={`${styles.consentLabel} ${
                      consentChecked ? styles.consentChecked : ''
                    } ${
                      validationErrors.consent ? styles.consentError : ''
                    }`}
                  >
                    <input
                      ref={consentRef}
                      type="checkbox"
                      id={consentId}
                      checked={consentChecked}
                      onChange={(e) => {
                        const next = e.target.checked
                        setConsentChecked(next)
                        if (next) clearFieldError('consent')
                      }}
                      aria-required="true"
                      aria-invalid={
                        validationErrors.consent ? 'true' : 'false'
                      }
                      aria-describedby={
                        validationErrors.consent ? consentErrorId : undefined
                      }
                      className={styles.consentNativeCheckbox}
                    />
                    <span className={styles.consentBox} aria-hidden="true">
                      {consentChecked && (
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span className={styles.consentText}>
                      I agree to be contacted about this{' '}
                      <span className={styles.consentNoWrap}>
                        enquiry.
                        <span className={styles.reqMark} aria-hidden="true">
                          {' '}
                          *
                        </span>
                      </span>
                    </span>
                  </label>

                  {validationErrors.consent && (
                    <span
                      id={consentErrorId}
                      className={styles.errorMessage}
                      role="alert"
                    >
                      {validationErrors.consent}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Action + Privacy Note */}
              <div className={styles.stepActions}>
                <button
                  type="submit"
                  disabled={submitting}
                  className={styles.primarySubmitBtn}
                >
                  {submitting ? (
                    <>
                      <span
                        className={styles.spinnerInline}
                        aria-hidden="true"
                      />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send my enquiry</span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.arrowGold}
                        aria-hidden="true"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>

                {isModal ? (
                  <div className={styles.modalUtilityRow}>
                    <p className={styles.modalPrivacyText}>
                      Your details are used only to reply.
                    </p>
                    {directWhatsAppHref ? (
                      <a
                        href={directWhatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.modalDirectLink}
                        onClick={() => track('enquiry_modal_whatsapp_click')}
                      >
                        <WhatsAppIcon size={15} />
                        <span>Prefer WhatsApp? Message directly</span>
                      </a>
                    ) : directEmailHref ? (
                      <a
                        href={directEmailHref}
                        className={styles.modalDirectLink}
                        onClick={() => track('enquiry_modal_email_click')}
                      >
                        <span>Email {site.email} directly</span>
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p className={styles.privacyNote}>
                    Your details are used only to reply to your enquiry. We never share them.
                  </p>
                )}
              </div>
            </form>
  )

  if (isModal) {
    return (
      <>
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveStatus}
        </div>

        <div ref={cardRef} className={`${styles.modalCard} ${className}`}>
          <header className={styles.modalHeaderBand}>
            <div className={styles.modalHeaderWatermark} aria-hidden="true">
              <LeafMark color="#DFC289" stemColor="#DFC289" size={142} />
            </div>

            <div className={styles.modalEyebrow}>
              <LeafMark color="#DFC289" stemColor="#DFC289" size={13} />
              <span>KOOVALAM RETREAT · DEC 17–20 · KERALA</span>
            </div>

            <h3
              ref={headingRef}
              id={headingId}
              tabIndex={-1}
              className={styles.modalHeading}
            >
              Send a Retreat Enquiry
            </h3>

            <p className={styles.modalSubtitle}>
              Our organiser replies personally with room availability — no upfront commitment.
            </p>

            <ul className={styles.modalTrustRow} aria-label="Retreat highlights">
              <li className={styles.modalTrustItem}>
                <span className={styles.modalTrustDot} aria-hidden="true">✓</span>
                <span>100% Non-Binding</span>
              </li>
              <li className={styles.modalTrustItem}>
                <span className={styles.modalTrustDot} aria-hidden="true">✓</span>
                <span>Twin-Sharing Stay</span>
              </li>
              <li className={styles.modalTrustItem}>
                <span className={styles.modalTrustDot} aria-hidden="true">✓</span>
                <span>Vegetarian Meals</span>
              </li>
            </ul>
          </header>

          <div className={styles.modalBody}>{formContent}</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {liveStatus}
      </div>

      <div
        id={id || (!isModal ? 'enquiry' : undefined)}
        ref={cardRef}
        className={`${styles.splitCard} ${className}`}
      >
        {/* Left Forest-Green Panel */}
        <ReassurancePanel />

        {/* Right Interactive Form / Confirmation Panel */}
        <div className={styles.rightPanel}>{formContent}</div>
      </div>
    </>
  )
}
