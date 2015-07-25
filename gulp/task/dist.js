var gulp = require('gulp');
var useref = require('gulp-useref');

var config = require('../config').dist;

gulp.task('dist', ['setDeployment', 'build']);
