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
    ],
  },
  {
    id: 'temples',
    categoryName: 'Sacred Temple Sanctuaries',
    categoryTag: 'Spiritual Heritage · Ancient Pilgrimage',
    categoryDesc:
      'Proposed visit to the historic Tirunelli Temple in Wayanad. Experienced respectfully with quiet contemplation, subject to local customs, temple timings, and organiser confirmation.',
    items: [
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
          'Also known as Thirunelli Maha Vishnu Temple, this ancient stone sanctuary rests in a Wayanad valley beside the Brahmagiri hills—long revered for its ancestral-rite heritage and historical stillness. During this visit, traditional Bali Tharpanam and Pinda Daan rituals for ancestors can be performed.',
        ritualPoint:
          'Bali Tharpanam and Pinda Daan for ancestors can be performed during this sacred temple visit (Optional for interested participants).',
        highlight: 'Brahmagiri valley heritage · Bali Tharpanam and Pinda Daan for ancestors can be performed',
        meta: [
          { label: 'Ancestral Rites', value: 'Bali Tharpanam & Pinda Daan for ancestors can be performed' },
          { label: 'Heritage & Setting', value: 'Ancient stone shrine in Brahmagiri valley' },
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
        kicker: 'Morning Immersion · Rural Kerala',
        pillLabel: 'Rural Footpaths · Greenery',
        image: 'practice-nature-culture',
        hasWebp: true,
        summary:
          'An unhurried guided walking discovery through serene rural Kerala footpaths, palm groves, and lush tropical greenery—inviting gentle movement and peaceful sensory grounding.',
        highlight: 'Authentic rural Kerala footpaths · Sensory grounding',
        meta: [
          { label: 'Pace & Setting', value: 'Unhurried walk · Quiet village lanes' },
          { label: 'Focus', value: 'Sensory grounding & nature immersion' },
        ],
      },
      {
        id: 'cultural-evenings',
        title: 'Traditional Arts & Cultural Evenings',
        tag: 'Classical Indian Performing Arts',
        kicker: 'Evening Gathering · Classical Heritage',
        pillLabel: 'Kathakali · Bharatanatyam · Mohiniyattam · Flute',
        image: 'kathakali-performance',
        hasWebp: false,
        representativeImage: false,
        summary:
          'Experience India’s living classical heritage at dusk—expressive Kathakali, sculptural Bharatanatyam, and Kerala Mohiniyattam recitals accompanied by contemplative bamboo flute melodies.',
        highlight: 'Arranged upon request · Not included in the retreat package',
        gallery: [
          {
            slot: 'kathakali',
            image: 'kathakali-performance',
            kicker: 'Kerala Classical Dance-Drama',
            title: 'Kathakali',
            caption: 'Elaborate facial makeup (Paccha), expressive eye movements & sacred epic storytelling',
          },
          {
            slot: 'bharatanatyam',
            image: 'bharatanatyam-recital',
            kicker: 'Classical Dance',
            title: 'Bharatanatyam',
            caption: 'Sculptural geometry, crisp rhythm & expressive sacred storytelling',
          },
          {
            slot: 'mohiniyattam',
            image: 'mohiniyattam-recital',
            kicker: 'Kerala Heritage Dance',
            title: 'Mohiniyattam',
            caption: 'Fluid lyrical grace & delicate temple-mural movement native to Kerala',
          },
          {
            slot: 'flute',
            image: 'flute-performance',
            kicker: 'Classical Music',
            title: 'Flute Performance',
            caption: 'Evening meditative melodies on traditional Indian bamboo flute',
          },
        ],
        meta: [
          { label: 'Repertoire', value: 'Kathakali, Bharatanatyam, Mohiniyattam & Flute' },
          { label: 'Package Inclusions', value: 'Not included in package · Arranged upon request' },
        ],
      },
    ],
  },
]

// Flat list for easy reference / mapping
export const allActivities = experienceCategories.flatMap((cat) => cat.items)

// 2. The Retreat Journey / Itinerary (December 25–28 · 4 Days / 3 Nights)
export const itineraryData = {
  days: [
    {
      day: 1,
      tabLabel: 'Arrival',
      title: 'Arrival & Welcome',
      subtitle: 'Settle in, connect and begin the retreat journey.',
      narrative:
        'Guest arrival and check-in from 2:30 PM, afternoon tea break, evening welcome ceremony, nourishing dinner, and campfire with guest self-introductions before lights off at 10:30 PM.',
      featuredPills: [
        'Guest Arrival & Check-in',
        'Welcome Ceremony',
        'Campfire & Introductions',
        'Peaceful Rest',
      ],
      schedule: [
        {
          time: '2:30 – 4:00 PM',
          phase: 'AFTERNOON',
          activity: 'Guest Arrival, Check-in & Settling In',
        },
        {
          time: '4:30 – 5:30 PM',
          phase: 'LATE AFTERNOON',
          activity: 'Tea Break',
        },
        {
          time: '6:00 – 7:30 PM',
          phase: 'EVENING',
          activity: 'Welcome Ceremony',
        },
        {
          time: '7:45 – 8:30 PM',
          phase: 'EVENING',
          activity: 'Dinner',
        },
        {
          time: '8:45 – 10:00 PM',
          phase: 'NIGHT',
          activity: 'Campfire & Guest Self-Introduction',
        },
        {
          time: '10:30 PM',
          phase: 'NIGHT',
          activity: 'Lights Off',
        },
      ],
      timingNote: 'Dec 25 · Arrival Day · 2:30 PM to 10:30 PM (Retreat Programme)',
    },
    {
      day: 2,
      tabLabel: 'Body & Breath',
      title: 'Sunrise, Mindfulness & Sacred Practices',
      subtitle: 'Connect with nature, mindful movement, selfless service, breath and inner stillness.',
      narrative:
        'Greet the dawn at 5:00 AM with the Mylaytumala sunrise experience and meditation, gentle yoga, karma yoga, evening pranayama, sacred fire ritual (Havan), dinner, and restorative Yoga Nidra before lights off at 10:30 PM.',
      featuredPills: [
        'Mylaytumala Sunrise & Meditation',
        'Gentle Yoga',
        'Karma Yoga',
        'Havan (Sacred Fire Ritual)',
        'Yoga Nidra',
      ],
      schedule: [
        {
          time: '5:00 – 7:00 AM',
          phase: 'EARLY MORNING',
          activity: 'Mylaytumala Sunrise Experience & Meditation',
        },
        {
          time: '7:00 – 7:45 AM',
          phase: 'MORNING',
          activity: 'Freshen Up',
        },
        {
          time: '8:00 – 9:00 AM',
          phase: 'MORNING',
          activity: 'Breakfast',
        },
        {
          time: '10:00 – 11:30 AM',
          phase: 'LATE MORNING',
          activity: 'Gentle Yoga',
        },
        {
          time: '12:45 – 2:00 PM',
          phase: 'MIDDAY',
          activity: 'Lunch',
        },
        {
          time: '3:00 – 4:00 PM',
          phase: 'AFTERNOON',
          activity: 'Karma Yoga',
        },
        {
          time: '4:30 – 5:00 PM',
          phase: 'LATE AFTERNOON',
          activity: 'Tea Time',
        },
        {
          time: '5:30 – 6:00 PM',
          phase: 'EVENING',
          activity: 'Pranayama',
        },
        {
          time: '6:30 – 7:30 PM',
          phase: 'EVENING',
          activity: 'Havan (Sacred Fire Ritual)',
        },
        {
          time: '7:45 – 8:30 PM',
          phase: 'EVENING',
          activity: 'Dinner',
        },
        {
          time: '9:00 – 10:00 PM',
          phase: 'NIGHT',
          activity: 'Yoga Nidra',
        },
        {
          time: '10:30 PM',
          phase: 'NIGHT',
          activity: 'Lights Off',
        },
      ],
      timingNote: 'Dec 26 · Full Retreat Day · 5:00 AM to 10:30 PM (Retreat Programme)',
    },
    {
      day: 3,
      tabLabel: 'Culture & Nature',
      title: 'Sacred Journey, Nature & Connection',
      subtitle: 'A journey of remembrance, spiritual connection, nature exploration and peaceful bonding.',
      narrative:
        'Early morning journey to Tirunelli Temple with optional ancestral rites, yoga and meditation, afternoon sightseeing of waterfalls, museum and botanical garden, followed by evening pranayama, dinner, and campfire instrumental music.',
      featuredPills: [
        'Tirunelli Temple Visit',
        'Yoga & Meditation',
        'Sightseeing & Waterfalls',
        'Campfire & Live Music',
      ],
      schedule: [
        {
          time: '5:00 – 7:30 AM',
          phase: 'EARLY MORNING',
          activity: 'Tirunelli Temple Visit – Optional Bali Tharpanam / Pinda Daan for Ancestors',
        },
        {
          time: '8:00 – 9:00 AM',
          phase: 'MORNING',
          activity: 'Breakfast',
        },
        {
          time: '10:00 AM – 12:00 PM',
          phase: 'LATE MORNING',
          activity: 'Yoga & Meditation',
        },
        {
          time: '12:45 – 2:00 PM',
          phase: 'MIDDAY',
          activity: 'Lunch',
        },
        {
          time: '2:30 – 6:00 PM',
          phase: 'AFTERNOON',
          activity: 'Sightseeing – Waterfalls, Museum & Botanical Garden',
        },
        {
          time: '6:30 – 7:30 PM',
          phase: 'EVENING',
          activity: 'Pranayama',
        },
        {
          time: '7:45 – 8:30 PM',
          phase: 'EVENING',
          activity: 'Dinner',
        },
        {
          time: '9:00 – 10:00 PM',
          phase: 'NIGHT',
          activity: 'Campfire & Instrumental Music',
        },
        {
          time: '10:30 PM',
          phase: 'NIGHT',
          activity: 'Lights Off',
        },
      ],
      timingNote: 'Dec 27 · Full Retreat Day · 5:00 AM to 10:30 PM (Retreat Programme)',
    },
    {
      day: 4,
      tabLabel: 'Integration',
      title: 'Nature, Reflection & Farewell',
      subtitle: 'Reconnect with nature, reflect on the journey and carry the retreat experience into everyday life.',
      narrative:
        'Begin with an early morning guided walk through tea, pepper, and coffee plantations, followed by breakfast, pranayama and meditation, closing circle and reflection, check-out at 12:30 PM, farewell lunch, and pack-up and departure from 2:00 PM onwards.',
      featuredPills: [
        'Guided Plantation Walk',
        'Pranayama & Meditation',
        'Closing Circle & Reflection',
        'Pack-up & Departure',
      ],
      schedule: [
        {
          time: '5:30 – 7:30 AM',
          phase: 'EARLY MORNING',
          activity: 'Guided Plantation Walk – Tea, Pepper & Coffee Plantation',
        },
        {
          time: '8:00 – 9:00 AM',
          phase: 'MORNING',
          activity: 'Breakfast',
        },
        {
          time: '9:30 – 10:30 AM',
          phase: 'MORNING',
          activity: 'Pranayama & Meditation',
        },
        {
          time: '11:00 AM – 12:00 PM',
          phase: 'LATE MORNING',
          activity: 'Closing Circle & Reflection',
        },
        {
          time: '12:30 PM',
          phase: 'MIDDAY',
          activity: 'Check-out',
        },
        {
          time: '12:45 – 2:00 PM',
          phase: 'MIDDAY',
          activity: 'Lunch',
        },
        {
          time: '2:00 PM onwards',
          phase: 'AFTERNOON',
          activity: 'Pack-up & Departure',
        },
      ],
      timingNote: 'Dec 28 · Farewell Day · 5:30 AM to 2:00 PM onwards (Retreat Programme)',
    },
  ],
}

// 3. Stay, Food & Travel Details
export const stayFoodTravel = {
  stay: {
    title: 'Single & Double Occupancy',
    subtitle: 'Private & twin-sharing options',
    description:
      'Peaceful, nature-facing accommodation in Wayanad with relaxing open verandas and shared pavilions for mindful rest between daily sessions.',
    tag: 'Single & Twin Options',
  },
  food: {
    title: 'Vegetarian Meals',
    subtitle: 'Wholesome retreat dining',
    description:
      'Nutritious vegetarian meals freshly prepared with local Kerala ingredients, served unhurriedly in the scenic open forest-view dining pavilion.',
    tag: 'Vegetarian Experience',
  },
  travel: {
    title: 'Pickup & Transport',
    subtitle: 'Station & airport connectivity',
    description:
      'Convenient road connectivity and transfer coordination for guests arriving in Wayanad, with organised pickup schedules confirmed prior to arrival.',
    tag: 'Requested Pickup Hub',
  },
}

// 4. Investment & Participation
export const investment = {
  price: '₹17,999',
  doublePrice: '₹17,999',
  singlePrice: '₹26,999',
  unit: 'per person',
  statusTag: 'Confirmed Investment Tiers',
  clarityNote:
    'Double Occupancy: ₹17,999 per person · Single Occupancy: ₹26,999 per person. Experience four days of mindful living, connection, relaxation and self-discovery in the serene landscapes of Wayanad.',
  tiers: [
    {
      name: 'Double Occupancy',
      tag: 'Twin-Sharing',
      price: '₹17,999',
      unit: 'per person',
      desc: 'Two guests sharing a spacious room with twin beds',
    },
    {
      name: 'Single Occupancy',
      tag: 'Private Room',
      price: '₹26,999',
      unit: 'per person',
      desc: 'Dedicated private room for one guest',
    },
  ],
  inclusions: [
    '3 nights accommodation in Wayanad — choice of Double (Twin-Sharing) or Single (Private Room)',
    'Wholesome, locally prepared vegetarian meals & drinking water throughout',
    'All scheduled yoga, pranayama, meditation and Yoga Nidra sessions',
    'Facilitated mindfulness, reflection & guided journaling activities',
    'Guided plantation walk, waterfalls sightseeing, and heritage temple excursion',
    'Simple take-home wellness routine and participant reflection sheet',
    'Evening campfire gatherings and instrumental music experience',
  ],
  participation: {
    ageRange: '18–60 years (Stated intended participant range, subject to final eligibility confirmation)',
    couplesNote: 'Couples, solo travelers, and friends may join with flexible room options.',
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
    a: 'The retreat is confirmed for December 25–28 (4 days / 3 nights, 2:30 PM check-in on Dec 25 through 2:00 PM onwards departure on Dec 28) in Wayanad, Kerala. Exact property details, facilitators and operational timings will be confirmed by the organiser prior to booking.',
  },
  {
    q: 'What are the stay and meal arrangements?',
    a: 'Accommodation is available in both Double Occupancy (Twin-Sharing at ₹17,999 per person) and Single Occupancy (Private Room at ₹26,999 per person) for 3 nights in Wayanad, Kerala. Vegetarian meals and drinking water are included throughout the retreat.',
  },
  {
    q: 'Are the temple visits and cultural performances included?',
    a: 'The Tirunelli Temple excursion is part of the retreat schedule (100% voluntary). Classical dances and cultural performances (Kathakali, Bharatanatyam, Mohiniyattam, and Flute) are not included in the standard retreat package and can be arranged upon guest request.',
  },
]
