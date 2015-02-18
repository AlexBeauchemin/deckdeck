module.exports = {
  all: {
    files: {
      'dest/js/app.js': ['src/js/app.js']
    },
    options: {
      transform: [
        'reactify',
        'browserify-shim'
      ]
    }
  }
};