import { Link } from "react-router-dom";
import HeroIllustration from "../ui/HeroIllustration";

export default function Hero({ config }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-primary-50 pt-16 text-primary-900">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div className="flex flex-col items-start gap-6">
          {config?.eslogan && (
            <span className="rounded-full bg-accent-50 px-4 py-1 text-sm font-medium text-accent-700">
              {config.eslogan}
            </span>
          )}

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-primary-900 sm:text-5xl">
            {config?.hero_titulo || "Gestión Humana y Seguridad y Salud en el Trabajo"}
          </h1>

          <p className="max-w-xl text-lg text-primary-600">
            {config?.hero_subtitulo ||
              "Diseñamos, implementamos y mantenemos tu Sistema de Gestión de Seguridad y Salud en el Trabajo."}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/cotizar"
              className="rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-accent-600"
            >
              Cotizar Ahora
            </Link>
            <a
              href="/#servicios"
              className="rounded-lg border border-primary-300 px-6 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <div>
          {config?.hero_imagen ? (
            <img
              src={config.hero_imagen}
              alt=""
              className="mx-auto aspect-square w-full max-w-md rounded-[3rem] object-cover shadow-lg"
            />
          ) : (
            <HeroIllustration />
          )}
        </div>
      </div>
    </section>
  );
}
