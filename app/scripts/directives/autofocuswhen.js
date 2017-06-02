'use strict';

/**
 * @ngdoc directive
 * @name newsubwayApp.directive:autoFocusWhen
 * @description
 * # autoFocusWhen
 */
angular.module('newsubwayApp')
    .directive('autoFocusWhen', ['$log','$timeout', function($log, $timeout) {
        return {
            restrict: 'A',
            scope: {
                autoFocusWhen: '='
            },
            link: function (scope, element) {
                scope.$watch('autoFocusWhen', function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            element[0].focus();
                        })
                    }
                });

                element.on('blur', function () {
                    scope.$apply(function () {
                        scope.autoFocusWhen = false;
                    })
                })
            }
        }
    }])


