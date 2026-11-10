/**
 * KOOVALAM — CANONICAL RETREAT DATA
 * Single source of truth for retreat content & canonical claims.
 */

// 1. The 7 Client-Specified Activities
export const activities = [
  {
    id: 'yoga',
    title: 'Gentle Classical Yoga',
    tag: 'Movement & Mobility',
    image: 'practice-yoga',
    summary:
      'Foundational movement, mobility, and body awareness designed for all levels. Practiced with gentle guidance and zero strain.',
    highlight: 'Accessible postures · Zero strain · 100% voluntary',
  },
  {
    id: 'pranayama',
    title: 'Pranayama Breathwork',
    tag: 'Breath & Vitality',
    image: 'practice-pranayama',
    summary:
      'Conscious breathing practices designed to steady mental focus, ease tension, and restore natural breath awareness.',
    highlight: 'Natural breath awareness · Ancient balancing rhythms',
  },
  {
    id: 'yoga-nidra',
    title: 'Restorative Yoga Nidra',
    tag: 'Deep Conscious Rest',
    image: 'practice-yoga-nidra',
    summary:
      'Guided yogic sleep practiced comfortably lying down to support deep conscious relaxation and release daily fatigue.',
    highlight: 'Restorative relaxation · Guided body scanning',
  },
  {
    id: 'meditation',
    title: 'Morning Meditation',
    tag: 'Stillness & Presence',
    image: 'practice-meditation',
    summary:
      'Quiet morning sitting and sensory awareness to greet the day with mental stillness and calm presence.',
    highlight: 'Gentle guidance · Unhurried morning presence',
  },
  {
    id: 'cognitive',
    title: 'Cognitive Exercises',
    tag: 'Clarity & Self-Reflection',
    image: 'practice-reflection',
    summary:
      'Mindfulness exercises and reflective journaling for personal clarity and observing daily thought patterns. Non-clinical wellness practice.',
    highlight: 'Mindful mental clarity · Non-clinical reflection',
  },
  {
    id: 'village-tour',
    title: 'Scenic Village Tour',
    tag: 'Cultural Discovery',
    image: 'practice-nature-culture',
    summary:
      'An unhurried guided walking discovery through serene rural Kerala footpaths and green surroundings.',
    highlight: 'Authentic rural Kerala footpaths · Sensory grounding',
  },
  {
    id: 'temple-visit',
    title: 'Historic Temple Visit',
    tag: 'Sacred Heritage',
    image: 'highlight-temple',
    summary:
      'A quiet, respectful visit to a historic regional temple. Guests are requested to respect local customs and temple dress requirements.',
    highlight: 'Contemplative heritage · Respecting local customs',
  },
]

// 2. The Retreat Journey / Itinerary (Proposed sequence pending final confirmation)
export const itineraryData = {
  dateNotice:
    'Dates and programme duration to be confirmed. The client-supplied details (December 17–19 / four-day trip) are under final operational review. The sequence below illustrates the planned retreat practices and activities pending final confirmation of dates and duration by the organiser.',
  days: [
    {
      day: 1,
      title: 'Arrival & Grounding',
      subtitle: 'Arriving, settling in, and unwinding',
      narrative:
        'Settle into your accommodation, unwind from travel, and join the opening orientation circle followed by gentle foundational movement and restorative evening breathwork.',
      highlights: [
        'Afternoon arrival & retreat orientation circle',
        'Gentle foundational yoga and breath awareness',
        'Vegetarian dinner',
        'Restorative Yoga Nidra for restful sleep',
      ],
      timingNote: 'Proposed arrival schedule to be confirmed',
    },
    {
      day: 2,
      title: 'Movement, Breath & Village Discovery',
      subtitle: 'Body awareness, village walking tour & quiet reflection',
      narrative:
        'Morning meditation and gentle yoga practice followed by vegetarian breakfast and reflective cognitive exercises. The afternoon includes a guided village walking tour.',
      highlights: [
        'Morning meditation & pranayama breathwork',
        'Gentle mobility yoga practice',
        'Vegetarian breakfast',
        'Cognitive clarity & mindfulness exercise',
        'Vegetarian lunch & quiet rest',
        'Guided village walking tour',
        'Evening reflection & vegetarian dinner',
        'Restorative Yoga Nidra',
      ],
      timingNote: 'Proposed full retreat day',
    },
    {
      day: 3,
      title: 'Temple Stillness & Integration',
      subtitle: 'Cultural heritage, closing reflection, and conclusion',
      narrative:
        'Morning stillness and a respectful visit to a historic regional temple. Followed by vegetarian breakfast, closing reflection, and concluding vegetarian lunch.',
      highlights: [
        'Morning meditation & gentle breath practice',
        'Respectful cultural temple visit',
        'Vegetarian breakfast',
        'Closing reflection & personal integration',
        'Concluding vegetarian lunch',
        'Departure arrangements to be confirmed',
      ],
      timingNote: 'Proposed conclusion schedule to be confirmed',
    },
  ],
}

// 3. Stay, Food & Travel Details
export const stayFoodTravel = {
  stay: {
    title: 'Twin-Sharing Accommodation',
    subtitle: 'Two guests sharing per room',
    description:
      'Accommodation is arranged on a twin-sharing basis (two guests per room) in Kerala, India. Specific property details, room photographs, and location arrangements will be shared once the venue is confirmed by the organiser.',
    tag: 'Twin-Sharing Standard',
  },
  food: {
    title: 'Vegetarian Meals',
    subtitle: 'Planned retreat dining',
    description:
      'Vegetarian meals are part of the planned retreat experience. Final meal arrangements will be confirmed by the organiser.',
    tag: 'Vegetarian Experience',
  },
  travel: {
    title: 'Pickup & Transport',
    subtitle: 'Requested pickup point: Kuttipuram Railway Station',
    description:
      'Requested pickup point: Kuttipuram Railway Station. Transport coordination details and whether transfer arrangements are included in the retreat package will be confirmed by the organiser.',
    tag: 'Requested Pickup Hub',
  },
}

// 4. Investment & Participation
export const investment = {
  price: '₹9,999',
  unit: 'per person',
  statusTag: 'Provisional · Subject to Confirmation',
  clarityNote:
    'Provisional price: ₹9,999 per person — subject to organiser confirmation. No payment or deposit is required at this stage.',
  inclusions: [
    'Twin-sharing accommodation — two guests per room (planned)',
    'Vegetarian meals as part of the planned retreat experience (arrangements to be confirmed)',
    'Guided Classical Yoga sessions',
    'Guided Pranayama breathwork sessions',
    'Restorative Yoga Nidra sessions',
    'Morning Meditation sessions',
    'Cognitive exercises & mindfulness reflection',
    'Guided village walking tour',
    'Cultural temple visit (respecting local customs)',
  ],
  inclusionNotice:
    'Note: All package inclusions, meal schedules, and transport arrangements are provisional and subject to final confirmation by the organiser.',
  participation: {
    ageRange: '18–70 years (Stated intended participant range, subject to final eligibility confirmation)',
    couplesNote: 'Couples may join.',
    familyNote: 'No family package is offered. Retreat activities are structured for adult participants.',
    surgeryNotice:
      'Important Health Notice: Participants who have recently undergone surgery should contact the organiser before considering registration. Please discuss any mobility or health-related concerns privately with the organiser.',
  },
}

// 5. Compact Essential FAQs
export const compactFaqs = [
  {
    q: 'Is previous yoga or retreat experience required?',
    a: 'No previous experience is needed. All yoga and breath sessions are foundational, gentle, and 100% voluntary. You are always welcome to participate at your own comfort level.',
  },
  {
    q: 'When will the exact dates and venue be confirmed?',
    a: 'Dates and programme duration are to be confirmed by the organiser. The client-supplied details (December 17–19 / four-day trip) are currently under operational review. Confirmed dates and Kerala venue details will be shared once finalised.',
  },
  {
    q: 'What are the stay and meal arrangements?',
    a: 'Accommodation is on a twin-sharing basis (two guests per room) in Kerala, India. Vegetarian meals are part of the planned retreat experience. Final meal arrangements will be confirmed by the organiser.',
  },
  {
    q: 'What is the requested pickup point and is transport included?',
    a: 'The requested pickup point is Kuttipuram Railway Station. Transport coordination details and whether transfer arrangements are included in the retreat package will be confirmed by the organiser.',
  },
]
