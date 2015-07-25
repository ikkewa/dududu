
var gulp = require('gulp');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

var config = require('../config').copyassets;

gulp.task('copyassets', function() {
  return gulp
    .src(config.srcPath)
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
