import ResumenPrecio from "./ResumenPrecio";

export default function PasoServicios({
  servicios,
  serviciosSeleccionados,
  onToggleServicio,
  cotizacion,
  calculando,
  errorCalculo,
  numeroEmpleadosVacio,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <p className="mb-3 text-sm font-medium text-primary-700">Selecciona los servicios que te interesan *</p>
        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {(servicios || []).map((servicio) => {
            const marcado = serviciosSeleccionados.includes(servicio.id);
            return (
              <label
                key={servicio.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors ${
                  marcado ? "border-accent-500 bg-accent-50" : "border-primary-200 hover:bg-primary-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() => onToggleServicio(servicio.id)}
                  className="mt-0.5 h-4 w-4 rounded border-primary-300 text-accent-600 focus:ring-accent-500"
                />
                <span>
                  <span className="block font-medium text-primary-900">{servicio.nombre}</span>
                  <span className="block text-xs text-primary-500">{servicio.descripcion_corta}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="md:sticky md:top-0 md:self-start">
        <p className="mb-3 text-sm font-medium text-primary-700">Resumen</p>
        <ResumenPrecio
          cotizacion={cotizacion}
          calculando={calculando}
          error={errorCalculo}
          serviciosVacios={serviciosSeleccionados.length === 0}
          empleadosVacios={numeroEmpleadosVacio}
        />
      </div>
    </div>
  );
}
