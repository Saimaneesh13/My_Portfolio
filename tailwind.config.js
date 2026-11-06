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
          light: '#F5D397',
          DEFAULT: '#EAB767',
          champagne: '#C5A46D',
          dark: '#B88737',
          glow: 'rgba(234, 183, 103, 0.35)',
        },
        bg: {
          DEFAULT: '#070B13',
          secondary: '#0D1421',
          tertiary: '#131D2F',
          card: 'rgba(13, 20, 33, 0.75)',
        },
        text: {
          DEFAULT: '#F5F2EB',
          muted: '#8993A5',
          subtle: '#5A6478',
        },
        space: '#070B13',
        obsidian: '#0D1421',
        mist: '#8993A5',
        pure: '#F5F2EB',
        neon: {
          cyan: '#00F0FF',
          blue: '#3B82F6',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glass': '0 24px 60px rgba(0, 0, 0, 0.55)',
        'gold-ambient': '0 10px 28px rgba(234, 183, 103, 0.22)',
        'gold-glow': '0 0 25px rgba(234, 183, 103, 0.35)',
        'gold-glow-lg': '0 0 45px rgba(234, 183, 103, 0.45)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
