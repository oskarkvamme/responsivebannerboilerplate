var gulp = require('gulp');
var inject = require('gulp-inject-string');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');
var zip = require('gulp-zip');
var minify = require('gulp-minify');
var fs = require('fs');
var Pageres = require('pageres');
var rename = require('gulp-rename');

var config = require('../config');
var bannerConfig = require('../../bannerConfig');

var bannerSizes = bannerConfig.banners.map(function(banner){
  return banner.width + 'x' + banner.height;
});

var zipTasks = bannerSizes.map(function(bannerSize){
  return 'zip-' + bannerSize;
});

//build
gulp.task('buildhtml', function() {

  var script = '<script>' + fs.readFileSync(config.buildPath + '/js/entry-min.js', "utf8") + '</script>';
  var css = '<style>' + fs.readFileSync(config.buildPath + '/css/screen.css', "utf8") + '</style>';

  return gulp.src(config.indexFile)
        .pipe(inject.replace('<link rel="stylesheet" type="text/css" href="css/screen.css" />', css))
        .pipe(inject.replace('<script src="js/entry.js" />', script))
        .pipe(gulp.dest(config.buildPath + '/'));
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

bannerSizes.forEach(function(bannerSize){
  gulp.task('zip-' + bannerSize, function() {
      return gulp.src(config.buildPath + '/{index.html,' + bannerSize + '.png}')
          .pipe(rename(function (path) {
            if(path.extname === '.png'){
              path.basename = 'preview';
            }
          }))
          .pipe(zip('banner-' + bannerSize + '.zip'))
          .pipe(gulp.dest('dist'));
  });
});

gulp.task('screenshot', function (){
  return new Pageres({delay: 2, filename: '<%= size %>'})
    .src(config.buildPath + '/index.html', bannerSizes)
    .dest(config.buildPath + '/')
    .run()
});

gulp.task('build', function() {
  return runSequence('clean-build-folder', 'sass:dist', 'webpack', 'buildfinalcss', 'buildfinaljs', 'buildhtml', 'clean-dist-folder', 'screenshot', zipTasks);
});
