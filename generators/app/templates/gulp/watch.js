'use strict';
var paths = require('./paths');

module.exports = function (gulp) {

  gulp.task('watch-styles', ['styles'], function () {
    gulp.watch(paths.css.src, ['styles']);
  });

  gulp.task('watch-scripts', ['scripts'], function () {
    gulp.watch(paths.scripts.src, ['scripts']);
  });
  gulp.task('watch-images', function () {
    gulp.watch(paths.images.src, ['images']);
  });

  gulp.task('watch', ['watch-styles', 'watch-scripts', 'watch-images']);

  return gulp;
};
