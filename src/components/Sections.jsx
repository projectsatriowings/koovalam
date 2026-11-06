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
    { title: '4 Days', subtitle: '3 Nights Sanctuary' },
    { title: 'Kerala', subtitle: 'God’s Own Country, India' },
    { title: 'Dates', subtitle: 'Announcing Soon' },
    { title: 'Experience', subtitle: 'Gentle & Restorative' },
  ]

  return (
    <section className="overview-strip-section" id="summary" aria-label="Retreat Overview">
      <div className="wrap">
        <div className="overview-strip">
          {facets.map((f, i) => (
            <div key={f.title + i} className="overview-cell">
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
    'Traditional Yoga & Pranayama',
    'Meditation & Yoga Nidra',
    'Sacred Temple & River Experiences',
    'Gentle, Trauma-Informed Care',
  ]

  return (
    <section className="trust-strip-section" aria-label="Retreat Inclusions at a Glance">
      <div className="wrap">
        <div className="trust-row">
          {items.map((label) => (
            <div key={label} className="trust-item">
              <span className="trust-icon" aria-hidden="true">
                <LeafMark color="var(--antique-gold)" stemColor="var(--earth-brown)" size={18} />
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
 * Chapter 01 · The Pause
 * Editorial pull-quote and meditative introduction to the retreat.
 */
export function Pause() {
  return (
    <section id="pause" className="sec-pause">
      <div className="wrap">
        <Reveal>
          <div className="editorial-chapter">
            <span className="chapter-eyebrow">Chapter 01 · The Sacred Pause</span>
            <div className="chapter-grid">
              <div className="chapter-lead">
                <h2 className="chapter-heading">
                  When did you last give yourself permission to simply <em>be</em>?
                </h2>
                <div className="chapter-accent-line" aria-hidden="true" />
              </div>
              <div className="chapter-body">
                <p className="chapter-quote">
                  Life has been loud lately. Notifications, deadlines, noise — even rest has started to feel like another obligation.
                </p>
                <p className="chapter-text">
                  Koovalam is an invitation to step out of the rush for four unhurried days: to wake with the dawn light, breathe without hurry, walk among deep green, and listen to yourself once more.
                </p>
                <p className="chapter-text-dim">
                  No fixing, no forcing. Just open space — and the quiet clarity that returns within it.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Sacred Origin · The Bilva Story
 * Rooted in the sacred Bilva tree, associated with Lord Shiva, devotion, purity, and the 3 pillars.
 */
export function BilvaStory() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="koovalam" className="sec-ivory sec-bilva">
      <div className="wrap">
        <div className="bilva-editorial-grid">
          <Reveal className="bilva-media-col">
            <div className="bilva-photo-frame">
              <ImageSlot name="bilva-leaves" />
              <div className="photo-caption">
                <span className="caption-botanical">Aegle marmelos</span>
                <span className="caption-desc">Sacred trifoliate Bilva leaves, symbol of devotion and purity</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="bilva-content-col">
            <p className="eyebrow">Sacred Origin &amp; Meaning</p>
            <h2 className="bilva-title">One Sacred Leaf. Three Leaflets.</h2>
            <div className="bilva-desc">
              <p>
                <strong>Koovalam</strong> takes its name from the revered Bilva tree (<em>Aegle marmelos</em>), whose distinctive trifoliate leaf is traditionally offered in reverence to Lord Shiva — a timeless symbol of devotion, spiritual purity, and the profound harmony between nature and human consciousness.
              </p>
              <p>
                Rooted in Kerala’s cultural heritage and natural landscapes, Koovalam was born to bridge sacred botanical wisdom with practical, grounded wellness for modern life.
              </p>
            </div>

            {/* Three Brand Pillars */}
            <div className="pillars-container">
              <div className="pillar-item">
                <div className="pillar-num">I</div>
                <div className="pillar-info">
                  <h3 className="pillar-name">BODY</h3>
                  <p className="pillar-desc">Physical vitality, gentle mobility, and mindful movement.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-num">II</div>
                <div className="pillar-info">
                  <h3 className="pillar-name">MIND</h3>
                  <p className="pillar-desc">Mental stillness, sensory grounding, and peaceful awareness.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-num">III</div>
                <div className="pillar-info">
                  <h3 className="pillar-name">SOUL</h3>
                  <p className="pillar-desc">Spiritual connection, reverence, and inner wholeness.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/**
 * The Practices · Mindful Modalities
 * Replaces generic SaaS bento tilt cards with refined editorial gallery cards.
 */
export function Practices() {
  return (
    <section id="retreat" className="sec-practices">
      <div className="wrap">
        <Reveal>
          <div className="section-head-editorial">
            <p className="eyebrow">Mindful Modalities</p>
            <h2>Gentle practices, practised slowly</h2>
            <p className="lede">
              Nothing here is a performance or a rigid test. Every session is an invitation offered with care — you are free to participate, soften, or rest whenever you feel called.
            </p>
          </div>
        </Reveal>

        <div className="practices-editorial-grid">
          {practices.map((p, i) => (
            <Reveal key={p.title} className="practice-card">
              <div className="practice-image-wrap">
                <ImageSlot name={p.image} />
                <span className="practice-index" aria-hidden="true">0{i + 1}</span>
              </div>
              <div className="practice-content">
                <h3 className="practice-title">{p.title}</h3>
                <p className="practice-text">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
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
                A mindful drift along the calm waters of Bharathappuzha (the historic Nila River) at golden hour. Watch palm silhouettes reflect on the river and listen to the water. Operated exclusively with licensed safety standards, individual life jackets, and weather-dependent safety protocols.
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
