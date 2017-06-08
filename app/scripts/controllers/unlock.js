'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:UnlockCtrl
 * @description
 * # UnlockCtrl
 * Controller of the newsubwayApp
 */

angular.module('newsubwayApp')
    .controller('UnlockCtrl', ['$scope','$cookies','unlockService','$location','$http','$interval','$rootScope',function ($scope,$cookies, unlockService,$location,$http,$interval,$rootScope) {
    $scope.user=$cookies.getObject("user");
    $scope.companyId=12;
    $scope.showLoading=false;
    $scope.loadingMsg='';
    $scope.equipNumber='';
    $scope.certificate='';
    $scope.showCamera=true;
    $scope.equipNumberFocus=false;
    $scope.bigPhoto = false;
    $scope.topError = false;
    $scope.topErrorMsg = '';
    // $scope.QrCodeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFdElEQVR4nO3dwU7dMBRAwYL4/09GXXTbPOHWzrHzZtYIh4ijLK5sf3x/f/8COp/1A8C7EyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEPu6Z5nPzzNqH723+Orvqu4/Hn3Ps/7e0d//1P+Hf3PGu4AHEyHERAgxEUJMhBATIcRECLGb5oRXTpmnzZprrZ7jnT73O+X/YfLq4drALxFCToQQEyHERAgxEUJMhBCL54RXdps7jc7Hqn19o895yn6/3f4f5trrXcMbEiHERAgxEUJMhBATIcRECLFN54S7OX3f3az5ISv4EkJMhBATIcRECDERQkyEEBMhxMwJf6Ta7zfL6vNI+R/eNcRECDERQkyEEBMhxEQIMRFCbNM54W772Vbvu1s9P1z9/LvNOc/iSwgxEUJMhBATIcRECDERQkyEEIvnhPat/bHbfYPVeaTv+f/wjn8zbEWEEBMhxEQIMRFCTIQQEyHEPp69U+sUs+4/nMW9hXfyJYSYCCEmQoiJEGIihJgIISZCiN20n7DaJ1bdB3hldM622/PPWnf1PslZP38PX0KIiRBiIoSYCCEmQoiJEGIihNhN+wlXz5dG1109fztl3131fmZ5xvxwr3cKb0iEEBMhxEQIMRFCTIQQEyHEHnLu6G7zrlnrzpqLjlq97up571l8CSEmQoiJEGIihJgIISZCiIkQYvYT/ujnV9ttLrebZ/+9voQQEyHERAgxEUJMhBATIcRECLF4P+Hpc7zdzrc8/dzUWe/nrPfgSwgxEUJMhBATIcRECDERQkyEEPu6Z5nV87HVc7nRudNT70Wcta9v9fs8iy8hxEQIMRFCTIQQEyHERAgxEUJs03NHd5v7XTn9OUfXrc5Hde4osJAIISZCiIkQYiKEmAghJkKIbXru6JVT9svttu5u56POcspzvuZLCDERQkyEEBMhxEQIMRFCTIQQO2w/4ep1Z6nmeKPPc8q+wWo/5D18CSEmQoiJEGIihJgIISZCiIkQYvGccLd9cafvu6v2JT7VTXXcsAbwggghJkKIiRBiIoSYCCEmQoh91Q/QWL1/b3TdK85Z/bd1d5vfvuZLCDERQkyEEBMhxEQIMRFCTIQQ23ROOGsuZ1/f3N9fzd9G1z1rruhLCDERQkyEEBMhxEQIMRFCTIQQe8i5o1eq+/1GnX4f4ynsJwT+QoQQEyHERAgxEUJMhBATIcRumhOerrrncFR13+Os57ny7HsmfQkhJkKIiRBiIoSYCCEmQoiJEGI3nTt6yj631fsbR9cd/f273X94Zbf7A9tp+RltwIOJEGIihJgIISZCiIkQYiKEWHw/4W5zqivV/XtXTt8Fuvr53U8IDBAhxEQIMRFCTIQQEyHERAixeE545ZR7/1afY7n6nNLRdUefp9pHetbc1ZcQYiKEmAghJkKIiRBiIoSYCCG26ZzwdLPmgbN+ftTp9xCuXncuX0KIiRBiIoSYCCEmQoiJEGIihJg54X9ZPddafX7mrOdZvW+w2j95D19CiIkQYiKEmAghJkKIiRBiIoTYpnPC0+/fq+aBoz9fvefV57Veqc5BfW3HZ4K3IkKIiRBiIoSYCCEmQoiJEGLxnHDPuc3P7XZ/YDVn2+3ewt3moq+d3QA8gAghJkKIiRBiIoSYCCEmQoh97Dk5gffhSwgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIMRFCTIQQEyHERAgxEUJMhBATIcRECDERQkyEEBMhxEQIsd9KHxhSYyjpRwAAAABJRU5ErkJggg==';
    $scope.QrCodeImage = '';

    $scope.getQrCode = getQrCode;
    $scope.setGoods = setGoods;
    $scope.scanQrCode = scanQrCode;
    $scope.chooseImage = chooseImage;
    $scope.setQrCodeImage = setQrCodeImage;
    $scope.checkEquipNumber=checkEquipNumber;
    $scope.setBigPhoto=setBigPhoto;
    $scope.showTopError=showTopError;
    $scope.checkCertificate=checkCertificate;
    //weChat config
    wechatConfig();
    function wechatConfig() {
        $http.post(
            Config.weChat_config, { url: $location.$$absUrl })
            .then(function(res) {
                console.log(res);
                wx.config(res.data);
            })
    }
    getGoodsList();
    function checkCertificate() {
        if(angular.isNull($scope.certificate)){
            showTopError('凭证不能为空')
        }
    }
    function showTopError(msg) {
        $scope.topError=true;
        $scope.topErrorMsg=msg;
        var a = $interval(function(){
            $scope.topError=false;
            $scope.topErrorMsg='';
            $interval.cancel(a);
        },2000);
    }
    function setBigPhoto(value) {
        $scope.bigPhoto =value
    }
    
    function checkEquipNumber() {
        if ($scope.equipNumber.length !== 6) {
            $scope.equipNumberFocus=true;
            showTopError('设备号必须为6位')
        }else {
            $scope.equipNumberFocus=false;
        }
    }
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

    function uploadImage(localId) {
        wx.uploadImage({
            localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res){
                var serverId = res.serverId; // 返回图片的服务器端ID
                setShowLoading(true,'数据加载中')
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
                setShowLoading(false,'数据加载中')
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
                setShowCamera(false)
                setCertificateImage(response.data)
            })
            .catch(Failed)
    }
    function setQrCodeImage(data) {
        console.log('before check is pay');
        var a = $interval(function(){
            unlockService.isPay($scope.equipNumber)
                .then(function (response) {
                    console.log('check is pay');
                    response = response.data;
                    var status = response.status || 0;
                    var msg = Constants.error_unknown;
                    if (status == 1) {
                        console.log('cancel check is pay');
                        $interval.cancel(a);
                        $scope.QrCodeImage='';
                        $scope.equipNumber = '';
                        $scope.certificate='';
                        $scope.showCamera=true

                        var dialog = {
                            "title":"成功",
                            "message":'支付成功',
                            "rightBtn":"确定",
                        }
                        $rootScope.$broadcast("dialogShow",dialog);

                    }
                })
                .catch(Failed)
        },3000);
        console.log('after check is pay');
        $scope.QrCodeImage = data;
    }
    function unlockComplete(response) {
        setShowLoading(false,'数据加载中')
        console.log(response)
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
        setQrCodeImage(response.data)
    }


    function setGoods(id,body) {
        $scope.goodsId = id;
        $scope.goodsBody = body;
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

    // todo 未验证
    function setShowLoading(value,msg)
    {
        if (value == true){
            $scope.showLoading=value;
            $scope.loadingMsg = msg;
        }else {
            $scope.showLoading=false;
            $scope.loadingMsg = '';
        }
    }
    function getQrCode() {
        // angular.isNull($scope.companyId)
        if (angular.isNull($scope.equipNumber)) {

        var dialog = {
            "message":"请填写设备号",
            "rightBtn":"确定",
        }
        $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        if( angular.isNull($scope.goodsId) ){
            var dialog = {
                "message":"请选择套餐",
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        if( angular.isNull($scope.certificate) ){
            var dialog = {
                "message":"凭证不能为空",
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        setShowLoading(true,'数据加载中')
        console.log($scope.goodsId);
        unlockService.getQrCode($scope.equipNumber, $scope.goodsId, $scope.user.id, $scope.companyId, $scope.certificate)
            .then(unlockComplete)
            .catch(Failed);
    }

    function goodsComplete(response) {
        response = response.data;
        console.log(response)
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
        var goodsId = response.data[0].id;
        var goodsBody = response.data[0].body;
        setGoods(goodsId,goodsBody)
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
