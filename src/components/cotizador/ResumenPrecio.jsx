import { formatCurrency } from "../../utils/format";

/**
 * Componente presentacional: solo pinta lo que recibe. No dispara llamadas
 * a la API ni conoce el debounce — eso vive en CotizadorPage.
 */
export default function ResumenPrecio({ cotizacion, calculando, error, serviciosVacios, empleadosVacios }) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
    );
  }

  if (empleadosVacios || serviciosVacios) {
    return (
      <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50 p-4 text-sm text-primary-500">
        {serviciosVacios
          ? "Selecciona al menos un servicio para ver el estimado."
          : "Ingresa el número de empleados para ver el estimado."}
      </div>
    );
  }

  if (!cotizacion && calculando) {
    return (
      <div className="rounded-xl border border-primary-100 bg-white p-4 text-sm text-primary-500">
        Calculando cotización...
      </div>
    );
  }

  if (!cotizacion) {
    return (
      <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50 p-4 text-sm text-primary-500">
        El resumen aparecerá aquí.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-primary-100 bg-white p-4">
      {calculando && (
        <p className="mb-3 text-xs font-medium text-accent-600">Actualizando cotización...</p>
      )}

      <ul className="space-y-2">
        {cotizacion.items?.map((item) => (
          <li key={item.servicio_id} className="flex items-start justify-between gap-3 text-sm">
            <span className="text-primary-700">{item.servicio_nombre}</span>
            <span className="whitespace-nowrap font-semibold text-primary-900">
              {item.personalizado || item.precio === null ? "Cotización personalizada" : formatCurrency(item.precio)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1 border-t border-primary-100 pt-3 text-sm">
        <div className="flex justify-between text-primary-600">
          <span>Subtotal</span>
          <span>{formatCurrency(cotizacion.subtotal)}</span>
        </div>
        <div className="flex justify-between text-lg font-extrabold text-primary-900">
          <span>Total estimado</span>
          <span>{formatCurrency(cotizacion.total)}</span>
        </div>
      </div>

      {(cotizacion.rango_empleados || cotizacion.nivel_riesgo) && (
        <p className="mt-3 text-xs text-primary-400">
          {cotizacion.rango_empleados && <>Rango: {cotizacion.rango_empleados} · </>}
          {cotizacion.nivel_riesgo && <>Riesgo: {cotizacion.nivel_riesgo}</>}
        </p>
      )}
    </div>
  );
}
