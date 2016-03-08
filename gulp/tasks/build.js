var gulp = require('gulp');
var postcss = require('gulp-postcss');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');

var config = require('../config');
var dimensions = require('../dimensions');

//build
gulp.task('movestatic', function() {
return gulp.src('./index.html').pipe(gulp.dest(config.buildPath + '/'));
});

gulp.task('buildfinalcss', function() {
  var processors = [
  ];

  return gulp.src(config.compiledCss)
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(gulp.dest(config.buildPath + '/css'));
});

gulp.task('build', function() {
  return runSequence('clean-build-folder', 'sass:dist', 'movestatic', 'buildfinalcss');
});
