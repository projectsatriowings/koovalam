// ─────────────────────────────────────────────────────────────────────────────
// ONE SOURCE OF TRUTH FOR PLACEHOLDERS — edit only this file to go live.
// Nothing in the components hard-codes a date, price, venue, contact or
// testimonial. Until the items below are replaced with real values, the page
// honestly says "Announcing soon" / "Shared on enquiry" / "to be confirmed".
// ─────────────────────────────────────────────────────────────────────────────
export const site = {
  brand: 'Koovalam',
  wordmark: 'KOOVALAM',
  tagline: 'Rooted in Nature. Connected to Soul.',
  // PLACEHOLDER — replace with the real contact email before launch.
  email: 'hello@koovalam.example',
  // PLACEHOLDER — replace with the real WhatsApp number (country code, digits
  // only, no "+" or spaces) before launch. The wa.me link uses this value.
  whatsappNumber: '91XXXXXXXXXX',
  whatsappMessage:
    "Hi, I'd like to know more about the Koovalam retreat.",
  // PLACEHOLDER — form endpoint. Leave empty to use the WhatsApp fallback
  // success state; set to a Formspree / Web3Forms endpoint when ready.
  formEndpoint: '',
  retreat: {
    name: '4-Day Spiritual Wellness & Mindfulness Retreat',
    duration: '4 days · 3 nights',
    location: 'Kerala, India',
    venue: 'Kerala, India (to be confirmed)',
    dates: 'Announcing soon',
    price: 'Shared on enquiry',
    groupSize: 'To be confirmed',
    facilitators: 'To be confirmed',
    checkIn: 'from 2:00 PM',
    checkOut: 'around 12:00 PM',
  },
  socials: [
    // PLACEHOLDERS — replace hrefs with real profiles, or delete entries.
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
  // Testimonials: intentionally EMPTY. The Testimonials section renders ONLY
  // when this array is non-empty. Do not invent testimonials — add real ones,
  // with the speaker's permission, when you have them.
  testimonials: [],
  canonical: 'https://koovalam.example/',
}
export const whatsappLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`
