import { useNavigate } from "react-router-dom";
import ServicioCard from "../ui/ServicioCard";
import Reveal from "../ui/Reveal";

export default function Servicios({ servicios }) {
  const navigate = useNavigate();
  const lista = [...(servicios || [])].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

  function irACotizar(servicioId) {
    navigate("/cotizar", { state: { servicioId } });
  }

  return (
    <section id="servicios" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-900">Nuestros servicios</h2>
          <p className="mt-3 text-primary-600">
            Un portafolio integral para que la gestión humana y la SST de tu empresa estén siempre al día.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((servicio, idx) => (
            <Reveal key={servicio.id} delay={Math.min(idx, 5) * 80}>
              <ServicioCard servicio={servicio} onCotizar={irACotizar} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
