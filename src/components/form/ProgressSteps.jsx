import styles from './EnquiryForm.module.css'

/**
 * Slim 2-step progress indicator ("Step X of 2" + thin gold bar + labelled step dots).
 */
export default function ProgressSteps({ currentStep, onSelectStep }) {
  const steps = [
    { num: 1, label: 'About you' },
    { num: 2, label: 'Preferences' },
  ]

  const progressWidth = currentStep === 1 ? '50%' : '100%'

  return (
    <nav className={styles.progressWrap} aria-label="Enquiry form steps">
      <div className={styles.progressTopRow}>
        <span className={styles.stepCounter}>
          Step {currentStep} of 2
        </span>

        <div className={styles.stepDotsList}>
          {steps.map((s) => {
            const isCurrent = currentStep === s.num
            const isDone = currentStep > s.num

            return (
              <button
                key={s.num}
                type="button"
                className={styles.stepDotBtn}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => onSelectStep(s.num)}
              >
                <span
                  className={`${styles.dotCircle} ${
                    isDone ? styles.dotDone : ''
                  }`}
                  aria-hidden="true"
                />
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={2}
        aria-valuenow={currentStep}
      >
        <div
          className={styles.progressFill}
          style={{ width: progressWidth }}
        />
      </div>
    </nav>
  )
}

