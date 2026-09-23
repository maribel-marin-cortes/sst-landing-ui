import { construirEnlaceWhatsApp } from "../../utils/format";

const MENSAJE_DEFECTO = "Hola, quiero más información sobre sus servicios de Gestión Humana y SST.";

export default function WhatsAppFloatingButton({ numero }) {
  const enlace = construirEnlaceWhatsApp(numero, MENSAJE_DEFECTO);

  if (!enlace) return null;

  return (
    <a
      href={enlace}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.31.64 4.47 1.75 6.32L4 29l7.86-1.7A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.8c-1.95 0-3.79-.52-5.38-1.44l-.39-.22-4.67 1.01 1-4.55-.25-.4A9.76 9.76 0 0 1 5.2 15c0-5.96 4.85-10.8 10.8-10.8 5.96 0 10.8 4.84 10.8 10.8 0 5.96-4.84 10.8-10.8 10.8Zm5.9-8.1c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.09 1.31 3.3.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
      </svg>
    </a>
  );
}
