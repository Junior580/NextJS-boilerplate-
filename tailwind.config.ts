import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

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
        primary: colors.green[700],
        primary_hover: colors.green[500],
        secondary: colors.green[600],
        secondary_hover: colors.green[400],
        secondary_bg: colors.gray[400],
        t1: '#fff4',
        t2: '#fffb',
        t3: '#fff5',
      },
      boxShadow: {
        '3xl': '0 0.4rem 0.8rem  #0005',
      },
      spacing: {
        '10C': '10%',
        '95C': '95%',
        '89C': '89%',
      },
    },
  },
  plugins: [],
}
export default config
