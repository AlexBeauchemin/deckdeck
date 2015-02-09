module.exports = {
  dev: {
    options: {
      sourceMap: true
    },
    files: {
      'src/css/main.css': 'src/css/main.scss'
    }
  },
  prod: {
    files: {
      'src/css/main.css': 'src/css/main.scss'
    }
  }
};