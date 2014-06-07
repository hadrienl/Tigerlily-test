'use strict';

/**
 * @ngdoc directive
 * @name tigerlilyTestApp.directive:chooseToken
 * @description
 * # chooseToken
 */
angular.module('tigerlilyTestApp')
  .directive('chooseToken', function (Facebook) {
    return {
      templateUrl: 'views/choose-token.html',
      restrict: 'E',
      link: function postLink(scope) {
        scope.setToken = function() {
          Facebook.token = scope.token;
        };
      }
    };
  });
