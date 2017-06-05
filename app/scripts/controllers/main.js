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
    
MainCtrl.$injector = ['$scope', '$cookies', 'mainService','$http'];

function MainCtrl($scope, $cookies, mainService,$http) {
    $scope.uid = $cookies.getObject("user").id;
    $scope.status = 3;
    $scope.imageShowStatus=false;
    $scope.changeStatus = changeStatus;
    $scope.showImage = showImage;
    $scope.recycle = recycle;
    $scope.loadMore= loadMore;
    $scope.page =1;
    $scope.more = true;
    $scope.orders =[];
    $scope.busy = false;


    function loadMore() {
        if ($scope.busy) return;
        $scope.busy = true;
        mainService.orders($scope.uid, $scope.status,$scope.page)
            .then(loadMoreComplete)
            .catch(ordersFailed);
    };
    function loadMoreComplete(response) {
        response = response.data;
        var pagination = response.data;
        if (pagination.total == 0 ||pagination.to == pagination.total) {
            $scope.more =false
        }
        $scope.page +=1;
        var items = pagination.data;
        for (var i = 0; i < items.length; i++) {
            $scope.orders.push(items[i]);
        }
        $scope.busy = false;
    }


    getOrders();

    function recycleComplete(response) {
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
        // getOrders();
    }

    function recycle(orderId) {
        mainService.recycle(orderId)
            .then(recycleComplete)
            .catch(ordersFailed);
    }
    function showImage(url) {
        $scope.imageUrl = url;
        $scope.imageShowStatus = true;
    }
    function getOrders() {
        if (angular.isNull($scope.uid) || angular.isNull($scope.status)) {
            return showError('参数错误');
        }
        mainService.orders($scope.uid, $scope.status,$scope.page)
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
        if (pagination.total == 0 ||pagination.to == pagination.total) {
            $scope.more =false
        }

        console.log(pagination)
        $scope.page +=1;
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
        $scope.page =1;
        $scope.more =true;
        $scope.status = status;
        getOrders();
    }
}
