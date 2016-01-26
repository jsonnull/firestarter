require('core-js/fn/object/assign')

var gulp = require('gulp')
var tap = require('gulp-tap')
var frontMatter = require('gulp-front-matter')
var markdown = require('gulp-markdown')
var typeset = require('gulp-typeset')
var path = require('path')

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md
function processFactory (site, config) {
  var HTML = config.html
  var BLOG = config.blog + '/**/*.md'

  return function () {
    return gulp.src(BLOG)
      .pipe(frontMatter())
      .pipe(markdown())
      .pipe(typeset())
      .pipe(tap(function(file) {
        // file.frontMatter
        // Get path of the blog relative to the HTML root
        var dir = path.relative(HTML, file.path)
        // Split dir into array
        dir = dir.split(path.sep)
        // Remove base directory
        if (dir.length > 4) {
          // Convert date into number for comparison
          var dateNum = Number(dir.slice(1, 4).join(''))
          // Add the entire post to the site object if it is the latest post
          if (site.latestPost === undefined || dateNum > site.latestPost.dateNum) {
            site.latestPost = { dateNum: dateNum, file: file }
          }
          // Add the path and frontMatter to the full list of posts
          if (site.posts === undefined) {
            site.posts = []
          }
          var year = dir[1]
          var month = dir[2]
          var date = dir[3]
          site.posts.push({
            permalink: dir.join('/').replace('.md', '.html'),
            date: {year: year, month: month, date: date},
            frontMatter: file.frontMatter
          })
        }
      }))
  }
}

module.exports = processFactory
