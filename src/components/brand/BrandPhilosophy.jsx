import { spiritualDimensions } from '../../data/brandProfile.js'
import { LeafMark } from '../Logo.jsx'
import Reveal from '../Reveal.jsx'
import styles from './BrandSections.module.css'

/**
 * Concise Three Dimensions of Well-Being section (Body · Mind · Soul)
 * inspired by the three-part sacred Bilva leaf.
 */
export default function BrandPhilosophy() {
  return (
    <section
      id="philosophy"
      className={styles.philosophySection}
      aria-label="Three Dimensions of Well-Being: Body, Mind and Soul"
    >
      <div className="wrap">
        <div className="section-head-travel text-center">
          <div className="travel-eyebrow">
            <LeafMark color="var(--antique-brass)" size={13} />
            <span>{spiritualDimensions.eyebrow}</span>
          </div>
          <h2 className="travel-heading">
            {spiritualDimensions.headingPrefix}{' '}
            <span className="serif-italic">{spiritualDimensions.headingAccent}</span>
          </h2>
          <p className="travel-lede">{spiritualDimensions.intro}</p>
        </div>

        <Reveal>
          <div className={styles.dimensionsGrid}>
            {spiritualDimensions.items.map((dim) => (
              <article key={dim.name} className={styles.dimensionCard}>
                <div className={styles.dimensionTop}>
                  <span className={styles.dimensionNum}>{dim.num}</span>
                  <span className={styles.dimensionIcon} aria-hidden="true">
                    <LeafMark color="var(--antique-brass)" size={16} />
                  </span>
                </div>
                <h3 className={styles.dimensionName}>{dim.name}</h3>
                <p className={styles.dimensionTagline}>{dim.tagline}</p>
                <p className={styles.dimensionDetail}>{dim.detail}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
