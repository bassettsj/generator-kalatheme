/*global describe, beforeEach, it */
'use strict';

var helpers = require('yeoman-generator').test,
    path = require('path'),
    assert = require('yeoman-generator').assert;


describe('selecting to not use browserify', function () {
  var defaultPrompts;

  describe('still using gulp', function () {
    beforeEach(function (done) {
      helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
        if (err) {
          return done(err);
        }
        defaultPrompts  = {
          humanName: 'My Awesome Theme',
          name: 'my_awesome_theme',
          description: 'An awesome theme!',
          browserify: false,
          buildSystem: true,
          repo: 'git@github.com:kalamuna/generator-kalatheme.git',
          userName: 'example',
          userEmail: 'someone@example.com'
        };
        this.app = helpers.createGenerator('kalatheme:app', ['../../generators/app']);
        done();
      }.bind(this));
    });
    
    it('creates a js file named the app name', function (done) {
      helpers.mockPrompt(this.app, defaultPrompts);
      this.app.options['skip-install'] = true;

      this.app.run({}, function () {
        assert.file('scripts/myAwesomeTheme.js');
        assert.fileContent('my_awesome_theme.info', /dist\/js\/myAwesomeTheme.min.js/);
        done();
      });
    });


    it('doesn\'t add the browserify task or plugin', function (done) {
      helpers.mockPrompt(this.app, defaultPrompts);
      this.app.options['skip-install'] = true;

      this.app.run({}, function () {
        assert.noFileContent('gulp/scripts.js', /browserify/);
        assert.noFileContent('package.json', /browserify/);
        done();
      });
    });

    it('adds the bootstrap js to the build process', function (done) {
      helpers.mockPrompt(this.app, defaultPrompts);
      this.app.options['skip-install'] = true;

      this.app.run({}, function () {
        assert.fileContent('gulp/paths.js', /bootstrap/);
        done();
      });
    });
  });
});
