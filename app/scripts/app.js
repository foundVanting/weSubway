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
    ])
    .config(function($routeProvider) {
        //中间件 鉴权 用户是否登录
        var resolver = function(access) {
            return {
                load: function($q, $cookies, $location) {
                    if (access) { // fire $routeChangeSuccess
                        if (!$cookies.get('user')) {
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
            .when('/log', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main',
                resolve: resolver(true)
            })
            .when('/user', {
                templateUrl: 'views/user.html',
                controller: 'UserCtrl',
                controllerAs: 'user',
                resolve: resolver(true)
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/', {
                templateUrl: 'views/unlock.html',
                controller: 'UnlockCtrl',
                controllerAs: 'unlock',
                resolve: resolver(true)
            })
            .when('/stats', {
                templateUrl: 'views/stats.html',
                controller: 'StatsCtrl',
                controllerAs: 'stats',
                resolve: resolver(true)
            })
            .when('/passenger/:equipNumber', {
              templateUrl: 'views/passenger.html',
              controller: 'PassengerCtrl',
              controllerAs: 'passenger'
            })
            .otherwise({
                redirectTo: '/passenger/noEquip'
            });
    });

// 配置
var Config = {};
// 所有地址必须为当前host
Config.url_prefix = "http://u.zan-xing.com/api/v1";
// Config.url_prefix = "http://www.blog.com/api/v1";
Config.login_url = Config.url_prefix + "/admin/login";
Config.order_url = Config.url_prefix + "/orders";
Config.qrcode_url = Config.url_prefix + "/qrcode";
Config.weChat_config = Config.url_prefix + "/wechat/config";
Config.upload_image_url = Config.url_prefix + "/image/url";
Config.order_pay = Config.url_prefix + "/equipment/pay";
Config.stats = Config.url_prefix + "/stats";
Config.logout = Config.url_prefix + "/admin/logout";
Config.underLine = '_';
Config.checkTrainmanNumber = Config.url_prefix + "/check/trainman";
Config.createJsSdkOrder = Config.url_prefix + "/order";
Config.weChatAuthorize = Config.url_prefix + "/weChat/authorize";



var Constants = {};
Constants.error_unknown = "未知错误";
// function
angular.isNull = function function_name(val) {
    return angular.isUndefined(val) || val === null || val === '';
}

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof(args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    　　　　　　　　　　　　
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    console.log(result);
    return result;
}

// TabBar

angular.module('newsubwayApp')
    .controller('TabBar', TabBar);

TabBar.$injector = ['$rootScope', '$scope', '$location'];

function TabBar($rootScope, $scope, $location) {
    var vm = this;
    vm.path = $location.path();
    vm.go = go;
    vm.show = true

    $scope.$on('$routeChangeSuccess', function(event, current, previous) {
        vm.path = current.originalPath;
    });

    $scope.$on('$viewContentLoaded', function() {
        console.log("$viewContentLoaded");
    });

    function go(p) {
        $location.path(p);
        // var dialog = {
        //     type: DialogType.SUCCESS,
        //     message: '<span>{0}</span>  <img style="width: 100%; height: 100%;" src="{1}">'.format('一分钱10分钟','https://img6.bdstatic.com/img/image/smallpic/yuanjihuasuoluexiaotu.jpg')
        // };
        // $rootScope.$broadcast("dialogShow", dialog);
    }
}

// Dialog

// usage
// var dialog = {
//     "leftBtn":"回收",
//     "leftBtnCallBack":function(){
//         console.log("leftBtnCallBack");
//         return true;
//     },
//     "rightBtn":"关闭",
//     "rightBtnCallBack":function() {
//         console.log("rightBtnCallBack");
//         return true;
//     }
// }
// $rootScope.$broadcast("dialogShow",dialog);

var DialogType = {
    SUCCESS: "success",
    INFO: 'info',
    WARN: 'warn',
    WAITING: 'waiting',
    HIDDEN:'hidden'
};
angular.module('newsubwayApp')
    .controller('Dialog', Dialog);

Dialog.$injector = ['$rootScope', '$scope'];

function Dialog($rootScope, $scope) {
    var vm = this;
    vm.show = false;

    vm.leftBtnClick = leftBtnClick;
    vm.rightBtnClick = rightBtnClick;

    $scope.$on('dialogShow', function(event, dialog) {
        vm.show = true;
        dialog = dialog || {};
        // vm.title = dialog.title || "警告";
        vm.type = dialog.type || DialogType.WARN;
        vm.message = dialog.message || "";
        if (dialog.leftBtn) {
            vm.leftBtn = dialog.leftBtn;
            vm.leftBtnCallBack = dialog.leftBtnCallBack;
        } else {
            vm.leftBtn = false;
        }

        if (dialog.rightBtn) {
            vm.rightBtn = dialog.rightBtn;
            vm.rightBtnCallBack = dialog.rightBtnCallBack;
        } else {
            vm.rightBtn = "关闭";
        }
    });

    function leftBtnClick() {
        var r = true;
        if (vm.leftBtnCallBack) {
            r = vm.leftBtnCallBack();
        }

        if (r) {
            vm.show = false;
        }
        return
    }

    function rightBtnClick() {
        var r = true;
        if (vm.rightBtnCallBack) {
            r = vm.rightBtnCallBack();
        }

        if (r) {
            vm.show = false;
        }
        return
    }
}


