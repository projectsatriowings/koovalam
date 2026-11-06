import { useEffect, useRef } from 'react'
import { practices, divisions } from '../data/practices.js'
import { included, whoFor, whatNot } from '../data/retreat.js'
import { whatsappLink } from '../config/site.js'
import { track } from '../lib/analytics.js'
import ImageSlot from './ImageSlot.jsx'
import Reveal from './Reveal.jsx'
import { LeafMark } from './Logo.jsx'

/**
 * Editorial Sanctuary Overview Strip
 * Replaces the former transit-ticket aesthetic with a refined editorial bar.
 */
export function TicketStrip() {
  const facets = [
    { label: 'DURATION', title: '4 Days', subtitle: '3 Nights Sanctuary' },
    { label: 'LANDSCAPE', title: 'Kerala', subtitle: 'God’s Own Country, India' },
    { label: 'ATMOSPHERE', title: 'Intimate', subtitle: 'Sacred, Quiet & Restorative' },
    { label: 'RESERVATION', title: 'Private', subtitle: 'Announcing Soon' },
  ]

  return (
    <section className="overview-strip-section" id="summary" aria-label="Retreat Overview">
      <div className="wrap">
        <div className="overview-strip">
          {facets.map((f, i) => (
            <div key={f.label + i} className="overview-cell">
              <span className="overview-tag">{f.label}</span>
              <span className="overview-num">{f.title}</span>
              <span className="overview-sub">{f.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Trust & Foundation Strip
 */
export function TrustStrip() {
  const items = [
    'Classical Yoga & Mindful Movement',
    'Restorative Pranayama & Yoga Nidra',
    'Sacred Kerala Temples & River Stillness',
    'Gentle, Grounded Care (Always Voluntary)',
  ]

  return (
    <section className="trust-strip-section" aria-label="Retreat Foundations at a Glance">
      <div className="wrap">
        <div className="trust-row">
          {items.map((label) => (
            <div key={label} className="trust-item">
              <span className="trust-icon" aria-hidden="true">
                <LeafMark color="var(--antique-gold)" stemColor="var(--earth-brown)" size={16} />
              </span>
              <span className="trust-text">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Chapter 01 · The Sanctuary
 * Editorial storytelling, natural living imagery, and Body-Mind-Soul connection.
 */
export function Pause() {
  const pillars = [
    {
      num: '01',
      pillar: 'BODY',
      title: 'Physical Vitality & Somatic Rest',
      desc: 'Releasing stored physical tension through unhurried classical yoga, grounding postural alignment, and nourishing vegetarian meals rooted in Kerala tradition.',
    },
    {
      num: '02',
      pillar: 'MIND',
      title: 'Mental Stillness & Sensory Peace',
      desc: 'Stepping off the wheel of digital urgency into the quiet rhythm of dawn meditation, restorative breathwork, and deep Yoga Nidra beneath swaying palms.',
    },
    {
      num: '03',
      pillar: 'SOUL',
      title: 'Spiritual Reverence & Inner Stillness',
      desc: 'A gentle homecoming to your center through quiet temple visits, the mindful Nila River boat safari, and spacious guided reflection.',
    },
  ]

  return (
    <section id="pause" className="sec-pause" aria-label="Chapter 01: The Sanctuary">
      <div className="wrap">
        <Reveal>
          <div className="editorial-chapter">
            {/* Chapter 01 Intro Bar */}
            <div className="chapter-intro-bar">
              <div className="chapter-eyebrow-wrap">
                <span className="chapter-badge">01</span>
                <span className="chapter-eyebrow">CHAPTER 01 · THE SANCTUARY</span>
              </div>
              <span className="chapter-tagline">Pause. Breathe. Reconnect.</span>
            </div>

            {/* Chapter Lead Block */}
            <div className="chapter-lead-block">
              <h2 className="chapter-heading">
                When did you last give yourself permission to simply <em>be</em>?
              </h2>
              <p className="chapter-sublead">
                Life has been loud. Deadlines, notifications, endless expectations — even rest has started to feel like another obligation to manage. Koovalam begins with a single, profound choice: the decision to step away from daily urgency, breathe without hurry, and listen to yourself once more.
              </p>
            </div>

            {/* Sanctuary Storytelling: Balanced Image & Philosophy Composition */}
            <div className="sanctuary-story-grid">
              <div className="sanctuary-visual-col">
                <div className="sanctuary-image-frame">
                  <ImageSlot name="natural-living" />
                  <div className="sanctuary-image-caption">
                    <span className="caption-tag">BOTANICAL STILLNESS · KERALA</span>
                    <span className="caption-note">Atmospheric botanical oils, handcrafted candle, and sacred Bilva leaves. (Lifestyle presentation; confirmed retreat venue details shared upon enquiry).</span>
                  </div>
                </div>
              </div>

              <div className="sanctuary-narrative-col">
                <blockquote className="sanctuary-pullquote">
                  “We do not come to the sanctuary to fix or force ourselves. We come to create spacious silence — and allow our natural clarity to return.”
                </blockquote>

                <div className="sanctuary-values">
                  <div className="sanctuary-value-item">
                    <h3 className="value-title">Unhurried Space</h3>
                    <p className="value-desc">
                      Four full days with no alarms, no rushed transitions, and no crowded timetables. Each day unfolds at the gentle rhythm of nature.
                    </p>
                  </div>

                  <div className="sanctuary-value-item">
                    <h3 className="value-title">Atmospheric Kerala Setting</h3>
                    <p className="value-desc">
                      Nestled within lush greenery in Kerala's cultural heartland, where temple bells and river breezes restore the nervous system.
                    </p>
                  </div>

                  <div className="sanctuary-value-item">
                    <h3 className="value-title">Gentle, Grounded Practices</h3>
                    <p className="value-desc">
                      Every session is an open invitation. Practices are adapted to individual comfort, with no performance pressure and no forcing. Our retreat supports general wellbeing and is not a substitute for therapy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BODY · MIND · SOUL Connection */}
            <div className="sanctuary-pillars-block" aria-label="The Three Pillars in Practice">
              <div className="pillars-intro">
                <span className="pillars-overline">THE LIVING TRIAD</span>
                <h3 className="pillars-main-title">How the Sanctuary Nurtures You</h3>
                <p className="pillars-lead">
                  Inspired by the three sacred leaflets of the Bilva tree, every practice and quiet hour at Koovalam touches all three dimensions of your being.
                </p>
              </div>

              <div className="sanctuary-pillars-triad">
                {pillars.map((item) => (
                  <div key={item.pillar} className="sanctuary-pillar-card">
                    <div className="pillar-header">
                      <span className="pillar-badge-num">{item.num}</span>
                      <span className="pillar-badge-name">{item.pillar}</span>
                    </div>
                    <h4 className="pillar-card-title">{item.title}</h4>
                    <p className="pillar-card-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Transition to Next Section (Chapter 02: Sacred Origin) */}
            <div className="chapter-next-bridge">
              <div className="bridge-line" aria-hidden="true" />
              <div className="bridge-content">
                <span className="bridge-tag">NEXT CHAPTER</span>
                <p className="bridge-text">
                  Discover the ancient tree and sacred lore from which Koovalam takes its name.
                </p>
                <a href="#koovalam" className="bridge-link">
                  <span>Chapter 02 · Sacred Origin &amp; The Bilva Tree</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Chapter 02: Sacred Origin & The Bilva Tree
 * Rooted in the sacred Bilva tree (Aegle marmelos), cultural heritage of Kerala,
 * botanical wisdom, and the trifoliate harmony of Body, Mind, and Soul.
 */
export function BilvaStory() {
  const tridalaFacets = [
    {
      sanskrit: 'TRIDALA',
      meaning: 'Threefold Form',
      dimension: 'BODY',
      title: 'Physical Grounding & Somatic Balance',
      desc: 'In Koovalam’s retreat philosophy, this leaflet represents the physical foundation. Just as the Bilva roots firmly into the earth, physical wellbeing begins with classical gentle asanas, restorative rest, and nourishing vegetarian meals rooted in Kerala tradition.',
    },
    {
      sanskrit: 'TRINETRA',
      meaning: 'Inner Vision',
      dimension: 'MIND',
      title: 'Mental Stillness & Sensory Peace',
      desc: 'Drawing inspiration from traditional poetic associations with clear perception, Koovalam interprets this leaflet as mental quietude — stepping back from daily rush through gentle breathwork, guided mindfulness, and Yoga Nidra.',
    },
    {
      sanskrit: 'TRISHOOLA',
      meaning: 'Sacred Harmony',
      dimension: 'SOUL',
      title: 'Spiritual Reverence & Inner Wholeness',
      desc: 'Interpreted within our retreat as the alignment of inner intention and peaceful awareness. An unforced return to your essential nature, nurtured by temple quiet, evening lamps, and unhurried natural surroundings.',
    },
  ]

  return (
    <section id="origin" className="sec-bilva" aria-label="Chapter 02: Sacred Origin and the Bilva Tree">
      {/* Anchor alias to preserve backward compatibility for legacy #koovalam bookmarks */}
      <span id="koovalam" className="section-anchor-alias" aria-hidden="true" />

      <div className="wrap">
        <Reveal>
          <div className="editorial-chapter">
            {/* Chapter 02 Intro Bar */}
            <div className="chapter-intro-bar">
              <div className="chapter-eyebrow-wrap">
                <span className="chapter-badge">02</span>
                <span className="chapter-eyebrow">CHAPTER 02 · SACRED ORIGIN</span>
              </div>
              <span className="chapter-tagline">The Bilva Tree &amp; Heritage</span>
            </div>

            {/* Chapter Lead Block */}
            <div className="chapter-lead-block">
              <h2 className="chapter-heading">
                One Sacred Leaf. Three Leaflets. A Living Symbol of <em>Wholeness</em>.
              </h2>
              <p className="chapter-sublead">
                In Malayalam botanical tradition, this revered tree is known as <strong>Koovalam</strong>. For centuries across Kerala and the Indian subcontinent, the Bilva (<em>Aegle marmelos</em>) has stood as an enduring emblem of spiritual stillness, natural medicine, and quiet reverence.
              </p>
            </div>

            {/* Asymmetrical Editorial Composition: Botanical Specimen + Lore */}
            <div className="bilva-lore-grid">
              {/* Botanical Specimen Visual Column */}
              <div className="bilva-specimen-col">
                <div className="bilva-specimen-frame">
                  <div className="specimen-image-wrap">
                    <ImageSlot name="bilva-leaves" />
                    <div className="specimen-corner-badge" aria-hidden="true">
                      <LeafMark color="var(--primary-forest)" size={28} />
                    </div>
                  </div>

                  <div className="specimen-plaque">
                    <div className="specimen-header">
                      <span className="specimen-taxon">BOTANICAL SPECIMEN · RUTACEAE</span>
                      <span className="specimen-malayalam" aria-label="Koovalam in Malayalam script">കൂവളം</span>
                    </div>
                    <h3 className="specimen-name">Aegle marmelos (Bilva / Bael)</h3>
                    <p className="specimen-meta">
                      Sacred trifoliate leaves resting on handwoven cream linen. The distinct three-leaflet arrangement serves as the visual and philosophical emblem of the Koovalam retreat.
                    </p>
                    <span className="specimen-disclaimer">
                      (Curated botanical lifestyle photography; representative of Kerala’s sacred Bilva flora).
                    </span>
                  </div>
                </div>
              </div>

              {/* Cultural & Spiritual Significance Column */}
              <div className="bilva-narrative-col">
                <div className="lore-article">
                  <span className="lore-overline">CULTURAL HERITAGE</span>
                  <h3 className="lore-title">A Tree Revered Across Centuries</h3>
                  <p className="lore-text">
                    Throughout Kerala’s historic groves and temple precincts, the Bilva tree holds an irreplaceable sanctuary status. Traditionally offered in Shaivite worship as a gesture of purity and surrender, its leaves represent the surrender of inner conflict and the quiet return to natural clarity.
                  </p>
                </div>

                <div className="lore-divider" aria-hidden="true" />

                <div className="lore-article">
                  <span className="lore-overline">BOTANICAL TRADITION</span>
                  <h3 className="lore-title">Cooling Shade &amp; Natural Balance</h3>
                  <p className="lore-text">
                    In classical Ayurvedic literature, the Bilva is documented for its cooling nature (<em>Sheeta virya</em>) and aromatic foliage. Within Kerala’s traditional dwellings, resting beneath its canopy has long been cherished for offering a peaceful sensory refuge. At Koovalam, we embrace this botanical presence as a natural sanctuary for restful contemplation, free from clinical claims.
                  </p>
                </div>

                <div className="lore-divider" aria-hidden="true" />

                <div className="lore-article">
                  <span className="lore-overline">THE KOOVALAM PROMISE</span>
                  <h3 className="lore-title">Reverence Without Religious Dogma</h3>
                  <p className="lore-text">
                    While rooted in Kerala's sacred heritage, Koovalam is not a religious ceremony. We celebrate the Bilva tree as a living symbol of harmony between humanity and nature. Guests of every background and worldview are warmly welcomed, with all contemplative practices remaining completely voluntary.
                  </p>
                </div>
              </div>
            </div>

            {/* Grand Editorial Pullquote */}
            <div className="bilva-quote-banner">
              <div className="quote-mark-wrap" aria-hidden="true">
                <LeafMark color="var(--antique-gold)" size={42} />
              </div>
              <blockquote className="bilva-pullquote">
                “Koovalam takes its name from this sacred tree because its wisdom mirrors our core purpose: to help you pause the clamor of modern urgency, step upon peaceful earth, and allow your natural wholeness to return.”
              </blockquote>
              <cite className="bilva-quote-author">The Philosophy of Koovalam Retreat</cite>
            </div>

            {/* Tridala: The Threefold Wisdom (Archival Triptych) */}
            <div className="tridala-section" aria-label="The Threefold Wisdom of Bilva">
              <div className="tridala-intro">
                <span className="tridala-overline">KOOVALAM’S SYMBOLIC INTERPRETATION</span>
                <h3 className="tridala-title">The Three Leaflets of Inner Balance</h3>
                <p className="tridala-lead">
                  Inspired by traditional verses celebrating the Bilva leaf’s threefold geometry (Tridala, Trinetra, and Trishoola), Koovalam draws upon this botanical symbol as our guiding retreat metaphor for harmony across Body, Mind, and Soul.
                </p>
              </div>

              <div className="tridala-triptych">
                {tridalaFacets.map((item) => (
                  <div key={item.dimension} className="tridala-card">
                    <div className="tridala-card-header">
                      <div className="tridala-sanskrit-tag">
                        <span className="sanskrit-name">{item.sanskrit}</span>
                        <span className="sanskrit-sub">({item.meaning})</span>
                      </div>
                      <span className="tridala-dim-badge">{item.dimension}</span>
                    </div>
                    <h4 className="tridala-card-title">{item.title}</h4>
                    <p className="tridala-card-desc">{item.desc}</p>
                    <div className="tridala-card-accent" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Transition to Chapter 03 */}
            <div className="chapter-next-bridge">
              <div className="bridge-line" aria-hidden="true" />
              <div className="bridge-content">
                <span className="bridge-tag">NEXT CHAPTER</span>
                <p className="bridge-text">
                  Explore the five mindful modalities that shape your daily retreat experience.
                </p>
                <a
                  href="#retreat"
                  className="bridge-link"
                  onClick={() => track('nav_chapter_03_bridge')}
                >
                  <span className="bridge-link-text">Chapter 03 · Mindful Modalities &amp; Practices</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Chapter 03: Mindful Modalities & Daily Practices
 * An editorial introduction to the 6 core modalities offered at Koovalam:
 * Classical Yoga, Restorative Pranayama, Guided Meditation, Yoga Nidra,
 * Guided Reflection, and Nature & Cultural Immersion.
 */
export function Practices() {
  const practiceItems = [
    {
      index: '02',
      image: 'practice-pranayama',
      pillar: 'BODY & BREATH',
      title: 'Restorative Pranayama',
      subtitle: 'Foundational Morning & Sunset Breath',
      desc: 'Simple, conscious breath practices — including natural diaphragmatic breathing and alternate-nostril breathing (Nadi Shodhana) — that gently invite the nervous system into resting equilibrium. Always unforced and adapted to individual capacity.',
      setting: 'Quiet veranda or shaded pavilion',
    },
    {
      index: '03',
      image: 'practice-meditation',
      pillar: 'MIND & STILLNESS',
      title: 'Present-Moment Guided Meditation',
      subtitle: 'Spacious Sitting in Morning Light',
      desc: 'Spacious silent sitting and gently guided mindfulness. Cultivating present-moment awareness, emotional self-compassion, and quiet observation of thoughts without urgency, pressure, or expectation.',
      setting: 'Morning light facing lush greenery',
    },
    {
      index: '04',
      image: 'practice-yoga-nidra',
      pillar: 'MIND & DEEP REST',
      title: 'Yoga Nidra (Conscious Rest)',
      subtitle: 'Nightly Guided Lying-Down Relaxation',
      desc: 'A deeply restorative practice of guided sensory withdrawal (pratyahara), experienced comfortably lying down with mats, bolsters, and blankets. Systematically softens mental fatigue to close each day in still, restorative rest.',
      setting: 'Evening quiet with soft lamplight',
    },
    {
      index: '05',
      image: 'practice-reflection',
      pillar: 'SOUL & INTEGRATION',
      title: 'Journaling & Reflection Circles',
      subtitle: 'Midday Inquiry & Integration Workshop',
      desc: 'Reflective writing prompts, values inquiry, and optional sharing circles. Designed to help you notice helpful habits, clarify supportive beliefs, and shape a simple, realistic wellness routine to carry home.',
      setting: 'Comfortable indoor lounge & herbal tea',
    },
  ]

  return (
    <section id="retreat" className="sec-practices" aria-label="Chapter 03: Mindful Modalities & Daily Practices">
      <div className="wrap">
        <Reveal>
          <div className="editorial-chapter">
            {/* Chapter 03 Intro Bar */}
            <div className="chapter-intro-bar">
              <div className="chapter-eyebrow-wrap">
                <span className="chapter-badge">03</span>
                <span className="chapter-eyebrow">CHAPTER 03 · MINDFUL MODALITIES</span>
              </div>
              <span className="chapter-tagline">Gentle Practices, Practised Slowly</span>
            </div>

            {/* Chapter Lead Block */}
            <div className="chapter-lead-block">
              <h2 className="chapter-heading">
                Six Pathways to Rest, Awareness &amp; <em>Renewal</em>.
              </h2>
              <p className="chapter-sublead">
                Nothing at Koovalam is a performance, a rigid test, or a contest of flexibility. Every session is an unhurried invitation offered with care — you are always free to participate, soften, or rest whenever you feel called.
              </p>
            </div>

            {/* 1. Featured Spotlight: Classical Yoga & Movement */}
            <div className="practice-spotlight-card">
              <div className="spotlight-media-wrap">
                <ImageSlot name="practice-yoga" />
                <div className="spotlight-badge" aria-hidden="true">
                  <LeafMark color="var(--primary-forest)" size={22} />
                  <span>FOUNDATIONAL MODALITY</span>
                </div>
              </div>
              <div className="spotlight-content">
                <div className="spotlight-header">
                  <span className="spotlight-pillar-tag">PILLAR 01 · BODY &amp; SOMATIC EASE</span>
                  <span className="spotlight-index">01 OF 06</span>
                </div>
                <h3 className="spotlight-title">Classical Yoga &amp; Mindful Movement</h3>
                <p className="spotlight-desc">
                  Gentle morning sessions designed to release deep somatic tension, restore natural joint mobility, and awaken physical vitality. Paced deliberately slow with foundational classical postures and mindful body-awareness, every movement is adapted to your natural comfort — completely accessible to beginners, with no forcing or contortion.
                </p>
                <div className="spotlight-meta-grid">
                  <div className="spotlight-meta-item">
                    <span className="spotlight-meta-label">SETTING</span>
                    <span className="spotlight-meta-val">Open-air veranda, gentle morning breeze &amp; garden quiet</span>
                  </div>
                  <div className="spotlight-meta-item">
                    <span className="spotlight-meta-label">PACE</span>
                    <span className="spotlight-meta-val">Deliberate, grounded &amp; unhurried movement</span>
                  </div>
                  <div className="spotlight-meta-item">
                    <span className="spotlight-meta-label">INTENTION</span>
                    <span className="spotlight-meta-val">Somatic ease, postural alignment &amp; steady breath</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Editorial Gallery: Pairs for Breath, Mind & Reflection */}
            <div className="practices-editorial-layout">
              <div className="practices-duo-grid">
                {practiceItems.map((p) => (
                  <div key={p.title} className="practice-editorial-card">
                    <div className="practice-card-media">
                      <ImageSlot name={p.image} />
                      <div className="practice-card-topbar">
                        <span className="practice-pillar-badge">{p.pillar}</span>
                        <span className="practice-card-index">{p.index}</span>
                      </div>
                    </div>
                    <div className="practice-card-body">
                      <span className="practice-card-subtitle">{p.subtitle}</span>
                      <h4 className="practice-card-title">{p.title}</h4>
                      <p className="practice-card-desc">{p.desc}</p>
                      <div className="practice-card-setting">
                        <span className="setting-label">Atmosphere:</span>
                        <span className="setting-val">{p.setting}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Wide Full-Width Feature: Nature Immersion & Cultural Connection */}
              <div className="practice-wide-feature">
                <div className="wide-feature-media">
                  <ImageSlot name="practice-nature-culture" />
                  <div className="wide-feature-badge">
                    <span className="practice-pillar-badge">PILLAR 03 · SOUL &amp; SACRED NATURE</span>
                    <span className="practice-card-index">06</span>
                  </div>
                </div>
                <div className="wide-feature-content">
                  <span className="practice-card-subtitle">Cultural Heritage &amp; Mindful Excursions</span>
                  <h3 className="wide-feature-title">Temple Stillness &amp; Nila River Safari</h3>
                  <p className="wide-feature-desc">
                    Spiritual wellness at Koovalam is deeply connected to the living landscapes of Kerala. Enjoy unhurried morning visits to quiet heritage temple courtyards, walk barefoot on cool granite, and drift peacefully along the historic Nila River on a mindful boat safari — letting the rhythm of flowing water restore inner stillness.
                  </p>
                  <div className="wide-feature-meta">
                    <div className="meta-pill">
                      <span className="pill-dot" aria-hidden="true" />
                      <span>Quiet heritage temple visit (cultural observance)</span>
                    </div>
                    <div className="meta-pill">
                      <span className="pill-dot" aria-hidden="true" />
                      <span>Nila River boat safari (weather &amp; permissions permitting)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Voluntary Ethos & Practice Reassurance Banner */}
            <div className="practices-ethos-banner">
              <div className="ethos-mark-wrap" aria-hidden="true">
                <LeafMark color="var(--primary-forest)" size={32} />
              </div>
              <div className="ethos-content">
                <h4 className="ethos-title">Our Practice Ethos: Gentle, Voluntary &amp; Non-Dogmatic</h4>
                <p className="ethos-desc">
                  Every session is an open invitation, never a demand. You are always welcome to pause, observe, or opt out of any exercise. Our retreat is designed to support general wellbeing, unhurried rest, and nervous system ease. It is not psychotherapy, makes no clinical guarantees, and requires zero prior yoga experience.
                </p>
              </div>
            </div>

            {/* 5. Narrative Transition to Chapter 04 */}
            <div className="chapter-next-bridge">
              <div className="bridge-line" aria-hidden="true" />
              <div className="bridge-content">
                <span className="bridge-tag">NEXT CHAPTER</span>
                <p className="bridge-text">
                  Trace the unhurried arc of our 4-day retreat itinerary, from your welcome drink to the closing circle.
                </p>
                <a
                  href="#journey"
                  className="bridge-link"
                  onClick={() => track('nav_chapter_04_bridge')}
                >
                  <span className="bridge-link-text">Chapter 04 · The 4-Day Journey</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Kerala Highlights · Temple & Nila River
 */
export function Highlights() {
  return (
    <section className="sec-ivory sec-highlights">
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial">
            <p className="eyebrow">Kerala Heritage</p>
            <h2>Sacred waters and morning quiet</h2>
            <p className="lede">
              Day 3 steps beyond the meditation mat to connect with the living spirit of Kerala — ancient temple serenity and the gentle flow of the Nila River.
            </p>
          </div>
        </Reveal>

        <div className="highlights-editorial-grid">
          <Reveal className="highlight-feature">
            <div className="highlight-media">
              <ImageSlot name="highlight-temple" />
            </div>
            <div className="highlight-body">
              <span className="highlight-badge">Morning Cultural Experience</span>
              <h3>Kerala Temple Serenity</h3>
              <p>
                A quiet cultural and contemplative visit in the soft morning light, held in deep respect for local customs, architectural heritage, and temple timings. No rushed tours, no crowded spectacle — simply the stillness of oil lamps, stone courtyards, and centuries of devotion.
              </p>
            </div>
          </Reveal>

          <Reveal className="highlight-feature">
            <div className="highlight-media">
              <ImageSlot name="highlight-nila-river" />
            </div>
            <div className="highlight-body">
              <span className="highlight-badge">Afternoon Nature Immersion</span>
              <h3>Nila River Boat Safari</h3>
              <p>
                A mindful drift along the calm waters of the Nila River at golden hour. Watch palm silhouettes reflect on the river and listen to the water. This mindful nature experience is an off-site excursion, subject to seasonal weather and safe operating conditions, and is not guaranteed.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Who This Is For & Gentle Honesty
 */
export function WhoFor() {
  return (
    <section className="sec-whofor">
      <div className="wrap">
        <div className="whofor-grid">
          <Reveal className="whofor-col welcome">
            <p className="eyebrow">Who This Is For</p>
            <h2>Come as you are</h2>
            <p className="col-sub">A safe, gentle sanctuary crafted for those seeking genuine pause.</p>
            <ul className="editorial-list">
              {whoFor.map((item) => (
                <li key={item}>
                  <span className="list-icon" aria-hidden="true">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="whofor-col honesty">
            <p className="eyebrow">Our Honest Boundary</p>
            <h2>What this is not</h2>
            <p className="col-sub">Honesty and transparency are essential components of true care.</p>
            <ul className="editorial-list not-list">
              {whatNot.map((item) => (
                <li key={item}>
                  <span className="list-icon" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="whofor-note">
              <p>
                If you are currently experiencing acute psychological trauma or seeking medical healing, we will gently and responsibly connect you with qualified professional clinical care.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * Inclusions & Sanctuary Living
 */
export function Included() {
  return (
    <section id="included" className="sec-ivory sec-included">
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial">
            <p className="eyebrow">Transparent Inclusions</p>
            <h2>Everything to nourish, nothing to distract</h2>
            <p className="lede">
              All essential elements of your 4-day stay are thoughtfully curated so your attention remains unburdened.
            </p>
          </div>
        </Reveal>

        <div className="included-editorial-grid">
          <div className="included-items-col">
            <ul className="included-list">
              {included.map((item, index) => (
                <li key={item} className="included-item">
                  <span className="included-index">0{index + 1}</span>
                  <span className="included-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="included-gallery-col">
            <div className="gallery-card">
              <ImageSlot name="included-stay" />
              <div className="gallery-caption">Restful Kerala retreat accommodation</div>
            </div>
            <div className="gallery-card">
              <ImageSlot name="included-meals" />
              <div className="gallery-caption">Fresh, wholesome vegetarian Kerala cuisine</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Safe Care & Trauma-Informed Principles
 */
export function SafeCare() {
  const points = [
    'Every practice is completely optional — pause, observe, or take quiet time whenever you need.',
    'No emotional pressure to share personal history or revisit painful memories in group circles.',
    'Focus on present-moment nervous system regulation, gentle grounding, and self-compassion.',
    'No aggressive or forceful pranayama; we never encourage pushing through pain, dizziness, or strain.',
    'Individual health, dietary, and physical mobility needs are addressed privately prior to arrival.',
    'River safari conducted with authorised operators, individual life jackets, and clear weather protocols.',
  ]

  return (
    <section className="sec-safecare">
      <div className="wrap">
        <div className="safecare-grid">
          <Reveal className="safecare-text-col">
            <p className="eyebrow">Mindful Care &amp; Safety</p>
            <h2>You are safe to move at your own pace</h2>
            <p className="lede">
              True retreat begins with trust. We cultivate a calm, trauma-informed environment where your boundaries are deeply respected.
            </p>
            <ul className="safecare-list">
              {points.map((pt) => (
                <li key={pt}>
                  <span className="bullet-leaf" aria-hidden="true">🌿</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="safecare-image-col">
            <div className="safecare-frame">
              <ImageSlot name="safe-care" />
              <div className="frame-overlay-quote">
                “Rest is not something you have to earn. It is the soil in which your life renews.”
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * The Koovalam World & Divisions
 */
export function KoovalamWorld() {
  return (
    <section className="sec-ivory sec-world">
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial">
            <p className="eyebrow">Brand Ecosystem</p>
            <h2>One Root. Three Living Branches.</h2>
            <p className="lede">
              The retreat is where our journey begins. The sacred Bilva root blossoms into natural wellness essentials and future immersive workshops.
            </p>
          </div>
        </Reveal>

        <div className="world-cards-grid">
          {divisions.map((d) => (
            <Reveal key={d.title} className="world-division-card">
              <div className="world-media">
                {d.image ? (
                  <ImageSlot name={d.image} />
                ) : (
                  <div className="world-media-fallback">
                    <LeafMark color="var(--antique-gold)" size={48} />
                  </div>
                )}
              </div>
              <div className="world-body">
                <span className="world-tag">{d.tag}</span>
                <h3 className="world-title">{d.title}</h3>
                <p className="world-text">{d.text}</p>
                <a
                  href="#enquiry"
                  className="world-link"
                  onClick={() => track(`cta_world_${d.title.toLowerCase().replace(/\s+/g, '_')}`)}
                >
                  Join Interest List <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Final CTA Aside
 */
export function FinalCtaAside() {
  return (
    <div className="final-cta-aside">
      <span className="eyebrow">A Quiet Beginning</span>
      <h2 className="final-heading">Your pause is waiting.</h2>
      <p className="final-desc">
        Retreat dates will be announced shortly. Join our early-interest guest list to receive private early access before public announcements.
      </p>
      <div className="final-reassurances">
        <div className="reassurance-item">
          <span className="check-gold" aria-hidden="true">✓</span>
          <span>Zero commitment or payment required to register interest</span>
        </div>
        <div className="reassurance-item">
          <span className="check-gold" aria-hidden="true">✓</span>
          <span>Priority choice of accommodations upon confirmation</span>
        </div>
        <div className="reassurance-item">
          <span className="check-gold" aria-hidden="true">✓</span>
          <span>Direct personal communication from the Koovalam team</span>
        </div>
      </div>

      <div className="final-wa-box">
        <p className="wa-prompt">Prefer a personal conversation?</p>
        <a
          className="btn btn-outline-dark btn-wa-direct"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={() => track('whatsapp_click_final')}
        >
          Message Us on WhatsApp
        </a>
      </div>
    </div>
  )
}
