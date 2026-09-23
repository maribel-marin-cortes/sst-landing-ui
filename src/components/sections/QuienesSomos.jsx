import Reveal from "../ui/Reveal";

export default function QuienesSomos({ config }) {
  return (
    <section id="quienes-somos" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-900">Quiénes somos</h2>
          <p className="mt-3 text-primary-600">
            {config?.nombre_empresa || "SST Gestión Integral"}: gestión humana y seguridad y salud en el
            trabajo, en un solo aliado.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal delay={0} className="rounded-2xl border border-primary-100 bg-primary-50 p-8">
            <h3 className="text-lg font-bold text-primary-900">Misión</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-700">
              {config?.mision || "Cargando misión..."}
            </p>
          </Reveal>
          <Reveal delay={120} className="rounded-2xl border border-primary-100 bg-primary-50 p-8">
            <h3 className="text-lg font-bold text-primary-900">Visión</h3>
            <p className="mt-3 text-sm leading-relaxed text-primary-700">
              {config?.vision || "Cargando visión..."}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
