import { useEffect, useRef } from 'react'
import { track } from '../lib/analytics.js'

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = bgRef.current
          if (el) {
            const scrolled = window.scrollY
            el.style.transform = `translate3d(0, ${scrolled * 0.18}px, 0) scale(1.05)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero-luxury" id="top" aria-label="Koovalam Retreat Introduction">
      {/* Background with restrained parallax */}
      <div className="hero-luxury-bg" ref={bgRef} aria-hidden="true">
        <picture>
          <source srcSet="images/hero-bg.webp" type="image/webp" />
          <img
            src="images/hero-bg.jpg"
            alt="Misty morning light through palm groves in Kerala"
            width="1600"
            height="1066"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-luxury-overlay" />
      </div>

      <div className="wrap hero-luxury-wrap">
        <div className="hero-luxury-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            <span className="hero-badge-text">Kerala, India · 4-Day Spiritual Wellness &amp; Mindfulness Retreat</span>
          </div>

          <h1 className="hero-luxury-title">
            <span className="title-row">Pause.</span>
            <span className="title-row">Breathe.</span>
            <span className="title-row title-italic">Reconnect.</span>
          </h1>

          <p className="hero-luxury-lede">
            Step away from noise and routine into the lush sanctuary of Kerala. Four unhurried days of gentle yoga, restorative pranayama, meditation, temple quiet, and still waters.
          </p>

          <div className="hero-luxury-actions">
            <a
              className="btn btn-gold hero-cta-primary"
              href="#enquiry"
              onClick={() => track('cta_reserve_interest_hero')}
            >
              Reserve Your Interest
            </a>
            <a
              className="btn btn-outline hero-cta-secondary"
              href="#journey"
              onClick={() => track('cta_see_journey_hero')}
            >
              Explore The Journey
            </a>
          </div>

          <div className="hero-luxury-meta">
            <div className="meta-pillar">
              <span className="meta-label">BODY</span>
              <span className="meta-val">Vitality &amp; Movement</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-pillar">
              <span className="meta-label">MIND</span>
              <span className="meta-val">Peace &amp; Mindfulness</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-pillar">
              <span className="meta-label">SOUL</span>
              <span className="meta-val">Spiritual Connection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial scroll indicator */}
      <a href="#summary" className="hero-scroll-indicator" aria-label="Scroll down to retreat overview">
        <span className="scroll-text">Scroll to discover</span>
        <span className="scroll-line" aria-hidden="true" />
      </a>
    </section>
  )
}
