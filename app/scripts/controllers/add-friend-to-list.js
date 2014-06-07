'use strict';

/**
 * @ngdoc function
 * @name tigerlilyTestApp.controller:AddFriendToListCtrl
 * @description
 * # AddFriendToListCtrl
 * Controller of the tigerlilyTestApp
 */
angular.module('tigerlilyTestApp')
  .controller('AddFriendToListCtrl', function ($scope, Lists) {
    $scope.lists = Lists;
    $scope.add = function() {
      $scope.list.$addFriend($scope.friend);
      Lists.$save();
      $scope.$hide();
    };
  });
