var gulp = require('gulp');
var webpack = require('webpack-stream');

var config = require('../config');

var logError = function(error) {
  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end');
}

gulp.task('webpack', function() {
  return gulp.src(config.jsSource)
    .pipe(webpack({
        output: {
            filename: 'entry.js',
        }
    }))
    .on('error', logError)
    .pipe(gulp.dest(config.jsDest));
});
