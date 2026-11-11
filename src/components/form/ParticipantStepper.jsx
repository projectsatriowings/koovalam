import { PARTICIPANT_OPTIONS } from '../../data/enquiryOptions.js'
import styles from './EnquiryForm.module.css'

/**
 * Accessible − / count / + stepper paired with a direct "4 or more" pill.
 * Emits exact canonical strings expected by the backend email payload.
 */
export default function ParticipantStepper({
  value,
  onChange,
  label = 'Number of Participants',
}) {
  const currentIndex = Math.max(
    0,
    PARTICIPANT_OPTIONS.findIndex((o) => o.value === value)
  )
  const currentOption = PARTICIPANT_OPTIONS[currentIndex] || PARTICIPANT_OPTIONS[0]
  const groupOption =
    PARTICIPANT_OPTIONS.find((o) => o.isGroup) ||
    PARTICIPANT_OPTIONS[PARTICIPANT_OPTIONS.length - 1]

  const isGroupSelected = currentOption.value === groupOption.value
  const isAtMin = currentIndex <= 0
  const isAtMax = currentIndex >= PARTICIPANT_OPTIONS.length - 1

  const handleDecrement = () => {
    if (!isAtMin) {
      onChange(PARTICIPANT_OPTIONS[currentIndex - 1].value)
    }
  }

  const handleIncrement = () => {
    if (!isAtMax) {
      onChange(PARTICIPANT_OPTIONS[currentIndex + 1].value)
    }
  }

  const handleToggleGroup = () => {
    if (isGroupSelected) {
      onChange(PARTICIPANT_OPTIONS[0].value)
    } else {
      onChange(groupOption.value)
    }
  }

  return (
    <fieldset className={styles.fieldsetClean}>
      <legend className={styles.legendTitle}>
        <span>{label}</span>
        <span className={styles.reqMark} aria-hidden="true">
          {' '}
          *
        </span>
      </legend>

      {/* Preserves form field name & canonical value */}
      <input type="hidden" name="participants" value={currentOption.value} />

      <div className={styles.stepperContainer}>
        <div className={styles.stepperBar} role="group" aria-label={label}>
          <button
            type="button"
            className={styles.stepBtn}
            onClick={handleDecrement}
            disabled={isAtMin}
            aria-label="Decrease number of participants"
          >
            −
          </button>

          <span className={styles.stepperValue} aria-live="polite">
            {currentOption.label}
          </span>

          <button
            type="button"
            className={styles.stepBtn}
            onClick={handleIncrement}
            disabled={isAtMax}
            aria-label="Increase number of participants"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={`${styles.groupPillBtn} ${
            isGroupSelected ? styles.groupPillActive : ''
          }`}
          aria-pressed={isGroupSelected}
          onClick={handleToggleGroup}
        >
          4 or more (Group)
        </button>
      </div>

      <p className={styles.stepperHint}>{currentOption.shortDesc}</p>
    </fieldset>
  )
}

