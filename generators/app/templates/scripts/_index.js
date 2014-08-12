/*global window */

/**
 * @file
 * Index file for the theme's JS bunlde.
 */

'use strict';
// Since we are using module system we don't have to worry
// about wrapper functions.
var $ = window.jQuery;
require('bootstrap')();

$(function () {
  console.log('it works :)');
});
