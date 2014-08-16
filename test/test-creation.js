/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var defaultPrompts;
describe('kalatheme generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }
      defaultPrompts  = {
        humanName: 'My Awesome Theme',
        name: 'my_awesome_theme',
        description: 'An awesome theme!',
        browserify: true,
        buildSystem: true,
        repo: 'git@github.com:kalamuna/generator-kalatheme.git',
        userName: 'example',
        userEmail: 'someone@example.com'
      };
      this.app = helpers.createGenerator('kalatheme:app', ['../../generators/app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // Add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'template.php',
      'bower.json',
      'package.json',
      'my_awesome_theme.info',
      '.gitignore',
      'scripts/index.js',
      'scss/main.scss',
      'dist/README.md',
      'templates/README.md',
      'gulpfile.js'
    ];

    helpers.mockPrompt(this.app, defaultPrompts);

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates gulp tasks that can compile bootstrap sass', function (done) {
    helpers.mockPrompt(this.app, defaultPrompts);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile('gulpfile.js');
      helpers.assertFile('./gulp/index.js');
      helpers.assertFile('./gulp/paths.js');
      helpers.assertFile('./gulp/scripts.js');
      helpers.assertFile('./gulp/styles.js');
      helpers.assertFile('./gulp/watch.js');
      done();
    });

  });

  it('creates a valid package.json even with skip install', function (done) {
    helpers.mockPrompt(this.app, defaultPrompts);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      var pkg;
      helpers.assertFile('package.json');
      pkg = require('./temp/package.json');
      assert.ok(pkg.description === defaultPrompts.description, 'templates with a description value');
      assert.ok(pkg.devDependencies, 'adds default dev dependencies');
      done();
    });

  });
});
