import apiClient from "./client";

/** GET /api/cotizador/rangos-empleados/ — catálogo de rangos de número de empleados. */
export async function getRangosEmpleados() {
  const { data } = await apiClient.get("/cotizador/rangos-empleados/");
  return data;
}

/** GET /api/cotizador/niveles-riesgo/ — catálogo de niveles de riesgo ARL (I a V). */
export async function getNivelesRiesgo() {
  const { data } = await apiClient.get("/cotizador/niveles-riesgo/");
  return data;
}

/**
 * POST /api/cotizador/calcular/ — cálculo de cotización en vivo (sin persistir).
 * payload: { numero_empleados, nivel_riesgo_id, servicios: [id, ...] }
 */
export async function calcularCotizacion(payload) {
  const { data } = await apiClient.post("/cotizador/calcular/", payload);
  return data;
}

/**
 * POST /api/cotizador/solicitudes/ — crea la solicitud de cotización definitiva
 * (persistida, dispara el flujo comercial). Incluye el honeypot `website`.
 */
export async function crearSolicitud(payload) {
  const { data } = await apiClient.post("/cotizador/solicitudes/", payload);
  return data;
}

/**
 * POST /api/contacto/mensajes/ — formulario corto de contacto general.
 * Incluye el honeypot `website`.
 */
export async function enviarMensajeContacto(payload) {
  const { data } = await apiClient.post("/contacto/mensajes/", payload);
  return data;
}
