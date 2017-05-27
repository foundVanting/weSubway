'use strict';

/**
 * @ngdoc service
 * @name newsubwayApp.loginService
 * @description
 * # loginService
 * Service in the newsubwayApp.
 */
angular.module('newsubwayApp')
  .service('loginService', LoginService);
LoginService.$injector = ["$http"];
function LoginService($http) {

    var service = {
        login: login,
    };
    return service;


    function login(username, password) {
        return $http.post(
            Config.login_url, {
                name: username,
                pass: password
            });
    }
}
