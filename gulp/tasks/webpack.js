var gulp = require('gulp');
var webpack = require('webpack-stream');

var config = require('../config');

gulp.task('webpack', function() {
  return gulp.src(config.jsSource)
    .pipe(webpack({
        output: {
            filename: 'entry.js',
        },

    }))
    .pipe(gulp.dest(config.jsDest));
});
