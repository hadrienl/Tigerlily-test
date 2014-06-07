'use strict';

describe('Controller: AddFriendToListCtrl', function () {

  // load the controller's module
  beforeEach(module('tigerlilyTestApp'));

  var AddFriendToListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddFriendToListCtrl = $controller('AddFriendToListCtrl', {
      $scope: scope
    });
  }));

  it('should add a friend', function () {
    scope.list = {
      $addFriend: jasmine.createSpy('addFriend')
    };
    scope.$hide = jasmine.createSpy('hide');
    scope.add();
    expect(scope.list.$addFriend).toHaveBeenCalled();
    expect(scope.$hide).toHaveBeenCalled();
  });
});
