import { useState, useEffect } from 'react'
import { COUNTRY_CODES } from '../../data/enquiryOptions.js'
import styles from './EnquiryForm.module.css'

/**
 * Validates combined or split phone number.
 * +91 requires exact 10 digits (spaces/dashes stripped); other codes accept 7–15 digits.
 */
export function validatePhoneNumber(combinedValue) {
  const raw = (combinedValue || '').trim()
  if (!raw) {
    return 'Please add a number we can reach on WhatsApp.'
  }

  // Separate known or generic +XXX prefix if separated by space
  if (raw.startsWith('+91')) {
    const restDigits = raw.slice(3).replace(/\D/g, '')
    if (restDigits.length !== 10) {
      return 'Please enter a valid 10-digit Indian mobile or WhatsApp number.'
    }
    return ''
  }

  // Other international code: extract local digits after "+<code> "
  const spaceIdx = raw.indexOf(' ')
  const localDigits =
    spaceIdx > 0 ? raw.slice(spaceIdx + 1).replace(/\D/g, '') : raw.replace(/\D/g, '')

  if (localDigits.length < 7 || localDigits.length > 15) {
    return 'Please enter a valid WhatsApp or mobile number (7–15 digits).'
  }

  return ''
}

/**
 * Joined country-code prefix selector (+91 default) + WhatsApp/mobile input.
 * Syncs smoothly to a single canonical `phone` string for form payload compatibility.
 */
export default function PhoneField({
  id = 'phone',
  label = 'WhatsApp / Mobile Number',
  value = '',
  onChange,
  onBlur,
  error = '',
  inputRef,
  onKeyDown,
}) {
  const [countryCode, setCountryCode] = useState('+91')
  const [isCustomCode, setIsCustomCode] = useState(false)
  const [localNumber, setLocalNumber] = useState('')

  // Sync external resets (e.g. "Send another enquiry") cleanly
  useEffect(() => {
    if (!value) {
      setLocalNumber('')
    }
  }, [value])

  const emitCombined = (code, number) => {
    const cleanNum = number.trim()
    const cleanCode = code.startsWith('+') ? code.trim() : `+${code.trim()}`
    const nextValue = cleanNum ? `${cleanCode} ${cleanNum}` : ''
    onChange(nextValue)
  }

  const handleSelectChange = (e) => {
    const chosen = e.target.value
    if (chosen === 'OTHER') {
      setIsCustomCode(true)
      setCountryCode('+')
      emitCombined('+', localNumber)
      return
    }
    setIsCustomCode(false)
    setCountryCode(chosen)
    emitCombined(chosen, localNumber)
  }

  const handleCustomCodeChange = (e) => {
    let val = e.target.value.replace(/[^\d+]/g, '')
    if (!val.startsWith('+')) val = '+' + val.replace(/\+/g, '')
    if (val.length > 5) val = val.slice(0, 5)
    setCountryCode(val)
    emitCombined(val, localNumber)
  }

  const handleLocalChange = (e) => {
    let raw = e.target.value

    // Smart handling for browser autofill starting with known country code
    if (raw.trim().startsWith('+')) {
      const matched = COUNTRY_CODES.find((c) => raw.trim().startsWith(c.code))
      if (matched) {
        const stripped = raw.trim().slice(matched.code.length).trim()
        setIsCustomCode(false)
        setCountryCode(matched.code)
        setLocalNumber(stripped)
        emitCombined(matched.code, stripped)
        return
      }
    }

    setLocalNumber(raw)
    emitCombined(countryCode, raw)
  }

  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.fieldLabel}>
        <span>{label}</span>
        <span className={styles.reqMark} aria-hidden="true">
          {' '}
          *
        </span>
      </label>

      <div
        className={`${styles.phoneJoined} ${error ? styles.phoneJoinedError : ''}`}
      >
        {isCustomCode ? (
          <input
            type="text"
            aria-label="Custom country calling code"
            value={countryCode}
            onChange={handleCustomCodeChange}
            placeholder="+44"
            className={styles.countryCodeSelect}
            style={{ width: '74px', textAlign: 'center' }}
          />
        ) : (
          <select
            aria-label="Country calling code"
            value={countryCode}
            onChange={handleSelectChange}
            className={styles.countryCodeSelect}
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.shortLabel}
              </option>
            ))}
            <option value="OTHER">Other</option>
          </select>
        )}

        <input
          ref={inputRef}
          type="tel"
          id={id}
          name="phone"
          required
          autoComplete="tel-national"
          value={localNumber}
          onChange={handleLocalChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={countryCode === '+91' ? '98765 43210' : 'Your phone number'}
          aria-required="true"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          className={styles.phoneLocalInput}
        />
      </div>

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

