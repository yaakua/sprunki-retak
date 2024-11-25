import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/theme';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{ts,tsx}',
    './lib/components/**/*.{ts,tsx}',
    './lib/ui/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: '',
  plugins: [
    animate,
    typography,
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#FDE047',
              50: '#FFFBEB',
              100: '#FEF3C7',
              200: '#FDE68A',
              300: '#FDE047',
              400: '#FACC15',
              500: '#EAB308',
              600: '#CA8A04',
              700: '#A16207',
              800: '#854D0E',
              900: '#713F12',
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
} satisfies Config;

export default config;
