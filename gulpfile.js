'use strict';
var gulp = require('gulp'),
jshint = require('gulp-jshint'),
mocha = require('gulp-mocha'),
stylish = require('jshint-stylish'),
// Paths configuration.
paths = {
  scripts: [
    'generators/**/*.js',
    '!generators/templates/**/*.js',
    'test/**/*.js',
    'gulpfile.js'
  ],
  tests: 'test/**/test-*.js'
};

// Scripts tasks.
gulp.task('scripts', function () {
  gulp.src(paths.scripts)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});


gulp.task('tests', function () {
  gulp.src(paths.tests, {read: false})
  .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['scripts', 'tests']);


gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts', 'tests']);
});


gulp.task('ci', ['scripts', 'tests']);
