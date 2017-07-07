'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
  .controller('AnswerCtrl', AnswerCtrl);
AnswerCtrl.$injector = ['$scope','$location', 'questionService','$rootScope','$routeParams'];
function AnswerCtrl($scope,$location, questionService,$rootScope,$routeParams) {
    $scope.questionId = $routeParams.questionId;
    $scope.answer = '';
    $scope.name = '';

    questionService
        .getAnswer( $scope.questionId)
        .then(answerComplete)
        .catch(Failed);
    function answerComplete(response) {
        response = response.data;
        var status = response.status || 0;
        var msg = Constants.error_unknown;
        if (status === '0') {
            msg = response.msg || msg;
            var dialog = {
                "title":"错误",
                "message":msg,
                "rightBtn":"确定",
            }
            $rootScope.$broadcast("dialogShow",dialog);
            return;
        }
        if (angular.isNull(response.data.answer) ) {
            $scope.answer = '暂无答案';
        }
            // $scope.answer = $sce.trustAsHtml(response.data.answer);
            $scope.answer = response.data.answer;
            $scope.name = response.data.name;
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
}