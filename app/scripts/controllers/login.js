'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
    //     .run(function($http,$window,$location){
    //     $http.post(
    //         Config.weChat_config, {url: $location.$$absUrl})
    //         .then(function(res){
    //             console.log(res);
    //             wx.config(res.data);
    //         })
    // })
    .controller('LoginCtrl', LoginCtrl);

    
LoginCtrl.$injector = ['$cookies', '$location', 'loginService', '$http'];

function LoginCtrl($cookies, $location, loginService, $http) {
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
            showError(msg);
            return;
        }

        var user = response.data || {};
        if (angular.isNull(user.username)) {
            console.log("user:" + user);
            showError(msg);
            return;
        }

        $cookies.putObject("user", user);
        if (angular.isNull(user.id)) {
            showError(msg);
            return;
        }
        // window.location=Config.url_prefix+"/user/"+user.id+"/wechat";
        $location.path('/log');

    }

    function weChatLoginComplete(response) {
        alert(response);
        console.log(response);
    }

    function loginFailed(error) {
        console.log(error);
        showError(error.statusText);
    }

    function showError(msg) {
        vm.showError = true;
        vm.errorMessage = msg;
    }
}
