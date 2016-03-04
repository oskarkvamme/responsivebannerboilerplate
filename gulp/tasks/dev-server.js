var gulp = require('gulp');
var connect = require('gulp-connect');

var config = require('../config');
var compileSass = require('../lib/compileSass');

var sassPipeDebug = compileSass(true);


gulp.task('watch:sass', function() {
  return gulp.watch(config.sassWatchSource, ['sass:livereload']);
});

gulp.task('watch:html', function() {
  return gulp.watch(config.indexFile, function() {
    gulp.src(config.indexFile)
    .pipe(connect.reload());
  });
});

gulp.task('webserver', function() {
  return connect.server({
    root: '.',
    livereload: true,
    port: 8888
  });
});

gulp.task('server', ['sass:debug', 'webserver', 'watch:sass', 'watch:html']);


gulp.task('sass:livereload', function() {
  return gulp.src('./sass/screen.scss')
    .pipe(sassPipeDebug())
    .pipe(gulp.dest(config.cssDest))
    .pipe(connect.reload());
});
