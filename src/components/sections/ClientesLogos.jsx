import Reveal from "../ui/Reveal";

// Solo se renderiza si la lista de clientes no está vacía (viene vacía por
// defecto en muchos despliegues nuevos del backend hasta que se cargue el
// catálogo real de clientes).
export default function ClientesLogos({ clientes }) {
  const lista = [...(clientes || [])].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

  if (lista.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary-400">
          Empresas que confían en nosotros
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {lista.map((cliente) => {
            const contenido = cliente.logo ? (
              <img
                src={cliente.logo}
                alt={cliente.nombre}
                className="h-12 w-auto grayscale transition-all hover:grayscale-0"
              />
            ) : (
              <span className="rounded-lg border border-primary-100 px-4 py-2 text-sm font-semibold text-primary-500">
                {cliente.nombre}
              </span>
            );

            return cliente.url_sitio ? (
              <a key={cliente.id} href={cliente.url_sitio} target="_blank" rel="noreferrer">
                {contenido}
              </a>
            ) : (
              <div key={cliente.id}>{contenido}</div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
