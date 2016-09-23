var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var inject = require('gulp-inject-string');

var config = require('../config');
var compileSass = require('../lib/compileSass');
var bannerConfig = require('../../bannerConfig');

var sassPipeDebug = compileSass(true);

gulp.task('js-watch', ['webpack'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('sass:livereload', function() {
  return gulp.src('./sass/screen.scss')
    .pipe(sassPipeDebug())
    .pipe(gulp.dest(config.cssDest))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('createpreview', function(){
    var result = bannerConfig.banners.map(function(banner){
        return '<div><h3>' + banner.width + 'X' + banner.height + '</h3><iframe width="' + banner.width + '" height="' + banner.height + '" src="index.html"></iframe></div>'
    });
    return gulp.src('./template/preview.html')
        .pipe(inject.after('<div>', result.join(' ')))
        .pipe(gulp.dest('.'));
});

gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'preview.html'
        },
        ghostMode: {
	        clicks: false,
	        forms: false,
	        scroll: false
		}
    });

    //html
    gulp.watch(config.indexFile).on('change', browserSync.reload);

    //sass
    gulp.watch(config.sassWatchSource, ['sass:livereload']);

    //javascript
    gulp.watch(config.jsWatchSource, ['js-watch']);
});



gulp.task('server', ['sass:debug', 'webpack', 'createpreview', 'webserver']);
