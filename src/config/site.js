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
    "Hi, I would like to enquire about the Koovalam Kerala Retreat.",
  // PLACEHOLDER — form endpoint. Leave empty to use the WhatsApp fallback
  // success state; set to a Formspree / Web3Forms endpoint when ready.
  formEndpoint: '',
  retreat: {
    name: 'Koovalam Kerala Retreat',
    headline: 'A Journey Back to Yourself',
    subheadline: 'Mindful Movement, Yoga, Cultural Discovery & Meaningful Moments in Nature',
    activitiesSummary: 'Yoga · Pranayama · Meditation · Culture · Nature',
    duration: '3–4 Days (Dec 17–19 Under Review)',
    dates: 'December 17–19 (Provisional · Pending Confirmation)',
    location: 'Kerala, India',
    venue: 'Kerala, India (Exact sanctuary to be confirmed)',
    price: '₹9,999',
    priceNote: 'per person (Provisional · To be confirmed before bookings open)',
    accommodation: 'Twin-Sharing (2 people per room)',
    food: 'Pure Vegetarian Meals',
    pickup: 'Kuttipuram Railway Station (Requested pickup hub)',
    groupSize: 'Small group experience',
    ageRange: '18–70 years',
    checkIn: 'from 2:00 PM (Day 01)',
    checkOut: 'around 12:00 PM (Final Day)',
  },
  socials: [
    // PLACEHOLDERS — replace hrefs with real profiles, or delete entries.
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
  testimonials: [],
  canonical: 'https://koovalam.example/',
}

/**
 * Validation helpers for contact channel readiness.
 * Guard against displaying or linking dead placeholders (e.g. 91XXXXXXXXXX, .example).
 */
export const isWhatsAppConfigured = Boolean(
  site.whatsappNumber &&
    !site.whatsappNumber.includes('X') &&
    site.whatsappNumber.trim() !== ''
)

export const isEmailConfigured = Boolean(
  site.email &&
    !site.email.endsWith('.example') &&
    site.email.trim() !== ''
)

export const isFormConfigured = Boolean(
  site.formEndpoint && site.formEndpoint.trim() !== ''
)

export const isContactConfigured =
  isWhatsAppConfigured || isEmailConfigured || isFormConfigured

export const whatsappLink = isWhatsAppConfigured
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`
  : null
