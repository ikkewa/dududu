
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var debounce = require('debounce');
var config = require('../config');

gulp.task('watch', [ 'build'], function() {
  livereload.listen();
  var livedebounce = debounce(livereload.reload, 500);

  gulp.watch(config.copyassets.srcPath, ['copyassets', livedebounce]);
  gulp.watch(config.styles.watchPath, ['styles', livedebounce]);
  gulp.watch(config.markup.srcPath, ['markup', livedebounce]);
  gulp.watch(config.copyjs.srcPath, ['jshint', 'copyjs', livedebounce]);
  gulp.watch(config.jshint.srcPath, ['jshint', 'browserify', 'copyjs', livedebounce]);
});
