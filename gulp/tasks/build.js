var gulp = require('gulp');
var postcss = require('gulp-postcss');
var unmq = require('postcss-unmq');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');

var config = require('../config');
var dimensions = require('../dimensions');

//build
var dimensionNames = [];

var moveStaticTaskPrefix = 'movestatic-';
var buildfinalcssTaskPrefix = 'buildfinalcss-';

dimensions.forEach(function(dimension){
  var dimensionName = dimension.width + 'X' + dimension.height;
  dimensionNames.push(dimensionName);

  gulp.task(moveStaticTaskPrefix + dimensionName, function() {
    return gulp.src('./index.html').pipe(gulp.dest(config.buildPath + '/' + dimensionName));
  });

  gulp.task(buildfinalcssTaskPrefix + dimensionName, () => {
      var processors = [
        unmq({width : dimension.width, dimension: dimension.height})
      ];

      var path = dimension.width + 'X' + dimension.height + '/css';

      return gulp.src(config.compiledCss)
        .pipe(postcss(processors))
        .pipe(cssnano())
        .pipe(gulp.dest(config.buildPath + '/' + path));
  });
});

var moveStaticTasks = dimensionNames.map(function(name){
  return moveStaticTaskPrefix + name;
});

var buildfinalcssTasks = dimensionNames.map(function(name){
  return buildfinalcssTaskPrefix + name;
});


gulp.task('build', function() {
  return runSequence('clean-build-folder', 'sass:dist', moveStaticTasks, buildfinalcssTasks);
});
