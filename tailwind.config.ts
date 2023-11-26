import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          '50': '#f3faf9',
          '100': '#d8efee',
          '200': '#b2dddc',
          '300': '#83c4c5',
          '400': '#59a5a8',
          '500': '#449297',
          '600': '#316a70',
          '700': '#2a575b',
          '800': '#25474a',
          '900': '#233a3e',
          '950': '#0f2124',
        },
      },
    },
  },
  plugins: [],
}
export default config
