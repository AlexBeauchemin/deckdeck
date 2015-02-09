module.exports = {
  dev: {
    options: {
      autoprefixer: {'browsers': ['last 4 versions', 'ios 6']},
      minifier: false,
      sourcemaps: true
    },
    files: {
      'dest/css/main.css': 'src/css/main.css'
    }
  },
  prod: {
    options: {
      minifier: true,
      sourcemaps: false
    },
    files: {
      'dest/css/main.css': 'src/css/main.css'
    }
  }
};