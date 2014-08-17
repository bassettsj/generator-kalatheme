'use strict';

var path = require('path');

/**
 * Module attaches the processFiles method.
 */
module.exports = function (generator) {
  /**
   * Process Files will take a path and template file that begin with a '_'.
   */
  generator.prototype._processFiles =  function (source, destination) {
    var root = this.isPathAbsolute(source) ?
      source : path.join(this.sourceRoot(), source);
    var files = this.expandFiles('**', { dot: true, cwd: root });

    for (var i = 0; i < files.length; i++) {
      var f = files[i];
      var src = path.join(root, f);
      var dest;
      if (path.basename(f).indexOf('_') === 0) {
        dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
        this.template(src, dest);
      }
      else {
        dest = path.join(destination, f);
        this.copy(src, dest);
      }
    }
  };
  return generator;
};
