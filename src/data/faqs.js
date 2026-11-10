/**
 * Chapter 07: Frequently Asked Questions
 * Canonical retreat data organized into 6 essential categories.
 */

export const faqCategories = [
  {
    id: 'location',
    number: '01',
    title: 'Retreat & Location',
    tagline: 'Setting, geography and duration',
    questions: [
      {
        q: 'Where is the retreat located?',
        a: 'The retreat is held in the calm natural landscape of Kerala, India. The exact venue and serene property setting are currently being confirmed and will be shared transparently before bookings open.',
      },
      {
        q: 'How long is the retreat?',
        a: 'The retreat spans four days and three nights (4 days · 3 nights), beginning with arrival and settling in from 2:00 PM on Day 01 and concluding after our closing circle and farewell lunch around 12:00 PM on Day 04.',
      },
      {
        q: 'When will the exact venue be announced?',
        a: 'The exact venue in Kerala will be announced alongside confirmed retreat dates. Registered early-interest guests will receive the property details, surroundings, and arrival guidance before public release.',
      },
    ],
  },
  {
    id: 'stay-meals',
    number: '02',
    title: 'Accommodation & Meals',
    tagline: 'Rooms, vegetarian dining and dietary care',
    questions: [
      {
        q: 'What accommodation is provided?',
        a: 'Three nights of quiet retreat accommodation in Kerala are included as part of your retreat fee. Because the exact venue is still to be confirmed, specific room configurations and property facilities will be shared transparently before any booking is made.',
      },
      {
        q: 'Are meals vegetarian?',
        a: 'Yes. All meals provided during the retreat are wholesome vegetarian dishes, prepared fresh locally with regional care, and accompanied by drinking water throughout your stay.',
      },
      {
        q: 'Which meals are included?',
        a: 'Meals are included according to the canonical retreat schedule: a welcome drink and dinner on arrival Day 01 (from 2:00 PM); full-day meals (breakfast, lunch, and dinner) on Days 02 and 03; and breakfast and farewell lunch prior to departure on Day 04 (~12:00 PM). Drinking water is provided throughout all four days.',
      },
      {
        q: 'Can dietary requirements and allergies be communicated in advance?',
        a: 'Yes. Please share any dietary needs, allergies, or health considerations privately with us before arrival so we can do our best to confirm what can be accommodated within the retreat arrangements.',
      },
    ],
  },
  {
    id: 'practices',
    number: '03',
    title: 'Yoga & Daily Practices',
    tagline: 'Gentle movement, breathwork and beginner welcoming',
    questions: [
      {
        q: 'Is previous yoga experience required?',
        a: 'No previous experience is required. All practices are gentle, foundational, and unhurried, designed to loosen physical stiffness and calm the breath regardless of flexibility or prior experience.',
      },
      {
        q: 'Are all practices compulsory?',
        a: 'Not at all. Every session, movement practice, and reflection circle is completely voluntary. You are always welcome to rest, observe, or take personal quiet time whenever you need. This is a restorative sanctuary, not a strict or punishing programme.',
      },
      {
        q: 'Are beginners welcome?',
        a: 'Warmly welcome. Beginners, solo travellers, and anyone seeking quiet rest are invited. You do not need to be flexible, athletic, or “spiritual” — only willing to take an unhurried pause.',
      },
      {
        q: 'What activities are included in the retreat?',
        a: 'The programme includes gentle Classical Yoga, foundational pranayama breathwork, morning silent sitting and guided meditation, evening restorative Yoga Nidra, guided values journaling and reflection circles, a sensory canopy nature walk, a morning temple visit, an afternoon river safari (conditional), and a take-home wellness routine.',
      },
    ],
  },
  {
    id: 'experiences',
    number: '04',
    title: 'Cultural & Nature Experiences',
    tagline: 'Temple quiet and the Nila River safari',
    questions: [
      {
        q: 'Is the temple visit compulsory?',
        a: 'No. Participation in the Day 03 morning temple visit is completely voluntary. Guests who choose to attend are requested to respect local customs and any applicable temple dress requirements.',
      },
      {
        q: 'Is the Nila River boat safari guaranteed?',
        a: 'No. While the boat safari is included in the retreat fee as a scheduled off-site nature excursion on Day 03, it is strictly conditional and not guaranteed. It depends on safe river flow, seasonal weather, and local operating permissions.',
      },
      {
        q: 'What happens if weather or river conditions prevent the safari?',
        a: 'If weather or river conditions prevent the boat safari from operating safely, the schedule adapts gracefully into contemplative sanctuary time, gentle restorative practice, or quiet nature observation. Guest safety and calm are always our primary priority.',
      },
    ],
  },
  {
    id: 'booking',
    number: '05',
    title: 'Booking & Reservation',
    tagline: 'Dates, pricing and transparent reservation',
    questions: [
      {
        q: 'When will retreat dates be announced?',
        a: 'Retreat dates are announcing soon. By joining our early-interest list, you will be notified first as soon as confirmed dates and venue details are released.',
      },
      {
        q: 'How can visitors enquire about pricing?',
        a: 'Pricing will be shared transparently upon enquiry before any booking or payment is accepted. You can register your interest via the enquiry form below or message us directly on WhatsApp.',
      },
      {
        q: 'How does the reservation process work?',
        a: 'Registering your early interest carries no financial commitment or obligation. Once dates, venue, and pricing are confirmed, registered guests will receive complete retreat details and an invitation to reserve their place before public release.',
      },
      {
        q: 'What information will be shared before booking?',
        a: 'Before any booking or payment is requested, guests will receive full written details including confirmed dates, exact venue address and directions, accommodation specifications, confirmed pricing, cancellation policy, and a simple retreat packing list.',
      },
    ],
  },
  {
    id: 'preparation',
    number: '06',
    title: 'Preparation & Practical Information',
    tagline: 'Packing, timings and independent arrangements',
    questions: [
      {
        q: 'What should guests bring?',
        a: 'Comfortable clothes for gentle movement, walking shoes for footpaths, respectful attire for the optional temple visit, and personal comfort items such as a shawl or favourite journal. A simple packing list will be shared with confirmed participants before the retreat.',
      },
      {
        q: 'What are the arrival and departure timings?',
        a: 'Check-in, welcome drinks, and settling in commence from 2:00 PM on Day 01, with our opening circle at 3:30 PM. The retreat concludes after our closing circle and farewell lunch around 12:00 PM on Day 04.',
      },
      {
        q: 'What personal arrangements should guests make?',
        a: 'Guests independently arrange their own travel and transportation to the retreat venue in Kerala, India (detailed arrival directions will be provided upon confirmation). Guests are also advised to secure their own personal travel and medical insurance if desired.',
      },
    ],
  },
]

// Flattened export for backward compatibility
export const faqs = faqCategories.flatMap((cat) => cat.questions)
