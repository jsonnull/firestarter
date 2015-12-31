require('core-js/fn/object/assign')

var gulp = require('gulp')
var hb = require('gulp-hb')
var markdown = require('gulp-markdown')
var frontMatter = require('gulp-front-matter')
var fs = require('fs')
var typeset = require('gulp-typeset')

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
function htmlFactory (site, config) {
  var HTML = config.html + '/**/*.md'
  var TEMPLATES = config.templates
  var PARTIALS = config.templates + '/partials/**/*.hbs'
  var DEST = config.dest
  var BUST_CACHE = (config.bustCache === true)

  return function () {
    return gulp.src(HTML)
    .pipe(frontMatter())
    .pipe(markdown())
    .pipe(hb({
      bustCache: BUST_CACHE,
      partials: PARTIALS,
      dataEach: function (context, file) {
        // Add site data and html/frontmatter content to the context
        context = Object.assign({}, context, {
          site: site,
          page: file.frontMatter,
          content: file.contents
        })
        // Rewrite the file contents as a tiny template
        file.contents = fs.readFileSync(TEMPLATES + '/' + file.frontMatter.template)
        // Return the context
        return context
      }
    }).on('error', function (error) {
      console.log(error.stack)
    }))
    .pipe(typeset())
    .pipe(gulp.dest(DEST))
  }
}

module.exports = htmlFactory
