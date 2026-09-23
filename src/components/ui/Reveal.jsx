import { useEnPantalla } from "../../hooks/useEnPantalla";

/**
 * Envuelve contenido para que aparezca con un fade + slide-up a medida que
 * el usuario baja por la página (estilo lambdaanalytics.co). `delay` (ms)
 * permite escalonar varios <Reveal> hermanos, ej. las tarjetas de una grilla.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const [ref, visible] = useEnPantalla();

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
