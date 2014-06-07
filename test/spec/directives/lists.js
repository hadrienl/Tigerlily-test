'use strict';

describe('Directive: ListsCtrl', function () {

  // load the directive's module
  beforeEach(module('tigerlilyTestApp'));

  var ListsCtrl,
    scope,
    Lists;

  beforeEach(inject(function ($controller, $rootScope, _Lists_) {
    scope = $rootScope.$new();
    Lists = _Lists_;
    ListsCtrl = $controller('ListsCtrl', {
      $scope: scope
    });
  }));

  it('should create lists', function () {
    Lists.$reset();
    scope.createList('test');
    expect(Lists.length).toBe(1);
    expect(Lists[0].title).toBe('test');
  });

  it('should remove lists', function() {
    Lists.$reset();
    var list = Lists.$addList({title: 'prout'});
    scope.remove(list);
    expect(Lists.length).toBe(0);
  });
});
