/**
 * Smoothly scroll to the retreat enquiry card with fixed header clearance.
 * Used by footer, pricing, experience and sticky CTA buttons.
 *
 * @param {Event} [e] Optional click event to prevent default anchor jump
 */
export function scrollToEnquiry(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault()
  }

  if (typeof document === 'undefined') return
  const el = document.getElementById('enquiry')
  if (!el) return

  const headerH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    ) || 72
  const headerOffset = headerH + 16
  const elementPosition = el.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: 'smooth',
  })

  if (window.location.hash !== '#enquiry') {
    window.history.pushState(null, '', '#enquiry')
  }
}

