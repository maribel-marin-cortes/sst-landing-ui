function IconoEscudoCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2 L20 5.5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5.5 Z"
      />
      <path
        d="M8.5 12 L11 14.5 L16 9"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconoCasco({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M4 16 Q4 6 12 6 Q20 6 20 16 Z" />
      <rect x="2" y="16" width="20" height="3" rx="1.5" fill="currentColor" />
      <rect x="11" y="3" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

function IconoChecklist({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1.5" width="6" height="3" rx="1" fill="currentColor" />
      <path
        d="M7.5 9 L9 10.5 L12 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="13.5" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7.5 15 L9 16.5 L12 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="13.5" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Ilustración por defecto del Hero (escudo de seguridad + casco + checklist)
 * para cuando ConfiguracionSitio.hero_imagen todavía no tiene una foto real
 * cargada desde /admin.
 */
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-[3rem] bg-accent-50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <IconoEscudoCheck className="h-40 w-40 text-accent-500 drop-shadow-sm" />
      </div>

      <div className="absolute -top-4 right-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg sm:right-10">
        <IconoCasco className="h-10 w-10 text-primary-700" />
      </div>

      <div className="absolute bottom-4 -left-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg sm:left-2">
        <IconoChecklist className="h-10 w-10 text-primary-700" />
      </div>
    </div>
  );
}
