import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import unmq from 'postcss-unmq';
import runSequence from 'run-sequence';
import del from 'del';
import connect from 'gulp-connect';

const formats = [
  {
    width: 1500,
    height: 400
  },
  {
    width: 600,
    height: 200
  }
];

//common
gulp.task('sass', () => {
  return gulp.src('./sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

//develop
gulp.task('default', ['sass']);

gulp.task('sass:livereload', () => {
  return gulp.src('./sass/screen.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('sass:watch', () => {
  return gulp.watch('./sass/**/*.scss', ['sass:livereload']);
});

gulp.task('html:watch', () => {
  return gulp.watch('./index.html', () =>{
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

gulp.task('movestatic', () => {
  formats.forEach(format => {
    const path = format.width + 'X' + format.height;
    gulp.src('./index.html').pipe(gulp.dest('./build/' + path));
  });
});

gulp.task('buildcss', () => {
  formats.forEach(format => {
    const processors = [
      unmq({width : format.width, height: format.height})
    ];

    const path = format.width + 'X' + format.height + '/css';

    gulp.src('./css/screen.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./build/' + path));
  });
});

gulp.task('build', () => {
  return runSequence('clean', ['default', 'movestatic'], 'buildcss');
});
