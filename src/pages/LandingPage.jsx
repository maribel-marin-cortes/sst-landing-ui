import Hero from "../components/sections/Hero";
import QuienesSomos from "../components/sections/QuienesSomos";
import Historia from "../components/sections/Historia";
import Servicios from "../components/sections/Servicios";
import Equipo from "../components/sections/Equipo";
import ClientesLogos from "../components/sections/ClientesLogos";
import Contacto from "../components/sections/Contacto";
import { useFetch } from "../hooks/useFetch";
import { getHistoria, getEquipo, getClientes } from "../api/contenidoService";
import { fallbackHistoria, fallbackEquipo, fallbackClientes } from "../data/fallbackData";

export default function LandingPage({ config, servicios }) {
  const { data: historia } = useFetch(getHistoria, fallbackHistoria);
  const { data: equipo } = useFetch(getEquipo, fallbackEquipo);
  const { data: clientes } = useFetch(getClientes, fallbackClientes);

  return (
    <main>
      <Hero config={config} />
      <QuienesSomos config={config} />
      <Historia config={config} historia={historia} />
      <Servicios servicios={servicios} />
      <Equipo equipo={equipo} />
      <ClientesLogos clientes={clientes} />
      <Contacto config={config} />
    </main>
  );
}
