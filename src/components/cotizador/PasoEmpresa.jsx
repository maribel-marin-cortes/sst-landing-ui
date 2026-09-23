const SECTORES = ["Comercio", "Servicios", "Industria", "Construcción", "Otro"];

export default function PasoEmpresa({ formEmpresa, onChange, nivelesRiesgo }) {
  function handleChange(e) {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="nombre_empresa" className="mb-1 block text-sm font-medium text-primary-700">
          Nombre de la empresa *
        </label>
        <input
          id="nombre_empresa"
          name="nombre_empresa"
          type="text"
          required
          value={formEmpresa.nombre_empresa}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Razón social"
        />
      </div>

      <div>
        <label htmlFor="nit" className="mb-1 block text-sm font-medium text-primary-700">
          NIT (opcional)
        </label>
        <input
          id="nit"
          name="nit"
          type="text"
          value={formEmpresa.nit}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="900.000.000-0"
        />
      </div>

      <div>
        <label htmlFor="sector" className="mb-1 block text-sm font-medium text-primary-700">
          Sector
        </label>
        <select
          id="sector"
          name="sector"
          value={formEmpresa.sector}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          <option value="">Selecciona un sector</option>
          {SECTORES.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numero_empleados" className="mb-1 block text-sm font-medium text-primary-700">
          Número de empleados *
        </label>
        <input
          id="numero_empleados"
          name="numero_empleados"
          type="number"
          min="1"
          required
          value={formEmpresa.numero_empleados}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Ej. 25"
        />
      </div>

      <div>
        <label htmlFor="nivel_riesgo_id" className="mb-1 block text-sm font-medium text-primary-700">
          Nivel de riesgo ARL
        </label>
        <select
          id="nivel_riesgo_id"
          name="nivel_riesgo_id"
          value={formEmpresa.nivel_riesgo_id}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          <option value="">No estoy seguro</option>
          {(nivelesRiesgo || []).map((nivel) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.nivel} — {nivel.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
