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
    
MainCtrl.$injector = ['$scope', '$cookies', 'mainService','$rootScope'];

function MainCtrl($scope, $cookies, mainService,$rootScope) {
    $scope.uid = $cookies.getObject("user").id;
    $scope.status = 3;
    $scope.imageShowStatus=false;

    $scope.page =1;
    $scope.more = false;
    $scope.orders =[];
    $scope.busy = false;
    $scope.usedCount = 0;
    $scope.unusedCount = 0;
    $scope.usingCount = 0;
    $scope.recycledCount = 0;
    $scope.changeStatus = changeStatus;
    $scope.recycle = recycle;
    $scope.loadMore= loadMore;
    $scope.showImage = showImage;
    $scope.hideImage= hideImage;

    getOrders();
    function hideImage() {
        $scope.imageUrl = '';
        $scope.imageShowStatus = false;
    }

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
        $scope.page +=1;
        var items = pagination.data;
        for (var i = 0; i < items.length; i++) {
            $scope.orders.push(items[i]);
        }
        if (pagination.total == 0 ||pagination.to == pagination.total) {
            $scope.more =false
        }else {
            $scope.more =true
        }
        $scope.busy = false;
    }

    function recycleComplete(response) {
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
        $scope.page =1;
        getOrders();
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
            var dialog = {
                "title":"错误",
                "message":'参数错误',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
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
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }

        var pagination = response.data;
        console.log(pagination)
        $scope.page +=1;
        $scope.usedCount = response.usedCount;
        $scope.unusedCount = response.unusedCount;
        $scope.usingCount = response.usingCount;
        $scope.recycledCount = response.recycledCount;
        $scope.orders = pagination.data;
        if (pagination.total == 0 ||pagination.to == pagination.total) {
            $scope.more =false
        }else {
            $scope.more =true
        }
    }

    function ordersFailed(error) {
        console.log(error);
        var dialog = {
            "title":"错误",
            "message":msg,
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);
        return

    }


    function changeStatus(status) {
        $scope.page =1;
        $scope.status = status;
        getOrders();
    }
}
