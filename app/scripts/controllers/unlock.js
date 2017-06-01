'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:UnlockCtrl
 * @description
 * # UnlockCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp').controller('UnlockCtrl', ['$scope','$cookies','unlockService','$window',function ($scope,$cookies, unlockService,$window) {
    $scope.user=$cookies.getObject("user");
    $scope.companyId=12;
    $scope.equipNumber='';
    $scope.certificate='';
    getGoodsList();
    $scope.getQrCode=getQrCode;
    $scope.setGoodsId=setGoodsId;
    $scope.scanQrCode=scanQrCode;

    function scanQrCode() {
        alert(1)
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                console.log(res);
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
        })
    }




    function setQrCodeImage(data) {
        $scope.QrCodeImage =data;
    }

    function unlockComplete(response) {
        console.log(response)
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;

        if (status == 0) {
            msg = response.msg || msg;
            console.log("status:" + status);
            showError(msg);
            return;
        }

        setQrCodeImage(response.data)
    }
    function setGoodsId(value) {
        $scope.goodsId = value;
    }
    function Failed(error) {
        showError(error.statusText);
    }
    function showError(msg) {
        $scope.showError = true;
        $scope.errorMessage = msg;
    }

    function getQrCode() {
        console.log($scope.equipNumber+'///'+$scope.goodsId+'///'+$scope.companyId+'///'+$scope.certificate)
        if (angular.isNull($scope.equipNumber) || angular.isNull($scope.goodsId)|| angular.isNull($scope.companyId)|| angular.isNull($scope.certificate)) {
            showError('参数为空');
            return;
        }
        unlockService.getQrCode($scope.equipNumber,$scope.goodsId,$scope.user.id,$scope.companyId,$scope.certificate)
        .then(unlockComplete)
        .catch(Failed);
    }

    function goodsComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;
        if (status == 0) {
            msg = response.msg || msg;
            console.log("status:" + status);
            showError(msg);
            return;
        }
        setGoodsList( response.data);
        console.log(response);
    }

    function getGoodsList() {
        unlockService.getGoodsList($scope.user.channel_id)
            .then(goodsComplete)
            .catch(Failed);
    }
   function setGoodsList(value) {
       $scope.goodsList = value
   }

}]);
