// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0088bb',
        danger: '#cc0000',
        lightgray: '#f9f9f9'
      },
      fontSize: {
        base: '16px',
        sm: '13px'
      },
      boxShadow: {
        form: '0 0 10px rgba(0,0,0,0.05)'
      },
      borderRadius: {
        md: '10px',
        sm: '5px'
      }
    },
  },
  plugins: [],
}
