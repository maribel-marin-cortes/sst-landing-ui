import axios from "axios";

/**
 * Instancia axios compartida por todos los servicios de la API.
 *
 * `baseURL` viene de `VITE_API_URL` (ver `.env.example`); si no está
 * definida, cae al backend local por defecto en el puerto 8095.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8095/api",
  timeout: 8000,
});

export default apiClient;
