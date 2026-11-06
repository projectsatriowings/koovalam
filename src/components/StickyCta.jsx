import { useEffect, useState } from 'react'
import { whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'

export default function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const enquiry = document.getElementById('enquiry')
    const footer = document.querySelector('footer')

    let heroOut = false
    let blocking = false

    const update = () => setShow(heroOut && !blocking)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) {
            heroOut = !e.isIntersecting
          } else {
            blocking = e.isIntersecting
          }
        }
        update()
      },
      { threshold: 0.05 }
    )

    ;[hero, enquiry, footer].forEach((el) => el && io.observe(el))
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
        href="#enquiry"
        tabIndex={show ? 0 : -1}
        onClick={() => track('cta_sticky_reserve')}
      >
        Reserve Interest
      </a>
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
    </aside>
  )
}
