import { useState } from "react";
import { enviarMensajeContacto } from "../../api/cotizadorService";
import { esEmailValido, construirEnlaceWhatsApp } from "../../utils/format";
import Reveal from "../ui/Reveal";

const FORM_INICIAL = { nombre: "", email: "", telefono: "", mensaje: "" };

export default function Contacto({ config }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null); // { ok: true } | { ok: false, error: string }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validar() {
    return form.nombre.trim() !== "" && esEmailValido(form.email) && form.mensaje.trim() !== "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validar() || enviando) return;

    setEnviando(true);
    setResultado(null);
    try {
      await enviarMensajeContacto({ ...form, website: "" });
      setResultado({ ok: true });
      setForm(FORM_INICIAL);
    } catch (err) {
      const status = err?.response?.status;
      const mensaje =
        status === 429
          ? "Demasiadas solicitudes. Intenta de nuevo en un momento."
          : "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.";
      setResultado({ ok: false, error: mensaje });
    } finally {
      setEnviando(false);
    }
  }

  const enlaceWhatsApp = construirEnlaceWhatsApp(
    config?.whatsapp_numero,
    "Hola, quiero más información sobre sus servicios."
  );

  return (
    <section id="contacto" className="bg-primary-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold">Hablemos</h2>
          <p className="mt-3 text-primary-200">
            Cuéntanos qué necesita tu empresa. Te respondemos en el menor tiempo posible.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal delay={0} className="space-y-4">
            {config?.telefono && (
              <p>
                <span className="font-semibold text-accent-300">Teléfono: </span>
                <a href={`tel:${config.telefono}`} className="hover:underline">
                  {config.telefono}
                </a>
              </p>
            )}
            {config?.correo_contacto && (
              <p>
                <span className="font-semibold text-accent-300">Correo: </span>
                <a href={`mailto:${config.correo_contacto}`} className="hover:underline">
                  {config.correo_contacto}
                </a>
              </p>
            )}
            {config?.direccion && (
              <p>
                <span className="font-semibold text-accent-300">Dirección: </span>
                {config.direccion}
              </p>
            )}
            {enlaceWhatsApp && (
              <a
                href={enlaceWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Escríbenos por WhatsApp
              </a>
            )}
          </Reveal>

          <Reveal
            as="form"
            delay={140}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 text-primary-900 shadow-lg"
          >
            {/* Honeypot anti-spam: siempre vacío, oculto a personas */}
            <input
              type="text"
              name="website"
              value=""
              onChange={() => {}}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="space-y-4">
              <div>
                <label htmlFor="contacto-nombre" className="mb-1 block text-sm font-medium text-primary-700">
                  Nombre
                </label>
                <input
                  id="contacto-nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="contacto-email" className="mb-1 block text-sm font-medium text-primary-700">
                  Email
                </label>
                <input
                  id="contacto-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="tu@empresa.com"
                />
              </div>

              <div>
                <label htmlFor="contacto-telefono" className="mb-1 block text-sm font-medium text-primary-700">
                  Teléfono (opcional)
                </label>
                <input
                  id="contacto-telefono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="300 000 0000"
                />
              </div>

              <div>
                <label htmlFor="contacto-mensaje" className="mb-1 block text-sm font-medium text-primary-700">
                  Mensaje
                </label>
                <textarea
                  id="contacto-mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  value={form.mensaje}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-primary-200 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="Cuéntanos qué necesita tu empresa..."
                />
              </div>

              {resultado?.ok && (
                <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.
                </p>
              )}
              {resultado?.ok === false && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{resultado.error}</p>
              )}

              <button
                type="submit"
                disabled={enviando || !validar()}
                className="w-full rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {enviando ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
