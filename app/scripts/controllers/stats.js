'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
  .controller('StatsCtrl', StatsCtrl);
StatsCtrl.$injector = ['$cookies', '$location','$rootScope','$scope','statsService'];
function StatsCtrl($cookies,$location,$rootScope,$scope,statsService) {
    $scope.changeType= changeType;
    $scope.uid = $cookies.getObject("user").id;
    $scope.type = 1;
    $scope.text = '今日';
    changeType($scope.type )

    function statsComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;
        if (status == 0) {

            msg = response.msg || msg;
            if (msg =="暂无数据"){
                $scope.totalNumber = 0;
                $scope.totalPrice = 0;
                return;
            }
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        var result =response.data;
        var totalPrice =result.totalPrice;
        var totalNumber =result.count;
        $scope.totalNumber = totalNumber;
        $scope.totalPrice = totalPrice/100;

    }

    function statsFailed(error) {
        var dialog = {
            "title":"错误",
            "message":error.statusText,
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);
        return
    }
    function changeType(type) {
        if(type==1){
            $scope.text = '今日';
        }else if(type ==2){
            $scope.text = '这周';
        }else {
            $scope.text = '本月';
        }


        $scope.type =type;
        getCount(type)
    }
    function getCount(type) {
        statsService.getCount($scope.uid,type)
            .then(statsComplete)
            .catch(statsFailed)
    }
}
