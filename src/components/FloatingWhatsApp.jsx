import { useEffect, useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { site, whatsappLink, isWhatsAppConfigured } from '../config/site.js'
import { track } from '../lib/analytics.js'

/**
 * Persistent bottom-right icon-only WhatsApp popup button with a prefilled enquiry link.
 * Yields smoothly to StickyCta on viewports <= 960px via --sticky-cta-offset, and hides
 * when the footer is visible so it never overlaps footer copyright or footer CTAs.
 */
export default function FloatingWhatsApp() {
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.12 }
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  if (!isWhatsAppConfigured || !whatsappLink) return null

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`floating-wa-btn ${footerVisible ? 'is-hidden' : ''}`}
      tabIndex={footerVisible ? -1 : 0}
      aria-hidden={footerVisible}
      aria-label={`Enquire on WhatsApp (${site.whatsappDisplay})`}
      title={`WhatsApp Enquiry (${site.whatsappDisplay})`}
      onClick={() => track('floating_whatsapp_click')}
    >
      <WhatsAppIcon size={36} />
    </a>
  )
}
