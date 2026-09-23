import apiClient from "./client";

/** GET /api/config/ — datos generales del sitio (empresa, hero, contacto, redes). */
export async function getConfig() {
  const { data } = await apiClient.get("/config/");
  return data;
}

/** GET /api/historia/ — hitos de la línea de tiempo de la empresa. */
export async function getHistoria() {
  const { data } = await apiClient.get("/historia/");
  return data;
}

/** GET /api/equipo/ — miembros del equipo a mostrar en la sección "Equipo". */
export async function getEquipo() {
  const { data } = await apiClient.get("/equipo/");
  return data;
}

/** GET /api/servicios/ — catálogo de servicios ofrecidos. */
export async function getServicios() {
  const { data } = await apiClient.get("/servicios/");
  return data;
}

/** GET /api/clientes/ — logos de clientes; puede venir vacío. */
export async function getClientes() {
  const { data } = await apiClient.get("/clientes/");
  return data;
}
