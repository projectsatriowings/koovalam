/**
 * Crisp WhatsApp bubble-and-handset vector icon for direct enquiry buttons.
 */
export default function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.51 16.2A9 9 0 1 1 7.8 19.49L3.1 20.7l1.41-4.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 8.2c-.2-.45-.42-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.9 3.04 4.69 4.14 2.32.92 2.79.74 3.29.69.5-.05 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.11-.25-.18-.52-.32-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.08-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.6-1.49-.84-2.04Z"
        fill="currentColor"
        transform="translate(-0.2 -0.45) scale(0.96)"
        style={{ transformOrigin: '12.3px 11.7px' }}
      />
    </svg>
  )
}
