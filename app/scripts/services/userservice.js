'use strict';

/**
 * @ngdoc service
 * @name newsubwayApp.userService
 * @description
 * # userService
 * Service in the newsubwayApp.
 */
angular.module('newsubwayApp')
  .service('userService', userService);
userService.$injector = ["$http"];
function userService($http) {

    var service = {
        logout: logout,
    };
    return service;
    function logout(uid) {
        return $http.post(
            Config.logout, {
                user_id:uid
            });
    }

}
