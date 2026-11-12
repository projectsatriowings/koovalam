import { useEffect, useRef, useState } from 'react'
import {
  mindfulPractices,
  practiceReassurance,
  practiceSectionMeta,
} from '../../data/practices.js'
import Reveal from '../Reveal.jsx'
import PracticeRow from './PracticeRow.jsx'
import PracticeStage from './PracticeStage.jsx'
import ReassuranceStrip from './ReassuranceStrip.jsx'
import styles from './Practices.module.css'

const DESKTOP_QUERY = '(min-width: 960px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const AUTO_ADVANCE_MS = 4000

function useMediaMatch(query, defaultValue) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(query).matches
      : defaultValue
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * Synchronized "Image + Practice List" showcase for Yoga & Mindful Practices.
 * Desktop (>= 960px): sticky visual stage and 5-row accordion advance together at a slow,
 * unhurried pace so the active photograph and expanded description remain in lockstep.
 * Mobile / tablet (< 960px): single-open accordion with inline 4:3 photography.
 */
export default function PracticeShowcase() {
  const isDesktop = useMediaMatch(DESKTOP_QUERY, true)
  const prefersReducedMotion = useMediaMatch(REDUCED_MOTION_QUERY, false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(true)
  const [isFocusedWithin, setIsFocusedWithin] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document !== 'undefined' ? !document.hidden : true
  )
  const [announcement, setAnnouncement] = useState('')
  const gridRef = useRef(null)
  const buttonRefs = useRef([])
  const scrollTimerRef = useRef(null)

  // Idle-preload remaining WebP practice photographs after initial paint.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const preloadImages = () => {
      mindfulPractices.slice(1).forEach((item) => {
        const img = new window.Image()
        img.src = `images/${item.image}.webp`
      })
    }

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(preloadImages, { timeout: 2000 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timerId = window.setTimeout(preloadImages, 800)
    return () => window.clearTimeout(timerId)
  }, [])

  // Pause background timer when browser tab is hidden.
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const handleVisibility = () => setIsPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  // Only auto-advance while the showcase grid is visible in viewport.
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      !gridRef.current
    ) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )

    observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  // Slow, synchronized auto-advance across image and practice row on desktop.
  useEffect(() => {
    if (
      !isDesktop ||
      !isInView ||
      !isPageVisible ||
      isFocusedWithin ||
      prefersReducedMotion
    ) {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % mindfulPractices.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearTimeout(timerId)
  }, [activeIndex, isDesktop, isInView, isPageVisible, isFocusedWithin, prefersReducedMotion])

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current)
    }
  }, [])

  const handleSelect = (idx) => {
    if (idx === activeIndex) return
    setActiveIndex(idx)
    const item = mindfulPractices[idx]
    if (item) {
      setAnnouncement(`Showing: ${item.title}`)
    }

    // On mobile accordion, ensure the opened header isn't hidden above/under the fixed header
    // after the previous row collapses.
    if (!isDesktop && typeof window !== 'undefined') {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current)
      const delay = prefersReducedMotion ? 20 : 520
      scrollTimerRef.current = window.setTimeout(() => {
        const btn = buttonRefs.current[idx]
        if (!btn) return
        const headerEl = document.querySelector('header')
        const headerHeight = headerEl
          ? headerEl.getBoundingClientRect().height
          : 76
        const rect = btn.getBoundingClientRect()
        if (rect.top < headerHeight + 14) {
          window.scrollBy({
            top: rect.top - (headerHeight + 18),
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          })
        }
      }, delay)
    }
  }

  const handleListFocus = () => {
    setIsFocusedWithin(true)
  }

  const handleListBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocusedWithin(false)
    }
  }

  const handleKeyDown = (e, idx) => {
    const total = mindfulPractices.length
    let targetIdx = null

    if (e.key === 'ArrowDown') {
      targetIdx = (idx + 1) % total
    } else if (e.key === 'ArrowUp') {
      targetIdx = (idx - 1 + total) % total
    } else if (e.key === 'Home') {
      targetIdx = 0
    } else if (e.key === 'End') {
      targetIdx = total - 1
    }

    if (targetIdx !== null) {
      e.preventDefault()
      buttonRefs.current[targetIdx]?.focus()
    }
  }

  return (
    <div className="experience-category-group">
      <div className="category-group-header">
        <span className="category-group-tag">{practiceSectionMeta.eyebrow}</span>
        <h3 className="category-group-title">{practiceSectionMeta.title}</h3>
        <p className="category-group-desc">{practiceSectionMeta.subline}</p>
        <ReassuranceStrip items={practiceReassurance} />
      </div>

      <Reveal>
        <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <div ref={gridRef} className={styles.showcaseGrid}>
          {isDesktop && (
            <PracticeStage
              items={mindfulPractices}
              activeIndex={activeIndex}
            />
          )}

          <div
            className={styles.listColumn}
            onFocus={handleListFocus}
            onBlur={handleListBlur}
          >
            {mindfulPractices.map((item, idx) => (
              <PracticeRow
                key={item.id}
                item={item}
                index={idx}
                totalCount={mindfulPractices.length}
                isActive={idx === activeIndex}
                isDesktop={isDesktop}
                buttonRef={(el) => {
                  buttonRefs.current[idx] = el
                }}
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
