module.exports = {
  main: {
    files: [
      {expand: true, cwd: 'src/', src: ['fonts/**'], dest: 'dest/'},
      {expand: true, cwd: 'src/', src: ['images/**'], dest: 'dest/'},
      {expand: true, cwd: 'src/', src: ['js/libs/**'], dest: 'dest/'}
    ]
  }
};