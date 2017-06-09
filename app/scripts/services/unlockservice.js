'use strict';

/**
 * @ngdoc service
 * @name newsubwayApp.unlockService
 * @description
 * # unlockService
 * Service in the newsubwayApp.
 */
angular.module('newsubwayApp')
    .service('unlockService', ['$http', function($http) {
        return {
            getQrCode: getQrCode,
            getGoodsList: getGoodsList,
            getImageUrl:getImageUrl,
            isPay:isPay,
            recycleByEquipment:recycleByEquipment,
        };

        function getQrCode(equipNumber, goodsId, uid, companyId, certificate) {
            return $http.get(Config.qrcode_url, { params: { "equinumber": equipNumber, "goodsId": goodsId, "companyId": companyId, "operatorId": uid, 'certificate': certificate,'isWeChat':1} });
        }

        function getGoodsList(channel_id) {
            return $http.get(Config.url_prefix + "/channel/" + channel_id + "/goods");

        }
        function getImageUrl(serverId) {
            return $http.get(Config.upload_image_url, { params: { "serverId": serverId} })
        }
        function isPay(equipNumber) {

            return $http.get(Config.order_pay, { params: { "equinumber": equipNumber} })
        }
        function recycleByEquipment(uid,equipNumber){
            return $http.get(Config.recycle, { params: { "equinumber": equipNumber,"user_id": uid} })
        }
    }]);
