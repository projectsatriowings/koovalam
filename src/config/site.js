// ─────────────────────────────────────────────────────────────────────────────
// ONE SOURCE OF TRUTH FOR RETREAT CONFIGURATION & CONTACT DESTINATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const site = {
  brand: 'Koovalam',
  wordmark: 'KOOVALAM',
  tagline: 'Rooted in Nature. Connected to Soul.',
  secondaryTagline: 'Reconnect with Nature. Rediscover Yourself.',
  // Verified organiser WhatsApp & contact email
  email: 'info.koovalam@gmail.com',
  // Real WhatsApp number (country code, digits only, no "+" or spaces) for wa.me links
  whatsappNumber: '917358400296',
  whatsappDisplay: '+91 73584 00296',
  whatsappMessage:
    'Namaste Koovalam Team, I would like to enquire about the Koovalam Spiritual Wellness Retreat (Dec 25–28 at Oxyfarm Resorts, Wayanad, Kerala). Could you please share room availability for Single / Double Occupancy and next steps?',
  // Functional backend email enquiry endpoint (served by api/enquire.js and dev middleware)
  formEndpoint: '/api/enquire',
  retreat: {
    name: 'Koovalam Spiritual Wellness Retreat',
    headline: 'Reconnect with Nature. Rediscover Yourself.',
    subheadline: 'Nature, Wellness and Spirituality · Rooted in the traditional wisdom of Kerala',
    activitiesSummary: 'Yoga · Pranayama · Meditation · Temples · Culture · Nature',
    duration: '4 days / 3 nights',
    dates: 'December 25–28 (Confirmed)',
    location: 'Oxyfarm Resorts, Wayanad, Kerala',
    venue: 'Oxyfarm Resorts, Wayanad, Kerala (Confirmed)',
    resortName: 'Oxyfarm Resorts',
    resortAddress: 'Mylattumala, Alattil P.O., Thalapuzha via, Mananthavady, Wayanad, Kerala — 670644',
    resortWebsite: 'https://www.oxyfarmresorts.com/',
    googleMapsUrl: 'https://maps.app.goo.gl/pqxBp6FtidViJ6RSA?g_st=ac',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=Oxyfarm+Resorts,+Mylattumala,+Wayanad&t=&z=14&ie=UTF8&iwloc=&output=embed',
    price: '₹17,999',
    priceDouble: '₹17,999',
    priceSingle: '₹26,999',
    priceNote: 'Double Occupancy: ₹17,999 per person · Single Occupancy: ₹26,999 per person',
    accommodation: 'Single & Twin-Sharing Accommodation at Oxyfarm Resorts (Private or 2 guests/room)',
    food: 'Vegetarian meals are part of the planned retreat experience. Final meal arrangements will be confirmed by the organiser.',
    pickup: 'Requested pickup point: Kuttipuram Railway Station (Transport inclusion pending confirmation)',
    groupSize: 'Small group experience',
    ageRange: '18–60 years (Stated intended participant range, subject to final eligibility confirmation)',
    templeVisits: 'Tirunelli Temple (Proposed · Logistical feasibility under organiser review)',
    culturalArts: 'Kathakali, Bharatanatyam, Mohiniyattam & Flute (Not included in package · Arranged upon request)',
  },
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
  testimonials: [],
  canonical: 'https://koovalam.com/',
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

export function buildWhatsAppLink(message = site.whatsappMessage) {
  if (!isWhatsAppConfigured) return null
  const text =
    message ||
    'Namaste Koovalam Team, I would like to enquire about the Koovalam Spiritual Wellness Retreat (Dec 25–28, Kerala).'
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const whatsappLink = buildWhatsAppLink()
