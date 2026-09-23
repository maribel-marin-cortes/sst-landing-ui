export default function Footer({ config }) {
  const anio = new Date().getFullYear();

  const redes = [
    { url: config?.facebook_url, label: "Facebook" },
    { url: config?.instagram_url, label: "Instagram" },
    { url: config?.linkedin_url, label: "LinkedIn" },
  ].filter((red) => red.url);

  return (
    <footer className="bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-bold text-white">{config?.nombre_empresa || "SST Gestión Integral"}</h3>
          {config?.eslogan && <p className="mt-2 text-sm text-primary-300">{config.eslogan}</p>}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-300">Navegación</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#quienes-somos" className="hover:text-accent-400">Quiénes somos</a></li>
            <li><a href="#servicios" className="hover:text-accent-400">Servicios</a></li>
            <li><a href="#equipo" className="hover:text-accent-400">Equipo</a></li>
            <li><a href="#contacto" className="hover:text-accent-400">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-300">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {config?.correo_contacto && (
              <li>
                <a href={`mailto:${config.correo_contacto}`} className="hover:text-accent-400">
                  {config.correo_contacto}
                </a>
              </li>
            )}
            {config?.telefono && (
              <li>
                <a href={`tel:${config.telefono}`} className="hover:text-accent-400">
                  {config.telefono}
                </a>
              </li>
            )}
            {config?.direccion && <li className="text-primary-300">{config.direccion}</li>}
          </ul>

          {redes.length > 0 && (
            <div className="mt-4 flex gap-4">
              {redes.map((red) => (
                <a
                  key={red.label}
                  href={red.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary-300 hover:text-accent-400"
                >
                  {red.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-primary-800 px-4 py-4 text-center text-xs text-primary-400 sm:px-6 lg:px-8">
        © {anio} {config?.nombre_empresa || "SST Gestión Integral"}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
