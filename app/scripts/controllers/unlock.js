'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:UnlockCtrl
 * @description
 * # UnlockCtrl
 * Controller of the newsubwayApp
 */

angular.module('newsubwayApp')
    .controller('UnlockCtrl', ['$scope','$cookies','unlockService','$window',function ($scope,$cookies, unlockService,$window) {
    $scope.user=$cookies.getObject("user");
    $scope.companyId=12;
    $scope.showLoading=false;
    $scope.equipNumber='';
    $scope.certificate='';
    $scope.showCamera=true;
    $scope.getQrCode = getQrCode;
    $scope.setGoodsId = setGoodsId;
    $scope.scanQrCode = scanQrCode;
    $scope.chooseImage = chooseImage;
    $scope.setQrCodeImage = setQrCodeImage;
    getGoodsList();
    function setEquipNumber(value) {
        $scope.$apply(function () {
            $scope.equipNumber=value;
        });
    }

    function scanQrCode() {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
                console.log(res);
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                alert(result)
                setEquipNumber(result.split('_')[2])
            }
        })
    }

    function setCertificateImage(value) {

            $scope.certificate= value;

    }
    function chooseImage() {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var localId = localIds.pop(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                uploadImage(localId);
            }
        });
    }
    // function getLocalImgData(localIds) {
    //     wx.getLocalImgData({
    //         localId: localIds, // 图片的localID
    //
    //         success: function (res) {
    //             var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
    //
    //             setCertificateImage(localData)
    //         }
    //     });
    // }
    function uploadImage(localId) {
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res){
                var serverId = res.serverId; // 返回图片的服务器端ID
                setShowLoading(true)
                getImageUrl(serverId)
            }
        });
    }

        function setShowCamera(value) {
            $scope.showCamera=value;
        }

        function getImageUrl(serverId) {
        unlockService.getImageUrl(serverId)
            .then(function (response) {
                setShowLoading(false)
                response = response.data;
                var status = response.status || 0;
                var msg = Constants.error_unknown;
                if (status == 0) {
                    msg = response.msg || msg;
                    console.log("status:" + status);
                    showError(msg);
                    return;
                }
                setShowCamera(false)
                setCertificateImage(response.data)
            })
            .catch(Failed)
    }
    function setQrCodeImage(data) {
        $scope.QrCodeImage = data;
    }

    function unlockComplete(response) {
        setShowLoading(false)
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
        console.log(value)
        $scope.goodsId = value;

    }

    function Failed(error) {
        showError(error.statusText);
    }

    function showError(msg) {
        $scope.showError = true;
        $scope.errorMessage = msg;
    }
    function setShowLoading(value){
        $scope.showLoading=value;
    }
    function getQrCode() {
        if (angular.isNull($scope.equipNumber) || angular.isNull($scope.goodsId) || angular.isNull($scope.companyId) || angular.isNull($scope.certificate)) {
            showError('参数为空');
            return;
        }
        setShowLoading(true)
        unlockService.getQrCode($scope.equipNumber, $scope.goodsId, $scope.user.id, $scope.companyId, $scope.certificate)
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
        var goodsId = response.data[0].id;
        setGoodsId(goodsId)
        setGoodsList( response.data);
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
