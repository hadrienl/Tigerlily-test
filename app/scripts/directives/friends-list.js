'use strict';

/**
 * @ngdoc directive
 * @name tigerlilyTestApp.directive:friendsList
 * @description
 * # friendsList
 */
angular.module('tigerlilyTestApp')
  .controller('FriendsListCtrl', function($scope, $timeout, $popover, Facebook, Lists) {
    $scope.loading = true;
    $scope.friends = Facebook.getFriends();
    $scope.friends
      .$promise
      .then(function() {
        $scope.loading = false;
      });

    $scope.getLists = function(friend) {
      var lists = [];
      Lists.forEach(function(list) {
        if (list.$containsFriend(friend)) {
          lists.push(list);
        }
      });
      return lists;
    };

    $scope.add = function($event, friend) {
      $scope.friends.forEach(function(f) {
        if (f.$popover) {
          f.$popover.hide();
        }
      });

      if (!friend.$popover) {
        var nscope = $scope.$new();
        nscope.friend = friend;

        friend.$popover = $popover(
          angular.element($event.target),
          {
            scope: nscope,
            contentTemplate: 'views/add-friend-to-list.html'
          }
        );
      }
      
      // Need to delay to avoid crash
      $timeout(
        function() {
          friend.$popover.show();
        },
        100
      );
    };

    $scope.removeFriendFromList = function(friend, list) {
      list.$removeFriend(friend);
    };
  })
  .directive('friendsList', function () {
    return {
      templateUrl: 'views/friends-list.html',
      restrict: 'E',
      controller: 'FriendsListCtrl'
    };
  });
