import { useEffect, useRef } from 'react'
import { practices, divisions } from '../data/practices.js'
import { included, whoFor, whatNot } from '../data/retreat.js'
import { whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'
import ImageSlot from './ImageSlot.jsx'
import Reveal from './Reveal.jsx'
import Tilt from './Tilt.jsx'
import { LeafMark } from './Logo.jsx'

export function TrustStrip() {
  const items = ['Yoga & Pranayama', 'Meditation & Yoga Nidra', 'Temple & River Experiences', 'Gentle, Trauma-Informed Care']
  return (
    <section style={{ padding: '36px 0 0' }} aria-label="What the retreat includes at a glance">
      <div className="wrap"><div className="trust">{items.map((label) => <div key={label}><span aria-hidden="true" style={{ display: 'flex', justifyContent: 'center' }}><LeafMark color="#6B4A32" size={20} /></span>{label}</div>)}</div></div>
    </section>
  )
}

export function TicketStrip() {
  const cells = [['4 days', 'Duration'], ['3 nights', 'Stay'], ['Kerala', 'India'], ['Announcing soon', 'Dates']]
  return (
    <section className="ticket-strip" aria-label="Trip summary">
      <div className="wrap">
        <div className="ticket">
          {cells.map(([v, k]) => <div key={k}><b>{v}</b><span>{k}</span></div>)}
        </div>
      </div>
    </section>
  )
}

export function Pause() {
  return (
    <section id="pause">
      <div className="wrap"><Reveal>
        <p className="chapter">Chapter 01 · The pause</p>
        <p className="pull-quote">Life has been loud lately. Notifications, deadlines, noise — even rest has started to feel like another task. Koovalam is an invitation to step out of the rush for four days: to wake with the light, breathe without hurry, walk among green, and listen to yourself again. No fixing, no forcing. Just space — and the quiet that returns in it.</p>
      </Reveal></div>
    </section>
  )
}

export function BilvaStory() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section id="koovalam" className="sec-ivory">
      <div className="wrap"><div className="bilva-grid">
        <Reveal>
          <svg ref={ref} className="bilva-svg" viewBox="0 0 340 220" role="img" aria-label="Three Bilva leaves, one for body, one for mind, one for soul">
            <path d="M170 190 C 140 130, 140 50, 170 12 C 200 50, 200 130, 170 190 Z" />
            <path d="M110 200 C 60 170, 30 110, 60 60 C 110 80, 140 140, 110 200 Z" />
            <path d="M230 200 C 200 140, 230 80, 280 60 C 310 110, 280 170, 230 200 Z" />
          </svg>
          <ImageSlot name="bilva-leaves" />
        </Reveal>
        <Reveal>
          <p className="eyebrow">Why “Koovalam”</p>
          <h2>One leaf, three leaflets</h2>
          <p>Koovalam is the Bilva tree (<em>Aegle marmelos</em>), whose three-part leaf is traditionally offered to Lord Shiva — a symbol of devotion, purity, and the deep connection between nature and spiritual life. Rooted in the traditional wisdom of Kerala, Koovalam creates a meaningful connection between natural living, holistic wellness and spiritual exploration.</p>
          <div className="pillars">
            <div><b>BODY</b><p>Physical wellness and vitality.</p></div>
            <div><b>MIND</b><p>Mental peace and awareness.</p></div>
            <div><b>SOUL</b><p>Spiritual connection and inner growth.</p></div>
          </div>
        </Reveal>
      </div></div>
    </section>
  )
}

export function Practices() {
  return (
    <section id="retreat">
      <div className="wrap"><Reveal>
        <p className="eyebrow">What you’ll experience</p>
        <h2>Gentle practices, practised slowly</h2>
        <p className="lede">Nothing here is a performance. Each practice is offered, never imposed — and you may rest whenever you need to.</p>
      </Reveal>
      <div className="bento">
        {practices.map((p, i) => (
          <Tilt key={p.title} className={i === 0 ? 'card-wide' : ''}>
            <Reveal className={`card ${i === 0 ? 'card-wide' : ''}`}><ImageSlot name={p.image} />
              <div className="card-body"><h3>{p.title}</h3><p>{p.text}</p></div>
            </Reveal>
          </Tilt>
        ))}
      </div></div>
    </section>
  )
}

export function Highlights() {
  return (
    <section className="sec-ivory">
      <div className="wrap"><Reveal>
        <p className="eyebrow">Highlights</p>
        <h2>Two days you will carry home</h2>
        <p className="lede">Day 3 leaves the mat behind — first temple quiet, then river air.</p>
      </Reveal>
      <div className="feature-grid">
        <Tilt><Reveal className="feature"><ImageSlot name="highlight-temple" />
          <div className="feature-body"><h3>Temple Visit</h3><p>A quiet cultural and spiritual experience in the morning, held with respect for local customs and timings. No crowds, no hurry — simply being present in a sacred, centuries-old space.</p></div>
        </Reveal></Tilt>
        <Tilt><Reveal className="feature"><ImageSlot name="highlight-nila-river" />
          <div className="feature-body"><h3>Nila River Boat Safari ✦</h3><p>A mindful nature experience on the water in the afternoon — palms, still water, golden light. Run with an authorised operator, life jackets for all, and a weather-based go/no-go decision.</p></div>
        </Reveal></Tilt>
      </div></div>
    </section>
  )
}

export function WhoFor() {
  return (
    <section>
      <div className="wrap"><div className="two-col">
        <Reveal><p className="eyebrow">Who this is for</p><h2>Come as you are</h2>
          <ul className="check">{whoFor.map((x) => <li key={x}>{x}</li>)}</ul>
        </Reveal>
        <Reveal><p className="eyebrow">What this is not</p><h2>Honestly, and kindly</h2>
          <ul className="check not">{whatNot.map((x) => <li key={x}>{x}</li>)}</ul>
          <p style={{ color: '#5c6657', marginTop: 16 }}>If you are looking for therapy or a cure, we will gently point you toward qualified care instead — that honesty is part of the care.</p>
        </Reveal>
      </div></div>
    </section>
  )
}

export function Included() {
  return (
    <section className="sec-ivory">
      <div className="wrap"><Reveal>
        <p className="eyebrow">What’s included</p>
        <h2>Everything you need, nothing you don’t</h2>
      </Reveal>
      <div className="two-col">
        <ul className="check">{included.map((x) => <li key={x}>{x}</li>)}</ul>
        <div style={{ display: 'grid', gap: 18 }}>
          <ImageSlot name="included-stay" />
          <ImageSlot name="included-meals" />
        </div>
      </div></div>
    </section>
  )
}

export function SafeCare() {
  const points = [
    'Participation in every exercise is voluntary — pause, observe or opt out at any time.',
    'No pressure to share personal history or revisit distressing memories.',
    'Grounding, present-moment awareness and self-compassion practices throughout.',
    'Not a replacement for psychotherapy, and no promise of trauma release.',
    'No forceful breathing, and never push through pain, dizziness or distress.',
    'Accessibility and health needs shared privately before arrival.',
    'A qualified mental-health professional is identified for deeper work.',
    'Boat safari with an authorised operator, life jackets for all, weather go/no-go.',
  ]
  return (
    <section>
      <div className="wrap"><div className="safe-grid">
        <Reveal><p className="eyebrow">Gentle &amp; safe care</p><h2>You are safe to go at your own pace</h2>
          <ul className="check">{points.map((x) => <li key={x}>{x}</li>)}</ul>
        </Reveal>
        <Reveal><ImageSlot name="safe-care" /></Reveal>
      </div></div>
    </section>
  )
}

export function KoovalamWorld() {
  return (
    <section className="sec-ivory">
      <div className="wrap"><Reveal>
        <p className="eyebrow">The Koovalam world</p>
        <h2>One root, three branches</h2>
        <p className="lede">The retreat is where it begins. The same root grows into natural living and future workshops.</p>
      </Reveal>
      <div className="world-grid">
        {divisions.map((d) => (
          <Reveal key={d.title} className="card">
            {d.image ? <ImageSlot name={d.image} /> : <div className="slot" style={{ aspectRatio: '1 / 1' }}><div className="slot-fallback"><LeafMark color="#F6F1E4" size={52} /></div></div>}
            <div className="card-body">
              <p style={{ fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#B08D4A', fontWeight: 800, margin: '0 0 6px' }}>{d.tag}</p>
              <h3>{d.title}</h3><p>{d.text}</p>
              <a href="#enquiry" onClick={() => track('cta_notify_me')} style={{ fontWeight: 800, color: '#1F3D2B' }}>Notify me →</a>
            </div>
          </Reveal>
        ))}
      </div></div>
    </section>
  )
}

export function FinalCtaAside() {
  return (
    <div>
      <h2>Your pause is waiting.</h2>
      <p style={{ color: '#5c6657' }}>Dates are announcing soon. Join the early-interest list and we will write to you first — no payment, no commitment, just a quiet hello when the route opens.</p>
      <a className="btn btn-gold" href={whatsappLink} target="_blank" rel="noreferrer" onClick={() => track('whatsapp_click_final')} style={{ marginTop: 8 }}>Enquire on WhatsApp</a>
    </div>
  )
}
