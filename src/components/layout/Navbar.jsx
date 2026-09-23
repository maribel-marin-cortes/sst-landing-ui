import { useState } from "react";
import { Link } from "react-router-dom";

// Los links de sección usan "/#ancla": si ya se está en "/" el navegador hace
// scroll suave en el mismo documento (sin recargar); si se está en otra
// ruta (ej. /cotizar) hace una navegación normal a "/" y salta al ancla.
const ENLACES = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#quienes-somos", label: "Quiénes somos" },
  { href: "/#historia", label: "Historia" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar({ config }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function handleNavClick() {
    setMenuAbierto(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/#inicio" className="flex items-center gap-2 font-bold text-primary-900">
          {config?.logo ? (
            <img src={config.logo} alt={config?.nombre_empresa || "Logo"} className="h-9 w-auto" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-900 text-sm font-extrabold text-white">
              {(config?.nombre_empresa || "SST").slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="hidden text-base sm:inline">{config?.nombre_empresa || "SST Gestión Integral"}</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {ENLACES.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="text-sm font-medium text-primary-700 transition-colors hover:text-accent-600"
            >
              {enlace.label}
            </a>
          ))}
          <Link
            to="/cotizar"
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            Cotizar Ahora
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-800 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((prev) => !prev)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {menuAbierto && (
        <div className="border-t border-primary-100 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={handleNavClick}
                className="text-sm font-medium text-primary-700 hover:text-accent-600"
              >
                {enlace.label}
              </a>
            ))}
            <Link
              to="/cotizar"
              onClick={handleNavClick}
              className="w-full rounded-lg bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
            >
              Cotizar Ahora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
