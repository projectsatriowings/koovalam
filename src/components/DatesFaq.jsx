import { useState } from 'react'
import { site } from '../config/site.js'
import { faqs } from '../data/faqs.js'
import { track } from '../lib/analytics.js'
import Reveal from './Reveal.jsx'

export function DatesCard() {
  const r = site.retreat
  return (
    <section aria-label="Retreat dates and enquiry">
      <div className="wrap"><Reveal><div className="dates-card glass">
        <div>
          <p className="eyebrow">Dates &amp; enquiry</p>
          <h2>{r.name}</h2>
          <dl>
            <dt>Duration</dt><dd>{r.duration}</dd>
            <dt>Dates</dt><dd>{r.dates}</dd>
            <dt>Location</dt><dd>{r.venue}</dd>
            <dt>Price</dt><dd>{r.price}</dd>
            <dt>Check-in</dt><dd>{r.checkIn}</dd>
            <dt>Check-out</dt><dd>{r.checkOut}</dd>
          </dl>
        </div>
        <div>
          <p style={{ color: '#5c6657' }}>Join the early-interest list and be first to know when dates, venue and price are confirmed.</p>
          <a className="btn btn-gold" href="#enquiry" onClick={() => track('cta_dates_card')}>Reserve Your Interest</a>
        </div>
      </div></Reveal></div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="sec-ivory">
      <div className="wrap"><Reveal>
        <p className="eyebrow">Questions, answered gently</p>
        <h2>Frequently asked questions</h2>
      </Reveal>
      <div className="faq">
        {faqs.map((f, i) => (
          <div className="faq-item" key={f.q}>
            <button className="faq-q" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              {f.q}<span aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="faq-a" id={`faq-${i}`}>{f.a}</p>}
          </div>
        ))}
      </div></div>
    </section>
  )
}

// Renders NOTHING when testimonials is empty — no fake testimonials, ever.
// Add real, permissioned testimonials to site.testimonials to switch it on.
export function Testimonials() {
  if (!site.testimonials.length) return null
  return (
    <section aria-label="What participants say">
      <div className="wrap"><h2>Voices</h2>
        {site.testimonials.map((t) => (
          <blockquote key={t.name}><p>{t.quote}</p><cite>— {t.name}</cite></blockquote>
        ))}
      </div>
    </section>
  )
}
