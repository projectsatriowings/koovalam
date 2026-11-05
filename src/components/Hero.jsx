import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics.js'
import { LeafMark } from './Logo.jsx'

// V6 — v5 Editorial hero + UI UX Pro Max Glassmorphism #3, Aurora #10,
// Kinetic Typography #48, Parallax Storytelling #49, 3D #5.
// Full-bleed photo with slow parallax, aurora blobs drifting behind the
// type, headline words rising in one by one, a floating Bilva leaf, and a
// gently glowing CTA. All motion stops under prefers-reduced-motion.
export default function Hero() {
  const bgRef = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => {
      const el = bgRef.current
      if (el) el.style.transform = `translateY(${window.scrollY * 0.22}px) scale(1.08)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className="hero-ed" id="top">
      <div className="hero-ed-bg" ref={bgRef} aria-hidden="true">
        <picture>
          <source srcSet="images/hero-bg.webp" type="image/webp" />
          <img src="images/hero-bg.jpg" alt="" width="1600" height="1066" decoding="async" fetchpriority="high" />
        </picture>
      </div>
      <div className="aurora aurora-a" aria-hidden="true" />
      <div className="aurora aurora-b" aria-hidden="true" />
      <div className="hero-leaf-float" aria-hidden="true"><LeafMark color="#F6F1E4" size={44} /></div>
      <div className="wrap hero-ed-wrap">
        <p className="hero-kicker">Koovalam · Kerala, India · 4 Days / 3 Nights</p>
        <h1 className="kinetic"><span>Pause.</span><span>Breathe.</span><span><em>Reconnect.</em></span></h1>
        <p className="hero-ed-lede">Four unhurried days of yoga, breath, quiet and green — a gentle journey toward balance, self-awareness and inner connection.</p>
        <div className="hero-ctas">
          <a className="btn btn-gold" href="#enquiry" onClick={() => track('cta_reserve_interest')}>Reserve Your Interest</a>
          <a className="btn btn-ed-outline" href="#journey" onClick={() => track('cta_see_journey')}>See the journey ↓</a>
        </div>
        <div className="hero-ed-route" aria-label="Four days, four stops on the route">
          <span><b>01</b> Arrival</span><span><b>02</b> Breath</span><span><b>03</b> Temple &amp; River</span><span><b>04</b> Return</span>
        </div>
      </div>
    </section>
  )
}
