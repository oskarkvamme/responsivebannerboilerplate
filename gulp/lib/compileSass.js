var gulp = require('gulp');
var sass = require('gulp-sass');
var lazypipe = require('lazypipe');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(includeSourcemaps){
  if(includeSourcemaps){
    return lazypipe()
      .pipe(sourcemaps.init)
      .pipe(sass, { errLogToConsole: true})
      .pipe(autoprefixer)
      .pipe(sourcemaps.write, '.');
  }else{
    return lazypipe()
      .pipe(sass, { errLogToConsole: true})
      .pipe(autoprefixer);
  }
};
