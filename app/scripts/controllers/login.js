'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
    .controller('LoginCtrl', LoginCtrl);

    
LoginCtrl.$injector = ['$cookies', '$location', 'loginService','$rootScope'];

function LoginCtrl($cookies, $location, loginService,$rootScope) {
    var vm = this;

    // init data
    vm.username = '';
    vm.password = '';
    vm.login = login;



    function login() {
        if (angular.isNull(vm.username) || angular.isNull(vm.password)) {
            return
        }

        loginService
            .login(vm.username, vm.password)
            .then(loginComplete)
            .catch(loginFailed);
        //绑定微信
    }

    function loginComplete(response) {
        console.log(response);
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

        var user = response.data || {};
        if (angular.isNull(user.username)) {
            console.log("user:" + user);
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }

        $cookies.putObject("user", user);
        if (angular.isNull(user.id)) {
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        // window.location=Config.url_prefix+"/user/"+user.id+"/wechat";
        $location.path('/');

    }

    function weChatLoginComplete(response) {
        alert(response);
        console.log(response);
    }

    function loginFailed(error) {
        console.log(error);
        var dialog = {
            "title":"错误",
            "message":error.statusText,
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);

    }
}
