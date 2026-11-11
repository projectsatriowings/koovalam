import styles from './EnquiryForm.module.css'

/**
 * Accessible selectable radio cards replacing native dropdowns for Pickup & Accommodation.
 * Built on native <input type="radio"> inside <fieldset>/<legend> for full keyboard & SR support.
 */
export default function ChoiceCards({
  name,
  legend,
  options,
  value,
  onChange,
  required = true,
  error = '',
}) {
  const errorId = error ? `${name}-error` : undefined

  return (
    <fieldset
      className={styles.fieldsetClean}
      aria-required={required ? 'true' : undefined}
      aria-describedby={errorId}
    >
      <legend className={styles.legendTitle}>
        <span>{legend}</span>
        {required && (
          <span className={styles.reqMark} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>

      <div className={styles.choiceCardsGrid}>
        {options.map((opt) => {
          const isSelected = value === opt.value
          const optId = `${name}-${opt.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={`${styles.choiceCard} ${
                isSelected ? styles.choiceCardSelected : ''
              }`}
            >
              <input
                type="radio"
                id={optId}
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className={styles.srRadioInput}
              />

              <div className={styles.choiceContent}>
                <span className={styles.choiceTitle}>{opt.title}</span>
                {opt.description && (
                  <span className={styles.choiceDesc}>{opt.description}</span>
                )}
              </div>

              <span className={styles.choiceIndicator} aria-hidden="true">
                {isSelected && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            </label>
          )
        })}
      </div>

      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </fieldset>
  )
}

