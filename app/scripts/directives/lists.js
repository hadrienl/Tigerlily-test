'use strict';

/**
 * @ngdoc directive
 * @name tigerlilyTestApp.directive:lists
 * @description
 * # lists
 */
angular.module('tigerlilyTestApp')
  .controller('ListsCtrl', function($scope, Lists) {
    $scope.lists = Lists.$load();

    $scope.createList = function(title) {
      if (!title) {
        $scope.editNewList = true;
      } else {
        Lists.$addList({
          title: title
        });
        Lists.$save();
        $scope.editNewList = false;
      }
    };

    $scope.remove = function(list) {
      Lists.$removeList(list);
      Lists.$save();
    };
  })
  .directive('lists', function () {
    return {
      templateUrl: 'views/lists.html',
      restrict: 'E',
      controller: 'ListsCtrl'
    };
  });
