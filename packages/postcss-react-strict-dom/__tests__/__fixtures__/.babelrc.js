module.exports = {
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: false,
        runtimeInjection: false,
        importSources: [{ from: 'react-strict-dom', as: 'css' }],
        styleResolution: 'property-specificity'
      }
    ]
  ]
};
