import { useEffect, useRef } from 'react'
import { LeafMark } from './Logo.jsx'
import { track } from '../lib/analytics.js'
import { site } from '../config/site.js'

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
            const offset = Math.min(scrolled * 0.12, 70)
            el.style.transform = `translate3d(0, ${offset}px, 0) scale(1.03)`
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
    <section className="hero-travel" id="top" aria-label="Koovalam Retreat Introduction">
      {/* Background imagery with subtle parallax & luxury dark vignette */}
      <div className="hero-travel-bg" ref={bgRef} aria-hidden="true">
        <picture>
          <source srcSet="images/hero-bg.webp" type="image/webp" />
          <img
            src="images/hero-bg.jpg"
            alt="Misty morning light through lush Kerala palm canopy and peaceful nature retreat"
            width="1600"
            height="1066"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-travel-overlay" />
      </div>

      <div className="wrap hero-travel-wrap">
        <div className="hero-travel-content">
          {/* Eyebrow badge with sacred Bilva leaf brandmark */}
          <div className="hero-travel-badge">
            <span className="hero-travel-badge-icon" aria-hidden="true">
              <LeafMark color="var(--antique-brass)" size={14} />
            </span>
            <span className="hero-travel-badge-text">
              Kerala, India · Boutique Wellness &amp; Cultural Retreat
            </span>
          </div>

          {/* Primary Hero Headline */}
          <h1 className="hero-travel-title">
            A Journey Back <span className="title-serif-italic">to Yourself</span>
          </h1>

          {/* Key Activities Pill Row */}
          <div className="hero-activities-pills" aria-label="Core Retreat Practices">
            <span className="activity-pill">Yoga</span>
            <span className="pill-dot">·</span>
            <span className="activity-pill">Pranayama</span>
            <span className="pill-dot">·</span>
            <span className="activity-pill">Meditation</span>
            <span className="pill-dot">·</span>
            <span className="activity-pill">Culture</span>
            <span className="pill-dot">·</span>
            <span className="activity-pill">Nature</span>
          </div>

          {/* Supporting Copy / Lede */}
          <p className="hero-travel-lede">
            Experience Kerala through mindful movement, yoga, cultural discovery and meaningful moments in nature. An unhurried experience designed to rest your senses, deepen your breath, and reconnect with what matters.
          </p>

          {/* Conversion Actions */}
          <div className="hero-travel-actions">
            <a
              className="btn btn-travel-primary"
              href="#enquiry"
              onClick={() => track('cta_enquire_now_hero')}
            >
              <span>Enquire Now</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              className="btn btn-travel-ghost"
              href="#experience"
              onClick={() => track('cta_explore_experience_hero')}
            >
              <span>Explore the Experience</span>
            </a>
          </div>
        </div>

        {/* Integrated Trip Info Bar */}
        <div className="hero-trip-strip" aria-label="Retreat Overview">
          <div className="trip-strip-grid">
            <div className="trip-strip-item">
              <span className="trip-strip-label">Location</span>
              <strong className="trip-strip-value">{site.retreat.location}</strong>
              <span className="trip-strip-sub">Venue to be confirmed</span>
            </div>

            <div className="trip-strip-item">
              <span className="trip-strip-label">Dates &amp; Duration</span>
              <strong className="trip-strip-value">To be confirmed</strong>
              <span className="trip-strip-sub">Subject to organiser review</span>
            </div>

            <div className="trip-strip-item">
              <span className="trip-strip-label">Style</span>
              <strong className="trip-strip-value">Mindful &amp; Cultural</strong>
              <span className="trip-strip-sub">7 Core Activities</span>
            </div>

            <div className="trip-strip-item">
              <span className="trip-strip-label">Stay &amp; Food</span>
              <strong className="trip-strip-value">Twin-Sharing</strong>
              <span className="trip-strip-sub">Vegetarian Meals Planned</span>
            </div>

            <div className="trip-strip-item trip-strip-price-item">
              <span className="trip-strip-label">Provisional Fee</span>
              <div className="trip-strip-price-row">
                <strong className="trip-strip-price">{site.retreat.price}</strong>
                <span className="trip-strip-unit">/ person</span>
              </div>
              <span className="trip-strip-sub">Subject to confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
