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
    id: 'sightseeing',
    categoryName: 'Wayanad Sightseeing & Nature Expeditions',
    categoryTag: 'Sunrise · Waterfalls · Tribal Heritage · Botanical Sanctuary · Plantations',
    categoryDesc:
      'Immerse in Wayanad’s untouched highland beauty—from dawn breaking across an ethereal sea of clouds atop Mylattumala to cascading rainforest waterfalls, indigenous tribal heritage, and ancient botanical gardens.',
    items: [
      {
        id: 'mylattumala-sunrise',
        title: 'Mylattumala Sunrise Experience & Meditation',
        tag: 'Wayanad · Dawn Above the Clouds',
        kicker: 'Hilltop Sunrise · Sea of Clouds',
        pillLabel: 'Mylattumala Hill · Wayanad',
        image: 'mylattumala-sunrise',
        summary:
          'Ascend to the panoramic Mylattumala viewpoint rising directly above Oxyfarm Resorts. Greet the golden dawn breaking across an ethereal sea of rolling clouds, followed by guided morning meditation in nature’s serene silence.',
        highlight: 'Sea of clouds dawn view · Guided hilltop meditation · Right above the resort',
        meta: [
          { label: 'Setting & Altitude', value: 'Panoramic misty hilltop overlooking Wayanad valley' },
          { label: 'Schedule', value: 'Day 02 Early Morning (5:00 AM – 7:00 AM)' },
        ],
      },
      {
        id: 'makkiyad-waterfall',
        title: 'Makkiyad Meenmutty Waterfall',
        tag: 'Mananthavady · Forest Cascade',
        kicker: 'Sightseeing Destination · Waterfalls',
        pillLabel: 'Makkiyad Meenmutty · Natural Pool',
        image: 'makkiyad-meenmutty-waterfall',
        summary:
          'A secluded multi-tiered natural waterfall cascading down dramatic rock cliffs into refreshing natural pools framed by dense Western Ghats rainforest canopy and pristine wilderness.',
        highlight: 'Pristine forest cascade · Natural rock pools · Dense rainforest setting',
        meta: [
          { label: 'Location', value: 'Makkiyad near Mananthavady, Wayanad' },
          { label: 'Excursion', value: 'Day 03 Afternoon Sightseeing (2:30 PM – 6:00 PM)' },
        ],
      },
      {
        id: 'kunkichira-museum',
        title: 'Kunkichira Tribal Heritage Museum',
        tag: 'Indigenous Culture · Living Traditions',
        kicker: 'Sightseeing Destination · Tribal Museum',
        pillLabel: 'Kunkichira · Wayanad Tribal Heritage',
        image: 'kunkichira-tribal-museum',
        summary:
          'Explore the profound living history and indigenous wisdom of Wayanad’s native tribal communities. The museum showcases traditional ancestral dwellings, handcrafted tools, folklore, and centuries of living in harmony with nature.',
        highlight: 'Authentic tribal architecture · Indigenous artifacts · Cultural heritage',
        meta: [
          { label: 'Focus', value: 'Wayanad tribal traditions, craftsmanship & history' },
          { label: 'Excursion', value: 'Day 03 Afternoon Sightseeing (2:30 PM – 6:00 PM)' },
        ],
      },
      {
        id: 'gurukula-sanctuary',
        title: 'Gurukula Botanical Sanctuary',
        tag: 'Western Ghats Flora · Rare Ferns & Orchids',
        kicker: 'Sightseeing Destination · Botanical Sanctuary',
        pillLabel: 'Gurukula Sanctuary · Conservation Garden',
        image: 'gurukula-botanical-sanctuary',
        summary:
          'An internationally acclaimed 55-acre conservation sanctuary dedicated to saving the native flora of the Western Ghats. Walk through micro-climates of rare native orchids, prehistoric ferns, moss canopies, and tropical plant species.',
        highlight: '55-acre native rainforest garden · Rare orchids & ferns · Global conservation landmark',
        meta: [
          { label: 'Conservation', value: 'Native Western Ghats endemic plant sanctuary' },
          { label: 'Excursion', value: 'Day 03 Afternoon Sightseeing (2:30 PM – 6:00 PM)' },
        ],
      },
      {
        id: 'plantation-walk',
        title: 'Guided Plantation Walk (Coffee & Tea Estate)',
        tag: 'Spice & Estate Trails · Fresh Mountain Air',
        kicker: 'Morning Walk · Estate Immersion',
        pillLabel: 'Coffee, Tea & Pepper Estates',
        image: 'tea-plantation-walk',
        hasWebp: false,
        summary:
          'An invigorating morning sensory trail through flourishing tea, coffee, and pepper plantations surrounding the sanctuary. Learn about traditional spice and crop cultivation while walking unhurriedly in fresh mountain greenery.',
        highlight: 'Aromatic coffee & tea trails · Fresh woodland air · Sensory nature connection',
        meta: [
          { label: 'Setting', value: 'Organic coffee, tea & black pepper plantation hills' },
          { label: 'Schedule', value: 'Day 04 Early Morning (5:30 AM – 7:30 AM)' },
        ],
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
      title: 'Mylattumala Sunrise, Mindfulness & Sacred Practices',
      subtitle: 'Connect with nature, mindful movement, selfless service, breath and inner stillness.',
      narrative:
        'Greet the dawn at 5:00 AM with the breathtaking Mylattumala sunrise experience and meditation above the sea of clouds, gentle yoga, karma yoga, evening pranayama, sacred fire ritual (Havan), dinner, and restorative Yoga Nidra before lights off at 10:30 PM.',
      featuredPills: [
        'Mylattumala Sunrise & Meditation',
        'Gentle Yoga',
        'Karma Yoga',
        'Havan (Sacred Fire Ritual)',
        'Yoga Nidra',
      ],
      schedule: [
        {
          time: '5:00 – 7:00 AM',
          phase: 'EARLY MORNING',
          activity: 'Mylattumala Sunrise Experience & Meditation (Wayanad)',
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
      title: 'Sacred Journey, Sightseeing & Connection',
      subtitle: 'A journey of remembrance, spiritual connection, nature exploration and peaceful bonding.',
      narrative:
        'Early morning sacred journey to Tirunelli Temple with optional ancestral rites (Bali Tharpanam / Pinda Daan), yoga and meditation, afternoon sightseeing of Makkiyad Meenmutty Waterfall, Kunkichira Tribal Museum, and Gurukula Botanical Sanctuary, followed by evening pranayama, dinner, and campfire instrumental music.',
      featuredPills: [
        'Tirunelli Temple Visit',
        'Yoga & Meditation',
        'Makkiyad Meenmutty Waterfall',
        'Kunkichira Tribal Museum & Gurukula Sanctuary',
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
          activity: 'Sightseeing: Makkiyad Meenmutty Waterfall, Kunkichira Tribal Museum & Gurukula Botanical Sanctuary',
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
      title: 'Plantation Walk, Reflection & Farewell',
      subtitle: 'Reconnect with nature, reflect on the journey and carry the retreat experience into everyday life.',
      narrative:
        'Begin with an early morning guided walk through tea, pepper, and coffee plantations, followed by breakfast, pranayama and meditation, closing circle and reflection, check-out at 12:30 PM, farewell lunch, and pack-up and departure from 2:00 PM onwards.',
      featuredPills: [
        'Guided Plantation Walk (Coffee & Tea Estate)',
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
    title: 'Stay at Oxyfarm Resorts',
    subtitle: 'Private & twin-sharing options',
    description:
      'Peaceful eco-cottage accommodation nestled in Wayanad’s misty hills. Relax on private verandas, stroll garden paths, and rest deeply between mindful daily sessions.',
    tag: 'Single & Twin Options',
    resortName: 'Oxyfarm Resorts',
    location: 'Mylattumala, Wayanad, Kerala',
    address: 'Mylattumala, Alattil P.O., Thalapuzha via, Mananthavady, Wayanad, Kerala — 670644',
    website: 'https://www.oxyfarmresorts.com/',
    googleMapsUrl: 'https://maps.app.goo.gl/pqxBp6FtidViJ6RSA?g_st=ac',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=Oxyfarm+Resorts,+Mylattumala,+Wayanad&t=&z=14&ie=UTF8&iwloc=&output=embed',
  },
  food: {
    title: 'Vegetarian Meals',
    subtitle: 'Wholesome retreat dining',
    description:
      'Nutritious vegetarian meals freshly prepared with locally sourced Kerala ingredients, served unhurriedly in the scenic open forest-view dining pavilion at Oxyfarm.',
    tag: 'Vegetarian Experience',
  },
  travel: {
    title: 'Getting Here & Pick-up',
    subtitle: 'Nearest transit connectivity',
    description:
      'Convenient travel connectivity to Oxyfarm Resorts in Wayanad via scenic hill roads. Private taxi transfers from nearby transit hubs can be arranged on request.',
    tag: 'Arranged on Request',
    nearestAirport: 'Kannur International Airport (CNN)',
    nearestRailway: 'Thalassery Railway Station',
    nearestBusStop: 'Mananthavady Bus Stop',
    pickupNotice:
      'Pick-up is not included in the package. If requested from Kannur Airport, Thalassery Railway Station, or Mananthavady Bus Stop, it can be arranged on request.',
    nearbyLandmarks: [
      { name: 'Gurukula Botanical Sanctuary', distance: '2 km' },
      { name: 'Periya', distance: '3 km' },
      { name: 'Komachi Park', distance: '8 km' },
      { name: 'Muneeswaran Kunnu', distance: '15 km' },
    ],
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
    '3 nights accommodation at Oxyfarm Resorts, Wayanad — choice of Double (Twin-Sharing) or Single (Private Room)',
    'Wholesome, locally prepared vegetarian meals & drinking water throughout',
    'All scheduled yoga, pranayama, meditation and Yoga Nidra sessions',
    'Mylattumala sunrise experience and hilltop morning meditation above the clouds',
    'Curated afternoon sightseeing: Makkiyad Meenmutty Waterfall, Kunkichira Tribal Museum & Gurukula Botanical Sanctuary',
    'Guided early morning plantation walk through coffee, tea, and pepper estates',
    'Sacred Tirunelli Temple excursion with optional Bali Tharpanam / Pinda Daan for ancestors',
    'Facilitated mindfulness, reflection & guided journaling activities',
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
    q: 'What are the retreat dates and venue, and how do I reach it?',
    a: 'The retreat is confirmed for December 25–28 at Oxyfarm Resorts in Mylattumala, Wayanad, Kerala. The nearest hubs are Kannur International Airport (CNN), Thalassery Railway Station, and Mananthavady Bus Stop. Pick-up is not included in the retreat package, but transfers from these locations can be arranged upon request.',
  },
  {
    q: 'What are the stay and meal arrangements?',
    a: 'Accommodation is provided at Oxyfarm Resorts, Wayanad in both Double Occupancy (Twin-Sharing at ₹17,999 per person) and Single Occupancy (Private Room at ₹26,999 per person) for 3 nights. Freshly prepared vegetarian meals and herbal drinking water are included throughout.',
  },
  {
    q: 'Are the temple visits and cultural performances included?',
    a: 'The Tirunelli Temple excursion is part of the retreat schedule (100% voluntary). Classical dances and cultural performances (Kathakali, Bharatanatyam, Mohiniyattam, and Flute) are not included in the standard retreat package and can be arranged upon guest request.',
  },
]
