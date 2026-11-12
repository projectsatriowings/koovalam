import { useEffect, useRef } from 'react'
import { LeafMark } from '../Logo.jsx'
import { site, buildWhatsAppLink, isEmailConfigured } from '../../config/site.js'
import { track } from '../../lib/analytics.js'
import styles from './EnquiryForm.module.css'

/**
 * Warm post-submission confirmation view replacing the form inside the right panel.
 * Scrolls card smoothly into view and moves focus to heading for SR accessibility.
 */
export default function SuccessState({
  formData,
  containerRef,
  onReset,
}) {
  const headingRef = useRef(null)

  const firstName =
    (formData.fullName || '').trim().split(/\s+/)[0] || 'Friend'

  useEffect(() => {
    containerRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const timer = setTimeout(() => {
      headingRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [containerRef])

  const prefillSummary = [
    `Hi Koovalam team, I just submitted an enquiry on the website.`,
    `Name: ${formData.fullName}`,
    `Participants: ${formData.participants}`,
    `Pickup: ${formData.pickup}`,
    `Accommodation: ${formData.accommodation}`,
    formData.message ? `Note: ${formData.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const waHref = buildWhatsAppLink(prefillSummary)

  const emailHref = isEmailConfigured
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        `Koovalam Enquiry Follow-up — ${formData.fullName}`
      )}&body=${encodeURIComponent(prefillSummary)}`
    : null

  return (
    <div className={styles.successContainer} role="status" aria-live="polite">
      <div className={styles.successLeafBadge} aria-hidden="true">
        <LeafMark color="#1F3D2B" stemColor="#B08D4A" size={34} />
        <span className={styles.successCheckCorner}>
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
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
      </div>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className={styles.successHeading}
      >
        Thank you, {firstName}
      </h3>

      <p className={styles.successCopy}>
        We've received your enquiry for December 17–20 and will reply on WhatsApp or
        email with room availability and next steps.
      </p>

      {/* Short Recap of Chosen Options */}
      <div className={styles.recapBox} aria-label="Summary of your retreat preferences">
        <div className={styles.recapItem}>
          <span className={styles.recapLabel}>Participants</span>
          <span className={styles.recapValue}>{formData.participants}</span>
        </div>
        <div className={styles.recapItem}>
          <span className={styles.recapLabel}>Pickup</span>
          <span className={styles.recapValue}>{formData.pickup}</span>
        </div>
        <div className={styles.recapItem}>
          <span className={styles.recapLabel}>Accommodation</span>
          <span className={styles.recapValue}>{formData.accommodation}</span>
        </div>
      </div>

      <div className={styles.successActions}>
        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className={styles.successSecondaryBtn}
            onClick={() => track('enquiry_success_whatsapp_click')}
          >
            Message us on WhatsApp
          </a>
        ) : emailHref ? (
          <a
            href={emailHref}
            className={styles.successSecondaryBtn}
            onClick={() => track('enquiry_success_email_click')}
          >
            Email the organiser
          </a>
        ) : null}

        <button
          type="button"
          className={styles.resetLinkBtn}
          onClick={onReset}
        >
          Send another enquiry
        </button>
      </div>
    </div>
  )
}
