'use strict';

/**
 * @ngdoc directive
 * @name tigerlilyTestApp.directive:focus
 * @description
 * # focus
 */
angular.module('tigerlilyTestApp')
  .directive('focus', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.focus();
      }
    };
  });
