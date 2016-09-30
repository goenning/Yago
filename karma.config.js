module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js',
      'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.js',
      'https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.js',
      'dist/src/www/bundle.js',
      'dist/test/www/bundle.test.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-chrome-launcher',
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}