/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#EAB767',
          champagne: '#C5A46D',
          light: '#F7D9A0',
        },
        space: '#070B13',
        obsidian: '#111827',
        mist: '#A7B0C0',
        pure: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 24px 60px rgba(0, 0, 0, 0.55)',
        'gold-ambient': '0 10px 28px rgba(234, 183, 103, 0.22)',
        'gold-glow': '0 0 20px rgba(234, 183, 103, 0.35)',
      },
    },
  },
  plugins: [],
}
