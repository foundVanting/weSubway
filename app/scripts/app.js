'use strict';

/**
 * @ngdoc overview
 * @name newsubwayApp
 * @description
 * # newsubwayApp
 *
 * Main module of the application.
 */
angular
  .module('newsubwayApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.pullToRefresh'
  ])
  .config(function ($routeProvider) {
      //中间件 鉴权 用户是否登录
      var resolver = function(access) {
          return {
              load: function($q,$cookies,$location) {
                  if (access) { // fire $routeChangeSuccess
                      if(!$cookies.get('user')){
                          $location.path('/login');
                          return $q.reject('/login');
                      }
                      var deferred = $q.defer();
                      deferred.resolve();
                      return deferred.promise;
                  } else { // fire $routeChangeError
                      $q.reject("/login");
                  }
              }
          }
      };
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
// 配置
var Config = {};
// 所有地址必须为当前host
Config.url_prefix = "http://u.zan-xing.com/api/v1";
// Config.url_prefix = "http://www.blog.com/api/v1";
Config.login_url = Config.url_prefix + "/admin/login";
Config.order_url = Config.url_prefix + "/order";


var Constants = {};
Constants.error_unknown = "未知错误";
// function
angular.isNull = function function_name(val) {
    return angular.isUndefined(val) || val === null || val == '';
}

