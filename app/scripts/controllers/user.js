'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
    .controller('UserCtrl', UserCtrl);


UserCtrl.$injector = ['$cookies', '$location', '$rootScope'];

function UserCtrl($cookies, $location, $rootScope) {
    var vm = this;

    // init data
    vm.user = $cookies.getObject('user');
    vm.logout = logout;
    console.log(vm.user);

    function logout() {
        $cookies.remove('user');
        $location.path("/");
    }
}
