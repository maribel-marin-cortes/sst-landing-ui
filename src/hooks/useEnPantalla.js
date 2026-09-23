import { useEffect, useRef, useState } from "react";

/**
 * Detecta cuándo un elemento entra en el viewport (para animaciones de
 * scroll-reveal). Se dispara una sola vez -- el elemento no vuelve a
 * ocultarse si el usuario sube y baja de nuevo -- y respeta
 * prefers-reduced-motion mostrando el contenido de inmediato.
 */
export function useEnPantalla({ threshold = 0.15, rootMargin = "0px 0px -80px 0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
