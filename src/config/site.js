// ─────────────────────────────────────────────────────────────────────────────
// ONE SOURCE OF TRUTH FOR RETREAT CONFIGURATION & CONTACT DESTINATIONS
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
  // PLACEHOLDER — form endpoint. Leave empty until a genuine backend endpoint is set up.
  formEndpoint: '',
  retreat: {
    name: 'Koovalam Kerala Retreat',
    headline: 'A Journey Back to Yourself',
    subheadline: 'Mindful Movement, Yoga, Cultural Discovery & Meaningful Moments in Nature',
    activitiesSummary: 'Yoga · Pranayama · Meditation · Culture · Nature',
    duration: 'Dates and programme duration to be confirmed',
    dates: 'Dates and programme duration to be confirmed',
    location: 'Kerala, India',
    venue: 'Kerala, India (Venue to be confirmed by organiser)',
    price: '₹9,999',
    priceNote: 'Provisional price: ₹9,999 per person — subject to organiser confirmation',
    accommodation: 'Twin-sharing accommodation — two guests per room',
    food: 'Vegetarian meals are part of the planned retreat experience. Final meal arrangements will be confirmed by the organiser.',
    pickup: 'Requested pickup point: Kuttipuram Railway Station (Transport inclusion pending confirmation)',
    groupSize: 'Small group experience',
    ageRange: '18–70 years (Stated intended participant range, subject to final eligibility confirmation)',
  },
  socials: [
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
