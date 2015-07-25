
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var config = require('../config').browserify;

gulp.task('browserify', function() {
  var bundler = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    entries: config.entryPoint
  });

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source(global.isDeployment ? 'build.min.js' : 'build.js'))
      .pipe(buffer())
      .pipe(gulpif(global.isDeployment, uglify()))
      .pipe(gulp.dest(
        global.isDeployment ? config.distPath : config.buildPath
      ));
  };

  if(!global.isDeployment) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
});
