'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:PassengerCtrl
 * @description
 * # PassengerCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
  .controller('PassengerCtrl',PassengerCtrl);
PassengerCtrl.$injector = ['$scope','$http','$cookies', '$location', 'unlockService','$rootScope','passengerService'];
function PassengerCtrl($scope,$http,$cookies, $location, unlockService,$rootScope,passengerService) {
    $scope.setGoods=setGoods;
    $scope.checkTrainmanNumber=checkTrainmanNumber;
    $scope.pay=pay;
    $scope.trainmanNumber = '';
    $scope.equipNumber = 'A00000';
    $scope.companyId=12;
    $scope.uid = '';
    wechatConfig();
    function wechatConfig() {
        $http.post(
            Config.weChat_config, { url: $location.$$absUrl })
            .then(function(res) {
                wx.config(res.data);
            })
    }
    getGoodsList();
    function getGoodsList() {
        unlockService.getGoodsList(11)
            .then(goodsComplete)
            .catch(Failed);
    }
    function goodsComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;
        console.log(status)
        if (status === '0') {
            msg = response.msg || msg;
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        var goodsId = response.data[0].id;
        var goodsBody = response.data[0].body;
        setGoods(goodsId,goodsBody)
        setGoodsList( response.data);
    }
    function Failed(error) {
        var dialog = {
            "title":"错误",
            "message":error.statusText,
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);
        return
    }
    function setGoods(id,body) {
        $scope.goodsId = id;
        $scope.goodsBody = body;
    }
    function setGoodsList(value) {
        $scope.goodsList = value
    }
    function checkTrainmanNumber() {
        if (angular.isNull($scope.trainmanNumber)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'乘务员工号不能为空',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
        passengerService.checkTrainman($scope.trainmanNumber)
            .then(checkTrainmanComplete)
            .catch(Failed)
    }

    function checkTrainmanComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;

        if (status == 0) {
            $scope.uid = '';
            msg = response.msg || msg;
            var dialog = {
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        $scope.uid = response.data;
    }

    function pay() {
        checkPayParam();
        var productId = $scope.goodsId+Config.underLine+$scope.companyId+Config.underLine+$scope.equipNumber+Config.underLine+$scope.uid;
        passengerService.createJsSdkOrder(productId)
            .then(jsSdkComplete)
            .catch(Failed)

    }
    function jsSdkComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;

        if (status == 0) {
            msg = response.msg || msg;
            console.log("status:" + status);
            var dialog = {
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        if(status ==2){
            window.location=Config.weChatAuthorize+'?url='+'http://huangdi.tunnel.2bdata.com/newsubway/app/?#!/passenger';
            return;
        }
        var payConfig = response.data
        wx.chooseWXPay({
            timestamp:payConfig['timestamp'],
            nonceStr: payConfig['nonceStr'] ,
            package:  payConfig['package'],
            signType: payConfig['signType'],
            paySign:  payConfig['paySign'], // 支付签名
            success: function (res) {
                if(res.errMsg == "chooseWXPay:ok"){
                    var dialog = {
                        'type':DialogType.SUCCESS,
                        "message":'支付成功',
                        "rightBtn":"确定",
                    }
                    $rootScope.$broadcast("dialogShow",dialog);
                    return;
                }else{
                    var dialog = {
                        "message":'支付失败',
                        "rightBtn":"确定",
                    }
                    $rootScope.$broadcast("dialogShow",dialog);
                    return;
                }

                // 支付成功后的回调函数
            },
            cancel:function(res){
                var dialog = {
                    'type':DialogType.INFO,
                    "message":'取消支付',
                    "rightBtn":"确定",
                }
                $rootScope.$broadcast("dialogShow",dialog);
                return;
            },
            fail: function(res){
                var dialog = {
                    "message":'支付失败',
                    "rightBtn":"确定",
                }
                $rootScope.$broadcast("dialogShow",dialog);
                return;
            }
        });



    }
    function checkPayParam() {
        if (angular.isNull($scope.trainmanNumber)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'乘务员工号不能为空',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
        if (angular.isNull($scope.uid)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'乘务员工号错误',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
        if (angular.isNull($scope.equipNumber)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'内部错误，设备号不能为空',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
        if (angular.isNull($scope.goodsId)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'套餐不能为空',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
        if (angular.isNull($scope.companyId)){
            var dialog = {
                "type":DialogType.WARN,
                "message":'套餐不能为空',
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return
        }
    }


}
