const dev = process.env.NODE_ENV !== 'production';

export default {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '../../node_modules/example-ui/**/*.jsx'
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: {
          plugins: ['typescript', 'jsx']
        },
        presets: [
          [
            'react-strict-dom/babel-preset',
            {
              debug: dev,
              dev,
              rootDir: process.cwd()
            }
          ]
        ]
      }
    },
    autoprefixer: {}
  }
};
