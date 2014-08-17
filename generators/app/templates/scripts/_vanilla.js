/* global jQuery, Drupal */
/**
 * @file
 * <%= humanName %> JS file.
 */

(function ($) {

  /**
   * Attachs <%= _.camelize(appname) %> Drupal.beviours.
   *
   * @link https://www.drupal.org/node/756722
   */
  Drupal.behaviors.<%= _.camelize(appname) %> = {
    attach: function (context) {
      console.info('<%= _.camelize(appname) %> JS is active!');
    }
  };
})(jQuery);
