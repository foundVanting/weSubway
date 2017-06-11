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


UserCtrl.$injector = ['$cookies', '$location', '$rootScope','userService'];

function UserCtrl($cookies, $location, $rootScope,userService) {
    var vm = this;

    // init data
    vm.user = $cookies.getObject('user');
    vm.logout = logout;
    vm.uid  = $cookies.getObject("user").id;
    console.log(vm.user);

    function logoutComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;
        if (status == 0) {
            msg = response.msg || msg;
            console.log("status:" + status);
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        $cookies.remove('user');
    }

    function logout() {
        userService.logout(vm.uid)
            .then(logoutComplete)
            .catch(failed)
        // todo 删除远程
        $location.path("/");
    }
    function failed(error) {
        console.log(error);
        var dialog = {
            "title":"错误",
            "message":error.statusText,
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);

    }
}
