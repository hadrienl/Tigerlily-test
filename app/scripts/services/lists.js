'use strict';

/**
 * @ngdoc service
 * @name tigerlilyTestApp.Lists
 * @description
 * # Lists
 * Service in the tigerlilyTestApp.
 */
angular.module('tigerlilyTestApp')
  .service('Lists', function ($q) {

    function Lists() {}
    Lists.prototype = [];
    Lists.prototype.constructor = Lists;

    Lists.prototype.$reset = function() {
      this.splice(0, this.length);
      localStorage.removeItem('lists');
    };
    Lists.prototype.$save = function() {
      var arr = [];
      this.forEach(function(l) {
        arr.push(l);
      });
      localStorage.lists = angular.toJson(arr);
    };
    Lists.prototype.$load = function() {
      var deferred = $q.defer(),
        ret = this,
        lists;

      ret.$promise = deferred.promise;

      this.splice(0, this.length);

      try {
        lists = angular.fromJson(localStorage.lists);
        if (!lists || !Array.isArray(lists)) {
          throw '';
        }
      } catch (e) {
        return ret;
      }
      lists.forEach(function(l) {
        ret.push(new List(l));
      });

      return ret;
    };
    Lists.prototype.$createList = function(config) {
      return new List(config);
    };
    Lists.prototype.$addList = function(list) {
      if (list.constructor !== List) {
        list = this.$createList(list);
      }
      this.push(list);
      return list;
    };
    Lists.prototype.$removeList = function(list) {
      var index;
      this.some(function(l, k) {
        if (l === list) {
          index = k;
          return true;
        }
      });
      this.splice(index, 1);
    };

    function List(config) {
      this.title = config.title || '';
      this.friends = [];

      Object.defineProperties(this, {
        friends: {
          enumerable: true,
          writable: false
        }
      });

      if (config.friends && Array.isArray(config.friends)) {
        var self = this;
        config.friends.forEach(function(f) {
          self.friends.push(f);
        });
      }
    }

    function friendIndex(list, friend) {
      var index = -1;

      list.friends.some(function(f, k) {
        if (f === friend.id) {
          index = k;
          return true;
        }
      });

      return index;
    }

    List.prototype.$containsFriend = function (friend) {
      return friendIndex(this, friend) > -1;
    };

    List.prototype.$addFriend = function(friend) {
      if (!this.$containsFriend(friend)) {
        this.friends.push(friend.id);
      }
    };

    List.prototype.$removeFriend = function(friend) {
      if (this.$containsFriend(friend)) {
        this.friends.splice(friendIndex(this, friend), 1);
      }
    };

    return new Lists();
  });
