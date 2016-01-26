var gulp = require('gulp')
var plumber = require('gulp-plumber')
var less = require('gulp-less')
var nano = require('gulp-cssnano')

function stylesheetsFactory (config) {
  var STYLESHEETS = config.stylesheets + '/styles.less'
  var DEST = config.dest + '/stylesheets'

  return function () {
    return gulp.src(STYLESHEETS)
      .pipe(plumber())
      .pipe(less({
        paths: [
          config.stylesheets + '/includes'
        ]
      }))
      .pipe(nano())
      .pipe(gulp.dest(DEST))
  }
}

module.exports = stylesheetsFactory
