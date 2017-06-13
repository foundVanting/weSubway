'use strict';

/**
 * @ngdoc service
 * @name newsubwayApp.passengerService
 * @description
 * # passengerService
 * Service in the newsubwayApp.
 */
angular.module('newsubwayApp')
  .service('passengerService', passengerService);
passengerService.$injector = ["$http"];
function passengerService($http) {

    var service = {
        checkTrainman: checkTrainman,
        createJsSdkOrder: createJsSdkOrder,
    };
    return service;

    function checkTrainman(trainmanNumber) {
        return $http.get(Config.checkTrainmanNumber, {params:{"trainmanNumber": trainmanNumber}})
    }
    function createJsSdkOrder(products) {
        return $http.post(Config.createJsSdkOrder, {products: products})
    }
}
