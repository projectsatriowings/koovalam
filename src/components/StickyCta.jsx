import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics.js'

export default function StickyCta() {
  const [show, setShow] = useState(false)
  const barRef = useRef(null)

  useEffect(() => {
    const hero = document.getElementById('top')
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
      { threshold: 0.08 }
    )

    ;[hero, enquiry, footer].forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const syncOffset = () => {
      const root = document.documentElement
      if (!show || window.innerWidth > 960 || !barRef.current) {
        root.style.setProperty('--sticky-cta-offset', '0px')
        return
      }
      const height = Math.ceil(barRef.current.getBoundingClientRect().height)
      root.style.setProperty('--sticky-cta-offset', `${height}px`)
    }

    syncOffset()
    window.addEventListener('resize', syncOffset)
    return () => {
      window.removeEventListener('resize', syncOffset)
      document.documentElement.style.setProperty('--sticky-cta-offset', '0px')
    }
  }, [show])

  return (
    <aside
      ref={barRef}
      className={`travel-sticky-bar ${show ? 'visible' : ''}`}
      aria-hidden={!show}
      aria-label="Quick retreat enquiry actions"
    >
      <div className="travel-sticky-wrap">
        <div className="travel-sticky-info">
          <div className="sticky-price-row">
            <strong className="sticky-price">₹9,999*</strong>
            <span className="sticky-unit">/ person (Provisional)</span>
          </div>
          <span className="sticky-dates-tag">Kerala, India · Dec 17 – 20 (4D / 3N)</span>
        </div>

        <a
          className="btn btn-travel-primary btn-sticky-action"
          href="#enquiry"
          tabIndex={show ? 0 : -1}
          onClick={() => track('cta_sticky_bottom_bar')}
        >
          <span>Enquire Now</span>
          <svg
            width="15"
            height="15"
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
      </div>
    </aside>
  )
}
