import { LeafMark } from '../Logo.jsx'
import WhatsAppIcon from '../WhatsAppIcon.jsx'
import { REASSURANCE_PANEL_CONTENT } from '../../data/enquiryOptions.js'
import { site, buildWhatsAppLink, isEmailConfigured } from '../../config/site.js'
import { track } from '../../lib/analytics.js'
import styles from './EnquiryForm.module.css'

/**
 * Left forest-green reassurance & expectations panel for the Enquiry split card.
 * Collapses into a compact green header block with 2x2 chips on tablet/mobile.
 */
export default function ReassurancePanel() {
  const prefilledWhatsAppHref = buildWhatsAppLink()

  const fallbackEmailHref = isEmailConfigured
    ? `mailto:${site.email}?subject=${encodeURIComponent(
        'Koovalam Kerala Retreat — Direct Enquiry'
      )}`
    : null

  return (
    <aside className={styles.leftPanel} aria-label="Retreat reassurance and expectations">
      <div className={styles.leftTopContent}>
        <div className={styles.panelEyebrow}>
          <LeafMark color="#DFC289" stemColor="#DFC289" size={14} />
          <span>{REASSURANCE_PANEL_CONTENT.eyebrow}</span>
        </div>

        <h3 className={styles.panelHeading}>{REASSURANCE_PANEL_CONTENT.heading}</h3>
        <p className={styles.panelSub}>{REASSURANCE_PANEL_CONTENT.supportingLine}</p>

        {/* Four Reassurance Items */}
        <ul className={styles.reassuranceList}>
          {REASSURANCE_PANEL_CONTENT.checklist.map((item) => (
            <li key={item} className={styles.reassuranceItem}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.reassuranceCheckIcon}
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* What Happens Next 3-Step Timeline (Hidden on mobile < 960px) */}
        <div className={styles.timelineBlock}>
          <h4 className={styles.timelineTitle}>
            {REASSURANCE_PANEL_CONTENT.timelineHeading}
          </h4>
          <ol className={styles.timelineSteps}>
            {REASSURANCE_PANEL_CONTENT.timelineSteps.map((step) => (
              <li key={step.number} className={styles.timelineStep}>
                <span className={styles.timelineBadge} aria-hidden="true">
                  {step.number}
                </span>
                <span>{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bottom Direct Contact Link */}
      {(prefilledWhatsAppHref || fallbackEmailHref) && (
        <div className={styles.leftBottomAction}>
          {prefilledWhatsAppHref ? (
            <a
              href={prefilledWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waDirectBtn}
              onClick={() => track('enquiry_panel_whatsapp_click')}
            >
              <WhatsAppIcon size={17} />
              <span>Prefer WhatsApp? Message us directly</span>
            </a>
          ) : (
            <a
              href={fallbackEmailHref}
              className={styles.waDirectBtn}
              onClick={() => track('enquiry_panel_email_click')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Prefer direct email? Write to {site.email}</span>
            </a>
          )}
        </div>
      )}

      {/* Faint Botanical Three-Leaf Watermark */}
      <div className={styles.leafWatermark} aria-hidden="true">
        <LeafMark color="#B08D4A" stemColor="#B08D4A" size={240} />
      </div>
    </aside>
  )
}

