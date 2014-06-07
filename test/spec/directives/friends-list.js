'use strict';

describe('Controller: FriendsListCtrl', function () {

  // load the directive's module
  beforeEach(module('tigerlilyTestApp'));

  var scope,
    FriendsListCtrl,
    Lists;

  beforeEach(inject(function ($controller, $rootScope, _Lists_) {
    scope = $rootScope.$new();
    Lists = _Lists_;
    FriendsListCtrl = $controller('FriendsListCtrl', {
      $scope: scope
    });
  }));

  it('should get lists for a friend', function () {
    Lists.$reset();
    var list = Lists.$addList({title: 'foobar'});
    var friend = {id: 1};

    list.$addFriend(friend);

    expect(scope.getLists(friend)).toEqual([list]);
  });

  it('should remove a friend from a list', function() {
    Lists.$reset();
    var list = Lists.$addList({title: 'foobar'});
    var friend = {id: 1};

    list.$addFriend(friend);

    expect(list.friends.length).toBe(1);

    scope.removeFriendFromList(friend, list);

    expect(list.friends.length).toBe(0);
  });
});
