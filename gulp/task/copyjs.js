
var gulp = require('gulp');
var config = require('../config').copyjs;

gulp.task('copyjs', function() {
  return gulp
    .src(
      global.isDeployment ? config.srcPathDist : config.srcPathBuild
    )
    .pipe(gulp.dest(
      global.isDeployment ? config.distPath : config.buildPath
    ));
});
