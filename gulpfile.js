var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var unmq = require('postcss-unmq');
var runSequence = require('run-sequence');
var del = require('del');
var connect = require('gulp-connect');
var cssnano = require('gulp-cssnano');

const formats = [
  {
    width: 1200,
    height: 400
  },
  {
    width: 600,
    height: 200
  }
];

//common
gulp.task('sass', function() {
  return gulp.src('./sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//develop
gulp.task('default', ['sass']);

gulp.task('sass:livereload', function() {
  return gulp.src('./sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('sass:watch', function() {
  return gulp.watch('./sass/**/*.scss', ['sass:livereload']);
});

gulp.task('html:watch', function() {
  return gulp.watch('./index.html', function() {
    gulp.src('./index.html')
    .pipe(connect.reload());
  });
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 8888
  });
});

gulp.task('serve', ['webserver', 'sass:watch', 'html:watch']);


//build
gulp.task('clean', function () {
  return del([
    'build/**/*'
  ]);
});

gulp.task('movestatic', function() {
  formats.forEach(function(format) {
    var path = format.width + 'X' + format.height;
    gulp.src('./index.html').pipe(gulp.dest('./build/' + path));
  });
});

gulp.task('buildcss', () => {
  formats.forEach(format => {
    var processors = [
      unmq({width : format.width, height: format.height})
    ];

    var path = format.width + 'X' + format.height + '/css';

    gulp.src('./css/screen.css')
      .pipe(postcss(processors))
      .pipe(cssnano())
      .pipe(gulp.dest('./build/' + path));
  });
});

gulp.task('build', function() {
  return runSequence('clean', ['default', 'movestatic'], 'buildcss');
});
