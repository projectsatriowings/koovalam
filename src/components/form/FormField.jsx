import styles from './EnquiryForm.module.css'

/**
 * Reusable accessible form field wrapper with calm label, optional/required
 * indicator, optional helper text, and role="alert" inline error slot.
 */
export default function FormField({
  id,
  label,
  required = false,
  optional = false,
  helperText = '',
  error = '',
  children,
}) {
  const helperId = helperText ? `${id}-helper` : null
  const errorId = error ? `${id}-error` : null

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.fieldLabel}>
        <span>{label}</span>
        {required && (
          <span className={styles.reqMark} aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {optional && !required && (
          <span className={styles.optionalMark}> (Optional)</span>
        )}
      </label>

      {children({
        id,
        'aria-required': required ? 'true' : undefined,
        'aria-invalid': error ? 'true' : 'false',
        'aria-describedby':
          [helperId, errorId].filter(Boolean).join(' ') || undefined,
      })}

      {helperText && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}

      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </span>
      )}
    </div>
  )
}

