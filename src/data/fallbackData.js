/**
 * Datos de respaldo (fallback) usados por la UI cuando el backend Django
 * todavía no está disponible o una petición a la API falla.
 *
 * La forma de cada objeto/array replica EXACTAMENTE el contrato de la API
 * (ver GET /api/config/, /api/historia/, /api/equipo/, /api/servicios/,
 * /api/clientes/, /api/cotizador/rangos-empleados/ y
 * /api/cotizador/niveles-riesgo/), para que cambiar entre datos reales y
 * datos de respaldo sea transparente para los componentes.
 */

export const fallbackConfig = {
  nombre_empresa: "SST Gestión Integral",
  eslogan: "Cuidamos a tu gente, protegemos tu operación",
  mision:
    "Acompañar a las empresas colombianas en la gestión integral de su talento humano y en la implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo, reduciendo el riesgo laboral y fortaleciendo el bienestar de sus colaboradores.",
  vision:
    "Ser en 2030 la firma de referencia en Gestión Humana y SST para pequeñas y medianas empresas en Colombia, reconocida por la calidad de su servicio, el cumplimiento normativo y el impacto real en la vida de los trabajadores.",
  historia_titulo: "Nuestra historia",
  historia_texto:
    "Nacimos como un pequeño equipo de consultores en salud ocupacional y hoy somos un equipo multidisciplinario que acompaña a decenas de empresas en todo el país, combinando experiencia normativa con herramientas digitales para hacer el cumplimiento más simple.",
  hero_titulo: "Gestión Humana y SST para empresas que quieren crecer sin riesgos",
  hero_subtitulo:
    "Diseñamos, implementamos y mantenemos tu Sistema de Gestión de Seguridad y Salud en el Trabajo, y gestionamos tu talento humano, para que tú te enfoques en operar tu negocio.",
  hero_imagen: null,
  logo: null,
  whatsapp_numero: "573001234567",
  correo_contacto: "contacto@sstgestionintegral.com.co",
  telefono: "+57 601 555 0100",
  direccion: "Calle 100 # 15-20, Oficina 501, Bogotá, Colombia",
  facebook_url: "https://facebook.com/sstgestionintegral",
  instagram_url: "https://instagram.com/sstgestionintegral",
  linkedin_url: "https://linkedin.com/company/sstgestionintegral",
};

export const fallbackHistoria = [
  {
    anio: 2015,
    titulo: "Fundación",
    descripcion:
      "Iniciamos como consultores independientes en salud ocupacional, atendiendo pequeñas empresas del sector comercio en Bogotá.",
    orden: 1,
  },
  {
    anio: 2018,
    titulo: "Constitución como firma",
    descripcion:
      "Nos constituimos formalmente y ampliamos el portafolio a gestión humana integral: nómina, selección y bienestar laboral.",
    orden: 2,
  },
  {
    anio: 2021,
    titulo: "Expansión regional",
    descripcion:
      "Abrimos operación en Medellín y Cali, y certificamos nuestro propio Sistema de Gestión de Calidad bajo ISO 9001.",
    orden: 3,
  },
  {
    anio: 2024,
    titulo: "Transformación digital",
    descripcion:
      "Lanzamos nuestra plataforma de cotización y seguimiento en línea, para que cualquier empresa pueda dimensionar su inversión en SST en minutos.",
    orden: 4,
  },
];

export const fallbackEquipo = [
  {
    id: 1,
    nombre: "Laura Ramírez",
    cargo: "Directora General",
    profesion: "Administradora de Empresas",
    tarjeta_profesional: "TP-045821",
    foto: null,
    bio: "Más de 12 años liderando equipos de gestión humana y SST en el sector retail y de servicios.",
    linkedin_url: "https://linkedin.com/in/lauraramirez",
    orden: 1,
  },
  {
    id: 2,
    nombre: "Carlos Peña",
    cargo: "Líder SG-SST",
    profesion: "Ingeniero en Seguridad y Salud en el Trabajo",
    tarjeta_profesional: "TP-098213",
    foto: null,
    bio: "Especialista en diseño e implementación de sistemas de gestión bajo el Decreto 1072 de 2015 y la Resolución 0312 de 2019.",
    linkedin_url: "https://linkedin.com/in/carlospena",
    orden: 2,
  },
  {
    id: 3,
    nombre: "Mónica Valderrama",
    cargo: "Coordinadora de Gestión Humana",
    profesion: "Psicóloga",
    tarjeta_profesional: "TP-076542",
    foto: null,
    bio: "Procesos de selección, bienestar laboral y batería de riesgo psicosocial para empresas de todos los tamaños.",
    linkedin_url: "",
    orden: 3,
  },
  {
    id: 4,
    nombre: "Andrés Torres",
    cargo: "Médico Ocupacional",
    profesion: "Médico especialista en Salud Ocupacional",
    tarjeta_profesional: "RM-011234",
    foto: null,
    bio: "Exámenes médicos ocupacionales de ingreso, periódicos y de retiro, y seguimiento de casos de origen laboral.",
    linkedin_url: "",
    orden: 4,
  },
];

export const fallbackServicios = [
  {
    id: 1,
    nombre: "Diseño e implementación de SG-SST",
    slug: "diseno-implementacion-sg-sst",
    icono: "🛡️",
    descripcion_corta: "Tu Sistema de Gestión de Seguridad y Salud en el Trabajo, completo y a la medida de tu empresa.",
    descripcion_larga:
      "Diagnóstico inicial, diseño documental, plan de trabajo anual, matriz de riesgos y acompañamiento en la implementación de todos los estándares mínimos exigidos por la normativa colombiana vigente.",
    normativa: "Decreto 1072 de 2015, Resolución 0312 de 2019",
    destacado: true,
    orden: 1,
  },
  {
    id: 2,
    nombre: "Exámenes médicos ocupacional",
    slug: "examenes-medicos-ocupacionales",
    icono: "🩺",
    descripcion_corta: "Exámenes de ingreso, periódicos y de retiro con IPS aliadas en todo el país.",
    descripcion_larga:
      "Coordinamos la logística completa de exámenes médicos ocupacionales con perfiles según el cargo y el nivel de riesgo, entrega de conceptos de aptitud y seguimiento de recomendaciones médicas.",
    normativa: "Resolución 2346 de 2007",
    destacado: true,
    orden: 2,
  },
  {
    id: 3,
    nombre: "Capacitaciones y brigadas de emergencia",
    slug: "capacitaciones-brigadas-emergencia",
    icono: "🎓",
    descripcion_corta: "Formación en autocuidado, alturas, espacios confinados y brigadas de emergencia.",
    descripcion_larga:
      "Programas de capacitación presenciales y virtuales, conformación y entrenamiento de brigadas de emergencia, y simulacros de evacuación con informe de resultados.",
    normativa: "Resolución 0312 de 2019",
    destacado: false,
    orden: 3,
  },
  {
    id: 4,
    nombre: "Gestión de nómina",
    slug: "gestion-nomina",
    icono: "💼",
    descripcion_corta: "Liquidación de nómina, seguridad social y prestaciones sociales sin dolores de cabeza.",
    descripcion_larga:
      "Procesamiento mensual de nómina, liquidación de prestaciones sociales, afiliaciones y novedades ante el sistema de seguridad social, y generación de reportes para contabilidad.",
    normativa: "Código Sustantivo del Trabajo",
    destacado: false,
    orden: 4,
  },
  {
    id: 5,
    nombre: "Selección de personal",
    slug: "seleccion-personal",
    icono: "🧑‍💼",
    descripcion_corta: "Encontramos al candidato correcto: reclutamiento, entrevistas y pruebas psicotécnicas.",
    descripcion_larga:
      "Reclutamiento y filtro de hojas de vida, entrevistas por competencias, aplicación de pruebas psicotécnicas y verificación de referencias, con entrega de terna final.",
    normativa: null,
    destacado: false,
    orden: 5,
  },
  {
    id: 6,
    nombre: "Investigación de accidentes de trabajo",
    slug: "investigacion-accidentes-trabajo",
    icono: "📋",
    descripcion_corta: "Investigación técnica de accidentes e incidentes, con plan de acción correctivo.",
    descripcion_larga:
      "Levantamiento de información en sitio, análisis de causas raíz bajo metodología de árbol de causas, e informe formal ante la ARL con plan de acción de cierre.",
    normativa: "Resolución 1401 de 2007",
    destacado: false,
    orden: 6,
  },
];

// Puede venir vacío desde la API — cuando así sea, ClientesLogos no debe
// renderizar la sección. Como datos de respaldo sí mostramos ejemplos para
// que la demo de la landing se vea completa cuando el backend no responde.
export const fallbackClientes = [
  { id: 1, nombre: "Supertiendas Andina", logo: null, url_sitio: "", orden: 1 },
  { id: 2, nombre: "Grupo Constructor del Norte", logo: null, url_sitio: "", orden: 2 },
  { id: 3, nombre: "Textiles del Valle", logo: null, url_sitio: "", orden: 3 },
  { id: 4, nombre: "Logística Rápida S.A.S.", logo: null, url_sitio: "", orden: 4 },
];

export const fallbackRangosEmpleados = [
  { id: 1, nombre: "1 a 10 empleados", empleados_min: 1, empleados_max: 10 },
  { id: 2, nombre: "11 a 50 empleados", empleados_min: 11, empleados_max: 50 },
  { id: 3, nombre: "51 a 200 empleados", empleados_min: 51, empleados_max: 200 },
  { id: 4, nombre: "Más de 200 empleados", empleados_min: 201, empleados_max: null },
];

export const fallbackNivelesRiesgo = [
  { id: 1, nivel: "I", nombre: "Riesgo mínimo", multiplicador: 1.0 },
  { id: 2, nivel: "II", nombre: "Riesgo bajo", multiplicador: 1.1 },
  { id: 3, nivel: "III", nombre: "Riesgo medio", multiplicador: 1.25 },
  { id: 4, nivel: "IV", nombre: "Riesgo alto", multiplicador: 1.5 },
  { id: 5, nivel: "V", nombre: "Riesgo máximo", multiplicador: 1.75 },
];
