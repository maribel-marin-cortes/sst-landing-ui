import MiembroEquipoCard from "../ui/MiembroEquipoCard";
import Reveal from "../ui/Reveal";

export default function Equipo({ equipo }) {
  const lista = [...(equipo || [])].sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));

  return (
    <section id="equipo" className="bg-primary-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-900">Nuestro equipo</h2>
          <p className="mt-3 text-primary-600">
            Profesionales certificados, listos para acompañar el cumplimiento normativo de tu empresa.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {lista.map((miembro, idx) => (
            <Reveal key={miembro.id} delay={Math.min(idx, 5) * 80}>
              <MiembroEquipoCard miembro={miembro} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
