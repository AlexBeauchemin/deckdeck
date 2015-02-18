module.exports = {
  gruntfile: {
    files: ['src/js/**'],
    tasks: ['browserify']
  },
  src: {
    files: ['src/css/**/*.scss'],
    tasks: ['sass:dev', 'pleeease:dev']
  }
};