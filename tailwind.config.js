/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Gris grafito corporativo — paleta neutra "enterprise", definida
        // como token propio `primary` para que la marca sea explícita e
        // independiente de la paleta gris por defecto de Tailwind.
        primary: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#4b5563",
          600: "#374151",
          700: "#1f2937",
          800: "#161e2c",
          900: "#111827",
          950: "#0a0f1a",
        },
        // Acento azul acero para CTAs (Cotizar Ahora, envío de formularios).
        // Alto contraste sobre el grafito y sobre blanco, look sobrio de
        // consultoría/SST en vez del naranja "señal de peligro".
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#172554",
          950: "#0b1739",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
