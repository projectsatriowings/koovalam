import { useEffect, useRef } from 'react'
import EnquiryCard from './EnquiryCard.jsx'
import styles from './EnquiryForm.module.css'

/**
 * Elevated modal dialog presenting a compact, refined Koovalam retreat enquiry
 * popup when triggered from Hero or Header Enquire Now CTAs.
 */
export default function EnquiryModal({ isOpen, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)
  const initialFocusRef = useRef(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false
        returnFocusRef?.current?.focus?.()
      }
      return
    }

    wasOpenRef.current = true
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.dataset.enquiryModal = 'open'

    const focusTimer = setTimeout(() => {
      const target = initialFocusRef.current || closeBtnRef.current
      target?.focus?.()
    }, 60)

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )].filter((el) => el.offsetParent !== null)

        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      delete document.body.dataset.enquiryModal
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen) return null

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-enquiry-heading"
      >
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close enquiry popup"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <EnquiryCard
          idPrefix="modal"
          isModal
          headingId="modal-enquiry-heading"
          initialFocusRef={initialFocusRef}
        />
      </div>
    </div>
  )
}

