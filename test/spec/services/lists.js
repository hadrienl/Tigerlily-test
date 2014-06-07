'use strict';

describe('Service: Lists', function () {

  // load the service's module
  beforeEach(module('tigerlilyTestApp'));

  // instantiate service
  var Lists;
  beforeEach(inject(function (_Lists_) {
    Lists = _Lists_;
  }));

  it('should load lists', function () {
    Lists.push(Lists.$createList({
      title: 'foo'
    }));
    Lists.push(Lists.$createList({
      title: 'bar'
    }));
    Lists.$save();

    var saved = Lists.$load();
    expect(saved.length).toBe(2);
    expect(saved.constructor.name).toBe('Lists');
    expect(saved[0].constructor.name).toBe('List');
    expect(saved[0].title).toBe('foo');
  });

  it('should reset lists', function() {
    Lists.$reset();
    var saved = Lists.$load();
    expect(saved.length).toBe(0);
  });

  it('should tell if it contains friend', function() {
    var list = Lists.$createList({
      friends: [1, 5]
    });

    expect(list.$containsFriend({id: 1})).toBe(true);
    expect(list.$containsFriend({id: 2})).toBe(false);
    expect(list.$containsFriend({id: 3})).toBe(false);
    expect(list.$containsFriend({id: 4})).toBe(false);
    expect(list.$containsFriend({id: 5})).toBe(true);
  });

  it('should remove a list', function() {
    Lists.$addList({title: 'foo'});
    Lists.$addList({title: 'bar'});
    Lists.$addList({title: 'bla'});
    Lists.$addList({title: 'blo'});
    expect(Lists.length).toBe(4);
    Lists.$removeList(Lists[2]);
    expect(Lists.length).toBe(3);
    expect(Lists[2].title).toBe('blo');
  });

  it('should add some friends', function() {
    Lists.$reset();
    var list1 = Lists.$addList({
      title: 'foobar',
      friends: [1,2,42]
    });

    expect(list1.friends).toEqual([1,2,42]);
  });

  it('should remove friends', function() {
    var list = Lists.$createList({title: 'foo'});

    list.$addFriend({id: 1});
    list.$addFriend({id: 3});
    list.$addFriend({id: 42});
    list.$addFriend({id: 67});

    expect(list.friends.length).toBe(4);

    list.$removeFriend({id: 42});

    expect(list.friends.length).toBe(3);
    expect(list.friends[2]).toBe(67);

  });
});
