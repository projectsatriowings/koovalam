import RetreatMedia from '../RetreatMedia.jsx'
import Reveal from '../Reveal.jsx'
import styles from './Sightseeing.module.css'

/**
 * KOOVALAM — WAYANAD SIGHTSEEING & NATURE EXPEDITIONS
 * High-end editorial showcase presenting:
 * 1. Mylattumala Sunrise Experience & Meditation (Wayanad) - Panoramic Cloud-bed Dawn
 * 2. Curated Sightseeing Trio (Day 03 Afternoon):
 *    - Makkiyad Meenmutty Waterfall (Waterfall Wonder)
 *    - Kunkichira Tribal Heritage Museum (Indigenous Wisdom)
 *    - Gurukula Botanical Sanctuary (Rare Flora Conservation)
 * 3. Guided Plantation Walk (Coffee & Tea Estate) (Day 04 Early Morning)
 */
export default function SightseeingExperiences({ category }) {
  const sunriseItem =
    category?.items?.find((i) => i.id === 'mylattumala-sunrise') || category?.items?.[0]
  const waterfallItem =
    category?.items?.find((i) => i.id === 'makkiyad-waterfall')
  const museumItem =
    category?.items?.find((i) => i.id === 'kunkichira-museum')
  const botanicalItem =
    category?.items?.find((i) => i.id === 'gurukula-sanctuary')
  const plantationItem =
    category?.items?.find((i) => i.id === 'plantation-walk')

  const sightseeingTrio = [
    {
      item: waterfallItem,
      typeTag: 'Waterfall Wonder',
      badgeNum: '01',
      kickerText: 'Makkiyad · Natural Cascade',
      captionText:
        'A secluded multi-tiered natural cascade crashing through dense rainforest into cool mountain rock pools.',
      highlight: 'Pristine forest cascade · Rock pool',
    },
    {
      item: museumItem,
      typeTag: 'Tribal Museum',
      badgeNum: '02',
      kickerText: 'Kunkichira · Living Traditions',
      captionText:
        'Ancestral dwellings, indigenous craftsmanship, and living folkloric traditions of Wayanad native tribes.',
      highlight: 'Authentic tribal dwellings · Living history',
    },
    {
      item: botanicalItem,
      typeTag: 'Botanical Sanctuary',
      badgeNum: '03',
      kickerText: 'Alattil / Periya · Conservation Haven',
      captionText:
        'An acclaimed 55-acre native sanctuary preserving rare orchids, moss canopies, and prehistoric ferns.',
      highlight: '55-acre native garden · Rare orchids & ferns',
    },
  ].filter((entry) => Boolean(entry.item))

  return (
    <div className="experience-category-group" id="sightseeing-section">
      <div className="category-group-header">
        <span className="category-group-tag">
          {category?.categoryTag || 'Sunrise · Waterfalls · Heritage · Sanctuary · Plantations'}
        </span>
        <h3 className="category-group-title">
          {category?.categoryName || 'Wayanad Sightseeing & Nature Expeditions'}
        </h3>
        <p className="category-group-desc">
          {category?.categoryDesc ||
            'Immerse in Wayanad’s untouched highland beauty—from dawn breaking across an ethereal sea of clouds atop Mylattumala to cascading rainforest waterfalls, indigenous tribal heritage, and ancient botanical gardens.'}
        </p>
      </div>

      <Reveal>
        <div className={styles.sightseeingStack}>
          {/* ═════════════════════════════════════════════════════════════════
              TIER 01: MYLATTUMALA SUNRISE EXPERIENCE & MEDITATION (WAYANAD)
              ═════════════════════════════════════════════════════════════════ */}
          {sunriseItem && (
            <article className={styles.sunriseHeroCard}>
              <div className={styles.sunriseMediaCol}>
                <RetreatMedia
                  imageName={sunriseItem.image}
                  altFallback={sunriseItem.title}
                  hasWebp={false}
                />
                <div className={styles.sunriseMediaScrim} aria-hidden="true" />
                <span className={styles.sunriseTimeBadge}>
                  <span className={styles.sunriseDot} aria-hidden="true" />
                  <span>Day 02 Dawn · 5:00 AM – 7:00 AM</span>
                </span>
                <span className={styles.sunriseIndexBadge} aria-hidden="true">
                  01
                </span>
              </div>

              <div className={styles.sunriseContentCol}>
                <span className={styles.kickerGold}>
                  {sunriseItem.kicker || 'Hilltop Sunrise · Sea of Clouds'}
                </span>
                <h4 className={styles.sunriseTitle}>{sunriseItem.title}</h4>
                <p className={styles.sunriseSummary}>{sunriseItem.summary}</p>

                <div className={styles.sunrisePillsRow}>
                  <span className={styles.sunriseChip}>
                    <svg
                      className={styles.chipIcon}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                    </svg>
                    <span>Sea of Clouds Sunrise</span>
                  </span>
                  <span className={styles.sunriseChip}>
                    <svg
                      className={styles.chipIcon}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                    <span>Guided Morning Meditation</span>
                  </span>
                  <span className={styles.sunriseChip}>
                    <svg
                      className={styles.chipIcon}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>On-Site Trail Above Resort</span>
                  </span>
                </div>

                {Array.isArray(sunriseItem.meta) && sunriseItem.meta.length > 0 && (
                  <dl className={styles.sunriseMetaList}>
                    {sunriseItem.meta.map((entry) => (
                      <div key={entry.label}>
                        <dt className={styles.metaDt}>{entry.label}</dt>
                        <dd className={styles.metaDd}>{entry.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          )}

          {/* ═════════════════════════════════════════════════════════════════
              TIER 02: 3 SIGHTSEEING WONDERS (WATERFALL, MUSEUM, BOTANICAL SANCTUARY)
              Full-Bleed Immersive Photography Cards with Floating Overlays
              ═════════════════════════════════════════════════════════════════ */}
          <article className={styles.sightseeingStage}>
            <div className={styles.stageHeader}>
              <div>
                <span className={styles.stageKicker}>
                  02 · Curated Sightseeing Expeditions
                </span>
                <h4 className={styles.stageTitle}>
                  Waterfalls, Tribal Museum &amp; Botanical Sanctuary
                </h4>
              </div>

              <div className={styles.stageSubtitleCol}>
                <p className={styles.stageSubtitle}>
                  Three handpicked highland excursions exploring Wayanad’s pristine water cascades, living tribal history, and lush Western Ghats botanical conservation.
                </p>
                <span className={styles.stageTimingPill}>
                  <span className={styles.stageTimingDot} aria-hidden="true" />
                  <span>Day 03 Afternoon · 2:30 PM – 6:00 PM</span>
                </span>
              </div>
            </div>

            {/* Immersive 3-Card Photo Grid */}
            <div className={styles.cardsGrid}>
              {sightseeingTrio.map(({ item, typeTag, badgeNum, kickerText, captionText, highlight }) => (
                <figure key={item.id} className={styles.sightseeingTile}>
                  <RetreatMedia
                    imageName={item.image}
                    altFallback={item.title}
                    hasWebp={false}
                  />
                  <div className={styles.tileScrim} aria-hidden="true" />

                  {/* Top-Left Category Badge */}
                  <span className={styles.tileCategoryBadge}>
                    <span className={styles.categoryDot} aria-hidden="true" />
                    <span>{typeTag}</span>
                  </span>

                  {/* Top-Right Number Badge */}
                  <span className={styles.tileBadgeNum} aria-hidden="true">
                    {badgeNum}
                  </span>

                  {/* Bottom Editorial Content Overlay */}
                  <figcaption className={styles.tileOverlay}>
                    <span className={styles.tileKicker}>{kickerText || item.pillLabel || item.tag}</span>
                    <h5 className={styles.tileTitle}>{item.title}</h5>
                    <p className={styles.tileCaption}>{captionText || item.summary}</p>

                    {highlight && (
                      <div className={styles.tileHighlightPill}>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{highlight}</span>
                      </div>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Bottom Excursion Coordination Footnote */}
            <div className={styles.stageFootnote}>
              <svg
                className={styles.stageFootnoteIcon}
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className={styles.stageFootnoteText}>
                <strong>Curated Wayanad Expeditions:</strong> All sightseeing excursions originate from Oxyfarm Resorts with comfortable group transport and guided coordination. Excursions are unhurried, respectful of nature, and completely voluntary.
              </p>
            </div>
          </article>

          {/* ═════════════════════════════════════════════════════════════════
              TIER 03: GUIDED PLANTATION WALK (COFFEE & TEA ESTATE)
              ═════════════════════════════════════════════════════════════════ */}
          {plantationItem && (
            <article className={styles.plantationStrip}>
              <div className={styles.plantationProse}>
                <span className={styles.kickerDark}>
                  {plantationItem.kicker || 'Morning Walk · Estate Immersion'}
                </span>
                <h4 className={styles.plantationTitle}>{plantationItem.title}</h4>
                <p className={styles.plantationSummary}>{plantationItem.summary}</p>

                <div className={styles.plantationChipsRow}>
                  <span className={styles.plantationChip}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--antique-brass)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Organic Coffee Bushes</span>
                  </span>
                  <span className={styles.plantationChip}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--antique-brass)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Sloping Tea Leaves</span>
                  </span>
                  <span className={styles.plantationChip}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--antique-brass)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Black Pepper Vines</span>
                  </span>
                </div>

                {Array.isArray(plantationItem.meta) && plantationItem.meta.length > 0 && (
                  <dl className={styles.plantationMetaGrid}>
                    {plantationItem.meta.map((entry) => (
                      <div key={entry.label}>
                        <dt className={styles.plantationDt}>{entry.label}</dt>
                        <dd className={styles.plantationDd}>{entry.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className={styles.plantationMediaFrame}>
                <RetreatMedia
                  imageName={plantationItem.image}
                  altFallback={plantationItem.title}
                  hasWebp={Boolean(plantationItem.hasWebp)}
                />
                <span className={styles.plantationIndexBadge} aria-hidden="true">
                  03
                </span>
                <span className={styles.plantationTagPill}>
                  Day 04 Morning · 5:30 AM – 7:30 AM
                </span>
              </div>
            </article>
          )}
        </div>
      </Reveal>
    </div>
  )
}
