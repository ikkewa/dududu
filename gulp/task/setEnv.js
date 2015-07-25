
var gulp = require('gulp');

gulp.task('setDevelopment', function() {
  global.isDevelopment = true;
});

gulp.task('setDeployment', function() {
  global.isDeployment = true;
  process.env.NODE_ENV = 'production';
});

