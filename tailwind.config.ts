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
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            maxWidth: '65ch',
            p: {
              lineHeight: '1.75',
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
              fontSize: '2.2em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            h2: {
              color: '#1F2937',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            h3: {
              color: '#1F2937',
              fontWeight: '600',
              fontSize: '1.3em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: '#EC4899',
              backgroundColor: '#F3F4F6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            blockquote: {
              borderLeftColor: '#E5E7EB',
              borderLeftWidth: '4px',
              fontStyle: 'italic',
              color: '#6B7280',
            },
            a: {
              color: '#2563EB',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1D4ED8',
              },
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            color: '#D1D5DB',
            h1: {
              color: '#F9FAFB',
              fontSize: '2.2em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
              fontWeight: '800',
              lineHeight: '1.2',
            },
            h2: {
              color: '#F3F4F6',
              fontSize: '1.5em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
              fontWeight: '700',
            },
            h3: {
              color: '#F3F4F6',
              fontSize: '1.3em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
              fontWeight: '600',
            },
            strong: {
              color: '#F9FAFB',
            },
            code: {
              color: '#F472B6',
              backgroundColor: '#374151',
            },
            pre: {
              backgroundColor: '#111827',
              color: '#E5E7EB',
            },
            blockquote: {
              borderLeftColor: '#4B5563',
              color: '#9CA3AF',
            },
            a: {
              color: '#60A5FA',
              '&:hover': {
                color: '#93C5FD',
              },
            },
          },
        },
        'green-dark': {
          css: {
            color: '#E2E8F0',
            p: {
              fontSize: '1rem',
              lineHeight: '1.75'
            },
            h1: {
              color: '#FDE047',
              fontWeight: '800',
              fontSize: '2.2em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
              lineHeight: '1.2',
            },
            h2: {
              color: '#FDE047',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            h3: {
              color: '#FDE047',
              fontWeight: '600',
              fontSize: '1.3em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            strong: {
              color: '#FDE047',
            },
            code: {
              color: '#86EFAC',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: '#E2E8F0',
            },
            blockquote: {
              borderLeftColor: '#FDE047',
              color: '#94A3B8',
            },
            a: {
              color: '#86EFAC',
              textDecoration: 'underline',
              '&:hover': {
                color: '#4ADE80',
              },
            },
            hr: {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            ul: {
              li: {
                '&::marker': {
                  color: '#FDE047',
                },
              },
            },
            ol: {
              li: {
                '&::marker': {
                  color: '#FDE047',
                },
              },
            },
          },
        },
        lg: {
          css: {
            p: {
              fontSize: '1rem',
              lineHeight: '1.75'
            },
            h1: {
              fontSize: '2.2em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            h2: {
              fontSize: '1.5em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            h3: {
              fontSize: '1.3em',
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
          }
        },
      },
    },
  },
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
