'use strict';
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    stylish = require('jshint-stylish'),
    changelog = require('conventional-changelog'),
    yargs = require('yargs').argv,
    bump = require('gulp-bump'),
    fs = require('fs');

// Paths configuration.
var paths = {
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
  .pipe(mocha({reporter: 'nyan'}));
});

/**
 * Parses the commit log and provides the CHANGELOG.
 */
gulp.task('changelog', function () {
  var logFile = __dirname + '/CHANGELOG.md';
  var opts = {
    repository: 'https://github.com/kalamuna/generator-kalatheme',
    version: require('./package.json').version,
    file: logFile
  };
  if (yargs.from) { opts.from = yargs.from; }
  changelog(opts, function (err, log) {
    if (err) {
      throw new gutil.PluginError('Changelog Error', err, {showStack: true});
    } else {
      fs.writeFile(logFile, log);
    }
  });
});

/**
 * Bump versions automatically.
 */
gulp.task('bump', function () {
  gulp.src('package.json')
  .pipe(bump({type: yargs.type || 'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['scripts', 'tests']);


gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts', 'tests']);
});


gulp.task('ci', ['scripts', 'tests']);
