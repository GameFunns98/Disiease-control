import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0f1a',
        panel: '#101827',
        panelSoft: '#182235',
        accent: '#3bb7ff',
        good: '#22c55e',
        warn: '#f59e0b',
      },
      boxShadow: {
        panel: '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
