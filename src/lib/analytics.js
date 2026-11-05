// Tiny analytics hook — a no-op by default.
// To wire GA4 or Plausible, replace the body of track() with your provider's
// call (e.g. gtag('event', name) or plausible(name)). Nothing else changes.
export function track(eventName) {
  if (typeof window !== 'undefined' && window.__koovalamTrack) {
    window.__koovalamTrack(eventName)
  }
  // No-op: no data is sent until a provider is wired in (see README).
}
