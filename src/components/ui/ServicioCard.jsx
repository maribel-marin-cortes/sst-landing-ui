import { useState } from "react";

function IconoServicio({ icono }) {
  if (!icono) {
    return <span className="text-2xl">🛡️</span>;
  }
  if (/^https?:\/\//.test(icono) || icono.startsWith("/")) {
    return <img src={icono} alt="" className="h-8 w-8 object-contain" />;
  }
  return <span className="text-2xl">{icono}</span>;
}

export default function ServicioCard({ servicio, onCotizar }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {servicio.destacado && (
        <span className="absolute -top-3 right-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow">
          Destacado
        </span>
      )}

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
        <IconoServicio icono={servicio.icono} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-primary-900">{servicio.nombre}</h3>
      <p className="mt-2 text-sm text-primary-600">{servicio.descripcion_corta}</p>

      {expandido && (
        <div className="mt-3 space-y-2 border-t border-primary-100 pt-3 text-sm text-primary-600">
          {servicio.descripcion_larga && <p>{servicio.descripcion_larga}</p>}
          {servicio.normativa && (
            <p className="text-xs font-medium text-primary-400">Normativa: {servicio.normativa}</p>
          )}
        </div>
      )}

      {(servicio.descripcion_larga || servicio.normativa) && (
        <button
          type="button"
          onClick={() => setExpandido((prev) => !prev)}
          className="mt-3 self-start text-xs font-semibold text-accent-600 hover:text-accent-700"
        >
          {expandido ? "Ver menos" : "Ver más"}
        </button>
      )}

      <div className="mt-auto pt-4">
        <button
          type="button"
          onClick={() => onCotizar(servicio.id)}
          className="w-full rounded-lg border border-accent-500 px-4 py-2 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-500 hover:text-white"
        >
          Cotizar este servicio
        </button>
      </div>
    </div>
  );
}
