// Canonical options and copy for the Koovalam Enquiry & Registration flow.
// Option `value` strings match the backend API contract in api/enquire.js.

export const PARTICIPANT_OPTIONS = [
  {
    count: 1,
    value: '1 Person',
    label: '1 Person',
    shortDesc: 'Solo guest · Twin-sharing room',
  },
  {
    count: 2,
    value: '2 People (Couples / Friends)',
    label: '2 People',
    shortDesc: 'Couples or friends travelling together',
  },
  {
    count: 3,
    value: '3 People',
    label: '3 People',
    shortDesc: 'Small trio travelling together',
  },
  {
    count: 4,
    value: '4+ Small Group',
    label: '4 or more',
    shortDesc: 'Small group retreat enquiry',
    isGroup: true,
  },
]

export const PICKUP_OPTIONS = [
  {
    value: 'Kuttipuram Railway Station (Organiser Pickup Hub)',
    title: 'Kuttipuram Railway Station',
    description: 'Requested organiser pickup hub (details confirmed on reply)',
  },
  {
    value: 'Other / Independent Travel',
    title: 'Other / Independent Travel',
    description: 'Arriving independently or from another station or airport',
  },
  {
    value: 'Not Sure / Need Guidance',
    title: 'Not Sure / Need Guidance',
    description: 'We will help you plan the most comfortable arrival route',
  },
]

export const ACCOMMODATION_OPTIONS = [
  {
    value: 'Twin Sharing (Standard — Two Guests per Room)',
    title: 'Twin Sharing',
    description: 'Standard planned arrangement — two guests per room',
  },
  {
    value: 'Need Clarification / Single Room Query',
    title: 'Need Clarification / Single Room Query',
    description: 'Ask the organiser about private room availability or pairing',
  },
]

export const COUNTRY_CODES = [
  { code: '+91', label: 'India (+91)', shortLabel: '+91 IN' },
  { code: '+971', label: 'UAE (+971)', shortLabel: '+971 AE' },
  { code: '+44', label: 'United Kingdom (+44)', shortLabel: '+44 UK' },
  { code: '+1', label: 'USA / Canada (+1)', shortLabel: '+1 US' },
  { code: '+65', label: 'Singapore (+65)', shortLabel: '+65 SG' },
  { code: '+61', label: 'Australia (+61)', shortLabel: '+61 AU' },
  { code: '+49', label: 'Germany (+49)', shortLabel: '+49 DE' },
  { code: '+33', label: 'France (+33)', shortLabel: '+33 FR' },
  { code: '+60', label: 'Malaysia (+60)', shortLabel: '+60 MY' },
]

export const REASSURANCE_PANEL_CONTENT = {
  eyebrow: 'CONNECT WITH US',
  heading: 'Your pause is one message away.',
  supportingLine:
    'Ask us anything about the retreat, the stay or the journey. There is no commitment.',
  checklist: [
    '100% Non-Binding Enquiry',
    'Zero Upfront Payment',
    'Vegetarian Meals Planned',
    'Twin-Sharing Accommodation',
  ],
  timelineHeading: 'What happens next',
  timelineSteps: [
    { number: '1', text: 'You send your enquiry.' },
    { number: '2', text: 'We reply with venue details and room availability for Dec 17–20.' },
    { number: '3', text: 'You decide, with no pressure.' },
  ],
}

