'use strict';

/**
 * @ngdoc function
 * @name tigerlilyTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tigerlilyTestApp
 */
angular.module('tigerlilyTestApp')
  .controller('MainCtrl', function ($scope, Facebook) {
    $scope.$watch(function() {
      return Facebook.token;
    }, function(newVal) {
      $scope.token = newVal;
    });
  });
