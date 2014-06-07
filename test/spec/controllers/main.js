'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tigerlilyTestApp'));

  var MainCtrl,
    scope,
    Facebook;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _Facebook_) {
    scope = $rootScope.$new();
    Facebook = _Facebook_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      Facebook: Facebook
    });
  }));
});
