/**
 * KOOVALAM — CANONICAL RETREAT DATA
 * Single source of truth for retreat experiences, itinerary, and canonical claims.
 */

// 1. Organised Experience Categories
export const experienceCategories = [
  {
    id: 'practices',
    categoryName: 'Yoga & Mindful Practices',
    categoryTag: 'Movement · Breath · Presence',
    categoryDesc:
      'Gentle classical practices rooted in traditional Indian wisdom, guided with care and zero physical strain. 100% voluntary.',
    items: [
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
    ],
  },
  {
    id: 'temples',
    categoryName: 'Sacred Temple Visits',
    categoryTag: 'Spiritual Heritage · Contemplative Quiet',
    categoryDesc:
      'Proposed visits to two historic Kerala pilgrimage sites. Experienced respectfully with quiet contemplation. Access to specific shrines, festivals, or rituals is subject to organiser confirmation and temple customs.',
    items: [
      {
        id: 'kottiyoor-temple',
        title: 'Kottiyoor Temple',
        tag: 'Kannur District · Shiva Pilgrimage Heritage',
        kicker: 'Kannur District · Shiva Pilgrimage',
        pillLabel: 'Kannur · Western Ghats',
        image: 'kottiyoor-ikkare',
        gallery: [
          {
            slot: 'ikkare',
            image: 'kottiyoor-ikkare',
            label: 'Ikkare Shrine',
            captionTitle: 'Ikkare Kottiyoor Shrine',
            location: 'Kannur · Laterite & Timber Sanctuary',
          },
          {
            slot: 'walkway',
            image: 'kottiyoor-walkway',
            label: 'Forest Path',
            captionTitle: 'Sacred Woodland Approach',
            location: 'Kannur · Shaded Canopy Path',
          },
          {
            slot: 'akkare',
            image: 'kottiyoor-akkare',
            label: 'Akkare Riverside',
            captionTitle: 'Akkare Riverside Sanctuary',
            location: 'Kannur · Bavali Stream & Western Ghats',
          },
        ],
        representativeImage: false,
        summary:
          'A significant Shiva pilgrimage destination set amidst the serene forests of the Western Ghats in Kannur. Encompassing the permanent timber-and-laterite Ikkare shrine, its forest canopy walkway, and the riverside Akkare sanctuary, it invites peaceful presence.',
        highlight: 'Historic Shiva pilgrimage · Subject to temple calendar & organiser confirmation',
        meta: [
          { label: 'Sanctuary & Setting', value: 'Ikkare shrine & Akkare riverside forest grove' },
          { label: 'Visiting Scope', value: 'Seasonal temple calendar & organiser confirmation' },
        ],
      },
      {
        id: 'tirunelli-temple',
        title: 'Tirunelli Temple',
        tag: 'Wayanad · Ancient Vishnu Pilgrimage',
        kicker: 'Wayanad · Ancient Vishnu Sanctuary',
        pillLabel: 'Wayanad · Brahmagiri Hills',
        image: 'tirunelli-valley',
        galleryLayout: 'landscape-top',
        gallery: [
          {
            slot: 'valley',
            image: 'tirunelli-valley',
            label: 'Brahmagiri Valley Setting',
          },
          {
            slot: 'courtyard',
            image: 'tirunelli-courtyard',
            label: 'Nalambalam & Sreekovil',
          },
          {
            slot: 'sanctum',
            image: 'highlight-tirunelli',
            label: 'Stone Sanctuary',
          },
        ],
        representativeImage: false,
        summary:
          'Also known as Thirunelli Maha Vishnu Temple, this ancient stone sanctuary rests in a Wayanad valley beside the Brahmagiri hills—long revered for its ancestral-rite heritage and historical stillness.',
        highlight: 'Brahmagiri valley heritage · Revered ancestral-rite traditions respectfully introduced',
        meta: [
          { label: 'Heritage', value: 'Ancient stone shrine & ancestral-rite traditions' },
          { label: 'Participation', value: 'Historical contemplation · No spiritual outcomes guaranteed' },
        ],
      },
    ],
  },
  {
    id: 'culture',
    categoryName: 'Kerala Cultural Experiences',
    categoryTag: 'Living Traditions · Classical Arts',
    categoryDesc:
      'Immerse in Kerala’s living culture through serene village nature walks and proposed classical arts performances.',
    items: [
      {
        id: 'village-tour',
        title: 'Scenic Village Tour',
        tag: 'Rural Footpaths · Greenery',
        image: 'practice-nature-culture',
        summary:
          'An unhurried guided walking discovery through serene rural Kerala footpaths and green surroundings.',
        highlight: 'Authentic rural Kerala footpaths · Sensory grounding',
      },
      {
        id: 'cultural-evenings',
        title: 'Traditional Arts & Cultural Evenings',
        tag: 'Classical Indian Performing Arts',
        image: 'natural-living',
        representativeImage: true,
        summary:
          "Experience the richness of India's classical arts through traditional flute music and graceful dance performances, including Bharatanatyam and Mohiniyattam. Proposed cultural evenings are subject to organiser confirmation and performer availability.",
        highlight: 'Traditional flute, Bharatanatyam & Mohiniyattam · Subject to artist availability',
      },
    ],
  },
]

// Flat list for easy reference / mapping
export const allActivities = experienceCategories.flatMap((cat) => cat.items)

// 2. The Retreat Journey / Itinerary (December 17–20 · 4 Days / 3 Nights)
export const itineraryData = {
  dateNotice:
    'Confirmed retreat dates: December 17–20 (4 days / 3 nights, 2:00 PM check-in on Dec 17 through 12:00 PM departure on Dec 20). The sample schedule below follows a calm progression; exact venue and minor session timings adapt to seasonal temple customs and river conditions.',
  logisticsNotice: {
    heading: 'Operational & Safety Review: Excursions & Cultural Arts',
    text:
      'Temple visits (including proposed Kottiyoor & Tirunelli visits subject to local customs and timings), the off-site Nila River boat safari (strictly subject to permissions, seasonal weather, licensed boat operator and life-jacket safety protocols), and evening cultural performances (traditional flute, Bharatanatyam, Mohiniyattam) are subject to final organiser confirmation.',
  },
  proposedHighlightsUnderReview: [
    {
      name: 'Kottiyoor Temple Visit',
      region: 'Kannur District',
      status: 'Proposed · Subject to local customs, seasonal shrine timings & travel feasibility',
    },
    {
      name: 'Tirunelli Temple Visit',
      region: 'Wayanad District',
      status: 'Proposed · Subject to inter-district timing & organiser confirmation',
    },
    {
      name: 'Nila River Boat Safari',
      region: 'Nature Excursion',
      status: 'Day 3 afternoon sample · Subject to permissions, weather & licensed safe boat operation',
    },
    {
      name: 'Traditional Flute & Classical Dance',
      genre: 'Cultural Evenings',
      status: 'Bharatanatyam / Mohiniyattam & flute · Subject to artist availability & confirmation',
    },
  ],
  days: [
    {
      day: 1,
      tabLabel: 'Arrival',
      title: 'Arrival & Grounding',
      subtitle: 'Welcome drink, orientation circle & evening Yoga Nidra',
      narrative:
        'Check in from 2:00 PM onwards, settle into your surroundings with a welcome drink, meet fellow guests in the opening circle, and ease into gentle foundational yoga, breathwork and restful Yoga Nidra.',
      featuredPills: [
        'Welcome & Orientation',
        'Gentle Yoga & Mobility',
        'Foundational Pranayama',
        'Restorative Yoga Nidra',
      ],
      schedule: [
        {
          time: '2:00 – 3:30 PM',
          phase: 'AFTERNOON',
          activity: 'Arrival, welcome drink, check-in and settling in',
        },
        {
          time: '3:30 – 4:15 PM',
          phase: 'AFTERNOON',
          activity: 'Opening circle: introductions, intentions and retreat guidelines',
        },
        {
          time: '4:30 – 5:30 PM',
          phase: 'LATE AFTERNOON',
          activity: 'Gentle yoga and body-awareness practice',
        },
        {
          time: '5:45 – 6:15 PM',
          phase: 'EVENING',
          activity: 'Foundational pranayama: natural breathing and alternate-nostril breathing, as appropriate',
        },
        {
          time: '6:30 – 7:00 PM',
          phase: 'EVENING',
          activity: 'Guided meditation: arriving in the present moment',
        },
        {
          time: '7:30 PM',
          phase: 'EVENING',
          activity: 'Vegetarian dinner and quiet personal time',
        },
        {
          time: '8:30 – 9:00 PM',
          phase: 'NIGHT',
          activity: 'Yoga Nidra: deep relaxation and rest',
        },
      ],
      timingNote: 'Dec 17 · Arrival Day · 2:00 PM to 9:00 PM (Sample schedule)',
    },
    {
      day: 2,
      tabLabel: 'Body & Breath',
      title: 'Body, Breath & Inner Awareness',
      subtitle: 'Morning meditation, mindfulness practices & sensory nature walk',
      narrative:
        'Begin at 6:30 AM with silent sitting, mobility yoga, and pranayama, followed by breakfast, reflective mindfulness & journaling exercises, midday rest, an afternoon sensory nature walk, and evening Yoga Nidra.',
      featuredPills: [
        'Morning Meditation & Yoga',
        'Cognitive Mindfulness',
        'Guided Journaling',
        'Sensory Nature Walk',
      ],
      schedule: [
        {
          time: '6:30 – 7:00 AM',
          phase: 'MORNING',
          activity: 'Silent sitting and gentle morning meditation',
        },
        {
          time: '7:00 – 8:00 AM',
          phase: 'MORNING',
          activity: 'Yoga practice: mobility, grounding and mindful movement',
        },
        {
          time: '8:00 – 8:30 AM',
          phase: 'MORNING',
          activity: 'Pranayama practice',
        },
        {
          time: '8:30 – 9:30 AM',
          phase: 'MORNING',
          activity: 'Vegetarian breakfast',
        },
        {
          time: '10:00 – 11:15 AM',
          phase: 'LATE MORNING',
          activity: 'Mindfulness and cognitive practices: noticing thoughts, emotions and habitual responses',
        },
        {
          time: '11:30 AM – 12:15 PM',
          phase: 'LATE MORNING',
          activity: 'Guided journaling: personal strengths, values and supportive beliefs',
        },
        {
          time: '12:30 PM',
          phase: 'MIDDAY',
          activity: 'Vegetarian lunch and quiet rest',
        },
        {
          time: '4:00 – 5:00 PM',
          phase: 'AFTERNOON',
          activity: 'Nature walk / mindful observation and sensory grounding',
        },
        {
          time: '5:15 – 6:00 PM',
          phase: 'EVENING',
          activity: 'Meditation: self-compassion and emotional awareness',
        },
        {
          time: '7:00 PM',
          phase: 'EVENING',
          activity: 'Vegetarian dinner',
        },
        {
          time: '8:15 – 8:45 PM',
          phase: 'NIGHT',
          activity: 'Yoga Nidra: guided conscious rest',
        },
      ],
      timingNote: 'Dec 18 · Full Retreat Day · 6:30 AM to 8:45 PM (Sample schedule)',
    },
    {
      day: 3,
      tabLabel: 'Culture & Nature',
      title: 'Culture, Nature & Reflection',
      subtitle: 'Morning temple visit, afternoon Nila River safari & gratitude circle',
      narrative:
        'Greet the morning with meditation, gentle yoga and breakfast before a quiet cultural temple visit (subject to local customs & timings), restful lunch, an afternoon Nila River boat safari (conditions permitting), and an evening reflection circle.',
      featuredPills: [
        'Morning Yoga & Breath',
        'Sacred Temple Visit',
        'Nila River Boat Safari',
        'Evening Reflection Circle',
      ],
      schedule: [
        {
          time: '6:30 – 7:00 AM',
          phase: 'MORNING',
          activity: 'Morning meditation',
        },
        {
          time: '7:00 – 8:00 AM',
          phase: 'MORNING',
          activity: 'Gentle yoga and pranayama',
        },
        {
          time: '8:00 – 9:00 AM',
          phase: 'MORNING',
          activity: 'Vegetarian breakfast',
        },
        {
          time: '9:30 AM – 12:00 PM',
          phase: 'LATE MORNING',
          activity: 'Temple visit: a quiet cultural and spiritual experience (subject to local customs and timings)',
        },
        {
          time: '12:30 PM',
          phase: 'MIDDAY',
          activity: 'Vegetarian lunch and rest',
        },
        {
          time: '3:00 – 5:00 PM',
          phase: 'AFTERNOON',
          activity: 'Nila River boat safari: mindful nature experience, subject to weather and safe operating conditions',
        },
        {
          time: '5:30 – 6:15 PM',
          phase: 'EVENING',
          activity: 'Reflection circle: gratitude, connection and insights from the day',
        },
        {
          time: '7:00 PM',
          phase: 'EVENING',
          activity: 'Vegetarian dinner',
        },
        {
          time: '8:15 – 8:45 PM',
          phase: 'NIGHT',
          activity: 'Restorative relaxation / Yoga Nidra',
        },
      ],
      timingNote: 'Dec 19 · Full Retreat Day · 6:30 AM to 8:45 PM (Sample schedule)',
    },
    {
      day: 4,
      tabLabel: 'Integration',
      title: 'Integration & Closing',
      subtitle: 'Morning meditation, yoga, optional ice bath & closing circle',
      narrative:
        'A calm concluding morning of quiet meditation, intention setting, closing yoga, and an optional guided ice bath session before breakfast, followed by an integration workshop to build a simple personal wellness routine, optional closing sharing, and lunch before departure.',
      featuredPills: [
        'Quiet Morning Meditation',
        'Closing Yoga & Breath',
        'Optional Morning Ice Bath',
        'Integration & Closing Circle',
      ],
      schedule: [
        {
          time: '6:30 – 7:00 AM',
          phase: 'MORNING',
          activity: 'Quiet meditation and intention setting',
        },
        {
          time: '7:00 – 8:00 AM',
          phase: 'MORNING',
          activity: 'Closing yoga and breath practice',
        },
        {
          time: '8:00 – 8:30 AM',
          phase: 'MORNING',
          activity: 'Optional guided ice bath session (mindful cold immersion, subject to personal comfort)',
        },
        {
          time: '8:30 – 9:15 AM',
          phase: 'MORNING',
          activity: 'Vegetarian breakfast',
        },
        {
          time: '9:30 – 10:45 AM',
          phase: 'LATE MORNING',
          activity: 'Integration workshop: identifying helpful habits and creating a simple personal wellness routine',
        },
        {
          time: '10:45 – 11:30 AM',
          phase: 'LATE MORNING',
          activity: 'Closing circle, sharing (optional) and feedback',
        },
        {
          time: '12:00 PM',
          phase: 'MIDDAY',
          activity: 'Vegetarian lunch, check-out and departure',
        },
      ],
      timingNote: 'Dec 20 · Closing Day · 6:30 AM to 12:00 PM (Sample schedule)',
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
    '3 nights twin-sharing accommodation — two guests per room (Dec 17–20)',
    'Vegetarian meals & drinking water (final catering arrangements to be confirmed)',
    'All scheduled yoga, pranayama, meditation and Yoga Nidra sessions',
    'Facilitated mindfulness, cognitive reflection & guided journaling activities',
    'Simple take-home wellness routine and participant reflection sheet',
    'Mindful nature walk and sensory grounding',
  ],
  inclusionNotice:
    'Note: Temple visits (including proposed Kottiyoor & Tirunelli visits), pooja arrangements, Nila River boat safari (strictly subject to permissions, weather & licensed safe boat operation), traditional arts performances (flute music, Bharatanatyam, Mohiniyattam), and station pickup transport are subject to operational confirmation prior to booking.',
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
    q: 'What are the retreat dates and when will the venue be confirmed?',
    a: 'The retreat is confirmed for December 17–20 (4 days / 3 nights, 2:00 PM check-in on Dec 17 through 12:00 PM departure on Dec 20). Exact venue details in Kerala, facilitators and operational timings will be confirmed by the organiser prior to booking.',
  },
  {
    q: 'What are the stay and meal arrangements?',
    a: 'Accommodation is on a twin-sharing basis (two guests per room) for 3 nights in Kerala, India. Vegetarian meals and drinking water are planned as part of the retreat, with final arrangements confirmed by the organiser.',
  },
  {
    q: 'Are the temple visits, Nila River boat safari and cultural performances included?',
    a: 'Temple visits (subject to local customs and timings), the Nila River boat safari (subject to weather, permissions and safe operating conditions), and classical performances (flute, Bharatanatyam / Mohiniyattam) are subject to operational feasibility and artist availability prior to confirmation.',
  },
]
