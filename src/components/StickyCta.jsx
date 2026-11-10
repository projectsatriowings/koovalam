import { useEffect, useState } from 'react'
import { isWhatsAppConfigured, whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'

export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const dates = document.getElementById('dates')
    const enquiry = document.getElementById('enquiry')
    const footer = document.querySelector('footer')

    let heroOut = false
    const blockingElements = new Set()

    const update = () => setShow(heroOut && blockingElements.size === 0)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) {
            heroOut = !e.isIntersecting
          } else {
            if (e.isIntersecting) {
              blockingElements.add(e.target)
            } else {
              blockingElements.delete(e.target)
            }
          }
        }
        update()
      },
      { threshold: 0.05 }
    )

    ;[hero, dates, enquiry, footer].forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <aside
      className={`luxury-sticky-cta ${show ? 'visible' : ''}`}
      aria-hidden={!show}
      aria-label="Quick enquiry actions"
    >
      <a
        className="btn btn-gold sticky-btn-enquire"
        href="#dates"
        tabIndex={show ? 0 : -1}
        onClick={() => track('cta_sticky_reserve')}
      >
        View Dates &amp; Status
      </a>
      {isWhatsAppConfigured && whatsappLink && (
        <a
          className="sticky-wa-link"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          tabIndex={show ? 0 : -1}
          aria-label="Direct WhatsApp message"
          onClick={() => track('whatsapp_click_sticky')}
        >
          <span>WA</span>
        </a>
      )}
    </aside>
  )
}
