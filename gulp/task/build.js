

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['clean', 'jshint'], function(cb) {
  runSequence(
    'browserify',
    'copyjs',
    'copyassets',
    'styles',
    'markup',
    cb
  );
});
