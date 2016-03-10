var gulp = require('gulp');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var zip = require('gulp-zip');
var minify = require('gulp-minify');

var config = require('../config');

//build
gulp.task('movestatic', function() {
    return gulp.src('./index.html').pipe(gulp.dest(config.buildPath + '/'));
});

gulp.task('buildfinalcss', function() {
  return gulp.src(config.compiledCss)
    .pipe(cssnano())
    .pipe(gulp.dest(config.buildPath + '/css'));
});

gulp.task('buildfinaljs', function(){
    return gulp.src(config.compiledJs)
    .pipe(minify())
    .pipe(gulp.dest(config.buildPath + '/js'))
});

gulp.task('zip', () => {
    return gulp.src(config.buildPath + '/**/*')
        .pipe(zip('banner.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
  return runSequence('clean-build-folder', 'sass:dist', 'webpack', 'movestatic', 'buildfinalcss', 'buildfinaljs', 'clean-dist-folder', 'zip');
});
