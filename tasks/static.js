var gulp = require('gulp')

function staticFactory (config) {
  var STATIC = config.static + '/**/*'
  var DEST = config.dest

  return function () {
    return gulp.src(STATIC)
      .pipe(gulp.dest(DEST))
  }
}

module.exports = staticFactory
