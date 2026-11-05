import { useEffect, useState } from 'react'
import { whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'

// Mobile sticky bar: appears only after the hero scrolls out of view, and
// hides while the enquiry form or the footer is on screen, so it never
// covers them. Respects safe-area insets via CSS.
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.hero-ed')
    const enquiry = document.getElementById('enquiry')
    const footer = document.querySelector('footer')
    let heroOut = false, blocking = false
    const update = () => setShow(heroOut && !blocking)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroOut = !e.isIntersecting
        else blocking = e.isIntersecting
      }
      update()
    }, { threshold: 0.05 })
    ;[hero, enquiry, footer].forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className={`sticky-cta ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a className="btn btn-gold" href="#enquiry" tabIndex={show ? 0 : -1} onClick={() => track('cta_sticky')}>Enquire</a>
      <a className="wa" href={whatsappLink} target="_blank" rel="noreferrer" tabIndex={show ? 0 : -1} aria-label="Enquire on WhatsApp" onClick={() => track('whatsapp_click_sticky')}>WA</a>
    </div>
  )
}
