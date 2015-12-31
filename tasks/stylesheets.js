var gulp = require('gulp')
var less = require('gulp-less')
var nano = require('gulp-cssnano')

function stylesheetsFactory (config) {
  var STYLESHEETS = config.stylesheets + '/styles.less'
  var DEST = config.dest + '/stylesheets'

  return function () {
    return gulp.src(STYLESHEETS)
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
