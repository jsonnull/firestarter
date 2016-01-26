require('core-js/fn/object/assign')

var gulp = require('gulp')
var runSequence = require('run-sequence')
var preprocess = require('./tasks/preprocess')
var html = require('./tasks/html')
var stylesheets = require('./tasks/stylesheets')
var clean = require('./tasks/clean')
var files = require('./tasks/static')

// Get site config
var site = {
  title: 'Firestarter',
  author: 'Author'
}

var config = {
  html: './src/html',
  blog: './src/html/blog',
  templates: './src/templates',
  stylesheets: './src/less',
  static: './src/static',
  dest: 'public'
}

// By default, perform all tasks
gulp.task('default', function (callback) {
  runSequence(['clean:all', 'preprocess'], ['stylesheets', 'html', 'static'])
})

gulp.task('clean:all', clean.all(config))
gulp.task('clean:stylesheets', clean.stylesheets(config))
gulp.task('clean:html', clean.html(config))

gulp.task('preprocess', preprocess(site, config))

gulp.task('stylesheets', ['clean:stylesheets'], stylesheets(config))

gulp.task('html', ['clean:html'], html(site, config))

gulp.task('static', files(config))

gulp.task('watch', ['clean:all', 'stylesheets', 'html', 'static'], function () {
  config = Object.assign({}, config, {
    bustCache: true
  })

  gulp.watch([
    config.html + '/**/*.md',
    config.templates + '/**/*.hbs'
  ], ['html'])

  gulp.watch(config.stylesheets + '/**/*.less', ['stylesheets'])
})
