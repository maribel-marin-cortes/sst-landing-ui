import { useEffect, useState } from "react";

/**
 * Hook genérico para consumir un servicio de la API con datos de respaldo.
 *
 * Si `fetchFn` falla (por ejemplo porque el backend Django aún no está
 * corriendo, o responde con error), se registra un `console.warn` y se usa
 * `fallbackData` para que la landing NUNCA se vea vacía ni rota.
 *
 * @param {() => Promise<any>} fetchFn función async que retorna los datos
 * @param {any} fallbackData datos de respaldo a usar si falla el fetch
 * @returns {{ data: any, loading: boolean, usingFallback: boolean, error: any }}
 */
export function useFetch(fetchFn, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setUsingFallback(false);
          setError(null);
        }
      } catch (err) {
        console.warn(
          "useFetch: no se pudo obtener datos de la API, usando datos de respaldo.",
          err
        );
        if (isMounted) {
          setData(fallbackData);
          setUsingFallback(true);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, usingFallback, error };
}
