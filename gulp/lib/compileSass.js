var gulp = require('gulp');
var sass = require('gulp-sass');
var lazypipe = require('lazypipe');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

module.exports = function(includeSourcemaps){
  if(includeSourcemaps){
    return lazypipe()
      .pipe(sourcemaps.init)
      .pipe(sass, { errLogToConsole: true})
      .pipe(postcss, [ autoprefixer({ browsers: ['last 2 versions'] }) ])
      .pipe(sourcemaps.write, '.');
  }else{
    return lazypipe()
      .pipe(sass, { errLogToConsole: true})
      .pipe(postcss, [ autoprefixer({ browsers: ['last 2 versions'] }) ]);
  }
};
