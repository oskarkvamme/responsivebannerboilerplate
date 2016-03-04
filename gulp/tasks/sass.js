var gulp = require('gulp');

var config = require('../config');
var compileSass = require('../lib/compileSass');

var sassPipeDebug = compileSass(true);
var sassPipeProduction = compileSass(false);

gulp.task('sass:debug', function() {
  return gulp.src(config.sassSource)
    .pipe(sassPipeDebug())
    .pipe(gulp.dest(config.cssDest));
});

gulp.task('sass:dist', function() {
  return gulp.src(config.sassSource)
    .pipe(sassPipeProduction())
    .pipe(gulp.dest(config.cssDest));
});
