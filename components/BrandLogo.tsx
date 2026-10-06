export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 380" className={className} role="img" aria-label="Personalised Planet">
      <path d="M58 86l3.2 8.2 8.2 3.2-8.2 3.2L58 109l-3.2-8.4-8.2-3.2 8.2-3.2L58 86z" fill="#F3C63A" />
      <path d="M248 58l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4L248 58z" fill="#F6D56A" />
      <path d="M86 118l1.6 4.2 4.2 1.6-4.2 1.6-1.6 4.2-1.6-4.2-4.2-1.6 4.2-1.6L86 118z" fill="#F8C9DE" />
      <path d="M232 132h8M236 128v8" stroke="#F3C63A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M78 146h6M81 143v6" stroke="#F6B7D0" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M160 92c-18-28-52-16-40 10 8 16 22 20 40 8 18 12 32 8 40-8 12-26-22-38-40-10z"
        fill="#F7B4D0"
      />
      <path d="M148 104c8 6 16 6 24 0" stroke="#E989B0" strokeWidth="3" strokeLinecap="round" />
      <circle cx="160" cy="108" r="6" fill="#F48FB8" />
      <rect x="86" y="112" width="148" height="132" rx="10" fill="#fff" stroke="#F0C43A" strokeWidth="7" />
      <path d="M86 158h148M160 112v132" stroke="#F0C43A" strokeWidth="7" />
      <text
        x="160"
        y="300"
        textAnchor="middle"
        fill="#2F2A28"
        fontFamily="var(--font-outfit), Nunito, sans-serif"
        fontSize="34"
        fontWeight="600"
      >
        Personalised
      </text>
      <text
        x="160"
        y="342"
        textAnchor="middle"
        fill="#2F2A28"
        fontFamily="var(--font-outfit), Nunito, sans-serif"
        fontSize="34"
        fontWeight="600"
      >
        Planet
      </text>
    </svg>
  );
}
