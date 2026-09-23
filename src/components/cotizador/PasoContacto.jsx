export default function PasoContacto({ formContacto, onChange }) {
  function handleChange(e) {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-4">
      {/* Honeypot anti-spam: campo oculto, siempre vacío para personas reales */}
      <input
        type="text"
        name="website"
        value=""
        onChange={() => {}}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nombre_contacto" className="mb-1 block text-sm font-medium text-primary-700">
          Nombre de contacto *
        </label>
        <input
          id="nombre_contacto"
          name="nombre_contacto"
          type="text"
          required
          value={formContacto.nombre_contacto}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label htmlFor="cargo_contacto" className="mb-1 block text-sm font-medium text-primary-700">
          Cargo
        </label>
        <input
          id="cargo_contacto"
          name="cargo_contacto"
          type="text"
          value={formContacto.cargo_contacto}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Ej. Gerente de RRHH"
        />
      </div>

      <div>
        <label htmlFor="email_contacto" className="mb-1 block text-sm font-medium text-primary-700">
          Email *
        </label>
        <input
          id="email_contacto"
          name="email_contacto"
          type="email"
          required
          value={formContacto.email_contacto}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="tu@empresa.com"
        />
      </div>

      <div>
        <label htmlFor="telefono_contacto" className="mb-1 block text-sm font-medium text-primary-700">
          Teléfono
        </label>
        <input
          id="telefono_contacto"
          name="telefono_contacto"
          type="tel"
          value={formContacto.telefono_contacto}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="300 000 0000"
        />
      </div>

      <div>
        <label htmlFor="comentario" className="mb-1 block text-sm font-medium text-primary-700">
          Comentario (opcional)
        </label>
        <textarea
          id="comentario"
          name="comentario"
          rows={3}
          value={formContacto.comentario}
          onChange={handleChange}
          className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder="Cuéntanos algo más sobre lo que necesitas..."
        />
      </div>
    </div>
  );
}
