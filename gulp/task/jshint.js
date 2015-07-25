
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config = require('../config').jshint;

gulp.task('jshint', function() {
  return gulp
    .src(config.srcPath)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
