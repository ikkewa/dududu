
var gulp = require('gulp');
var jade = require('gulp-jade');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');

var config = require('../config').markup;

gulp.task('markup', function() {
  var assets = useref.assets();

  return gulp
    .src(config.srcPath)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulpif(global.isDeployment, useref()))
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
