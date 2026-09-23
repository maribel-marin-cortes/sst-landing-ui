import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Puerto de desarrollo FIJO en 5175: 5173 y 5174 ya están reservados por
// proyectos hermanos de este mismo desarrollador (portfolio-ui y otros
// standalone en la misma máquina), así que sst-landing-ui, también
// standalone, reserva 5175 para evitar choques al levantar varios repos
// en paralelo.
export default defineConfig({
  plugins: [react()],
  server: { port: 5175 },
  preview: { port: 5175 },
});
