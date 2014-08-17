'use strict';
var rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  <% if (browserify) { %>browserify = require('gulp-browserify'),<% } else { %>
  concat = require('gulp-concat'),
  merge = require('merge-stream'),<% }%>
  uglify = require('gulp-uglify'),
  pkg = require('../package.json'),
  paths = require('./paths');

module.exports = function (gulp) {
  gulp.task('scripts', function () {
<% if (!browserify) {%>   var bootstrap =  gulp.src(paths.bootstrap.js);<% } %>
    var src = gulp.src(paths.scripts.src)
    .pipe(jshint());
    <% if (browserify) {%>
    src.pipe(browserify({
      shim: {
        bootstrap: {
          path: paths.bootstrap.js,
          exports: 'jQuery', // Drupal has jQuery global.
        }
      }
    }))
    .pipe(rename(pkg.name + '.js'))
    <% } else { %>

    merge(bootstrap, src)
    .pipe(concat(pkg.name + '.js'))
    <% } %>
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min.'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
  });

  return gulp;
};
