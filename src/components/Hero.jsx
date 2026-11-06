import { useEffect, useRef } from 'react'
import { LeafMark } from './Logo.jsx'
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
            // Damped, capped parallax to keep motion restrained and performant
            const offset = Math.min(scrolled * 0.14, 90)
            el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`
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
      {/* Background photograph with restrained parallax */}
      <div className="hero-luxury-bg" ref={bgRef} aria-hidden="true">
        <picture>
          <source srcSet="images/hero-bg.webp" type="image/webp" />
          <img
            src="images/hero-bg.jpg"
            alt="Misty morning light through lush Kerala palm canopy and sacred Bilva grove"
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
          {/* Eyebrow badge with sacred Bilva leaf brandmark */}
          <div className="hero-badge">
            <span className="hero-badge-mark" aria-hidden="true">
              <LeafMark color="var(--antique-gold-soft)" size={15} />
            </span>
            <span className="hero-badge-text">Kerala, India · 4-Day Spiritual Wellness &amp; Nature Retreat</span>
          </div>

          {/* Main Hero Headline: Retreat Tagline */}
          <h1 className="hero-luxury-title">
            <span className="title-row">Pause.</span>
            <span className="title-row">Breathe.</span>
            <span className="title-row title-italic">Reconnect.</span>
          </h1>

          {/* Primary Brand Statement */}
          <p className="hero-brand-statement" aria-label="Brand Statement">
            Rooted in Nature. Connected to Soul.
          </p>

          {/* Editorial Lede */}
          <p className="hero-luxury-lede">
            Step away from daily noise into Kerala’s peaceful sanctuary. Four unhurried days immersed in classical yoga, restorative pranayama, guided mindfulness, sacred temple quiet, and still waters.
          </p>

          {/* Purposeful CTA Strategy */}
          <div className="hero-luxury-actions">
            <a
              className="btn btn-gold hero-cta-primary"
              href="#journey"
              onClick={() => track('cta_explore_journey_hero')}
            >
              <span>Explore the Journey</span>
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              className="btn btn-outline hero-cta-secondary"
              href="#pause"
              onClick={() => track('cta_discover_retreat_hero')}
            >
              <span>Discover the Retreat</span>
            </a>
          </div>

          {/* Three Brand Pillars: Body, Mind, Soul */}
          <div className="hero-luxury-meta" aria-label="Brand Pillars: Body, Mind, and Soul">
            <div className="meta-pillar">
              <div className="meta-pillar-tag">
                <span className="meta-label">BODY</span>
                <span className="meta-val">Vitality &amp; Movement</span>
              </div>
              <span className="meta-sub">Physical wellness &amp; mindful asana</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-pillar">
              <div className="meta-pillar-tag">
                <span className="meta-label">MIND</span>
                <span className="meta-val">Peace &amp; Awareness</span>
              </div>
              <span className="meta-sub">Restorative breath &amp; Yoga Nidra</span>
            </div>
            <div className="meta-divider" aria-hidden="true" />
            <div className="meta-pillar">
              <div className="meta-pillar-tag">
                <span className="meta-label">SOUL</span>
                <span className="meta-val">Spiritual Connection</span>
              </div>
              <span className="meta-sub">Temple quiet &amp; inner stillness</span>
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
