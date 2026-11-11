import styles from './Practices.module.css'

/**
 * Single reassurance row displayed once beneath the section subline,
 * avoiding repeated qualifiers on each individual practice row.
 */
export default function ReassuranceStrip({ items }) {
  return (
    <ul className={styles.reassuranceStrip} aria-label="Practice approach">
      {items.map((text) => (
        <li key={text} className={styles.reassuranceItem}>
          <svg
            className={styles.reassuranceCheck}
            width="14"
            height="14"
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
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

