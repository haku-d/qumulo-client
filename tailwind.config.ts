import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/ui/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      white: colors.white,
      red: colors.red,
      green: colors.green,
      mirage: '#13181E',
      'ebony-clay': '#222C36',
      'charcoal-grey': '#373F48',
      cloud: {
        pale: '#F3F4F4',
        darker: '#A6AAAE',
        DEFAULT: '#C7CACC',
      },
      ink: {
        DEFAULT: '#424B53',
        lighter: '#646B72',
        pale: '#858B90',
      },
      agave: {
        DEFAULT: '#00A3CA',
      },
      blueberry: {
        DEFAULT: '#007ACC',
        lighter: '#0298FF',
        darker: '#005C9B',
      },
      'dataviz-text': {
        write: '#00A3CA',
        read: '#955FD5',
      },
      content: '#1B222C',
      panel: '#1B222B',
      subpanel: '#242C35',
      'bright-grey': '#3D454D',
      'pickled-bluewood': '#2D3E4E',
      lavender: {
        DEFAULT: '#AA7EDD',
        lighter: '#8E8ECD',
      },
      'moss-green': '#6A8B36',
      pomegranate: {
        DEFAULT: '#FF1B5B',
      },
    },
    extend: {
      boxShadow: {
        input: '0 0 10px 0',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
export default config;
