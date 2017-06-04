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
    
MainCtrl.$injector = ['$scope', '$cookies', 'mainService'];

function MainCtrl($scope, $cookies, mainService) {
    $scope.uid = $cookies.getObject("user").id;
    $scope.status = 3;
    $scope.imageShowStatus=false;
    $scope.changeStatus = changeStatus;
    $scope.showImage = showImage;
    getOrders();

    function showImage(url) {
        $scope.imageUrl = url;
        $scope.imageShowStatus = true;
    }
    function getOrders() {
        if (angular.isNull($scope.uid) || angular.isNull($scope.status)) {
            return showError('参数错误');
        }
        mainService.orders($scope.uid, $scope.status)
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
        if (pagination.total == 0) {
            // showError('暂无数据');
        }
        console.log(pagination)
        $scope.usedCount = response.usedCount;
        $scope.unusedCount = response.unusedCount;
        $scope.usingCount = response.usingCount;
        $scope.recycledCount = response.recycledCount;
        $scope.orders = pagination.data;
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
        $scope.status = status;
        getOrders();
    }
}
