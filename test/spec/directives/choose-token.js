'use strict';

describe('Directive: chooseToken', function () {

  beforeEach(module('views/choose-token.html'));
  // load the directive's module
  beforeEach(module('tigerlilyTestApp'));
  var element,
    scope,
    Facebook;

  beforeEach(inject(function ($rootScope, _Facebook_) {
    scope = $rootScope.$new();
    Facebook = _Facebook_;
  }));

  it('should set token', inject(function ($compile) {
    element = angular.element('<choose-token></choose-token>');
    element = $compile(element)(scope);

    scope.$digest();

    scope.token = 'foobar';
    element.find('button')[0].click();

    scope.$digest();

    expect(Facebook.token).toBe('foobar');
  }));
});
