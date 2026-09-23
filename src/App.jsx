import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppFloatingButton from "./components/ui/WhatsAppFloatingButton";
import LandingPage from "./pages/LandingPage";
import CotizadorPage from "./pages/CotizadorPage";
import { useFetch } from "./hooks/useFetch";
import { getConfig, getServicios } from "./api/contenidoService";
import { fallbackConfig, fallbackServicios } from "./data/fallbackData";

export default function App() {
  const location = useLocation();
  const { data: config } = useFetch(getConfig, fallbackConfig);
  const { data: servicios } = useFetch(getServicios, fallbackServicios);

  return (
    <>
      <Navbar config={config} />

      <Routes>
        <Route path="/" element={<LandingPage config={config} servicios={servicios} />} />
        <Route
          path="/cotizar"
          element={<CotizadorPage key={location.key} servicios={servicios} config={config} />}
        />
      </Routes>

      <Footer config={config} />
      <WhatsAppFloatingButton numero={config?.whatsapp_numero} />
    </>
  );
}
