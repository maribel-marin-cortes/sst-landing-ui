import Reveal from "../ui/Reveal";

export default function Historia({ config, historia }) {
  const hitos = [...(historia || [])].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

  return (
    <section id="historia" className="bg-primary-50 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-900">
            {config?.historia_titulo || "Nuestra historia"}
          </h2>
          {config?.historia_texto && <p className="mt-3 text-primary-600">{config.historia_texto}</p>}
        </Reveal>

        {hitos.length > 0 && (
          <ol className="mt-14 space-y-10 border-l-2 border-primary-200 pl-8">
            {hitos.map((hito, idx) => (
              <Reveal key={`${hito.anio}-${idx}`} as="li" delay={Math.min(idx, 5) * 80} className="relative">
                <span className="absolute -left-[2.35rem] flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white ring-4 ring-primary-50">
                  {idx + 1}
                </span>
                <p className="text-sm font-bold uppercase tracking-wide text-accent-600">{hito.anio}</p>
                <h3 className="mt-1 text-lg font-bold text-primary-900">{hito.titulo}</h3>
                <p className="mt-1 text-sm text-primary-600">{hito.descripcion}</p>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
