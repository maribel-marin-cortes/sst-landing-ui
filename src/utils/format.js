/** Formatea un número como pesos colombianos, sin decimales (ej. $1.250.000). */
export function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "";
  }
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

/** Valida un formato de email simple (suficiente para validación de UI, no exhaustivo). */
export function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());
}

/** Construye un enlace wa.me a partir de un número (con o sin '+') y un texto opcional. */
export function construirEnlaceWhatsApp(numero, mensaje) {
  if (!numero) return null;
  const numeroLimpio = String(numero).replace(/[^\d]/g, "");
  if (!numeroLimpio) return null;
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : "";
  return `https://wa.me/${numeroLimpio}${texto}`;
}
