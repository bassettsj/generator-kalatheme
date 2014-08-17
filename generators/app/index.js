'use strict';

var yeoman = require('yeoman-generator'),
yosay = require('yosay'),
appNameValidation = require('./appNameValidation');



var KalathemeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../../package.json');

    this.installDevDep = function () {
      if (this.npmDevDep.length < 1) { return; }
      var done = this.async();
      this.npmInstall(this.npmDevDep, {saveDev: true}, done());
    };
    var completeMessage = function () {
      this.log('Completed! Enjoy your new theme!');
    };
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDevDep();
        this.installDependencies(completeMessage);
      }
    });

  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Kalatheme generator!'));

    var prompts = [{
      type: 'input',
      name: 'humanName',
      message: 'What would to call your subtheme? (Human readable name)',
      default:  this._.humanize(this.appname)
    }, {
      type: 'input',
      name: 'name',
      message: 'What is the machine name of your subtheme?',
      default: this.appname,
      validate: appNameValidation,
      filter: function (input) {
        return input.toLowerCase().replace(/[^a-z0-9]+/, '_').substr(0, 32);
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Subtheme description:',
      default: 'An aweseome theme powered by kalatheme and yeoman!'
    }, {
      type: 'input',
      name: 'userName',
      message: 'Full name:',
      default: this.user.name
    }, {
      type: 'input',
      name: 'userEmail',
      message: 'Email:',
      default: this.user.email
    }, {
      type: 'input',
      name: 'repo',
      message: 'Repository URL:'
    }, {
      type: 'confirm',
      name: 'browserify',
      message: 'Do you want to use CommonJS style modules with browserify?',
      default: true
    }, {
      type: 'confirm',
      name: 'buildSystem',
      message: 'Do you want to use gulp to help build your theme?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      // Sets the generator properties.
      this.humanName = props.humanName;
      this.appname = props.name;
      this.description = props.description;
      this.browserify = props.browserify;
      this.buildSystem = props.buildSystem;
      this.repo = props.repo;
      this.userName = props.userName;
      this.userEmail = props.userEmail;
      done();
    }.bind(this));
  },
  /**
   * Scaffold out the common components.
   */
  app: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.directory('dist', 'dist');
    this.template('_README.md', 'README.md');
  },

  /**
   * Scaffold out the styles for the subtheme.
   */
  styles: function () {
    this.directory('scss', 'scss');
  },

  /**
   * Scaffold out the theme's javascript assets.
   */
  scripts: function () {
    this.copy('scripts/console-pollyfill.js', 'scripts/console-pollyfill.js');
    if (this.browserify) {
      this.template('scripts/_index.js', 'scripts/index.js');
    }
    else {
      this.template('scripts/_vanilla.js',
       'scripts/' + this._.camelize(this.appname)  + '.js');
    }
  },

  /**
   * PHP related build tasks.
   */
  php: function () {
    this.directory('templates', 'templates');
    this.template('_template.php', 'template.php');
    this.template('_subtheme.info', this.appname + '.info');
  },

  gulp: function () {
    if (!this.buildSystem) { return; }

    var gulpModules = [
      'gulp',
      'del',
      'gulp-autoprefixer',
      'gulp-browserify',
      'gulp-csscomb',
      'gulp-csslint',
      'gulp-cssmin',
      'gulp-kss',
      'gulp-rename',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-uglify',
      'gulp-imagemin',
      'gulp-newer'
    ];

    this.npmDevDep = this.npmDevDep ?
      this.npmDevDep.concat(gulpModules) : gulpModules;
    this.copy('default-gulpfile.js', 'gulpfile.js');
    this._processFiles('gulp', 'gulp');
  }
});
/**
 * Load the module for adding the method.
 */
require('./processFiles')(KalathemeGenerator);


module.exports = KalathemeGenerator;
