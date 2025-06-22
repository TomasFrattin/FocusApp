// tailwind.config.js
export default {
  content: [
    "./index.html",         // Ruta al archivo index.html en la raíz del proyecto
    "./src/**/*.{js,jsx,ts,tsx}", // Archivos dentro de src con las extensiones adecuadas
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/background.jpeg')",  // URL externa
      },
    },
  },
  plugins: [],
}
