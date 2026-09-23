function iniciales(nombre) {
  if (!nombre) return "?";
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0]?.toUpperCase())
    .join("");
}

export default function MiembroEquipoCard({ miembro }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm">
      {miembro.foto ? (
        <img
          src={miembro.foto}
          alt={miembro.nombre}
          className="h-24 w-24 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-900 text-xl font-bold text-white">
          {iniciales(miembro.nombre)}
        </div>
      )}

      <h3 className="mt-4 text-base font-bold text-primary-900">{miembro.nombre}</h3>
      <p className="text-sm font-medium text-accent-600">{miembro.cargo}</p>
      {miembro.profesion && <p className="mt-1 text-xs text-primary-500">{miembro.profesion}</p>}
      {miembro.tarjeta_profesional && (
        <p className="text-xs text-primary-400">T.P. {miembro.tarjeta_profesional}</p>
      )}
      {miembro.bio && <p className="mt-3 text-sm text-primary-600">{miembro.bio}</p>}

      {miembro.linkedin_url && (
        <a
          href={miembro.linkedin_url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-xs font-semibold text-primary-600 hover:text-accent-600"
        >
          LinkedIn
        </a>
      )}
    </div>
  );
}
