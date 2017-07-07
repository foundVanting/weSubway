'use strict';

/**
 * @ngdoc filter
 * @name newsubwayApp.filter:trustedFilter
 * @function
 * @description
 * # trustedFilter
 * Filter in the newsubwayApp.
 */
angular.module('newsubwayApp')
  .filter('trustedFilter',trustedFilter);
trustedFilter.$injector = ["$sce"];
function trustedFilter($sce){
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}