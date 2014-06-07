'use strict';

/**
 * @ngdoc service
 * @name tigerlilyTestApp.Facebook
 * @description
 * # FacebookToken
 * Service in the tigerlilyTestApp.
 */
angular.module('tigerlilyTestApp')
  .service('Facebook', function ($http, $q) {
    function Facebook() {
      Object.defineProperty(this, 'token', {
        enumerable: true,
        get: function() {
          return localStorage.token;
        },
        set: function(v) {
          if (null === v) {
            localStorage.removeItem('token');
          } else {
            localStorage.token = v;
          }
        }
      });
    }
    Facebook.prototype.getFriends = function() {
      var deferred = $q.defer(),
        ret = [],
        self = this;

      ret.$promise = deferred.promise;

      $http({
          url: 'https://graph.facebook.com/v1.0/me/friends?fields=["name","cover"]&access_token='+this.token
        })
        .success(function(data) {
          data.data.forEach(function(friend) {
            ret.push(friend);
          });
          deferred.resolve(ret);
        })
        .error(function(err) {
          if (190 === err.error.code) {
            self.token = null;
          }
          deferred.reject(err);
        });

      return ret;
    };
    return new Facebook();
  });
