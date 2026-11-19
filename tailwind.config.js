/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          void: "#0A0A14",
          surface: "#12121F",
          card: "#161626",
          cardHover: "#1E1E34",
          border: "rgba(123, 97, 255, 0.2)",
          borderGlow: "rgba(123, 97, 255, 0.5)",
          accent: "#7B61FF",
          accentBright: "#9B86FF",
          accentGlow: "rgba(123, 97, 255, 0.35)",
          cyan: "#00F5D4",
          ghost: "#F0EFF4",
          muted: "#8F8EA8",
          graphite: "#18181B"
        }
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'aura-glow': '0 0 40px -10px rgba(123, 97, 255, 0.45)',
        'aura-card': '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(123, 97, 255, 0.15)',
        'aura-button': '0 10px 25px -5px rgba(123, 97, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
