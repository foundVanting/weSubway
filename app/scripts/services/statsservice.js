'use strict';

/**
 * @ngdoc service
 * @name newsubwayApp.statsService
 * @description
 * # statsService
 * Service in the newsubwayApp.
 */
angular.module('newsubwayApp')
  .service('statsService', statsService);
statsService.$injector = ["$http"];
function statsService($http) {

    var service = {
        getCount: getCount,
    };
    return service;

    function getCount(uid,type) {
        return $http.get(Config.stats, {params:{"user_id": uid, "type": type}})
    }
}
