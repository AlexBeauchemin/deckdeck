module.exports = {
  gruntfile: {
    files: ['Gruntfile.js', 'grunt/*.js', 'src/js/**'],
    tasks: ['jshint', 'browserify']
  },
  src: {
    files: ['src/css/**/*.scss'],
    tasks: ['sass:dev', 'pleeease:dev']
  }
};