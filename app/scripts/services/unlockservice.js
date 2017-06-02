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
        };

        function getQrCode(equipNumber, goodsId, uid, companyId, certificate) {
            return $http.get(Config.qrcode_url, { params: { "equinumber": equipNumber, "goodsId": goodsId, "companyId": companyId, "operatorId": uid, 'certificate': certificate } });
        }

        function getGoodsList(channel_id) {
            return $http.get(Config.url_prefix + "/channel/" + channel_id + "/goods");

        }
        function getImageUrl(serverId) {
            $http.get(Config.upload_image_url, { params: { "serverId": serverId} })
        }
    }]);
