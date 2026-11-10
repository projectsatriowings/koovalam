/**
 * KOOVALAM — CANONICAL RETREAT DATA
 * Premium Boutique Kerala Retreat Experience
 * Single source of truth for the 6-section redesign.
 */

// 1. The 7 Client-Specified Activities
export const activities = [
  {
    id: 'yoga',
    title: 'Gentle Classical Yoga',
    tag: 'Movement & Mobility',
    image: 'practice-yoga',
    summary:
      'Foundational movement, mobility, and mindful body awareness suitable for beginners and seasoned practitioners alike.',
    highlight: 'Accessible postures · Zero strain or pressure · 100% voluntary',
  },
  {
    id: 'pranayama',
    title: 'Pranayama Breathwork',
    tag: 'Breath & Vitality',
    image: 'practice-pranayama',
    summary:
      'Conscious breathing practices designed to calm the sympathetic nervous system, steady mental focus, and restore balance.',
    highlight: 'Natural breath awareness · Ancient balancing rhythms',
  },
  {
    id: 'yoga-nidra',
    title: 'Restorative Yoga Nidra',
    tag: 'Deep Conscious Rest',
    image: 'practice-yoga-nidra',
    summary:
      'Guided yogic sleep practiced comfortably lying down to release accumulated nervous tension and invite deep cellular recovery.',
    highlight: 'Restorative sleep support · Profound quiet relaxation',
  },
  {
    id: 'meditation',
    title: 'Morning Meditation',
    tag: 'Stillness & Presence',
    image: 'practice-meditation',
    summary:
      'Daily morning silent sitting and sensory observation to greet each day with unhurried mental space and grounded presence.',
    highlight: 'Gentle guidance · No rigid posture requirements',
  },
  {
    id: 'cognitive',
    title: 'Cognitive Exercises',
    tag: 'Clarity & Self-Reflection',
    image: 'practice-reflection',
    summary:
      'Guided mindfulness exercises and structured journaling for mental clarity, observing habit loops, and personal values.',
    highlight: 'Mindful mental clarity · Non-clinical personal wellness practice',
  },
  {
    id: 'village-tour',
    title: 'Scenic Village Tour',
    tag: 'Cultural Discovery',
    image: 'practice-nature-culture',
    summary:
      'An unhurried guided walking discovery through serene rural Kerala footpaths, plant groves, and indigenous village greenery.',
    highlight: 'Sensory grounding · Authentic rural Kerala landscape',
  },
  {
    id: 'temple-visit',
    title: 'Historic Temple Visit',
    tag: 'Sacred Heritage',
    image: 'highlight-temple',
    summary:
      'A quiet, respectful morning visit to a historic regional temple honoring centuries of contemplative silence and architecture.',
    highlight: 'Contemplative stone courtyards · Subject to local customs',
  },
]

// 2. The Retreat Journey / Itinerary
export const itineraryData = {
  dateNotice:
    'Schedule Notice: The organiser has provisionally outlined dates of December 17–19 (3 calendar days), while a 4-day option is under final operational review. Below is the proposed day-by-day retreat sequence.',
  days: [
    {
      day: 1,
      title: 'Arrival & Grounding',
      subtitle: 'Arriving, settling in, and unwinding',
      narrative:
        'Settle into your retreat accommodation, let go of daily responsibilities, and begin with an unhurried opening circle followed by restorative evening movement and breathwork.',
      highlights: [
        'Check-in from 2:00 PM & herbal welcome drink',
        'Opening circle: intentions and retreat orientation',
        'Gentle foundational yoga and breath awareness',
        'Nourishing vegetarian dinner',
        'Restorative Yoga Nidra for restful sleep',
      ],
      timingNote: 'Afternoon check-in from 2:00 PM',
    },
    {
      day: 2,
      title: 'Movement, Breath & Village Discovery',
      subtitle: 'A full day of body awareness, village paths & quiet noticing',
      narrative:
        'Awaken to morning meditation and gentle yoga. After a traditional vegetarian breakfast, engage in reflective cognitive exercises. In the afternoon, discover authentic rural Kerala on a guided village walk.',
      highlights: [
        'Morning meditation & pranayama breathwork',
        'Gentle mobility yoga practice',
        'Traditional vegetarian breakfast',
        'Mindful cognitive exercise: clarity and thought-noticing',
        'Vegetarian lunch and personal quiet rest',
        'Afternoon guided village walking tour',
        'Evening reflection circle & dinner',
        'Restorative Yoga Nidra',
      ],
      timingNote: 'Full retreat day',
    },
    {
      day: 3,
      title: 'Temple Stillness, Reflection & Integration',
      subtitle: 'Cultural heritage, closing reflection, and departure',
      narrative:
        'Experience early-morning stone stillness on a quiet temple visit. Return for breakfast, values reflection, and personal routine integration, concluding with a farewell lunch.',
      highlights: [
        'Morning meditation & gentle breath practice',
        'Respectful morning cultural temple visit',
        'Wholesome vegetarian breakfast',
        'Closing reflection: simple routines to carry home',
        'Farewell vegetarian lunch around 12:00 PM',
        'Departure & return travel (or optional nature drift if 4 days confirmed)',
      ],
      timingNote: 'Check-out around 12:00 PM after lunch',
    },
  ],
}

// 3. Stay, Food & Travel Details
export const stayFoodTravel = {
  stay: {
    title: 'Twin-Sharing Accommodation',
    subtitle: 'Two guests sharing per room',
    description:
      'Guests are accommodated in quiet, comfortable twin-sharing rooms (two people per room) nestled in a serene Kerala sanctuary setting. Specific property arrangements, facilities, and room photographs will be shared directly with guests once the exact venue is finalised.',
    tag: 'Twin-Sharing Standard',
  },
  food: {
    title: 'Pure Vegetarian Meals',
    subtitle: 'Nourishing, traditional Kerala dining',
    description:
      'Pure vegetarian meals are served throughout the retreat — from arrival dinner through farewell lunch. Every meal is freshly prepared using wholesome regional ingredients, complemented by warm drinking water to support digestion and energy.',
    tag: '100% Vegetarian',
  },
  travel: {
    title: 'Travel & Pickup Hub',
    subtitle: 'Kuttipuram Railway Station (Requested Pickup)',
    description:
      'Kuttipuram Railway Station is the designated pickup location requested by the organiser. Detailed pickup timings, meeting points, and coordinated small-group transfer options will be confirmed with registered guests well in advance.',
    tag: 'Kuttipuram Hub',
  },
}

// 4. Investment & Participation
export const investment = {
  price: '₹9,999',
  unit: 'per person',
  statusTag: 'Provisional · Subject to Final Confirmation',
  clarityNote:
    'The provisional fee of ₹9,999 per person is provided by the organiser and will be officially confirmed before reservations open. No payment or deposit is required at this stage.',
  inclusions: [
    'Twin-sharing accommodation for the duration of the retreat',
    'Wholesome vegetarian meals and drinking water throughout',
    'All guided Classical Yoga, Pranayama, and Meditation sessions',
    'Restorative evening Yoga Nidra relaxation',
    'Facilitated cognitive clarity & mindfulness reflection exercises',
    'Guided rural Kerala village walking tour',
    'Morning cultural temple visit (subject to local customs)',
    'A simple take-home wellness and mindfulness routine',
  ],
  participation: {
    ageRange: '18–70 years',
    welcomeNote:
      'Couples and solo travellers are warmly welcomed. The programme is designed for beginners as well as experienced practitioners.',
    familyNote:
      'No separate family package or children’s rate is currently offered; retreat activities are structured for adult participants.',
    surgeryNotice:
      'Important Health Notice: Participants who have recently undergone surgery should contact the organiser before considering registration. Please discuss any relevant mobility or health-related concerns privately with the organiser.',
  },
}

// 5. Compact Essential FAQs for Price & Participation Section
export const compactFaqs = [
  {
    q: 'Is previous yoga or retreat experience required?',
    a: 'No previous experience is needed. All yoga and breath practices are foundational, gentle, and 100% voluntary. You are always welcome to rest, observe, or take personal quiet time.',
  },
  {
    q: 'When will the exact dates and venue be confirmed?',
    a: 'The organiser has provisionally outlined December 17–19. Exact dates and the confirmed Kerala venue will be shared directly with registered enquiry guests before bookings open.',
  },
  {
    q: 'What are the room and meal arrangements?',
    a: 'Accommodation is on a twin-sharing basis (two people per room) in a quiet Kerala retreat setting. Pure vegetarian meals and warm drinking water are provided throughout.',
  },
  {
    q: 'How does the enquiry and booking process work?',
    a: 'Submitting an enquiry is 100% non-binding and carries zero upfront payment or financial commitment. It simply connects you with our team to discuss availability and answer your questions.',
  },
]

