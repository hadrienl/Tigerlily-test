'use strict';

describe('Service: Facebook', function () {

  // load the service's module
  beforeEach(module('tigerlilyTestApp'));

  // instantiate service
  var Facebook,
    $httpBackend;

  beforeEach(inject(function (_Facebook_, _$httpBackend_) {
    Facebook = _Facebook_;
    $httpBackend = _$httpBackend_;
  }));

  it('should get token', function () {
    Facebook.token = '12345';
    expect(Facebook.token).toBe('12345');
  });

  it('should load friends', function() {
    $httpBackend.expectGET('https://graph.facebook.com/v1.0/me/friends?fields=["name","cover"]&access_token=azerty')
      .respond({
        data: [{
          name: 'Maurice Moss',
          id: '12345'
        }, {
          name: 'Roy Trenneman',
          id: '12345'
        }, {
          name: 'Jen Barber',
          id: '12345'
        }]
      });
    Facebook.token = 'azerty';
    var friends = Facebook.getFriends();

    friends
      .$promise
      .then(function(data) {
        expect(data).toBe(friends);
      });

    $httpBackend.flush();
    
    expect(friends.length).toBe(3);
  });

});
