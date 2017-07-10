'use strict';

/**
 * @ngdoc function
 * @name newsubwayApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the newsubwayApp
 */
angular.module('newsubwayApp')
  .controller('QuestionCtrl',QuestionCtrl);
QuestionCtrl.$injector = ['$scope','$location', 'questionService','$rootScope','$routeParams'];
function QuestionCtrl($scope,$location, questionService,$rootScope,$routeParams) {
    $scope.type = $routeParams.type;
    $scope.questions='';
    $scope.showDetail=showDetail;

    questionService
        .getQuestions($scope.type)
        .then(questionsComplete)
        .catch(Failed);
    function showDetail(questionId) {
       $location.path('/answer/'+questionId)
    }


    function questionsComplete(response) {
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

            $scope.questions = response.data;
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
