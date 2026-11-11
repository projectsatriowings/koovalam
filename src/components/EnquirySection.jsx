import { useState, useRef } from 'react'
import { site, isWhatsAppConfigured, isEmailConfigured } from '../config/site.js'
import {
  PARTICIPANT_OPTIONS,
  PICKUP_OPTIONS,
  ACCOMMODATION_OPTIONS,
} from '../data/enquiryOptions.js'
import { LeafMark } from './Logo.jsx'
import Reveal from './Reveal.jsx'
import { track } from '../lib/analytics.js'
import ReassurancePanel from './form/ReassurancePanel.jsx'
import ProgressSteps from './form/ProgressSteps.jsx'
import FormField from './form/FormField.jsx'
import PhoneField, { validatePhoneNumber } from './form/PhoneField.jsx'
import ParticipantStepper from './form/ParticipantStepper.jsx'
import ChoiceCards from './form/ChoiceCards.jsx'
import SuccessState from './form/SuccessState.jsx'
import styles from './form/EnquiryForm.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const INITIAL_FORM_DATA = {
  fullName: '',
  email: '',
  phone: '',
  participants: PARTICIPANT_OPTIONS[0].value,
  origin: '',
  pickup: PICKUP_OPTIONS[0].value,
  accommodation: ACCOMMODATION_OPTIONS[0].value,
  message: '',
  hp_company: '',
}

export default function EnquirySection() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [step, setStep] = useState(1)
  const [consentChecked, setConsentChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [liveStatus, setLiveStatus] = useState('')

  const cardRef = useRef(null)
  const step1HeadingRef = useRef(null)
  const step2HeadingRef = useRef(null)
  const fullNameRef = useRef(null)
  const phoneRef = useRef(null)
  const emailRef = useRef(null)
  const consentRef = useRef(null)

  const clearFieldError = (field) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }))
    }
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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

  const validateStep1 = () => {
    const step1Errors = {
      fullName: getFieldError('fullName'),
      phone: getFieldError('phone'),
      email: getFieldError('email'),
    }

    setValidationErrors((prev) => ({ ...prev, ...step1Errors }))

    if (step1Errors.fullName) {
      fullNameRef.current?.focus()
      return false
    }
    if (step1Errors.phone) {
      phoneRef.current?.focus()
      return false
    }
    if (step1Errors.email) {
      emailRef.current?.focus()
      return false
    }
    return true
  }

  const validateStep2 = () => {
    const step2Errors = {}
    if (!formData.participants) {
      step2Errors.participants = 'Please choose how many guests are enquiring.'
    }
    if (!formData.pickup) {
      step2Errors.pickup = 'Please choose a pickup preference.'
    }
    if (!formData.accommodation) {
      step2Errors.accommodation = 'Please choose an accommodation preference.'
    }
    const consentErr = getFieldError('consent')
    if (consentErr) {
      step2Errors.consent = consentErr
    }

    setValidationErrors((prev) => ({ ...prev, ...step2Errors }))

    if (consentErr) {
      consentRef.current?.focus()
      return false
    }
    return Object.keys(step2Errors).length === 0
  }

  const goToStep = (targetStep) => {
    if (targetStep === step) return

    if (targetStep === 2) {
      if (!validateStep1()) return
      track('enquiry_step_2')
      setStep(2)
      setLiveStatus('Step 2 of 2: Your retreat preferences')
      requestAnimationFrame(() => {
        step2HeadingRef.current?.focus()
      })
    } else {
      setStep(1)
      setLiveStatus('Step 1 of 2: About you')
      requestAnimationFrame(() => {
        step1HeadingRef.current?.focus()
      })
    }
  }

  const handleStep1KeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      goToStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Guard against unfinished Enter submission on Step 1
    if (step === 1) {
      goToStep(2)
      return
    }

    if (submitting || submitted) return

    if (!validateStep1()) {
      setStep(1)
      return
    }
    if (!validateStep2()) return

    setSubmitting(true)
    setErrorMessage('')
    setLiveStatus('Sending your enquiry…')
    track('enquiry_form_submit_attempt')

    // Preserve exact backend email payload contract (consent is client-only)
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      participants: formData.participants,
      origin: formData.origin,
      pickup: formData.pickup,
      accommodation: formData.accommodation,
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
      track('enquiry_submission_success')
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
    setStep(1)
    setLiveStatus('Started a new enquiry. Step 1 of 2: About you.')
    requestAnimationFrame(() => {
      step1HeadingRef.current?.focus()
    })
  }

  const recoveryMessage = [
    `Hi Koovalam team, I'd like to enquire about the retreat:`,
    formData.fullName ? `Name: ${formData.fullName}` : null,
    formData.phone ? `Phone: ${formData.phone}` : null,
    formData.email ? `Email: ${formData.email}` : null,
    `Participants: ${formData.participants}`,
    `Pickup: ${formData.pickup}`,
    `Accommodation: ${formData.accommodation}`,
    formData.origin ? `Origin: ${formData.origin}` : null,
    formData.message ? `Message: ${formData.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const errorWhatsAppHref = isWhatsAppConfigured
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(recoveryMessage)}`
    : null

  const errorEmailHref = isEmailConfigured
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `Koovalam Retreat Enquiry — ${formData.fullName || 'Guest'}`
      )}&body=${encodeURIComponent(recoveryMessage)}`
    : null

  return (
    <section
      className={styles.sectionEnquiry}
      id="enquiry"
      aria-label="Retreat Enquiry and Registration"
    >
      <div className="wrap">
        {/* Section Intro Heading Above Card */}
        <div className={styles.sectionIntro}>
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>CONNECT WITH US</span>
          </div>
          <h2 className="travel-heading">
            Retreat Enquiry <span className="serif-italic">&amp; Registration</span>
          </h2>
          <p className={styles.tightLede}>
            Ask us about retreat dates, proposed temple visits, or suitability. We reply personally with room availability and no pressure.
          </p>
        </div>

        {/* Accessible Live Region for Screen Readers */}
        <div className="visually-hidden" aria-live="polite" aria-atomic="true">
          {liveStatus}
        </div>

        {/* Split Card Wrapped in Subtle Entrance Reveal */}
        <Reveal>
          <div ref={cardRef} className={styles.splitCard}>
            {/* Left Forest-Green Panel */}
            <ReassurancePanel />

            {/* Right Interactive Form / Confirmation Panel */}
            <div className={styles.rightPanel}>
              {submitted ? (
                <SuccessState
                  formData={formData}
                  containerRef={cardRef}
                  onReset={handleReset}
                />
              ) : (
                <>
                  <ProgressSteps
                    currentStep={step}
                    onSelectStep={goToStep}
                  />

                  <form
                    className={styles.singleForm}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Honeypot field kept off-screen (not display:none) */}
                    <div className={styles.srHoneypot} aria-hidden="true">
                      <label htmlFor="hp_company">Company website</label>
                      <input
                        type="text"
                        id="hp_company"
                        name="hp_company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.hp_company}
                        onChange={handleInputChange}
                      />
                    </div>

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

                    {/* ── STEP 1: About You ── */}
                    <div className={styles.stepPane} hidden={step !== 1}>
                      <h3
                        ref={step1HeadingRef}
                        tabIndex={-1}
                        className={styles.stepHeading}
                      >
                        Tell us a little about yourself
                      </h3>
                      <p className={styles.stepSubtitle}>
                        So our organiser knows where to send your retreat details.
                      </p>

                      <div className={styles.fieldsStack}>
                        {/* Pair 1: Full Name + Phone */}
                        <div className={styles.pairRow}>
                          <FormField
                            id="fullName"
                            label="Full Name"
                            required
                            error={validationErrors.fullName}
                          >
                            {(fieldProps) => (
                              <input
                                {...fieldProps}
                                ref={fullNameRef}
                                type="text"
                                name="fullName"
                                required
                                autoComplete="name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                onBlur={() => handleBlur('fullName')}
                                onKeyDown={handleStep1KeyDown}
                                placeholder="e.g. Priya Nair"
                                className={`${styles.textInput} ${
                                  validationErrors.fullName ? styles.inputHasError : ''
                                }`}
                              />
                            )}
                          </FormField>

                          <PhoneField
                            id="phone"
                            label="WhatsApp / Mobile Number"
                            value={formData.phone}
                            onChange={(val) => handleFieldChange('phone', val)}
                            onBlur={() => handleBlur('phone')}
                            onKeyDown={handleStep1KeyDown}
                            error={validationErrors.phone}
                            inputRef={phoneRef}
                          />
                        </div>

                        {/* Pair 2: Email + Origin */}
                        <div className={styles.pairRow}>
                          <FormField
                            id="email"
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
                                onKeyDown={handleStep1KeyDown}
                                placeholder="e.g. priya.nair@example.com"
                                className={`${styles.textInput} ${
                                  validationErrors.email ? styles.inputHasError : ''
                                }`}
                              />
                            )}
                          </FormField>

                          <FormField
                            id="origin"
                            label="City / Country of Origin"
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
                                onKeyDown={handleStep1KeyDown}
                                placeholder="e.g. Bengaluru or London"
                                className={styles.textInput}
                              />
                            )}
                          </FormField>
                        </div>
                      </div>

                      <div className={styles.stepActions}>
                        <button
                          type="button"
                          className={`${styles.primarySubmitBtn} ${styles.continueBtn}`}
                          onClick={() => goToStep(2)}
                        >
                          <span>Continue</span>
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
                        </button>
                      </div>
                    </div>

                    {/* ── STEP 2: Retreat Preferences ── */}
                    <div className={styles.stepPane} hidden={step !== 2}>
                      <h3
                        ref={step2HeadingRef}
                        tabIndex={-1}
                        className={styles.stepHeading}
                      >
                        Your retreat preferences
                      </h3>
                      <p className={styles.stepSubtitle}>
                        Everything can be adjusted once dates are confirmed.
                      </p>

                      <div className={styles.fieldsStack}>
                        {/* Number of Participants */}
                        <ParticipantStepper
                          value={formData.participants}
                          onChange={(val) => handleFieldChange('participants', val)}
                        />

                        {/* Pickup Preference */}
                        <ChoiceCards
                          name="pickup"
                          legend="Pickup Preference"
                          options={PICKUP_OPTIONS}
                          value={formData.pickup}
                          onChange={(val) => handleFieldChange('pickup', val)}
                          error={validationErrors.pickup}
                        />

                        {/* Accommodation Preference */}
                        <ChoiceCards
                          name="accommodation"
                          legend="Accommodation Preference"
                          options={ACCOMMODATION_OPTIONS}
                          value={formData.accommodation}
                          onChange={(val) => handleFieldChange('accommodation', val)}
                          error={validationErrors.accommodation}
                        />

                        {/* Optional Message / Questions */}
                        <FormField
                          id="message"
                          label="Message or Questions"
                          optional
                          helperText="Please discuss sensitive health concerns directly with the organiser."
                        >
                          {(fieldProps) => (
                            <textarea
                              {...fieldProps}
                              name="message"
                              rows={3}
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Anything you'd like us to know?"
                              className={styles.textArea}
                            />
                          )}
                        </FormField>

                        {/* Required Contact Consent (Client-Side Enforced Only) */}
                        <div className={styles.consentWrapper}>
                          <label
                            htmlFor="enquiry-consent"
                            className={`${styles.consentLabel} ${
                              consentChecked ? styles.consentChecked : ''
                            } ${
                              validationErrors.consent ? styles.consentError : ''
                            }`}
                          >
                            <input
                              ref={consentRef}
                              type="checkbox"
                              id="enquiry-consent"
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
                                validationErrors.consent
                                  ? 'consent-error'
                                  : undefined
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
                              I agree to be contacted about this enquiry.
                              <span className={styles.reqMark} aria-hidden="true">
                                {' '}
                                *
                              </span>
                            </span>
                          </label>

                          {validationErrors.consent && (
                            <span
                              id="consent-error"
                              className={styles.errorMessage}
                              role="alert"
                            >
                              {validationErrors.consent}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Submit & Back Actions + Privacy Footer */}
                      <div className={styles.stepActions}>
                        <div className={styles.step2BtnRow}>
                          <button
                            type="button"
                            className={styles.backBtn}
                            onClick={() => goToStep(1)}
                          >
                            <span aria-hidden="true">←</span>
                            <span>Back</span>
                          </button>

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
                        </div>

                        <p className={styles.privacyNote}>
                          Your details are used only to reply to your enquiry. We never share them.
                        </p>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
