var gulp = require('gulp');
var stylus = require('gulp-stylus');
var gulpif = require('gulp-if');
var csso = require('gulp-csso');

var config = require('../config').styles;

gulp.task('styles', function() {
  return gulp
    .src(config.srcPath)
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulpif(global.isDeployment, csso()))
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
