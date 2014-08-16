'use strict';
var rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  <% if (browserify) { %>browserify = require('gulp-browserify'),<% } else { %>
  concat = require('gulp-concat'),
  merge = require('merge-stream '),<% }%>
  uglify = require('gulp-uglify'),
  pkg = require('../package.json'),
  paths = require('./paths');

module.exports = function (gulp) {
  gulp.task('scripts', function () {
<% if (browserify) {%>
    var bootstrap =  gulp.src('./bower_components/bootstrap/dist/js/bootstrap.js');
    var src =<% }%> gulp.src(paths.scripts.src)
    .pipe(jshint());
    <% if (browserify) {%>
    .pipe(browserify({
      shim: {
        bootstrap: {
          path: 'bower_components/bootstrap/dist/js/bootstrap.js',
          exports: 'jQuery', // Drupal has jQuery global.
        }
      }
    }))
    <% } else { %>
    merge(bootstrap, src)
    .pipe(concat())
    <% } %>
    .pipe(rename(pkg.name + '.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min.'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
  });

  return gulp;
};
