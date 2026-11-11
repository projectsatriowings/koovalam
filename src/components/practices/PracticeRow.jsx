import styles from './Practices.module.css'

/**
 * Single practice accordion row.
 * Desktop renders title-only when collapsed and expands description + tags.
 * Mobile/tablet (< 960px) renders the 4:3 photograph inside the expanded panel.
 */
export default function PracticeRow({
  item,
  index,
  totalCount,
  isActive,
  isDesktop,
  buttonRef,
  onSelect,
  onKeyDown,
}) {
  const tabId = `practice-tab-${item.id}`
  const panelId = `practice-panel-${item.id}`
  const paddedTotal = String(totalCount).padStart(2, '0')

  return (
    <div className={`${styles.rowItem} ${isActive ? styles.rowItemActive : ''}`}>
      <button
        ref={buttonRef}
        id={tabId}
        type="button"
        className={styles.rowButton}
        aria-expanded={isActive}
        aria-controls={panelId}
        onClick={() => onSelect(index)}
        onKeyDown={(e) => onKeyDown(e, index)}
      >
        <span className={styles.rowHeaderLeft}>
          <span className={styles.rowNum} aria-hidden="true">
            {item.number}
          </span>
          <h4 className={styles.rowTitle}>{item.title}</h4>
        </span>

        <svg
          className={styles.rowIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={tabId}
        className={`${styles.rowPanelOuter} ${
          isActive ? styles.rowPanelOuterOpen : ''
        }`}
      >
        <div className={styles.rowPanelInner}>
          <div className={styles.rowPanelContent}>
            {!isDesktop && (
              <div className={styles.mobileMedia}>
                <picture>
                  <source
                    srcSet={`images/${item.image}.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`images/${item.image}.jpg`}
                    alt={item.alt}
                    width={1024}
                    height={1024}
                    decoding="async"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
                <div className={styles.stageScrim} aria-hidden="true" />
                <div className={styles.stageIndexBadge} aria-hidden="true">
                  {item.number} / {paddedTotal}
                </div>
                <span className={styles.stageLabelPill}>{item.label}</span>
              </div>
            )}

            <p className={styles.rowDescription}>{item.description}</p>

            {item.tags && item.tags.length > 0 && (
              <p className={styles.rowTags}>
                {item.tags.map((tag, tagIdx) => (
                  <span key={tag} className={styles.tagItem}>
                    {tagIdx > 0 && (
                      <span className={styles.tagDot} aria-hidden="true">
                        {' '}·{' '}
                      </span>
                    )}
                    {tag}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
