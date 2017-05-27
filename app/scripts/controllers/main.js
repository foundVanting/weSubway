'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
  .controller('MainCtrl', MainCtrl);
MainCtrl.$injector = ['$cookies', '$location', 'mainService'];
function MainCtrl($cookies, $location, mainService) {
    var vm = this;
    vm.uid =8;
    vm.status ='0';
    vm.orders = getOrders;
    console.log('init vm ok');
    console.log($cookies.get("user"));




    function getOrders() {
        console.log('getOrders function');
        if (angular.isNull(vm.uid) || angular.isNull(vm.status)) {
            return showError('参数错误');
        }
        console.log('order before')
        mainService.orders(vm.uid,vm.status)
            .then(ordersComplete)
            .catch(ordersFailed);
    }
    function ordersComplete(response) {
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

        var pagination = response.data;
        if (pagination.total==0){
            showError('暂无数据');
        }
       return pagination.data;
    }
    function ordersFailed(error) {
        console.log(error);
        showError(error.statusText);
    }
    function showError(msg) {
        vm.showError = true;
        vm.errorMessage = msg;
    }
}
