var gulp = require('gulp');
var connect = require('gulp-connect');
var inject = require('gulp-inject-string');

var config = require('../config');
var compileSass = require('../lib/compileSass');
var bannerConfig = require('../../bannerConfig');

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

gulp.task('watch:js', function() {
  return gulp.watch(config.jsWatchSource, ['webpack'], function() {
    gulp.src(config.jsWatchSource)
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

gulp.task('createpreview', function(){
    var result = bannerConfig.banners.map(function(banner){
        return '<div><h3>' + banner.width + 'X' + banner.height + '</h3><iframe width="' + banner.width + '" height="' + banner.height + '" src="index.html"></iframe></div>'
    });
    return gulp.src('./template/preview.html')
        .pipe(inject.after('<div>', result.join(' ')))
        .pipe(gulp.dest('.'));
});

gulp.task('server', ['sass:debug', 'webpack', 'webserver', 'watch:sass', 'watch:html', 'watch:js', 'createpreview']);


gulp.task('sass:livereload', function() {
  return gulp.src('./sass/screen.scss')
    .pipe(sassPipeDebug())
    .pipe(gulp.dest(config.cssDest))
    .pipe(connect.reload());
});
