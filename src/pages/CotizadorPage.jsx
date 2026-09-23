import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getNivelesRiesgo, calcularCotizacion, crearSolicitud } from "../api/cotizadorService";
import { fallbackNivelesRiesgo } from "../data/fallbackData";
import { esEmailValido, formatCurrency, construirEnlaceWhatsApp } from "../utils/format";
import PasoEmpresa from "../components/cotizador/PasoEmpresa";
import PasoServicios from "../components/cotizador/PasoServicios";
import PasoContacto from "../components/cotizador/PasoContacto";

const FORM_EMPRESA_INICIAL = {
  nombre_empresa: "",
  nit: "",
  sector: "",
  numero_empleados: "",
  nivel_riesgo_id: "",
};

const FORM_CONTACTO_INICIAL = {
  nombre_contacto: "",
  cargo_contacto: "",
  email_contacto: "",
  telefono_contacto: "",
  comentario: "",
};

const PASOS = [
  { numero: 1, titulo: "Tu empresa" },
  { numero: 2, titulo: "Servicios" },
  { numero: 3, titulo: "Contacto" },
];

/**
 * Vista de página completa (no modal) para que el cliente vea el catálogo de
 * servicios, los seleccione, vea el estimado en tiempo real y solicite el
 * contacto. Se accede navegando a /cotizar, opcionalmente con
 * `location.state.servicioId` cuando viene de "Cotizar este servicio" en una
 * tarjeta específica.
 */
export default function CotizadorPage({ servicios, config }) {
  const location = useLocation();
  const navigate = useNavigate();
  const servicioPreseleccionado = location.state?.servicioId ?? null;

  const { data: nivelesRiesgo } = useFetch(getNivelesRiesgo, fallbackNivelesRiesgo);

  const [paso, setPaso] = useState(1);
  const [formEmpresa, setFormEmpresa] = useState(FORM_EMPRESA_INICIAL);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState(
    servicioPreseleccionado ? [servicioPreseleccionado] : []
  );
  const [formContacto, setFormContacto] = useState(FORM_CONTACTO_INICIAL);

  const [cotizacion, setCotizacion] = useState(null);
  const [calculando, setCalculando] = useState(false);
  const [errorCalculo, setErrorCalculo] = useState(null);

  const [enviando, setEnviando] = useState(false);
  const [resultadoEnvio, setResultadoEnvio] = useState(null); // { ok, data } | { ok: false, error }

  // Siempre arranca desde arriba cuando se navega a esta página.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, []);

  // Cálculo en vivo con debounce: solo mientras se está en el paso 2, y solo
  // si hay número de empleados y al menos un servicio seleccionado.
  useEffect(() => {
    if (paso !== 2) return;

    const numEmpleados = parseInt(formEmpresa.numero_empleados, 10);
    if (!numEmpleados || numEmpleados <= 0 || serviciosSeleccionados.length === 0) {
      setCotizacion(null);
      setErrorCalculo(null);
      setCalculando(false);
      return;
    }

    setCalculando(true);
    setErrorCalculo(null);

    const timer = setTimeout(async () => {
      try {
        const resultado = await calcularCotizacion({
          numero_empleados: numEmpleados,
          nivel_riesgo_id: formEmpresa.nivel_riesgo_id ? Number(formEmpresa.nivel_riesgo_id) : null,
          servicios: serviciosSeleccionados,
        });
        setCotizacion(resultado);
        setErrorCalculo(null);
      } catch (err) {
        const status = err?.response?.status;
        setErrorCalculo(
          status === 429
            ? "Demasiadas solicitudes. Intenta de nuevo en un momento."
            : "No pudimos calcular la cotización en este momento."
        );
      } finally {
        setCalculando(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [paso, formEmpresa.numero_empleados, formEmpresa.nivel_riesgo_id, serviciosSeleccionados]);

  function toggleServicio(servicioId) {
    setServiciosSeleccionados((prev) =>
      prev.includes(servicioId) ? prev.filter((id) => id !== servicioId) : [...prev, servicioId]
    );
  }

  function validarPaso1() {
    return formEmpresa.nombre_empresa.trim() !== "" && Number(formEmpresa.numero_empleados) > 0;
  }

  function validarPaso3() {
    return formContacto.nombre_contacto.trim() !== "" && esEmailValido(formContacto.email_contacto);
  }

  function irSiguiente() {
    if (paso === 1 && !validarPaso1()) return;
    setPaso((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function irAtras() {
    setPaso((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validarPaso3() || enviando) return;

    setEnviando(true);
    setResultadoEnvio(null);
    try {
      const payload = {
        nombre_empresa: formEmpresa.nombre_empresa,
        nit: formEmpresa.nit,
        sector: formEmpresa.sector,
        numero_empleados: parseInt(formEmpresa.numero_empleados, 10),
        nivel_riesgo_id: formEmpresa.nivel_riesgo_id ? Number(formEmpresa.nivel_riesgo_id) : null,
        servicios: serviciosSeleccionados,
        nombre_contacto: formContacto.nombre_contacto,
        cargo_contacto: formContacto.cargo_contacto,
        email_contacto: formContacto.email_contacto,
        telefono_contacto: formContacto.telefono_contacto,
        comentario: formContacto.comentario,
        website: "",
      };
      const creado = await crearSolicitud(payload);
      setResultadoEnvio({ ok: true, data: creado });
    } catch (err) {
      const status = err?.response?.status;
      let mensaje = "Ocurrió un error al enviar tu solicitud. Intenta de nuevo.";
      if (status === 429) mensaje = "Demasiadas solicitudes. Intenta de nuevo en un momento.";
      else if (!err?.response) mensaje = "No pudimos conectar con el servidor. Revisa tu conexión.";
      setResultadoEnvio({ ok: false, error: mensaje });
    } finally {
      setEnviando(false);
    }
  }

  const enlaceWhatsApp = construirEnlaceWhatsApp(
    config?.whatsapp_numero,
    `Hola, acabo de solicitar una cotización para ${formEmpresa.nombre_empresa || "mi empresa"} y quiero más información.`
  );

  const mostrandoResultado = resultadoEnvio !== null;

  return (
    <main className="min-h-screen bg-primary-50 pb-20 pt-16">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-accent-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>

        <h1 className="mt-4 text-3xl font-extrabold text-primary-900">Cotizador de servicios</h1>
        <p className="mt-2 text-primary-600">
          Selecciona los servicios que te interesan y obtén un estimado en tiempo real.
        </p>

        {!mostrandoResultado && (
          <div className="mt-8 flex items-center gap-2 rounded-xl border border-primary-100 bg-white px-6 py-4">
            {PASOS.map((p) => (
              <div key={p.numero} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    paso >= p.numero ? "bg-accent-500 text-white" : "bg-primary-100 text-primary-500"
                  }`}
                >
                  {p.numero}
                </span>
                <span
                  className={`hidden text-xs font-medium sm:inline ${
                    paso >= p.numero ? "text-primary-900" : "text-primary-400"
                  }`}
                >
                  {p.titulo}
                </span>
                {p.numero < PASOS.length && <span className="h-px flex-1 bg-primary-100" />}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8">
          {mostrandoResultado ? (
            <PantallaResultado
              resultado={resultadoEnvio}
              enlaceWhatsApp={enlaceWhatsApp}
              onVolverInicio={() => navigate("/")}
            />
          ) : (
            <>
              {paso === 1 && (
                <PasoEmpresa formEmpresa={formEmpresa} onChange={setFormEmpresa} nivelesRiesgo={nivelesRiesgo} />
              )}
              {paso === 2 && (
                <PasoServicios
                  servicios={servicios}
                  serviciosSeleccionados={serviciosSeleccionados}
                  onToggleServicio={toggleServicio}
                  cotizacion={cotizacion}
                  calculando={calculando}
                  errorCalculo={errorCalculo}
                  numeroEmpleadosVacio={!formEmpresa.numero_empleados}
                />
              )}
              {paso === 3 && <PasoContacto formContacto={formContacto} onChange={setFormContacto} />}

              <div className="mt-8 flex items-center justify-between border-t border-primary-100 pt-6">
                <button
                  type="button"
                  onClick={irAtras}
                  disabled={paso === 1}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Atrás
                </button>

                {paso < 3 ? (
                  <button
                    type="button"
                    onClick={irSiguiente}
                    disabled={paso === 1 && !validarPaso1()}
                    className="rounded-lg bg-accent-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!validarPaso3() || enviando}
                    className="rounded-lg bg-accent-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {enviando ? "Enviando..." : "Enviar solicitud"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PantallaResultado({ resultado, enlaceWhatsApp, onVolverInicio }) {
  if (resultado.ok) {
    const total = resultado.data?.precio_estimado_total;
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </span>
        <h3 className="text-xl font-bold text-primary-900">¡Solicitud enviada!</h3>
        {total !== undefined && total !== null && (
          <p className="text-3xl font-extrabold text-accent-600">{formatCurrency(total)}</p>
        )}
        <p className="max-w-sm text-sm text-primary-600">
          Nuestro equipo te contactará muy pronto para afinar los detalles de tu cotización.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {enlaceWhatsApp && (
            <a
              href={enlaceWhatsApp}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[#25D366] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Escríbenos por WhatsApp
            </a>
          )}
          <button
            type="button"
            onClick={onVolverInicio}
            className="rounded-lg border border-primary-200 px-5 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
        !
      </span>
      <h3 className="text-xl font-bold text-primary-900">No pudimos enviar tu solicitud</h3>
      <p className="max-w-sm text-sm text-primary-600">{resultado.error}</p>
      <p className="max-w-sm text-xs text-primary-400">
        No te preocupes, puedes escribirnos directamente y con gusto te ayudamos.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {enlaceWhatsApp && (
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-[#25D366] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Escríbenos por WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={onVolverInicio}
          className="rounded-lg border border-primary-200 px-5 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
