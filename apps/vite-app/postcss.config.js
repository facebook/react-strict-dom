import babelConfig from './babel.config.js';

export default {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '../../node_modules/example-ui/**/*.jsx'
      ],
      babelConfig
    },
    autoprefixer: {}
  }
};
