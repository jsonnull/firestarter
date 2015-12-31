var del = require('del')

function cleanHtmlFactory (config) {
  var DEST = config.dest

  return function () {
    return del([
      DEST + '/**/*.html'
    ])
  }
}

function cleanStylesheetsFactory (config) {
  var DEST = config.dest

  return function () {
    del([
      DEST + '/styles'
    ])
  }
}

function cleanAllFactory (config) {
  var DEST = config.dest

  return function () {
    return del([
      DEST + '/**/*'
    ])
  }
}

module.exports = {
  html: cleanHtmlFactory,
  stylesheets: cleanStylesheetsFactory,
  all: cleanAllFactory
}
