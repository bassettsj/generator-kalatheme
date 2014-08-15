/*global describe, before, it */
'use strict';

var helpers = require('yeoman-generator').test,
    path = require('path'),
    assert = require('yeoman-generator').assert;
describe('css-only workflow for creating a subtheme', function () {
  describe('css workflow with gulp', function () {


    var defaultPrompts;
    before(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }
        defaultPrompts  = {
          humanName: 'My Awesome Theme',
          name: 'my_awesome_theme',
          description: 'An awesome theme!',
          css : 'css',
          browserify: true,
          buildSystem: true,
          repo: 'git@github.com:kalamuna/generator-kalatheme.git',
          userName: 'example',
          userEmail: 'someone@example.com'
        };
        this.app = helpers.createGenerator('kalatheme:app', ['../../generators/app']);
      }.bind(this));
      helpers.mockPrompt(this.app, defaultPrompts);

      this.app.options['skip-install'] = true;
      this.app.run({}, function () {
        done();
      });
    });
    it('creates a css folder', function () {
      assert.file('css/my-awesome-theme.css');
    });

    it('sets the gulp tasks to skip sass', function () {
      assert.noFileContent('gulp/styles.js',\!gulp-sass.js\);
      assert.noFileContent('package.json', 'gulp-sass');
    });
    it('adds vanilla bootstrap to the bower dependencies', function () {
      assert.fileConent('bower.json', 'boostrap');
      assert.noFileContent('bower.json', 'bootstrap-sass-official');
    });

  });
  it('copies the css if gulp wasn\'t selected', function () {
    it('will sets the theme settings to use it', function () {
      assert.fileContent('my_awesome_theme.info', )
    });
  });
});
