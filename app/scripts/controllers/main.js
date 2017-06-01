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
MainCtrl.$injector = ['$scope','$cookies', 'mainService'];
function MainCtrl($scope,$cookies, mainService) {
    $scope.uid = $cookies.getObject("user").id;
    $scope.status =3;
    $scope.changeStatus = changeStatus;
    getOrders();
    function getOrders() {
        if (angular.isNull($scope.uid) || angular.isNull($scope.status)) {
            return showError('参数错误');
        }
        mainService.orders($scope.uid,$scope.status)
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
        $scope.total = pagination.total
        $scope.orders= pagination.data;
        console.log($scope)
    }
    function ordersFailed(error) {
        console.log(error);
        showError(error.statusText);
    }
    function showError(msg) {
        $scope.showError = true;
        $scope.errorMessage = msg;
    }
    function changeStatus(status) {
        // alert(status)
        $scope.status= status;
        getOrders();
    }
}
