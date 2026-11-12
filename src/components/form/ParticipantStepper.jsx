import { useEffect, useState } from 'react'
import styles from './EnquiryForm.module.css'

const MIN_PARTICIPANTS = 1
const MAX_PARTICIPANTS = 50

function parseParticipantCount(value) {
  const match = String(value || '').match(/\d+/)
  const parsed = match ? parseInt(match[0], 10) : 1
  if (Number.isNaN(parsed)) return MIN_PARTICIPANTS
  return Math.min(MAX_PARTICIPANTS, Math.max(MIN_PARTICIPANTS, parsed))
}

function formatParticipantValue(count) {
  return count === 1 ? '1 Person' : `${count} People`
}

/**
 * Exact guest count control pairing accessible − / + stepper buttons
 * with direct numeric input (1–50 guests) so organisers always receive
 * the exact headcount.
 */
export default function ParticipantStepper({
  value,
  onChange,
  label = 'Number of Participants',
  horizontal = false,
}) {
  const count = parseParticipantCount(value)
  const [draft, setDraft] = useState(String(count))

  useEffect(() => {
    setDraft(String(count))
  }, [count])

  const adjustBy = (delta) => {
    onChange((prevVal) => {
      const current = parseParticipantCount(prevVal)
      const next = Math.min(MAX_PARTICIPANTS, Math.max(MIN_PARTICIPANTS, current + delta))
      return formatParticipantValue(next)
    })
  }

  const handleDecrement = () => {
    adjustBy(-1)
  }

  const handleIncrement = () => {
    adjustBy(1)
  }

  const commitCount = (next) => {
    const clamped = Math.min(MAX_PARTICIPANTS, Math.max(MIN_PARTICIPANTS, next))
    setDraft(String(clamped))
    onChange(formatParticipantValue(clamped))
  }

  const handleInputChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '')
    setDraft(digitsOnly)
    if (!digitsOnly) return
    const num = parseInt(digitsOnly, 10)
    if (!Number.isNaN(num) && num >= MIN_PARTICIPANTS && num <= MAX_PARTICIPANTS) {
      onChange(formatParticipantValue(num))
    }
  }

  const handleInputBlur = () => {
    const num = parseInt(draft, 10)
    if (Number.isNaN(num) || num < MIN_PARTICIPANTS) {
      commitCount(MIN_PARTICIPANTS)
    } else if (num > MAX_PARTICIPANTS) {
      commitCount(MAX_PARTICIPANTS)
    } else {
      commitCount(num)
    }
  }

  const unitLabel = count === 1 ? 'Person' : 'People'

  const labelContent = (
    <>
      <span>{label}</span>
      <span className={styles.reqMark} aria-hidden="true">
        {' '}
        *
      </span>
    </>
  )

  const stepperControl = (
    <div className={styles.stepperBar} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.stepBtn}
        onClick={handleDecrement}
        disabled={count <= MIN_PARTICIPANTS}
        aria-label="Decrease number of participants"
      >
        −
      </button>

      <div className={styles.stepperValueWrap}>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label="Exact number of participants"
          value={draft}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          maxLength={2}
          className={styles.stepperNumberInput}
        />
        <span className={styles.stepperUnit} aria-hidden="true">
          {unitLabel}
        </span>
      </div>

      <button
        type="button"
        className={styles.stepBtn}
        onClick={handleIncrement}
        disabled={count >= MAX_PARTICIPANTS}
        aria-label="Increase number of participants"
      >
        +
      </button>
    </div>
  )

  if (horizontal) {
    return (
      <div className={styles.stepperHorizontalRow}>
        <div className={styles.stepperHorizontalLabel}>{labelContent}</div>
        <input
          type="hidden"
          name="participants"
          value={formatParticipantValue(count)}
        />
        {stepperControl}
      </div>
    )
  }

  return (
    <fieldset className={styles.fieldsetClean}>
      <legend className={styles.legendTitle}>{labelContent}</legend>

      {/* Preserves form field name & exact count string */}
      <input
        type="hidden"
        name="participants"
        value={formatParticipantValue(count)}
      />

      <div className={styles.stepperContainer}>{stepperControl}</div>
    </fieldset>
  )
}
