var gulp = require('gulp');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var zip = require('gulp-zip');


var config = require('../config');
var dimensions = require('../dimensions');

//build
gulp.task('movestatic', function() {
return gulp.src('./index.html').pipe(gulp.dest(config.buildPath + '/'));
});

gulp.task('buildfinalcss', function() {
  return gulp.src(config.compiledCss)
    .pipe(cssnano())
    .pipe(gulp.dest(config.buildPath + '/css'));
});


gulp.task('zip', () => {
    return gulp.src(config.buildPath + '/**/*')
        .pipe(zip('banner.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
  return runSequence('clean-build-folder', 'sass:dist', 'movestatic', 'buildfinalcss', 'clean-dist-folder', 'zip');
});
