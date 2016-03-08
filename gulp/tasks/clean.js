var gulp = require('gulp');
var del = require('del');

var config = require('../config');

gulp.task('clean-build-folder', function () {
  return del([
    config.buildRecursivePath
  ]);
});

gulp.task('clean-dist-folder', function () {
  return del([
    config.distRecursivePath
  ]);
});
